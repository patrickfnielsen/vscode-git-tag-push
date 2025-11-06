import * as child_process from 'child_process';
import * as vscode from 'vscode';

const gitPath = vscode.workspace.getConfiguration('git').get('path') || 'git';

export function createTag(tag: string, message: string, cwd: string): Promise<undefined> {
    if (!tag) {
        return Promise.reject('NO_TAG');
    }

    return new Promise((resolve, reject) => {
        child_process.exec(`${gitPath} tag -a -m "${message}" "${tag}"`, {
            cwd: cwd
        },
            (error, stdout, stderr) => {
                if (stderr) {
                    return reject(stderr);
                }
                if (error) {
                    return reject(error);
                }
                resolve();
            });
    });
}

export function deleteTag(tag: string, cwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        child_process.exec(`${gitPath} tag -d ${tag}`, {
            cwd: cwd
        }, (error, stdout, stderr) => {
            if (stderr && !/Deleted tag/.test(stderr)) {
                return reject('TAG_DELETE_FAILED');
            }
            if (error) {
                return reject('TAG_DELETE_FAILED');
            }
            resolve('TAG_DELETED');
        });
    });
}

export function pushWithTags(cwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        child_process.exec(gitPath + ' push --follow-tags', {
            cwd: cwd
        },
            (error, stdout, stderr) => {
                if (error) {
                    return reject(`PUSH_FAILED: ${error.message}`);
                }
                if (stderr && !/\[new tag\]/.test(stderr)) {
                    return reject(`PUSH_FAILED: ${stderr}`);
                }
                resolve('PUSHED');
            });
    });
}

export function getLatestTag(cwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        child_process.exec(gitPath + ' describe --abbrev=0 --tags', {
            cwd: cwd
        },
            async (error, stdout, stderr) => {
                if (error || stderr) {
                    const answer = await showConfirmDialog(error ? error.message : stderr);
                    if (answer === true) {
                        resolve("");
                    }else{
                        reject();
                    }
                }

                let tag = "";
                if (!/No names found/.test(stdout)) {
                    tag = stdout;
                }

                resolve(tag.replace(/\n/g, ''));
            });
    });
}

async function showConfirmDialog(errorMsg: string): Promise<boolean> {
    const answer = await vscode.window.showInformationMessage(
        `There was a problem fetching latest tag \n
        ${errorMsg}\n
        Do you want to create a new tag?`,
        { modal: true, },   // Makes it a modal dialog (blocks UI)
        "Yes"
    );

    if (answer === "Yes") {
        return true;
    } else {
        return false;
    }
}

export function tryIncrementSemVerBuildNumber(tag: string): string {
    const semVerRegex = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
    const match = tag.match(semVerRegex);

    if (!match) {
        return tag;
    } 

    const major = match[1];
    const minor = match[2];
    const patch = parseInt(match[3]);
    const preRelease = match[4];

    if (!preRelease) {
        // No pre-release, just increment patch
        return `${major}.${minor}.${patch + 1}`;
    }

    // Try to increment numeric part at the end of pre-release
    const preReleaseParts = preRelease.split(".");
    const lastPart = preReleaseParts[preReleaseParts.length - 1];

    const numberMatch = lastPart.match(/^(.*?)(\d+)$/); // e.g., rc3 -> ["rc3","rc","3"]
    if (numberMatch) {
        preReleaseParts[preReleaseParts.length - 1] =
            numberMatch[1] + (parseInt(numberMatch[2]) + 1);
    } else {
        // No number at the end, just leave it as-is
    }

    return `${major}.${minor}.${patch}-${preReleaseParts.join(".")}`;
}

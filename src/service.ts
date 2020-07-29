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

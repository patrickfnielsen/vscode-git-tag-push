import * as vscode from 'vscode';

import { createTag, deleteTag, pushWithTags } from './service';

export async function createAndPushCommand() {
    if(!vscode.workspace.workspaceFolders)
    {
        vscode.window.showErrorMessage('Workspace folder path is undefined!');
        return;
    }

    let folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    let tag = await vscode.window.showInputBox({
        placeHolder: 'Type a tag...'
    });

    if (!tag || !tag.trim()) {
        vscode.window.showErrorMessage('Invalid tag!');
        return;
    }

    let message = await vscode.window.showInputBox({
        placeHolder: 'Type a message...'
    });

    try {
        if (message) {
            await createTag(tag, message, folderPath);
        } else {
            await createTag(tag, '', folderPath);
        }
    } catch (err) {
        vscode.window.showErrorMessage(err);
    }

    try {
        await pushWithTags(folderPath);
    } catch (err) {
        deleteTag(tag, folderPath)
        vscode.window.showErrorMessage(err);
    }

    vscode.window.showInformationMessage(`Tag '${tag}' pushed to remote`);
}
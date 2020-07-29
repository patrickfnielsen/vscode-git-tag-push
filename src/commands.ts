import * as vscode from 'vscode';

import { createTag, pushWithTags } from './service';

export async function createAndPushCommand() {
    try {
        const tag = await vscode.window.showInputBox({
            placeHolder: 'Type a tag...'
        });

        if (!tag || !tag.trim()) {
            return;
        }

        const message = await vscode.window.showInputBox({
            placeHolder: 'Type a message...'
        });

        if(!vscode.workspace.workspaceFolders)
        {
            vscode.window.showErrorMessage('Workspace folder path is undefined!');
            return;
        }

        const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        if (message) {
            await createTag(tag, message, folderPath);
        } else {
            await createTag(tag, '', folderPath);
        }

        await pushWithTags(folderPath);

        //vscode.window.showInformationMessage('Tag \'${tag}\' pushed to remote');
        vscode.window.setStatusBarMessage('Tag \'${tag}\' pushed to remote', 3000);

    } catch (err) {
        vscode.window.showErrorMessage(err);
    }
}
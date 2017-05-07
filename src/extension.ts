'use strict';
import * as vscode from 'vscode'
import  { MachineController } from './MachineController'
import keywords from './keywords'


export function activate(context: vscode.ExtensionContext) {

    new MachineController(keywords)

    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {

        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

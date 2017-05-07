'use strict';

import * as vscode from 'vscode'
import { languages, TextDocument, Position, CompletionItem, TextEditor } from 'vscode'
import  { MachineController } from './MachineController'
import keywords from './keywords'

export function activate(context: vscode.ExtensionContext) {

    new MachineController(keywords)

    // context.subscriptions.push(vscode.languages.registerCompletionItemProvider('spl', {
    //     provideCompletionItems(document: TextDocument, position: Position) {
    //         console.log(document.getWordRangeAtPosition(position))
    //         return completions;
    //     }
    // }));

    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {

        let k = new vscode.CompletionItem("asdfasd", vscode.CompletionItemKind.Keyword)

        
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

// vscode.window.showInformationMessage('Hello World!');

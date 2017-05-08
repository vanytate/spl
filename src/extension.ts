'use strict';

import * as vscode from 'vscode'
import { workspace, languages, TextDocument, Position, CompletionItem, TextEditor } from 'vscode'
import  { MachineController } from './MachineController'
import keywords from './keywords'

import * as path from 'path'
import * as fs from 'fs'

export function activate(context: vscode.ExtensionContext) {

    new MachineController(keywords)

    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        
        config()
        mkdirSrc()

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function config() {
    let p = path.join(workspace.rootPath, ".vscode")
    if (!fs.existsSync(p)) {
        fs.mkdir(p)
    }
    let task = {
        "taskName": "splrun",
        "version": "0.1.0",
        "command": "spl",
        "isBuildCommand": true,
        "isShellCommand": true,
        "isBackground": false,
        "problemMatcher": "$tsc-watch",
        "_runner": "terminal",
        "args": [
            "${file}"
        ],
        "showOutput": "always"
    }
    let tasksPath = path.join(p, 'tasks.json')
    let settingPath = path.join(p, 'settings.json')
    fs.writeFile(tasksPath, JSON.stringify(task, null, 2), () => {
        // workspace.openTextDocument(vscode.Uri.file(tasksPath))
        //     .then(doc => vscode.window.showTextDocument(doc));
    })
    let settings = {
        "editor.wordBasedSuggestions": false
    }
    if (!fs.existsSync(settingPath)) {
        fs.appendFile(settingPath, JSON.stringify(settings, null, 2))
    }
}

function mkdirSrc() {
    let srcPath = path.join(workspace.rootPath, "src")
    if (!fs.existsSync(srcPath)) {
        fs.mkdir(srcPath)
        let func = 
`main()
begin
    print 4
end`
        let mainPath = path.join(srcPath, "main.spl")
        if (!fs.existsSync(mainPath)) {
            fs.writeFile(mainPath, func, () => {
                workspace.openTextDocument(vscode.Uri.file(mainPath))
                    .then(doc => vscode.window.showTextDocument(doc));
            })
        }
    }
}
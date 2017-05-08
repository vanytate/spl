import * as vscode from 'vscode'
import { Machine } from './Machine'

export class MachineController {

    private _machine: Machine
    private _types
    private _disposable

    constructor(keywords) {

        let machine = new Machine()
        machine.add(...keywords)
        
        this._types = vscode.window.createTextEditorDecorationType({
            color: '#ff9933'
        })
        this._machine = machine
        this._updateDecoration(vscode.window.visibleTextEditors[0])
        let subscriptions = []
        vscode.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions)
        vscode.window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions)
        vscode.workspace.onDidChangeTextDocument(this._onEvent, this, subscriptions)
        this._disposable = vscode.Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose()
    }

    _onEvent() {
        let editor = vscode.window.activeTextEditor
        if (editor) {
            this._updateDecoration(editor);
        }
    }

    _updateDecoration(editor) {
        if (editor && editor.document.languageId === 'spl') {
            let activeDecorationsByColor = []
            for (let p of this._machine.test(editor.document.getText())) {
                activeDecorationsByColor.push({
                    range: new vscode.Range(new vscode.Position(p.line, p.start), new vscode.Position(p.line, p.end)), hoverMessage: 'highlight.tooltip'
                })
            }
            editor.setDecorations(this._types, activeDecorationsByColor)
            // vscode.window.mess
        }
    }
}

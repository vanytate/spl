export class Transition {

    private _target: string
    private _terminals

    constructor(target, ...terminals) {
        this._target = target
        this._terminals = terminals
    }

    get target() {
        return this._target
    }

    set target(value) {
        this._target = value
    }

    get terminals() {
        return this._terminals
    }

    set terminals(value) {
        this._terminals = value
    }

    addTerminal(terminal) {
        this._terminals.push(terminal)
    }

    contains(terminal) {
        return this._terminals.includes(terminal)
    }
}

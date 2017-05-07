import  { Transition } from './Transition';

export class State {

    _name: string
    _final: boolean
    _transitions: Transition[]

    constructor(name = '1', final = false) {
        this._name = name
        this._final = final
        this._transitions = []
    }

    get name() {
        return this._name
    }

    set name(value) {
        this._name = value
    }

    get final() {
        return this._final
    }

    set final(value) {
        this._final = value
    }

    get transitions() {
        return this._transitions
    }

    set transitions(value) {
        this._transitions = value
    }

    addTransition(transition) {
        this._transitions.push(transition)
    }

    getNext(terminal) {
        for (let e of this._transitions) {
            if (e.contains(terminal)) {
                return e.target
            }
        }
        return null
    }
}

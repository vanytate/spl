import  { Word } from './Word'
import  { Transition } from './Transition'
import  { State } from './State'

export class Machine {

    _begin: State
    _stateNumber: number

    constructor() {
        this._begin = new State('q0')
        this._stateNumber = 0
    }

    nextStateName() {
        return 'q' + ++this._stateNumber
    }

    add(...words) {
        for (let word of words) {
            let terminals = Array.from(word)
            let len = terminals.length
            let currentState
            let next = this._begin
            let i = -1
            while (next !== null && ++i < len) {
                currentState = next                            
                next = currentState.getNext(terminals[i])
            }
            if (next === null) {
                while (i < len) {
                    next = new State(this.nextStateName()) 
                    currentState.addTransition(new Transition(next, terminals[i]))
                    currentState = next
                    ++i
                }
            }
            next.final = true
        }
    }

    test(text) {
        let result = []
        let next, currentState
        let lines = text.split('\n')
        for (let k = 0; k < lines.length; ++k) {
            let startIndex = 0            
            let line = lines[k]
            let len = line.length        
            let i = -1
            while (i < len) {
                next = currentState = this._begin
                while (next !== null && ++i < len) {
                    currentState = next                            
                    next = currentState.getNext(line[i])
                }
                if (next !== null && next.final) {
                    result.push(new Word(startIndex, i, k))
                    break
                    // startIndex = i
                } else if (currentState.final) {
                    result.push(new Word(startIndex, i, k))
                    next = this._begin
                    startIndex = i
                    --i
                } else {
                    i = startIndex++
                }
            }
        }
        return result
    }

    toString() {
        return this._begin
    }
}

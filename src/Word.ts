export class Word {

    private start: number
    private end: number
    private line: number

    constructor(start, end, line) {
        this.start = start
        this.end = end
        this.line = line
    }
}
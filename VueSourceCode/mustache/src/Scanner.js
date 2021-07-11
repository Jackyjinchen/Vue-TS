export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr;
        this.pos = 0;
        this.tail = templateStr
    }
    scan(tag) {
        if (this.tail.indexOf(tag) == 0) {
            this.pos += tag.length;
            this.tail = this.templateStr.substring(this.pos)
        }
    }

    scanUtil(stopTag) {
        const pos_backup = this.pos;
        while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
            this.pos++;
            this.tail = this.templateStr.substring(this.pos)
        }
        return this.templateStr.substring(pos_backup, this.pos)
    }

    eos() {
        return this.pos >= this.templateStr.length
    }
}
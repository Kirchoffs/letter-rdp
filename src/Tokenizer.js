class Tokenizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    isEOF() {
        return this._cursor === this._string.length;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string;

        if (!Number.isNaN(Number(string[this._cursor]))) {
            let number = '';
            
            while (!Number.isNaN(Number(string[this._cursor]))) {
                number += string[this._cursor++];
            }

            return {
                type: 'NUMBER',
                value: number
            };
        }

        if (string[this._cursor] == `"` || string[this._cursor] == `'`) {
            const quote = string[this._cursor];
            let str = '';
            do {
                str += string[this._cursor++];
            } while (!this.isEOF() && string[this._cursor] !== quote);
            
            str += string[this._cursor++];

            return {
                type: 'STRING',
                value: str
            };
        }
    }
}

module.exports = {
    Tokenizer
}
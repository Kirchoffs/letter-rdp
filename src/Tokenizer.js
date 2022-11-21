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

        const string = this._string.slice(this._cursor);
        let matched;
        
        matched = /^\d+/.exec(string);
        if (matched !== null) {
            this._cursor += matched[0].length;

            return {
                type: 'NUMBER',
                value: matched[0]
            };
        }

        matched = /"[^"]*"|'[^']*'/.exec(string);
        if (matched !== null) {
            this._cursor += matched[0].length;

            return {
                type: 'STRING',
                value: matched[0]
            };
        }
    }
}

module.exports = {
    Tokenizer
}
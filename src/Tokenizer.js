const Spec = [
    [/^\s+/, null],

    [/^\/\/.*/, null],
    [/^\/\*[\s\S]*?\*\//, null], 

    [/^\blet\b/, 'let'],
    [/^\bif\b/, 'if'],
    [/^\belse\b/, 'else'],
    [/^\btrue\b/, 'true'],
    [/^\bfalse\b/, 'false'],
    [/^\bnull\b/, 'null'],

    [/^\bwhile\b/, 'while'],
    [/^\bfor\b/, 'for'],
    [/^\bdo\b/, 'do'],

    [/^\bdef\b/, 'def'],
    [/^\breturn\b/, 'return'],

    [/^\d+/, 'NUMBER'],
    [/^"[^"]*"|^'[^']*'/, 'STRING'],
    [/^\w+/, 'IDENTIFIER'],

    [/^;/, ';'],

    [/^\{/, '{'],
    [/^\}/, '}'],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^\[/, '['],
    [/^\]/, ']'],
    [/^\./, '.'],

    [/^[!=]=/, 'EQUALITY_OPERATOR'],

    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\+\-\*\/]=/, 'COMPLEX_ASSIGN'],

    [/^[+-]/, 'ADDITIVE_OPERATOR'],
    [/^[*/]/, 'MULTIPLICATIVE_OPERATOR'],
    [/^[><]=?/, 'RELATIONAL_OPERATOR'],

    [/^&&/, 'LOGICAL_AND'],
    [/^\|\|/, 'LOGICAL_OR'],
    [/^!/, 'LOGICAL_NOT'],
    
    [/^,/, ','],
]

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

        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);
            if (tokenValue !== null)  {
                if (tokenType == null) {
                    return this.getNextToken();
                }

                return {
                    type: tokenType,
                    value: tokenValue
                }
            }
        }

        throw new SyntaxError(`Unexpected token: "${string[0]}"`);
    }

    _match(regexp, string) {
        const matched = regexp.exec(string);
        if (matched == null) {
            return null;
        }

        this._cursor += matched[0].length;
        return matched[0];
    }
}

module.exports = {
    Tokenizer
}
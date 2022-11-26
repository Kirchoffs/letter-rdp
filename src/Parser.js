const { Tokenizer } = require('./Tokenizer');

class Parser {
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        this._lookahead = this._tokenizer.getNextToken();

        return this.Program();
    }

    /**
     * Main entry point.
     * 
     * Program
     *   : StatementList
     *   ;
     */
    Program() {
        return {
            type: 'Program',
            body: this.StatementList()
        };
    }

    /**
     * StatementList
     *   : Statement
     *   | StatementList Statement
     *   ;
     * 
     * StatementList -> Statement Statement ... Statement
     */
    StatementList(stopLookahead = null) {
        const statementList = [this.Statement()];
        while (this._lookahead !== null && this._lookahead.type != stopLookahead) {
            statementList.push(this.Statement());
        }
        return statementList
    }

    /**
     * Statement
     *   : ExpressionStatement
     *   | BlockStatement
     *   | EmptyStatement
     *   ;
     */
    Statement() {
        switch (this._lookahead.type) {
            case ';': return this.EmptyStatement();
            case '{': return this.BlockStatement();
            default: return this.ExpressionStatement();
        }
    }


    EmptyStatement() {
        this._eat(';');
        return {
            type: 'EmptyStatement'
        }
    }

    /**
     * BlockStatement:
     *   : '{' OptStatementList '}'
     *   ;
     */
    BlockStatement() {
        this._eat('{');
        const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];
        this._eat('}');

        return {
            type: 'BlockStatement',
            body
        };
    }

    /**
     * ExpressionStatement
     *   : Expression ';'
     *   ;
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';');
        return {
            type: 'ExpressionStatement',
            expression
        }
    }

    /**
     * Expression
     *   : AdditiveExpression
     *   ;
     */
    Expression() {
        return this.AdditiveExpression();
    }

    /**
     * AdditiveExpression
     *   : MultiplicativeExpression
     *   | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
     *   ;
     * 
     *  AdditiveExpression -> 
     *  MultiplicativeExpression ADDITIVE_OPERATOR MultiplicativeExpression ADDITIVE_OPERATOR ... MultiplicativeExpression
     */
     AdditiveExpression() {
        let left = this.MultiplicativeExpression();

        while (this._lookahead.type === 'ADDITIVE_OPERATOR') {
            const operator = this._eat('ADDITIVE_OPERATOR').value;
            const right = this.MultiplicativeExpression();
            left = {
                type: 'BinaryExpression',
                operator,
                left,
                right
            }
        }

        return left;
    }

    /**
     * MultiplicativeExpression
     *   : PrimaryExpression
     *   | PrimaryExpression MULTIPLICATIVE_OPERATOR PrimaryExpression
     *   ;
     * 
     *  MultiplicativeExpression -> 
     *  PrimaryExpression MULTIPLICATIVE_OPERATOR PrimaryExpression MULTIPLICATIVE_OPERATOR ... PrimaryExpression
     */
     MultiplicativeExpression() {
        let left = this.PrimaryExpression();

        while (this._lookahead.type === 'MULTIPLICATIVE_OPERATOR') {
            const operator = this._eat('MULTIPLICATIVE_OPERATOR').value;
            const right = this.PrimaryExpression();
            left = {
                type: 'BinaryExpression',
                operator,
                left,
                right
            }
        }

        return left;
    }

    /**
     * PrimaryExpression
     *   : Literal
     *   | ParenthesisizedExpression
     */
    PrimaryExpression() {
        switch (this._lookahead.type) {
            case '(': 
                return this.ParenthesisizedExpression();
            default:
                return this.Literal();
        }
    }

    /**
     * ParenthesisizedExpression
     *   : '(' Expression ')'
     */
    ParenthesisizedExpression() {
        this._eat('(');
        const expression = this.Expression();
        this._eat(')');
        return expression;
    }

    /**
     * Literal
     *   : NumericalLiteral
     *   | StringLiteral
     *   ;
     */
    Literal() {
        switch(this._lookahead.type) {
            case 'NUMBER': return this.NumericalLiteral();
            case 'STRING': return this.StringLiteral();
        }

        throw new SyntaxError(`Literal: unexpected literal production`);
    }

    /**
     * NumericalLiteral
     *   : NUMBER
     *   ;
     */
    NumericalLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: "NumericalLiteral",
            value: Number(token.value)
        }
    }

    /**
     * StringLiteral
     *   : STRING
     */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: "StringLiteral",
            value: token.value.slice(1, -1)
        }
    }

    _eat(tokenType) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}"`
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expeced: "${tokenType}"`
            );
        }

        this._lookahead = this._tokenizer.getNextToken();
        return token;
    }
}

module.exports = {
    Parser
}

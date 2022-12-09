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
     *   : EmptyStatement
     *   | IfStatement
     *   | BlockStatement
     *   | VariableStatement
     *   | ExpressionStatement
     *   ;
     */
    Statement() {
        switch (this._lookahead.type) {
            case ';': return this.EmptyStatement();
            case 'if': return this.IfStatement();
            case '{': return this.BlockStatement();
            case 'let': return this.VariableStatement();
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
     * IfStatement
     *   : 'if' '(' Expression ')' Statement
     *   | 'if' '(' Expression ')' Statement 'else' Statement
     *   ;
     */
    IfStatement() {
        this._eat('if');

        this._eat('(');
        const test = this.Expression();
        this._eat(')');

        const consequent = this.Statement();
        const alternate = this._lookahead !== null && this._lookahead.type === 'else'
            ? this._eat('else') && this.Statement()
            : null;

        return {
            type: 'IfStatement',
            test,
            consequent,
            alternate
        };
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
     * VariableStatement
     *   : 'let' VariableDeclarationList ';'
     *   ;
     */
    VariableStatement() {
        this._eat('let');
        const declarations = this.VariableDeclarationList();
        this._eat(';');
        return {
            type: 'VariableStatement',
            declarations
        }
    }

    /**
     * VariableDeclarationList
     *   : VariableDeclaration
     *   | VariableDeclarationList ',' VariableDeclaration
     *   ;
     * 
     * VariableDeclarationList ->
     * VariableDeclaration ',' VariableDeclaration ',' ... VariableDeclaration
     */
    VariableDeclarationList() {
        const declarations = [];
        
        do {
            declarations.push(this.VariableDeclaration());
        } while (this._lookahead.type === ',' && this._eat(','));

        return declarations;
    }

    /**
     * VariableDeclaration
     *   : Identifier OptVariableInitializer
     */
    VariableDeclaration() {
        const id = this.Identifier();

        const init = 
            this._lookahead.type !== ';' && this._lookahead.type !== ','
                ? this.VariableInitializer()
                : null;
        
        return {
            type: 'VariableDeclaration',
            id,
            init
        }
    }

    /**
     * VariableInitializer
     *   : SIMPLE_ASSIGN AssignmentExpression
     */
    VariableInitializer() {
        this._eat('SIMPLE_ASSIGN');
        return this.AssignmentExpression();
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
     *   : AssignmentExpression
     *   ;
     */
    Expression() {
        return this.AssignmentExpression();
    }

    /**
     * AssignmentExpression
     *   : EqualityExpression
     *   | LeftHandSideExpression AssignmentOperator AssignmentExpression
     *   ;
     */
    AssignmentExpression() {
        const left = this.LogicalOrExpression();

        if (!this._isAssignmentOperator(this._lookahead.type)) {
            return left;
        }

        return {
            type: 'AssignmentExpression',
            operator: this.AssignmentOperator().value,
            left: this._checkValidAssignmentTarget(left),
            right: this.AssignmentExpression()
        }
    }

    /**
     * AssignmentOperator
     *   : SIMPLE_ASSIGN
     *   | COMPLEX_ASSIGN
     *   ;
     */
    AssignmentOperator() {
        if (this._lookahead.type === 'SIMPLE_ASSIGN') {
            return this._eat('SIMPLE_ASSIGN');
        }

        return this._eat('COMPLEX_ASSIGN');
    }

    _isAssignmentOperator(tokenType) {
        return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN';
    }

    /**
     * LogicalOrExpression:
     *   : LogicalAndExpression LOGICAL_OR LogicalOrExpression
     *   | LogicalAndExpression
     *   ;
     */
    LogicalOrExpression() {
        return this._LogicalExpression('LogicalAndExpression', 'LOGICAL_OR');
    }

    /**
     * LogicalAndExpression:
     *   : EqualityExpression LOGICAL_AND LogicalAndExpression
     *   | EqualityExpression
     *   ;
     */
    LogicalAndExpression() {
        return this._LogicalExpression('EqualityExpression', 'LOGICAL_AND');
    }

    /**
     * Generic logical expression for both and expression and or expression
     */
    _LogicalExpression(expressionBuilder, operatorType) {
        let left = this[expressionBuilder]();

        while (this._lookahead.type === operatorType) {
            const operator = this._eat(operatorType).value;
            const right = this[expressionBuilder]();
            left = {
                type: 'LogicalExpression',
                operator,
                left,
                right
            }
        }

        return left;
    }

    /**
     * EqualityExpression
     *   : RelationalExpression EQUALITY_OPERATOR EqualityExpression
     *   | RelationalExpression
     *   ;
     * 
     * EQUALITY_OPERATOR: ==, !=
     */
    EqualityExpression() {
        return this._BinaryExpression(
            'RelationalExpression',
            'EQUALITY_OPERATOR'
        )
    }

    /**
     * RelationalExpression:
     *   : AdditiveExpression
     *   | AdditiveExpression RELATIONAL_OPERATOR RelationalExpression
     *   ;
     * 
     * RELATIONAL_OPERATOR: >, >=, <, <=
     */
    RelationalExpression() {
        return this._BinaryExpression('AdditiveExpression', 'RELATIONAL_OPERATOR');
    }

    /**
     * LeftHandSideExpression
     *   : Identifier
     *   ;
     */
    LeftHandSideExpression() {
        return this.Identifier();
    }

    /**
     * Identifier
     *   : IDENTIFIER
     *   ;
     */
    Identifier() {
        const name = this._eat('IDENTIFIER').value;
        return {
            type: 'Identifier',
            name
        };
    }

    _checkValidAssignmentTarget(node) {
        if (node.type === 'Identifier') {
            return node;
        }

        throw new SyntaxError('Invalid left-hand side in assignment expression');
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
        return this._BinaryExpression('MultiplicativeExpression', 'ADDITIVE_OPERATOR');
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
        return this._BinaryExpression('PrimaryExpression', 'MULTIPLICATIVE_OPERATOR');
    }

    /**
     * Generic binary expression for both additive expression and multiplicative expression
     */
    _BinaryExpression(expressionBuilder, operatorType) {
        let left = this[expressionBuilder]();

        while (this._lookahead.type === operatorType) {
            const operator = this._eat(operatorType).value;
            const right = this[expressionBuilder]();
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
     *   | LeftHandSideExpression
     *   ;
     */
    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal();
        }

        switch (this._lookahead.type) {
            case '(': 
                return this.ParenthesisizedExpression();
            default:
                return this.LeftHandSideExpression();
        }
    }

    _isLiteral(tokenType) {
        return (
            tokenType === 'NUMBER' || 
            tokenType === 'STRING' ||
            tokenType === 'true'  ||
            tokenType === 'false' ||
            tokenType === 'null'
        );
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
     *   | BooleanLiteral
     *   | NullLiteral
     *   ;
     */
    Literal() {
        switch(this._lookahead.type) {
            case 'NUMBER': return this.NumericalLiteral();
            case 'STRING': return this.StringLiteral();
            case 'true': return this.BooleanLiteral(true);
            case 'false': return this.BooleanLiteral(false);
            case 'null': return this.NullLiteral();
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

    /**
     * BooleanLiteral
     *   : 'true'
     *   | 'false'
     *   ;
     */
    BooleanLiteral(value) {
        this._eat(value ? 'true' : 'false');
        return {
            type: 'BooleanLiteral',
            value
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

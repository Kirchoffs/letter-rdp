module.exports = test => {
    test(`x > 0 && y < 0;`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'LogicalExpression',
                    operator: '&&',
                    left: {
                        type: 'BinaryExpression',
                        operator: '>',
                        left: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        right: {
                            type: 'NumericalLiteral',
                            value: 0
                        }
                    },
                    right: {
                        type: 'BinaryExpression',
                        operator: '<',
                        left: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        right: {
                            type: 'NumericalLiteral',
                            value: 0
                        }
                    }
                }
            }
        ]
    })
}
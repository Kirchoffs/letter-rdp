module.exports = test => {
    test(
        `
            if (x) {
                x = 1;
            } else {
                x = 2;
            }
        `,   
        {
            type: 'Program',
            body: [
                {
                    type: 'IfStatement',
                    test: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    consequent: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    right: {
                                        type: 'NumericalLiteral',
                                        value: 1
                                    }
                                }
                            }
                        ]
                    },
                    alternate: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    right: {
                                        type: 'NumericalLiteral',
                                        value: 2
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    );

    test(
        `
            if (x) {
                x = 1;
            }
        `,   
        {
            type: 'Program',
            body: [
                {
                    type: 'IfStatement',
                    test: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    consequent: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    right: {
                                        type: 'NumericalLiteral',
                                        value: 1
                                    }
                                }
                            }
                        ]
                    },
                    alternate: null
                }
            ]
        }
    );

    test(
        `
            if (x)
                x = 1;
        `,   
        {
            type: 'Program',
            body: [
                {
                    type: 'IfStatement',
                    test: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    consequent: {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            operator: '=',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'NumericalLiteral',
                                value: 1
                            }
                        }
                    },
                    alternate: null
                }
            ]
        }
    );

    test(
        `
            if (x)
                if (y) {

                } else {

                }
        `,   
        {
            type: 'Program',
            body: [
                {
                    type: 'IfStatement',
                    test: {
                        type: 'Identifier',
                        name: 'x'
                    },
                    consequent: {
                        type: 'IfStatement',
                        test: {
                            type: 'Identifier',
                            name: 'y'
                        },
                        consequent: {
                            type: 'BlockStatement',
                            body: []
                        },
                        alternate: {
                            type: 'BlockStatement',
                            body: []
                        }
                    },
                    alternate: null
                }
            ]
        }
    );
}
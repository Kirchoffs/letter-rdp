module.exports = test => {
    test(`let x = 42;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: {
                            type: 'NumericalLiteral',
                            value: 42
                        }
                    }
                ]
            }
        ]
    });

    test(`let x;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null
                    }
                ]
            }
        ]
    });

    test(`let x, y;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null
                    },
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        init: null
                    }
                ]
            }
        ]
    });

    test(`let x, y = 42;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null
                    },
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        init: {
                            type: 'NumericalLiteral',
                            value: 42
                        }
                    }
                ]
            }
        ]
    });

    test(
        `
            let a = 42;
            let b = 365;
            let d = c = "foo";
        `, 
    
        {
            type: 'Program',
            body: [
                {
                    type: 'VariableStatement',
                    declarations: [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'a',
                            },
                            init: {
                                type: 'NumericalLiteral',
                                value: 42
                            }
                        }
                    ]
                },
                {
                    type: 'VariableStatement',
                    declarations: [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'b',
                            },
                            init: {
                                type: 'NumericalLiteral',
                                value: 365
                            }
                        }
                    ]
                },
                {
                    type: 'VariableStatement',
                    declarations: [
                        {
                            type: 'VariableDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'd',
                            },
                            init: {
                                type: 'AssignmentExpression',
                                operator: '=',
                                left: {
                                    type: 'Identifier',
                                    name: 'c'
                                },
                                right: {
                                    type: 'StringLiteral',
                                    value: "foo"
                                }
                            }
                        }
                    ]
                },
            ]
        });
}
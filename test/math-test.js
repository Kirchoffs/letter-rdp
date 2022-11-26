module.exports = test => {
    test(`1 + 1;`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'NumericalLiteral',
                        value: 1
                    },
                    right: {
                        type: 'NumericalLiteral',
                        value: 1
                    }
                }
            }
        ]
    });

    test(`1 + 2 + 3;`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                            type: 'NumericalLiteral',
                            value: 1
                        },
                        right: {
                            type: 'NumericalLiteral',
                            value: 2
                        }
                    },
                    right: {
                        type: 'NumericalLiteral',
                        value: 3
                    }
                }
            }
        ]
    });

    test(`1 + 2 * 3;`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'NumericalLiteral',
                        value: 1
                    },
                    right: {
                        type: 'BinaryExpression',
                        operator: '*',
                        left: {
                            type: 'NumericalLiteral',
                            value: 2
                        },
                        right: {
                            type: 'NumericalLiteral',
                            value: 3
                        }
                    },
                }
            }
        ]
    });

    test(`1 * 2 * 3;`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'BinaryExpression',
                        operator: '*',
                        left: {
                            type: 'NumericalLiteral',
                            value: 1
                        },
                        right: {
                            type: 'NumericalLiteral',
                            value: 2
                        }
                    },
                    right: {
                        type: 'NumericalLiteral',
                        value: 3
                    }
                }
            }
        ]
    });

    test(`1 + (2 + 3);`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'NumericalLiteral',
                        value: 1
                    },
                    right: {
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                            type: 'NumericalLiteral',
                            value: 2
                        },
                        right: {
                            type: 'NumericalLiteral',
                            value: 3
                        }
                    }
                }
            }
        ]
    });

    test(`1 * (2 + 3);`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'NumericalLiteral',
                        value: 1
                    },
                    right: {
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                            type: 'NumericalLiteral',
                            value: 2
                        },
                        right: {
                            type: 'NumericalLiteral',
                            value: 3
                        }
                    }
                }
            }
        ]
    });
}
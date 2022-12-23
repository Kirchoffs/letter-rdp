module.exports = test => {
    test(
        `
            class Point {
                def constructor(x, y) {
                    this.x = x;
                    this.y = y;
                }

                def calc() {
                    return this.x + this.y;
                }
            }
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'Point'
                    },
                    superClass: null,
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'FunctionDeclaration',
                                name: {
                                    type: 'Identifier',
                                    name: 'constructor'
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'y'
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                }
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'y'
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'y'
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                type: 'FunctionDeclaration',
                                name: {
                                    type: 'Identifier',
                                    name: 'calc'
                                },
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'BinaryExpression',
                                                operator: '+',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    }
                                                },
                                                right: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'y'
                                                    }
                                                },
                                            }
                                        }
                                    ]
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
            class Point3D extends Point {
                def constructor(x, y, z) {
                    super(x, y);
                    this.z = z;
                }

                def calc() {
                    return super() + this.z;
                }
            }
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'Point3D'
                    },
                    superClass: {
                        type: 'Identifier',
                        name: 'Point'
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'FunctionDeclaration',
                                name: {
                                    type: 'Identifier',
                                    name: 'constructor'
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'y'
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'z'
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Super',
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'y'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                operator: '=',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'z'
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'z'
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                type: 'FunctionDeclaration',
                                name: {
                                    type: 'Identifier',
                                    name: 'calc'
                                },
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'BinaryExpression',
                                                operator: '+',
                                                left: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Super'
                                                    },
                                                    arguments: [],
                                                },
                                                right: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'z'
                                                    }
                                                },
                                            }
                                        }
                                    ]
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
            new Point3D(1, 2, 3);
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'Point3D'
                        },
                        arguments: [
                            {
                                type: 'NumericalLiteral',
                                value: 1
                            },
                            {
                                type: 'NumericalLiteral',
                                value: 2
                            },
                            {
                                type: 'NumericalLiteral',
                                value: 3
                            }
                        ]
                    }
                }
            ]
        }
    );
}
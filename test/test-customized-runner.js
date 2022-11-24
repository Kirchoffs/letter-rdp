const { Parser } = require('../src/Parser');
const assert = require('assert');

const tests = [
    require('./literal-test'),
    require('./statement-list-test'),
    require('./block-test'),
    require('./empty-test')
]

const parser = new Parser();

function exec() {
    const program = `
        /**
         * Documentary comment
         */ 

        // Single-line comment for 42
        42;

        // Single-line comment for "Hello"
        "Hello";
    `;

    const ast = parser.parse(program);
    console.log(JSON.stringify(ast, null, 2));
}

exec();

function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
}

tests.forEach(testRun => {
    testRun(test)
});

console.log('All assertions passed');
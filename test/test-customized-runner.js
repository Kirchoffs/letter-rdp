const { Parser } = require('../src/Parser');
const assert = require('assert');

const tests = [
    require('./literal-test'),
    require('./statement-list-test'),
    require('./block-test'),
    require('./empty-test'),
    require('./math-test')
]

const parser = new Parser();

(function() {
    const program = `
        // Single-line comment for 42
        42;

        // Single-line comment for "Hello"
        "Hello";

        /**
         * Documentary comment
         */
        1 - 2 / 3;

        /**
         * Documentary comment
         */
        1 - (2 + 3);
    `;

    const ast = parser.parse(program);
    console.log(JSON.stringify(ast, null, 2));
})();

function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
}

tests.forEach(testRun => {
    testRun(test)
});

console.log('All assertions passed');
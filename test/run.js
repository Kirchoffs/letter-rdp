const { assert } = require('chai');
const { Parser } = require('../src/Parser');

const parser = new Parser();
let program;
let ast;

describe('Basic tests', () => {
    it('Test string with double quotes', () => {
        program = `"hello"`;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test string with single quote', () => {
        program = `'hello'`;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test string with number content', () => {
        program = `"42"`;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test string with spaces', () => {
        program = `   "42"   `;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test string with spaces inside content', () => {
        program = `   " 42 "   `;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test number', () => {
        program = `42`;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
        assert.equal(ast.body.value, 42);
    });

    it('Test number with single preceding space', () => {
        program = ` 42`;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test number with several preceding spaces', () => {
        program = `   42`;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test number with preceding and succeeding spaces', () => {
        program = `   42   `;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test number with single-line comment', () => {
        program = `
            // number 42
            42
        `;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });

    it('Test number with documentation comment', () => {
        program = `
            /**
             * number 42
             */ 
            42
        `;
        ast = parser.parse(program);
        console.log(JSON.stringify(ast, null, 2));
    });
});




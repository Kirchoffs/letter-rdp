const { Parser } = require('../src/Parser');
const parser = new Parser();

let program;
let ast;

program = `42`;
ast = parser.parse(program);
console.log(JSON.stringify(ast, null, 2));

program = `"hello"`;
ast = parser.parse(program);
console.log(JSON.stringify(ast, null, 2));

program = `"42"`;
ast = parser.parse(program);
console.log(JSON.stringify(ast, null, 2));

program = `'hello'`;
ast = parser.parse(program);
console.log(JSON.stringify(ast, null, 2));
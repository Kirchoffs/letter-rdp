## Notes
### Introduction
Implement RDP (Recursive Descent Parser) for a simple JS-like language called Letter.
```
class Point {
    def constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    def calc() {
        return this.x + this.y;
    }
}

class Point3D extends Point {
    def constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }

    def calc() {
        return super() + this.z;
    }
}

let p = new Point3D(1, 2, 3);
p.calc();
```

### Install the test tools
```
>> npm install --save-dev mocha chai
```

### Set the script for mocha test:
```
"scripts": {
    "test": "mocha"
}
```

### Run the test script
```
>> npm test
>> npm run test
>> npm run mocha-test
```

### Run the program
NodeJS is required.
```
>> chmod a+x ./bin/letter-rdp
>> ./bin/letter-rdp -e "2 + 2;"
>> ./bin/letter-rdp -e "let x = 1;"
>> ./bin/letter-rdp -e "let x = 1; console.log(x);"
>> ./bin/letter-rdp -f test/example.lt
```

### Single Step Debugging for NodeJS
```
>> node inspect test/test-customized-runner.js
(debug) >> sb('src/Parser.js', 42) 
(debug) >> help
(debug) >> restart
```

#### Stepping
`cont`, `c`: Continue execution  
`next`, `n`: Step next  
`step`, `s`: Step in  
`out`, `o`: Step out  
`pause`: Pause running code (like pause button in Developer Tools)   

#### Breakpoints
`setBreakpoint()`, `sb()`: Set breakpoint on current line  
`setBreakpoint(line)`, `sb(line)`: Set breakpoint on specific line  
`setBreakpoint('fn()')`, `sb(...)`: Set breakpoint on a first statement in function's body  
`setBreakpoint('script.js', 1)`, `sb(...)`: Set breakpoint on first line of script.js  
`setBreakpoint('script.js', 1, 'num < 4')`, `sb(...)`: Set conditional breakpoint on first line of script.js that only breaks when num < 4 evaluates to true  
`clearBreakpoint('script.js', 1)`, `cb(...)`: Clear breakpoint in script.js on line 1  

### Structure
The factor with higher priority should be parsed at deeper level.

```
Program -> StatementList  

StatementList -> Statement Statement ... Statement  

Statement ->  
EmptyStatement |  
IfStatement | IterationStatement | BlockStatement  
VariableStatement | ReturnStatement  
ClassDeclararion | FunctionDeclaration  
ExpressionStatement  

IfStatement ->  
'if' '(' Expression ')' Statement | 
'if' '(' Expression ')' Statement 'else' Statement

VariableStatement -> VariableStatementInit ;  
VariableStatementInit -> 'let' VariableDeclarationList  
VariableDeclarationList -> VariableDeclaration, VariableDeclaration, ... VariableDeclaration  
VariableDeclaration -> Identifier OptVariableInitializer
VariableInitializer -> SIMPLE_ASSIGN AssignmentExpression

AssignmentExpression ->
LogicalOrExpression |  
LeftHandSideExpression AssignmentOperator AssignmentExpression

LogicalOrExpression -> LogicalAndExpression || LogicalAndExpression || ... LogicalAndExpression

LogicalAndExpression -> EqualityExpression && EqualityExpression && ... EqualityExpression

EqualityExpression -> RelationalExpression EQUALITY_OPERATOR RelationalExpression ...  
EQUALITY_OPERATOR: == !=

RelationalExpression -> AdditiveExpression RELATIONAL_OPERATOR AdditiveExpression ...  
RELATIONAL_OPERATOR: > >= < <=

AdditiveExpression -> MultiplicativeExpression ADDITIVE_OPERATOR MultiplicativeExpression ...

MultiplicativeExpression -> UnaryExpression MULTIPLICATIVE_OPERATOR UnaryExpression ...

UnaryExpression ->  
LeftHandSideExpression |  
ADDITIVE_OPERATOR UnaryExpression |  
LOGICAL_NOT UnaryExpression  

LeftHandSideExpression -> CallMemberExpression

CallMemberExpression -> MemberExpression | CallExpression
```

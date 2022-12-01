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

### Single Step Debugging for NodeJS
```
>> node inspect dst/test-customized-runner.js
(debug) >> sb('src/Parser.js', 42)
```

#### Stepping
`cont`, `c`: Continue execution  
`next`, `n`: Step next  
`step`, `s`: Step in  
`out`, `o`: Step out  
`pause`: Pause running code (like pause button in Developer Tools).   

#### Breakpoints
`setBreakpoint()`, `sb()`: Set breakpoint on current line  
`setBreakpoint(line)`, `sb(line)`: Set breakpoint on specific line  
`setBreakpoint('fn()')`, `sb(...)`: Set breakpoint on a first statement in function's body  
`setBreakpoint('script.js', 1)`, `sb(...)`: Set breakpoint on first line of script.js  
`setBreakpoint('script.js', 1, 'num < 4')`, `sb(...)`: Set conditional breakpoint on first line of script.js that only breaks when num < 4 evaluates to true  
`clearBreakpoint('script.js', 1)`, `cb(...)`: Clear breakpoint in script.js on line 1  
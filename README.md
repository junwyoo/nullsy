# nullsy.js
## Overview
This package includes every tool you need for testing against null or undefined variable.

## Usage
### Quick Examples
Let's say you have just recieved and parsed server response. You expect the response's structure to be something like this:
```javascript
const response = {
    go: {
        deep: {
            into: {
                path: 'to success'
            }
        },
        into: {
            not: 'here'
        }
    },
    path: 'not even here'
};
```
and want to know the value of `response.go.deep.into.path`.

Of course you can do
```javascript
if (response && response.go && response.go.deep && response.go.deep.into && response.go.deep.into.path) {
    // ...do amazing stuff
}
```
but I found out that this approach is rather long.

Using `isValidChain` in this package, you can simply do
```javascript
if (isValidChain(response, 'go.deep.into.path')) {
    // ...do even more amazier stuff
}
```
There are also basic `null` and/or `undefined` checkers available just in case you are too [_awesome_](https://www.youtube.com/watch?v=DXKHCgNFk1I&ab_channel=LIVELOVEASAPVEVO) to write `&&`.
```javascript
isNull(null); // true
isNull(undefined); // false

isUndefined(null); // false
isUndefined(undefined); // true

isNullsy(null); // true
isNullsy(undefined); // true

isValid(someValue) === !isNullsy(someValue); // true

// ...etc
```

## PoC
- Junwhan Yoo
    - [github link](https://github.com/junwyoo/nullsy)
    - [email](junwyoo@hotmail.com)

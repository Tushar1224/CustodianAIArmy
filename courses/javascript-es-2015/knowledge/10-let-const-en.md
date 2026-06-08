# let & const

## The Problem with `var`

```javascript
console.log(x); // undefined (hoisted but not error)
var x = 5;

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3 (leaked global i)
```

`var` is function-scoped, not block-scoped, and is hoisted with `undefined`.

## `let` — Block-Scoped Variables

```javascript
console.log(y); // ReferenceError (temporal dead zone)
let y = 10;

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2 (each iteration gets its own i)
```

## `const` — Immutable Bindings

```javascript
const PI = 3.14159;
PI = 3; // TypeError: Assignment to constant variable

const person = { name: 'Alice' };
person.name = 'Bob'; // OK — object itself is not frozen
person = {};         // TypeError: can't reassign
```

## When to Use Which

- **const** by default — unless you need to reassign
- **let** when you must reassign
- **var** — never in modern code

## Best Practice

```javascript
// Good
const MAX_SIZE = 100;
let counter = 0;

// Avoid
var oldWay = 'deprecated';
```

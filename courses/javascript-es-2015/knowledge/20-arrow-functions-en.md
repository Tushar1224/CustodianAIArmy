# Arrow Functions

## Syntax Comparison

```javascript
// Traditional function
function add(a, b) { return a + b; }

// Arrow function
const add = (a, b) => a + b;

// Single parameter — parens optional
const square = x => x * x;

// No parameters — empty parens required
const greet = () => 'Hello!';
```

## Implicit Return

When the body is a single expression, the `return` keyword is implicit:

```javascript
const double = x => x * 2;           // implicit return
const double = x => { return x * 2; } // explicit return
```

To return an object literal, wrap it in parens:

```javascript
const getPerson = () => ({ name: 'Alice', age: 30 });
```

## Lexical `this`

Arrow functions don't have their own `this` — they inherit from the enclosing scope:

```javascript
function Timer() {
  this.seconds = 0;

  // Traditional function — creates its own `this`
  setInterval(function() {
    this.seconds++; // this is the global object (or undefined in strict)
  }, 1000);

  // Arrow function — inherits `this` from Timer
  setInterval(() => {
    this.seconds++; // this is the Timer instance
  }, 1000);
}
```

## When NOT to Use Arrow Functions

- Object methods (need dynamic `this`)
- Constructor functions
- Event handlers that need `event.currentTarget`

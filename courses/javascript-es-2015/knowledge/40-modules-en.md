# Modules (import / export)

## The Module Pattern

ES2015 introduced native JavaScript modules. Each module is a file with its own scope.

## Named Exports

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
```

## Named Imports

```javascript
// app.js
import { PI, add, multiply } from './math.js';
console.log(add(2, 3)); // 5
```

## Default Export

Each module can have one default export:

```javascript
// greet.js
export default function greet(name) {
  return `Hello, ${name}!`;
}

// app.js
import greet from './greet.js';       // name can be anything
import myGreet from './greet.js';      // also works
```

## Mixed Exports

```javascript
// utils.js
export const VERSION = '1.0.0';
export default function helper() { /* ... */ }

// app.js
import helper, { VERSION } from './utils.js';
```

## Re-exporting

```javascript
// barrel.js
export { add, multiply } from './math.js';
export { default as greet } from './greet.js';
```

## Dynamic Imports

```javascript
const module = await import('./dynamic.js');
```

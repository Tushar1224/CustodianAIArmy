# Destructuring

## Array Destructuring

```javascript
const numbers = [1, 2, 3, 4, 5];

const [first, second] = numbers;
console.log(first);  // 1
console.log(second); // 2

// Skip elements with commas
const [a, , b] = numbers;
console.log(a); // 1
console.log(b); // 3

// Rest pattern
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]
```

## Object Destructuring

```javascript
const person = { name: 'Alice', age: 30, city: 'NYC' };

const { name, age } = person;
console.log(name); // Alice
console.log(age);  // 30

// Rename variables
const { name: fullName, city: location } = person;
console.log(fullName); // Alice

// Default values
const { country = 'Unknown' } = person;
console.log(country); // Unknown
```

## Nested Destructuring

```javascript
const user = {
  id: 42,
  profile: {
    displayName: 'alice42',
    avatar: 'avatar.png'
  }
};

const { profile: { displayName } } = user;
console.log(displayName); // alice42
```

## Function Parameter Destructuring

```javascript
function printPerson({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

printPerson({ name: 'Bob', age: 25 }); // Bob is 25 years old
```

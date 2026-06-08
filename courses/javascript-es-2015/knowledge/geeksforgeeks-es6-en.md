# geeksforgeeks-es6

Source: https://www.geeksforgeeks.org/introduction-to-es6/

Courses
Tutorials
Practice
Jobs
JS Tutorial
Web Tutorial
A to Z Guide
Projects
Math
Number
Boolean
Exercise
Share Your Experiences
JavaScript Basics
Introduction
Variables
Operators
Control Statements
Array & String
Arrays
Array Methods
String
String Methods
Function & Object
Functions
Function Expression
Function Overloading
Objects
Constructors
Classes & Objects
Access Modifiers
Constructor
Asynchronous JavaScript
Asynchronous
Callbacks
Promises
Event Loop
Async Await Fuction
Exception Handling
Error and Exceptional Handling
Errors Throw & Try to Catch
Custom Errors
TypeError Invalid Array.prototype.sort argument
DOM Elements
Custom Events
Addeventlistener
Advanced Topics
Closure
Hoisting
Scope
Higher Order Functions
Debugging
Courses
JavaScript Programming Course
DSA Java Coursescript
DSA and System Design Course
Summer SkillUp
Explore
Introduction to ES6
Last Updated :
5 Aug, 2025
ES6, or ECMAScript 2015, is the 6th version of the ECMAScript programming language. ECMAScript is the standardization of JavaScript, which was released in 2015 and subsequently renamed as ECMAScript 2015.
New Features in ES6
1. The let Keyword
let variables
are mutable, i.e., their values can be changed. It works similarly to the var keyword with some key differences, like scoping, which makes it a better option when compared to var.
JavaScript
// Block-scoped variable
console
console
Output
It prevents variable leakage outside of the intended scope.
2. The const Keyword
const
is used to declare variables with a constant value, ensuring the value cannot be reassigned.
JavaScript
const
3.14159
// Error: Assignment to constant variable
Ideal for declaring configuration constants or fixed values.
3. Arrow Functions
Arrow functions
provide a concise syntax for writing function expressions and automatically bind this to the surrounding context.
JavaScript
// Traditional function
function
return
// Arrow function
const
Implicit return for single-expression functions.
Do not have their own 'this' context.
4. Destructuring Assignment
Destructing
JavaScript
basically means the breaking down of a complex structure(
Objects
arrays
) into simpler parts
Object Destructuring
JavaScript
const
name
"Raj"
const
name
console
name
Output
Raj 25
Array Destructuring
JavaScript
const
"red"
"blue"
"green"
const
first
second
console
first
second
Output
red blue
5. The Spread (...) Operator
spread operator
expands an array or object into individual elements or properties.
JavaScript
const
const
[...
console
Output
[ 1, 2, 3, 4, 5 ]
6. The For/Of Loop
for/of loop
allows you to iterate over iterable objects like arrays, strings, Maps, and Sets but in a short syntax as compared to other loops.
Iterating Over an Array
JavaScript
const
"apple"
"banana"
"cherry"
const
fruit
console
fruit
Output
apple
banana
cherry
Iterating Over a String
JavaScript
const
"hello"
const
char
console
char
Output
7. Maps and Sets
Map:
Maps
store key-value pairs where keys can be any data type.
JavaScript
const
console
Output
Set:
Sets
store unique values of any type.
JavaScript
const
console
Output
Set(3) { 1, 2, 3 }
8. Classes
ES6 introduced
classes in JavaScript
. Classes in javascript can be used to create new Objects with the help of a constructor, each class can only have one constructor inside it.
JavaScript
class
Animal
speak
console
"The animal makes a sound"
const
Animal
speak
Output
The animal makes a sound
class Animal {}:
Defines a simple class named Animal.
speak():
A method inside the class that logs a message to the console.
new Animal():
Creates an object dog from the Animal class.
dog.speak():
Calls the speak method on the dog object.
9. Promises
Promises
simplify handling asynchronous operations by providing .then and .catch methods.
JavaScript
const
fetch
return
Promise
resolve
reject
setTimeout
resolve
"Data fetched"
2000
fetch
then
data
console
data
10. Default Parameters
Allows functions to have default values for parameters.
JavaScript
function
greet
name
"Guest"
return
`Hello,
name
console
greet
());
Output
Hello, Guest!
Additional Enhancements
includes():
Check if a string contains a substring.
startsWith():
Check if a string starts with a substring.
endsWith():
Check if a string ends with a substring.
find():
Locate the first element matching a condition.
findIndex()
: Locate the index of the first element matching a condition.
from(): Convert an iterable or array-like object into an array.
Template Literals:
Simplify string concatenation and allow embedded expressions.
Modules:
Introduce import and export for better modularity.
Rest Parameters (...args):
Allow functions to accept an indefinite number of arguments as an array.
Generators and Iterators:
Enable custom iteration logic with function* and yield.
Binary and Octal Literals: Simplify working with binary (0b) and octal (0o) numbers.
Enhanced Object Literals:
Provide shorthand for methods, properties, and dynamic keys.
WeakMap and
WeakSet:
Store weakly-referenced objects for specialized use cases.
Proxy
Reflect
: Add interception capabilities and reflection utilities for objects.
Symbol: Introduces unique, immutable primitive data types useful for property keys.
Block-scoped Functions:
Functions declared inside blocks respect block scope.
Browser Support for ES6 (2015)
ES6 is fully supported in all modern browsers since June 2017:
Chrome
Edge
Firefox
Safari
Opera
May 2016
Apr 2017
Jun 2017
Sep 2016
Jun 2016
Note:
ES6 is not supported in Internet Explorer.
Comment
Article Tags:
Article Tags:
JavaScript
Web Technologies

# w3schools-js-callbacks

Source: https://www.w3schools.com/js/js_callback.asp

Menu
See More
Sign In
Get Certified
Upgrade
Academy
Spaces
Practice
Get Certified
Upgrade
Academy
Spaces
Practice
HTML
JAVASCRIPT
PYTHON
JAVA
HOW TO
W3.CSS
BOOTSTRAP
REACT
MYSQL
JQUERY
EXCEL
DJANGO
NUMPY
PANDAS
NODEJS
TYPESCRIPT
ANGULAR
ANGULARJS
POSTGRESQL
MONGODB
KOTLIN
SWIFT
SASS
GEN AI
SCIPY
CYBERSECURITY
DATA SCIENCE
INTRO TO PROGRAMMING
INTRO TO HTML & CSS
BASH
RUST
TOOLS
JS Tutorial
JS Home
JS Introduction
JS Where To
JS Output
JS Syntax
JS Syntax
JS Statements
JS Comments
JS Variables
JS Let
JS Const
JS Types
JS Operators
JS Operators
JS Arithmetic
JS Assignment
JS Comparisons
JS Conditional
JS If Conditions
JS If
JS If Else
JS Ternary
JS Switch
JS Booleans
JS Logical
JS Loops
JS Loops
JS Loop for
JS Loop while
JS Break
JS Continue
JS Control Flow
JS Strings
JS Strings
JS String Templates
JS String Methods
JS String Search
JS String Reference
JS Numbers
JS Numbers
JS Number Methods
JS Number Properties
JS Number Reference
JS Bitwise
JS BigInt
JS Functions
Function Path
Function Intro
Function Invocation
Function Parameters
Function Returns
Function Arguments
Function Expressions
Function Arrow
Function Quiz
JS Objects
Object Path
Object Intro
Object Properties
Object Methods
Object this
Object Display
Object Constructors
JS Scope
JS Scope
JS Code Blocks
JS Hoisting
JS Strict Mode
JS Dates
JS Dates
JS Date Formats
JS Date Get
JS Date Set
JS Date Methods
JS Temporal
Temporal Study Path
Temporal Intro
Temporal vs Date
Temporal Duration
Temporal Instant
Temporal PlainDateTime
Temporal PlainDate
Temporal PlainYearMonth
Temporal PlainMonthDay
Temporal PlainTime
Temporal ZonedDateTime
Temporal Now
Temporal Arithmetic
Temporal Since/Until
Temporal Compare
Temporal Conversion
Temporal Formats
Temporal Mistakes
Temporal Migrate
Temporal Standards
Temporal Reference
JS Arrays
JS Arrays
JS Array Methods
JS Array Search
JS Array Sort
JS Array Iterations
JS Array Reference
JS Array Const
JS Sets
JS Sets
JS Set Methods
JS Set Logic
JS Set WeakSet
JS Set Reference
JS Maps
JS Maps
JS Map Methods
JS Map WeakMap
JS Map Reference
JS Iterations
JS Loops
JS Iterables
JS Iterators
JS Generators
JS Math
JS Math
JS Math Reference
JS Math Random
JS RegExp
JS RegExp
JS RegExp Flags
JS RegExp Classes
JS RegExp Metachars
JS RegExp Assertions
JS RegExp Groups
JS RegExp Quantifiers
JS RegExp Patterns
JS RegExp Objects
JS RegExp Methods
JS Data Types
JS Data Types
JS Primitive Data
JS Object Types
JS Symbols
JS typeof
JS undefined
JS NaN
JS toString()
JS toLocaleString()
JS Type Coercion
JS Type Conversion
JS Destructuring
JS Errors
JS Errors Intro
JS Errors Silent
JS Error Statements
JS Error Object
JS Debugging
Debugging Intro
Debugging Console
Debugging Breakpoints
Debugging Errors
Debugging Async
Debugging Reference
JS Style Guide
JS Style Guide
JS Best Practices
JS Mistakes
JS Performance
JS Reference
JS Alphabetic
JS Statements
JS Keywords
JS Operators
JS Precedence
JS Projects
JS Counter
JS Event Listener
JS To-Do List
JS Modal Popup
JS Form Validation
JS Versions
JS 2026
JS 2025
JS 2024
JS 2023
JS 2022
JS 2021
JS 2020
JS 2019
JS 2018
JS 2017
JS 2016
JS 2015 (ES6)
JS 2009 (ES5)
JS 1999 (ES3)
JS Versions
JS History
JS HTML DOM
HTML DOM
HTML DOM API
Selecting Elements
Changing HTML
Changing CSS
Form Validation
DOM Animations
Document Reference
Element Reference
JS HTML Events
Intro to Events
Mouse Events
Keyboard Events
Load Events
Timing Events
Manage Events
Event Examples
Event Listener
JS HTML First
HTML First
HTML Progressive
HTML First Features
HTML First CSS
JS Advanced
JS Functions
Functions Advanced
Function Definitions
Function Callbacks
Function this
Function Call
Function Apply
Function Bind
Function IIFE
Function Closures
Function Reference
Function Quiz
JS Objects
Object Study Path
Object Definitions
Object this
Object Iterations
Object Get / Set
Object Management
Object Protection
Object Prototypes
Object Reference
JS Classes
JS Classes
JS Class Inheritance
JS Class Static
JS Asynchronous
Async Path
Async Intro
Async Timeouts
Async Callbacks
Async Promises
Async Await
Async Fetch
Async Debug
Async Reference
JS Modules
Modules Intro
Modules Export
Modules Import
Modules Namespace
Modules Dynamic
JS Meta & Proxy
Meta Programming
Meta Reflect
Meta Proxy
Meta Reference
JS Typed Arrays
Typed Arrays
Typed Methods
Typed Reference
Array Buffers
DataViews
JS Atomics
JS DOM Navigation
DOM Navigation
DOM Nodes
DOM Collections
DOM Node Lists
JS Windows
JS Window
JS Screen
JS Location
JS History
JS Navigator
JS Popup Alert
JS Timing
JS Cookies
JS Web API
APIs Intro
Api Fetch
API Geolocation
API Web History
API Web Pointer
API Web Storage
API Validation
API Web Worker
JS AJAX
AJAX Intro
AJAX XMLHttp
AJAX Request
AJAX Response
AJAX XML File
AJAX PHP
AJAX ASP
AJAX Database
AJAX Applications
AJAX Examples
JS JSON
JSON Intro
JSON Syntax
JSON vs XML
JSON Data Types
JSON Parse
JSON Stringify
JSON Objects
JSON Arrays
JSON Server
JSON PHP
JSON HTML
JSON JSONP
JS jQuery
jQuery Selectors
jQuery HTML
jQuery CSS
jQuery DOM
JS Graphics
JS Graphics
JS Canvas
JS Plotly
JS Chart.js
JS Google Chart
JS D3.js
JS Examples
JS Examples
JS HTML DOM
JS HTML Input
JS HTML Objects
JS HTML Events
JS Browser
JS Editor
JS Exercises
JS Quiz
JS Website
JS Syllabus
JS Study Plan
JS Interview Prep
JS Bootcamp
JS Certificate
JS Reference
JavaScript Callbacks
❮ Previous
Next ❯
"I will call back later!"
A JavaScript callback is a function passed as an argument to another function, 
which is then executed (or "called back") at a later point in time to complete a specific task.
This mechanism is fundamental to JavaScript's event-driven and asynchronous programming model.
What is a Callback Function?
callback function
is a function passed as an argument into another function.
callback function
is intended to be
executed later
Later is typically when a specific event occurs or an asynchronous operation completes.
The name "callback" stems from the idea that the outer function will "call you back"
later when it has finished its task
Types of Callbacks
Asynchronous Callbacks
Asynchronous callbacks are executed at a later time, allowing the main program to continue running without waiting.
This is essential for preventing the application from freezing during long-running tasks like network requests.
Synchronous Callbacks
Synchronous Callbacks are executed immediately within the outer function, blocking further operations
until completion.
Array methods like map(), filter(), and forEach() use synchronous callbacks.
Event Handling
Callbacks are often used in JavaScript, especially in event handling.
User interactions, such as button clicks or key presses, can be handled by providing a
callback function
to an
event listener
Example
document.getElementById("myButton").addEventListener("click", displayDate);
Try it Yourself »
In the example above,
displayDate
is a callback function passed
as an argument to the
addEventListener()
method.
displayDate
will be called when a user clicks the button with id="myButton".
When you pass a function as an argument, remember not to use parenthesis.
Right:
displayDate
Wrong:
displayDate()
Asynchronous Operations
Windows functions like
setTimeout()
use callbacks to execute code after a specified delay.
Example
setTimeout(myFunction, 3000);
function myFunction() {
document.getElementById("demo").innerHTML = "I love You !!";
Try it Yourself »
In the example above,
myFunction
is a callback function passed
as an argument to
setTimeout()
3000
is the number of milliseconds before
myFunction
will be called.
Array Methods
Many built-in array methods like map(), filter(), and forEach() accept callback functions to define
the action performed on each element.
forEach()
method calls a function (a callback function) once for each array element.
Example
const numbers = [45, 4, 9, 16, 25];
let txt = "";
numbers.forEach(myFunction);
function myFunction(value) {
txt += value + "<br>";
Try it Yourself »
map()
method creates a new array by performing a function on each array element.
Example
const numbers1 = [45, 4, 9, 16, 25];
const numbers2 = numbers1.map(myFunction);
function myFunction(value) {
return value * 2;
Try it Yourself »
Sequence Control
Sometimes you would like to have better control over when to execute a function.
Suppose you want to do a calculation, and then display the result.
You could first call the calculator function
myCalculator
and then call the display function
myDisplayer
Example
// Funtion to display something
function myDisplayer(some) {
document.getElementById("demo").innerHTML = some;
// Function to calculate a sum
function myCalculator(num1, num2) {
let sum = num1 + num2;
return sum;
// Call the calculator
let result = myCalculator(5, 5);
// Call the displayer
myDisplayer(result);
Try it Yourself »
Or, you could call the calculator function

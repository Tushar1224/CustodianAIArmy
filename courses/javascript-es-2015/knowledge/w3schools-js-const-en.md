# w3schools-js-const

Source: https://www.w3schools.com/js/js_const.asp

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
JavaScript Const
❮ Previous
Next ❯
const
keyword was introduced in
ES6 (2015)
Variables defined with
const
cannot be
Redeclared
Variables defined with
const
cannot be
Reassigned
Variables defined with
const
have
Block Scope
Cannot be Reassigned
A variable defined with the
const
keyword cannot be reassigned:
Example
const PI = 3.141592653589793;
PI = 3.14;      // This will give an error
PI = PI + 10;   // This will also give an error
Try it Yourself »
Must be Assigned
JavaScript
const
variables must be assigned a value when they are declared:
Correct
const PI = 3.14159265359;
Incorrect
const PI;
PI = 3.14159265359;
When to use JavaScript const?
Always declare a variable with
const
when you know that
the value should not be changed.
const
when you declare:
A new Array
A new Object
A new Function
A new RegExp
Constant Objects and Arrays
The keyword
const
is a little misleading.
It does not define a constant value. It defines a constant reference to a value.
Because of this you can NOT:
Reassign a constant value
Reassign a constant array
Reassign a constant object
But you CAN:
Change the elements of constant array
Change the properties of constant object
Constant Arrays
You can change the elements of a constant array:
Example
// You can create a constant array:
const cars = ["Saab", "Volvo", "BMW"];
// You can change an element:
cars[0] = "Toyota";
// You can add an element:
cars.push("Audi");
Try it Yourself »
But you can NOT reassign the array:
Example
const cars = ["Saab", "Volvo", "BMW"];
cars = ["Toyota", "Volvo", "Audi"];    // ERROR
Try it Yourself »
Constant Objects
You can change the properties of a constant object:
Example
// You can create a const object:
const car = {type:"Fiat", model:"500", color:"white"};
// You can change a property:
car.color = "red";
// You can add a property:
car.owner = "Johnson";
Try it Yourself »
But you can NOT reassign the object:
Example
const car = {type:"Fiat", model:"500", color:"white"};
car = {type:"Volvo", model:"EX60", color:"red"}    // 
  ERROR
Try it Yourself »
Difference Between var, let and const
Scope
Redeclare
Reassign
Hoisted
Binds this
const
What is Good?
const
have
block scope
const
can not be
redeclared
const

# w3schools-js-modules

Source: https://www.w3schools.com/js/js_modules.asp

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
JavaScript Modules
❮ Previous
Next ❯
What are Modules?
Modules are
code blocks
that can
export
and/or
import
functions and values.
// Export an "add" function
export function add(a, b) {
return a + b;
// Import an "add" function
import { add } from './math.js';
let result = add(2, 3);
Modules let you to break up code into
separate files
Modules is a fundamental feature in
modern JavaScript
Module Files
A JavaScript module is
usually a file
, but it can also be
an HTML script
A module file
is a .js file using import / export.
A module script
is an HTML script using import / export.
How to Use Modules
Modules use
export
import
to interchange functionalities between modules.
An HTML script using
type="module"
is treated as a module:
Module File "math.js:
// Export an "add" function
export function add(a, b) {
return a + b;
Module Script:
<script type="module">
// Import the add function
import { add } from './math.js';
let result = add(2, 3);
</script>
Try it Yourself »
Module files must be
stored on a server
Modules only work with the
HTTP(s) protocol
A web-page opened via the file:// protocol cannot use import / export.
Module File "person.js"
// Export name and age
export const name = "Jesse";
export const age = 40;
Module Script
<script type="module">
// Import name and age
import { name, age } from "./person.js";
</script>
Try it Yourself »
Modules Can Export
Variables
Functions
Objects
Classes
Module File "message.js"
const message = () => {
const name = "Jesse";
const age = 40;
return name + ' is ' + age + 'years old.';
export default message;
Module Script:
<script type="module">
import message from "./message.js";
</script>
Try it Yourself »
Modules operate in
strict mode
by default.
Why Modules?
Modules help
organizing code
Modules let you break down large codebases into small self-contained files, each focused on a specific task.
Modules are essential for large and complex applications.
Modules
prevent naming conflicts
Before modules, developers had only the global scope, which can lead to "namespace pollution"
where unrelated code can accidentally overwrite other global variables.
Modules has a private scope. Variables and functions are not exposed globally,
unless explicitly exported.
Modules have
better readability
Modules improves code organization, making it easier to navigate, understand, and manage,
especially in larger projects or team environments.
Modules are
easily reused
across different parts of an application and in entirely new projects.
Modules promote reusability by enabling the export of functions, variables, or objects from one
file and their import into other files or projects. This eliminates redundant code and fosters
a more efficient development process.
A module can be easily reused across different parts of a project or in entirely new projects.

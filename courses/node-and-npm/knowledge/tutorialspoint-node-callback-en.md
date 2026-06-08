# Tutorialspoint Node Callback

Source: https://www.tutorialspoint.com/nodejs/nodejs_callbacks_concept.htm

Node.js - Home
Node.js - Introduction
Node.js - Environment Setup
Node.js - First Application
Node.js - REPL Terminal
Node.js - Command Line Options
Node.js - Package Manager (NPM)
Node.js - Callbacks Concept
Node.js - Upload Files
Node.js - Send an Email
Node.js - Events
Node.js - Event Loop
Node.js - Event Emitter
Node.js - Debugger
Node.js - Global Objects
Node.js - Console
Node.js - Process
Node.js - Scaling Application
Node.js - Packaging
Node.js - Express Framework
Node.js - RESTFul API
Node.js - Buffers
Node.js - Streams
Node.js - File System
Node.js MySQL
Node.js - MySQL Get Started
Node.js - MySQL Create Database
Node.js - MySQL Create Table
Node.js - MySQL Insert Into
Node.js - MySQL Select From
Node.js - MySQL Where
Node.js - MySQL Order By
Node.js - MySQL Delete
Node.js - MySQL Update
Node.js - MySQL Join
Node.js MongoDB
Node.js - MongoDB Get Started
Node.js - MongoDB Create Database
Node.js - MongoDB Create Collection
Node.js - MongoDB Insert
Node.js - MongoDB Find
Node.js - MongoDB Query
Node.js - MongoDB Sort
Node.js - MongoDB Delete
Node.js - MongoDB Update
Node.js - MongoDB Limit
Node.js - MongoDB Join
Node.js Modules
Node.js - Modules
Node.js - Built-in Modules
Node.js - Utility Modules
Node.js - Web Module
Node.js - Quick Guide
Node.js - Cheatsheet
Node.js - Useful Resources
Node.js - Dicussion
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
Node.js - Callbacks Concept
Previous
Quiz
Next
What is Callback?
A Callback in Node.js is an asynchronous equivalent for a function. It is a special type of function passed as an argument to another function. Node.js makes heavy use of callbacks. Callbacks help us make asynchronous calls. All the APIs of Node are written in such a way that they support callbacks.
Programming instructions are executed synchronously by default. If one of the instructions in a program is expected to perform a lengthy process, the main thread of execution gets blocked. The subsequent instructions can be executed only after the current I/O is complete. This is where callbacks come in to the picture.
The callback is called when the function that contains the callback as an argument completes its execution, and allows the code in the callback to run in the meantime. This makes Node.js highly scalable, as it can process a high number of requests without waiting for any function to return results.
The syntax of implementing callback in Node.js is as follows −
function function_name(argument, function (callback_argument){
   // callback body 
The setTimeout() function in Node.js is a typical example of callback. The following code calls the asynchronous setTimeout() method, which waits for 1000 milliseconds, but doesn't block the thread. Instead, the subsequent Hello World message, followed by the timed message.
Example
setTimeout(function () { 
   console.log('This prints after 1000 ms'); 
}, 1000);
console.log("Hello World");
Output
Hello World
This prints after 1000 ms
Blocking Code Example
To understand the callback feature, save the following text as input.txt file.
TutorialsPoint is the largest free online tutorials Library
Master any technology.
From programming languages and web development to data science and cybersecurity
The following code reads the file synchronously with the help of readFileSync() function in fs module. Since the operation is synchronous, it blocks the execution of the rest of the code.
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
let i = 1;
while (i <=5) {
  console.log("The number is " + i);
  i++;
The output shows that Node.js reads the file, displays its contents. Only after this, the following loop that prints numbers 1 to 5 is executed.
TutorialsPoint is the largest free online tutorials Library
Master any technology.
From programming languages and web development to data science and cybersecurity
The number is 1
The number is 2
The number is 3
The number is 4
The number is 5
Non-Blocking Code Example
We use the same input.txt file in the following code to demonstrate the use of callback.
TutorialsPoint is the largest free online tutorials Library
Master any technology.
From programming languages and web development to data science and cybersecurity
The ReadFile() function in fs module is provided a callback function. The two arguments passed to the callback are error and the return value of ReadFile() function itself. The callback is invoked when ReadFile() finishes by returning either error or file contents. While the file read operation is inprocess, Node.js asynchronously runs the subsequent loop.
var fs = require("fs");
fs.readFile('input.txt', function (err, data) {
   if (err) return console.error(err);
   console.log(data.toString());
let i = 1;
while (i <=5) {
  console.log("The number is " + i);
  i++;
Output
The number is 1
The number is 2
The number is 3
The number is 4
The number is 5
TutorialsPoint is the largest free online tutorials Library
Master any technology.
From programming languages and web development to data science and cybersecurity
Callback as Arrow function
You can also assign an arrow function as a callback argument. Arrow function in JavaScript is an anonymous function. It is also called as lambda function. The syntax of using arrow function as Node.js callback is as follows −
function function_name(argument, (callback_argument) => { 
   // callback body 
It was introduced in ES6 version of JavaScript. Let us replace the callback in the above example with an arrow function.
var fs = require("fs");
fs.readFile('input.txt',  (err, data) => {
   if (err) return console.error(err);
   console.log(data.toString());
let i = 1;
while (i <=5) {
  console.log("The number is " + i);
  i++;
The above code produces a similar output as the previous example.
Print Page
Previous
Quiz
Next
Advertisements

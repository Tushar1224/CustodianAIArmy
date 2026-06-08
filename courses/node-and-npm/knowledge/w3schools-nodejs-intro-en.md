# w3schools-nodejs-intro

Source: https://www.w3schools.com/nodejs/nodejs_intro.asp

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
Node.js
Tutorial
Node HOME
Node Intro
Node Get Started
Node JS Requirements
Node.js vs Browser
Node Cmd Line
Node V8 Engine
Node Architecture
Node Event Loop
Asynchronous
Node Async
Node Promises
Node Async/Await
Node Errors Handling
Module Basics
Node Modules
Node ES Modules
Node NPM
Node package.json
Node NPM Scripts
Node Manage Dep
Node Publish Packages
Core Modules
HTTP Module
HTTPS Module
File System (fs)
Path Module
OS Module
URL Module
Events Module
Stream Module
Buffer Module
Crypto Module
Timers Module
DNS Module
Assert Module
Util Module
Readline Module
JS & TS Features
Node ES6+
Node Process
Node TypeScript
Node Adv. TypeScript
Node Lint & Formatting
Building Applications
Node Frameworks
Express.js
Middleware Concept
REST API Design
API Authentication
Node.js with Frontend
Database Integration
MySQL Get Started
MySQL Create Database
MySQL Create Table
MySQL Insert Into
MySQL Select From
MySQL Where
MySQL Order By
MySQL Delete
MySQL Drop Table
MySQL Update
MySQL Limit
MySQL Join
MongoDB Get Started
MongoDB Create DB
MongoDB Collection
MongoDB Insert
MongoDB Find
MongoDB Query
MongoDB Sort
MongoDB Delete
MongoDB Drop Collection
MongoDB Update
MongoDB Limit
MongoDB Join
Advanced Communication
GraphQL
Socket.IO
WebSockets
Testing & Debugging
Node Adv. Debugging
Node Testing Apps
Node Test Frameworks
Node Test Runner
Node.js Deployment
Node Env Variables
Node Dev vs Prod
Node CI/CD
Node Security
Node Deployment
Perfomance & Scaling
Node Logging
Node Monitoring
Node Performance
Child Process Module
Cluster Module
Worker Threads
Node.js Advanced
Microservices
Node WebAssembly
HTTP2 Module
Perf_hooks Module
VM Module
TLS/SSL Module
Net Module
Zlib Module
Real-World Examples
Hardware & IoT
RasPi Get Started
RasPi GPIO Introduction
RasPi Blinking LED
RasPi LED & Pushbutton
RasPi Flowing LEDs
RasPi WebSocket
RasPi RGB LED WebSocket
RasPi Components
Node.js Cert
Node.js Certificate
Node.js
Reference
Built-in Modules
EventEmitter (events)
Worker (cluster)
Cipher (crypto)
Decipher (crypto)
DiffieHellman (crypto)
ECDH (crypto)
Hash (crypto)
Hmac (crypto)
Sign (crypto)
Verify (crypto)
Socket (dgram, net, tls)
ReadStream (fs, stream)
WriteStream (fs, stream)
Server (http, https, net, tls)
Agent (http, https)
Request (http)
Response (http)
Message (http)
Interface (readline)
Resources & Tools
Node.js Compiler
Node.js Server
Node.js Quiz
Node.js Exercises
Node.js Pratice Problems
Node.js Syllabus
Node.js Study Plan
Node.js Bootcamp
Node.js
Introduction
❮ Previous
Next ❯
What You'll Learn
In this tutorial, you'll learn:
How to install and run Node.js
Core concepts like modules and the event loop
How to build web servers and APIs
Working with databases and files
Deploying Node.js applications
What is Node.js?
Node.js
is a free, open-source JavaScript runtime that runs on Windows, Mac, Linux, and more.
It lets you execute JavaScript code outside of a web browser, enabling server-side development with JavaScript.
Built on Chrome's V8 JavaScript engine, Node.js is designed for building scalable network applications efficiently.
Example: Print a Message
console.log('Hello from Node.js!');
Try it Yourself »
Why Node.js?
Node.js excels at handling many simultaneous connections with minimal overhead, making it perfect for:
Real-time applications
(chats, gaming, collaboration tools)
APIs and microservices
Data streaming applications
Command-line tools
Server-side web applications
Its non-blocking, event-driven architecture makes it highly efficient for I/O-heavy workloads.
Asynchronous Programming
Node.js uses
asynchronous
(non-blocking) programming.
This means it can keep working while waiting for tasks like reading files or talking to a database.
With asynchronous code, Node.js can handle many things at once-making it fast and efficient.
Example: Read a File Asynchronously
// Load the filesystem module
const fs = require('fs');
// Read file asynchronously
fs.readFile('myfile.txt', 'utf8', (err, data) => {
if (err) {
console.error('Error reading file: ' + err);
return;
console.log('File content: ' + data);
console.log('Reading file... (this runs first!)');
Run example »
In this example:
We load the built-in
module
We call
readFile
to read a file
Node.js continues to the next line while reading the file
When the file is read, our callback function runs
This non-blocking behavior lets Node.js handle many requests efficiently.
What Can Node.js Do?
Web Servers
: Create fast, scalable network applications
File Operations
: Read, write, and manage files on the server
Database Interaction
: Work with databases like MongoDB, MySQL, and more
APIs
: Build RESTful services and GraphQL APIs
Real-time
: Handle WebSockets for live applications
CLI Tools
: Create command-line applications
Example: Simple Web Server
const http = require('http');
http.createServer((req, res) => {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello World!');
}).listen(8080);
Run example »
What is a Node.js File?
Node.js files contain code that runs on the server. They usually have the
extension and can be started with the
node
command.
Node.js files run tasks when certain events happen (like a web request)
They must be started on the server to have any effect
They use JavaScript syntax
Example: Running a Node.js File
node app.js
Node.js Versions & LTS:
Node.js releases a new major version every six months.
For stability, use an
LTS (Long Term Support)
version for production projects.
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS
PLUS
SPACES
GET CERTIFIED
FOR TEACHERS
BOOTCAMPS
CONTACT US
Contact Sales
If you want to use W3Schools services as an educational institution, team or enterprise, send us an e-mail:
sales@w3schools.com
Report Error
If you want to report an error, or if you want to make a suggestion, send us an e-mail:
help@w3schools.com
Top Tutorials
HTML Tutorial
CSS Tutorial
JavaScript Tutorial
How To Tutorial
SQL Tutorial
Python Tutorial
W3.CSS Tutorial
Bootstrap Tutorial
PHP Tutorial
Java Tutorial
C++ Tutorial
jQuery Tutorial
Top References
HTML Reference
CSS Reference
JavaScript Reference
SQL Reference
Python Reference
W3.CSS Reference
Bootstrap Reference
PHP Reference
HTML Colors
Java Reference
AngularJS Reference
jQuery Reference
Top Examples
HTML Examples
CSS Examples
JavaScript Examples
How To Examples
SQL Examples
Python Examples
W3.CSS Examples
Bootstrap Examples
PHP Examples
Java Examples
XML Examples
jQuery Examples
Get Certified
HTML Certificate
CSS Certificate
JavaScript Certificate
Front End Certificate
SQL Certificate
Python Certificate
PHP Certificate
jQuery Certificate
Java Certificate
C++ Certificate
C# Certificate
XML Certificate
FORUM
ABOUT
ACADEMY
W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning.
Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness
of all content. While using W3Schools, you agree to have read and accepted our
terms of use
cookies
privacy policy
Copyright 1999-2026
by Refsnes Data. All Rights Reserved.
W3Schools is Powered by W3.CSS

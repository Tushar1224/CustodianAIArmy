# w3schools-nodejs-modules

Source: https://www.w3schools.com/nodejs/nodejs_modules.asp

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
Modules
❮ Previous
Next ❯
What is a Module in Node.js?
Modules are the building blocks of Node.js applications, allowing you to organize code into logical, reusable components. They help in:
Organizing code into manageable files
Encapsulating functionality
Preventing global namespace pollution
Improving code maintainability and reusability
Node.js supports two module systems: CommonJS (traditional) and ES Modules (ECMAScript modules).
This page covers CommonJS, while
ES Modules
are covered separately.
Core Built-in Modules
Node.js provides several built-in modules that are compiled into the binary.
Here are some of the most commonly used ones:
- File system operations
http
- HTTP server and client
path
- File path utilities
- Operating system utilities
events
- Event handling
util
- Utility functions
stream
- Stream handling
crypto
- Cryptographic functions
- URL parsing
querystring
- URL query string handling
To use any built-in module, use the
require()
function:
Example: Using Multiple Built-in Modules
const http = require('http');
Now you can use the module's features, like creating a server:
Example: Simple HTTP Server
http.createServer((req, res) => {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello World!');
}).listen(8080);
Run Example »
Creating and Exporting Modules
In Node.js, any file with a
extension is a module. You can export functionality from a module in several ways:
1. Exporting Multiple Items
Add properties to the
exports
object for multiple exports:
Example: utils.js
// Exporting multiple functions
const getCurrentDate = () => new Date().toISOString();
const formatCurrency = (amount, currency = 'USD') => {
return new Intl.NumberFormat('en-US', {
style: 'currency',
currency: currency
}).format(amount);
// Method 1: Exporting multiple items
exports.getCurrentDate = getCurrentDate;
exports.formatCurrency = formatCurrency;
// Method 2: Exporting an object with multiple properties
// module.exports = { getCurrentDate, formatCurrency };
2. Exporting a Single Item
To export a single item (function, object, etc.), assign it to
module.exports
Example: logger.js
class Logger {
constructor(name) {
this.name = name;
log(message) {
console.log(`[${this.name}] ${message}`);
error(error) {
console.error(`[${this.name}] ERROR:`, error.message);
// Exporting a single class
module.exports = Logger;
3. Using Your Modules
Import and use your custom modules using
require()
with a relative or absolute path:
Example: app.js
const http = require('http');
const path = require('path');
// Importing custom modules
const { getCurrentDate, formatCurrency } = require('./utils');
const Logger = require('./logger');
// Create a logger instance
const logger = new Logger('App');
// Create server
const server = http.createServer((req, res) => {
try {
logger.log(`Request received for ${req.url}`);
res.writeHead(200, { 'Content-Type': 'text/html' });
res.write(`<h1>Welcome to our app!</h1>`);
res.write(`<p>Current date: ${getCurrentDate()}</p>`);
res.write(`<p>Formatted amount: ${formatCurrency(99.99)}</p>`);
res.end();
} catch (error) {
logger.error(error);
res.writeHead(500, { 'Content-Type': 'text/plain' });
res.end('Internal Server Error');
// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
logger.log(`Server running at http://localhost:${PORT}`);
Module Loading and Caching
Node.js caches modules after the first time they are loaded. This means that subsequent
require()
calls return the cached version.
Module Resolution
When you require a module, Node.js looks for it in this order:
Core Node.js modules (like
http
Node modules in
node_modules
folders
Local files (using
prefix)
Run the example in your terminal:
C:\Users\<Your Name>> node demo_module.js
Visit
http://localhost:8080
to see the result in your browser.
Best Practices
Module Organization
Keep modules focused on a single responsibility
Use meaningful file and directory names
Group related functionality together
index.js
for module entry points
Export Patterns
Prefer named exports for utilities
Use default exports for single-class modules
Document your module's API
Handle module initialization if needed
Summary
Modules are a key concept in Node.js. They enable you to organize code into reusable, maintainable units.
By understanding how to create, export, and use modules effectively, you can build scalable and well-structured applications.
Key takeaways:
Node.js uses CommonJS modules by default
require()
to import and
module.exports
to export
Modules are cached after first load
Follow best practices for module organization and structure
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

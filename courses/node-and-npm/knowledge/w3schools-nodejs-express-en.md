# w3schools-nodejs-express

Source: https://www.w3schools.com/nodejs/nodejs_express.asp

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
Node.js Express.js
❮ Previous
Next ❯
What is Express.js?
Express.js (or simply Express) is the most popular Node.js web application framework, designed for building web applications and APIs.
It's often called the de facto standard server framework for Node.js.
Key Characteristics:
Minimal and flexible
Unopinionated (you decide how to structure your app)
Lightweight and fast
Extensible through middleware
Huge ecosystem of plugins and extensions
Why Choose Express.js?
Express provides a thin layer of fundamental web application features without obscuring Node.js features.
It offers:
A robust routing system
HTTP helpers (redirection, caching, etc.)
Support for middleware to respond to HTTP requests
A templating engine for dynamic HTML rendering
Error handling middleware
Getting Started with Express
Express can be added to any Node.js project. Here's how to get started with a new Express application.
Prerequisites
Before you begin, make sure you have:
Node.js installed (v14.0.0 or later recommended)
npm (comes with Node.js) or yarn
A code editor (VS Code, WebStorm, etc.)
Installing Express
To use Express in your Node.js application, you first need to install it:
npm install express
To install Express and save it in your package.json dependencies:
npm install express --save
Hello World Example
Let's create a simple "Hello World" application with Express.
This example demonstrates the basic structure of an Express application.
Key Components:
Importing the Express module
Creating an Express application instance
Defining routes
Starting the server
const express = require('express');
const app = express();
const port = 8080;
// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
res.send('Hello World from Express!');
// Start the server
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
Run example »
Save this code in a file named
app.js
and run it with Node.js:
node app.js
Then, open your browser and navigate to
http://localhost:8080
to see the "Hello World" message.
Basic Routing
Routing refers to how an application responds to client requests to specific endpoints (URIs) using different HTTP methods (GET, POST, PUT, DELETE, etc.).
Express provides simple methods to define routes that correspond to HTTP methods:
app.get()
- Handle GET requests
app.post()
- Handle POST requests
app.put()
- Handle PUT requests
app.delete()
- Handle DELETE requests
app.all()
- Handle all HTTP methods
const express = require('express');
const app = express();
const port = 8080;
// Respond to GET request on the root route
app.get('/', (req, res) => {
res.send('GET request to the homepage');
// Respond to POST request on the root route
app.post('/', (req, res) => {
res.send('POST request to the homepage');
// Respond to GET request on the /about route
app.get('/about', (req, res) => {
res.send('About page');
// Catch all other routes
app.all('*', (req, res) => {
res.status(404).send('404 - Page not found');
// Start the server
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
Run example »
Route Parameters
Route parameters are named URL segments that capture values at specific positions in the URL.
They are specified in the path with a colon
prefix.
Example:
/users/:userId/books/:bookId
In this example,
userId
bookId
are route parameters that can be accessed via
req.params
const express = require('express');
const app = express();
const port = 8080;
// Route with parameters
app.get('/users/:userId/books/:bookId', (req, res) => {
// Access parameters using req.params
res.send(`User ID: ${req.params.userId}, Book ID: ${req.params.bookId}`);
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
Run example »
Query Parameters
Query parameters are key-value pairs that appear after the
in a URL.
They are automatically parsed by Express and available in
req.query
Example URL:
http://example.com/search?q=express&page=2
In this URL,
q=express
page=2
are query parameters that can be accessed as
req.query.q
req.query.page
const express = require('express');
const app = express();
const port = 8080;
// Route handling query parameters
app.get('/search', (req, res) => {
// Access query parameters using req.query
const { q, category } = req.query;
res.send(`Search query: ${q}, Category: ${category || 'none'}`);
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
Run example »
Access this route with a URL like:
http://localhost:8080/search?q=express&category=framework
Middleware in Express
Middleware functions are the backbone of Express applications.
They have access to:
The request object (
The response object (
The next middleware function in the stack (
next
Middleware can:
Execute any code
Modify request and response objects
End the request-response cycle
Call the next middleware in the stack
Built-in Middleware
Express includes several useful middleware functions:
express.json()
- Parse JSON request bodies
express.urlencoded()
- Parse URL-encoded request bodies
express.static()
- Serve static files
express.Router()
- Create modular route handlers
const express = require('express');
const app = express();
const port = 8080;
// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files from a directory
app.use(express.static('public'));
// POST route that uses JSON middleware
app.post('/api/users', (req, res) => {
// req.body contains the parsed JSON data
console.log(req.body);
res.status(201).json({ message: 'User created', user: req.body });
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
Run example »
Error Handling in Express
Error handling in Express is done through special middleware functions that have four arguments:
(err, req, res, next)
Key Points:
Error-handling middleware must have four arguments
It should be defined after other
app.use()
and route calls
You can have multiple error-handling middleware functions
next(err)
to pass errors to the next error handler
Express comes with a default error handler to catch errors that occur during request processing:
const express = require('express');
const app = express();
const port = 8080;
// Route that may throw an error
app.get('/error', (req, res) => {
// Simulating an error
throw new Error('Something went wrong!');
// Route that uses next(error) for asynchronous code
app.get('/async-error', (req, res, next) => {
// Simulating an asynchronous operation that fails
setTimeout(() => {
try {
// Something that might fail
const result = nonExistentFunction(); // This will throw an error
res.send(result);
catch (error) {
next(error); // Pass errors to Express
}, 100);
// Custom error handling middleware
// Must have four parameters to be recognized as an error handler
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
Run example »
Serving Static Files
Express can serve static files like images, CSS, and JavaScript using the built-in
express.static
middleware.
Best Practices:
Place static files in a dedicated directory (commonly
public
static
Mount the static middleware before your routes
Consider using a CDN in production for better performance
Set appropriate cache headers for static assets
To serve static files such as images, CSS files, and JavaScript files, use the
express.static
built-in middleware function:
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
// Serve static files from the 'public' directory
app.use(express.static('public'));
// You can also specify a virtual path prefix
app.use('/static', express.static('public'));
// Using absolute path (recommended)
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
res.send(`
<h1>Static Files Example</h1>
<img src="/images/logo.png" alt="Logo">
<link rel="stylesheet" href="/css/style.css">
<script src="/js/script.js"></script>
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
Run example »
This assumes you have a directory named
public
in the same directory as your script with subdirectories for images, CSS, and JavaScript files.
Routing in Separate Files
For better organization, you can define routes in separate files using Express Router:
routes/users.js
const express = require('express');
const router = express.Router();
// Middleware specific to this router
router.use((req, res, next) => {
console.log('Users Router Time:', Date.now());
next();
// Define routes
router.get('/', (req, res) => {
res.send('Users home page');
router.get('/:id', (req, res) => {
res.send(`User profile for ID: ${req.params.id}`);
module.exports = router;
routes/products.js
const express = require('express');
const router = express.Router();
// Define routes
router.get('/', (req, res) => {
res.send('Products list');
router.get('/:id', (req, res) => {
res.send(`Product details for ID: ${req.params.id}`);
module.exports = router;
app.js (main file)
const express = require('express');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const app = express();
const port = 8080;
// Use the routers
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.get('/', (req, res) => {
res.send('Main application home page');
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
Run example »
Template Engines
Express can be configured with template engines to generate dynamic HTML:
const express = require('express');
const app = express();
const port = 8080;
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the directory where templates are located
app.set('views', './views');
// Route that renders a template
app.get('/', (req, res) => {
const data = {
title: 'Express Template Example',
message: 'Hello from EJS!',
items: ['Item 1', 'Item 2', 'Item 3']
// Renders the views/index.ejs template

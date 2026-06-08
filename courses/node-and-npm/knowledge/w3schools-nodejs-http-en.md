# w3schools-nodejs-http

Source: https://www.w3schools.com/nodejs/nodejs_http.asp

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
HTTP Module
❮ Previous
Next ❯
The Built-in HTTP Module
Node.js includes a powerful built-in HTTP module that enables you to create HTTP servers and make HTTP requests.
This module is essential for building web applications and APIs in Node.js.
Key Features
Create HTTP servers to handle requests and send responses
Make HTTP requests to other servers
Handle different HTTP methods (GET, POST, PUT, DELETE, etc.)
Work with request and response headers
Handle streaming data for large payloads
Including the HTTP Module
To use the HTTP module, include it in your application using the
require()
method:
// Using CommonJS require (Node.js default)
const http = require('http');
// Or using ES modules (Node.js 14+ with "type": "module" in package.json)
// import http from 'http';
Creating an HTTP Server
The HTTP module's
createServer()
method creates an HTTP server that listens for requests on a specified port and executes a callback function for each request.
Basic HTTP Server Example
// Import the HTTP module
const http = require('http');
// Create a server object
const server = http.createServer((req, res) => {
// Set the response HTTP header with HTTP status and Content type
res.writeHead(200, { 'Content-Type': 'text/plain' });
// Send the response body as 'Hello, World!'
res.end('Hello, World!\n');
// Define the port to listen on
const PORT = 3000;
// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
console.log(`Server running at http://localhost:${PORT}/`);
Run example »
Understanding the Code
http.createServer()
- Creates a new HTTP server instance
The callback function is executed for each request with two parameters:
- The request object (http.IncomingMessage)
- The response object (http.ServerResponse)
res.writeHead()
- Sets the response status code and headers
res.end()
- Sends the response and ends the connection
server.listen()
- Starts the server on the specified port
Running the Server
Save the code in a file named
server.js
Run the server using Node.js:
node server.js
Visit
http://localhost:3000
in your browser to see the response.
Working with HTTP Headers
HTTP headers let you send additional information with your response.
res.writeHead()
method is used to set the status code and response headers.
Setting Response Headers
Example: Setting Multiple Headers
const http = require('http');
const server = http.createServer((req, res) => {
// Set status code and multiple headers
res.writeHead(200, {
'Content-Type': 'text/html',
'X-Powered-By': 'Node.js',
'Cache-Control': 'no-cache, no-store, must-revalidate',
'Set-Cookie': 'sessionid=abc123; HttpOnly'
res.end('<h1>Hello, World!</h1>');
server.listen(3000, () => {
console.log('Server running at http://localhost:3000/');
Run example »
Common HTTP Status Codes
Code
Message
Description
Standard response for successful HTTP requests
Created
Request has been fulfilled and new resource created
Moved Permanently
Resource has been moved to a new URL
Bad Request
Server cannot process the request due to client error
Unauthorized
Authentication is required
Forbidden
Server refuses to authorize the request
Not Found
Requested resource could not be found
Internal Server Error
Unexpected condition was encountered
Common Response Headers
Content-Type
: Specifies the media type of the content (e.g., text/html, application/json)
Content-Length
: The length of the response body in bytes
Location
: Used in redirects (with 3xx status codes)
Set-Cookie
: Sets HTTP cookies on the client
Cache-Control
: Directives for caching mechanisms
Access-Control-Allow-Origin
: For CORS support
Reading Request Headers
You can access request headers using the
req.headers
object:
const http = require('http');
const server = http.createServer((req, res) => {
// Log all request headers
console.log('Request Headers:', req.headers);
// Get specific headers (case-insensitive)
const userAgent = req.headers['user-agent'];
const acceptLanguage = req.headers['accept-language'];
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end(`User-Agent: ${userAgent}\nAccept-Language: ${acceptLanguage}`);
server.listen(3000);
Run example »
Working with URLs and Query Strings
Node.js provides built-in modules to work with URLs and query strings, making it easy to handle different parts of a URL and parse query parameters.
Accessing the Request URL
req.url
property contains the URL string that was requested, including any query parameters.
This is part of the
http.IncomingMessage
object.
Example: Basic URL Handling
const http = require('http');
const server = http.createServer((req, res) => {
// Get the URL and HTTP method
const { url, method } = req;
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end(`You made a ${method} request to ${url}`);
server.listen(3000, () => {
console.log('Server running at http://localhost:3000/');
Run example »
Parsing URLs with the URL Module
module provides utilities for URL resolution and parsing.
It can parse a URL string into a URL object with properties for each part of the URL.
Example: Parsing URLs
const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
// Parse the URL
const parsedUrl = url.parse(req.url, true);
// Get different parts of the URL
const pathname = parsedUrl.pathname; // The path without query string
const query = parsedUrl.query;      // The query string as an object
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({
pathname,
query,
fullUrl: req.url
}, null, 2));
server.listen(3000);
Example Requests and Responses
For the following request:
GET /products?category=electronics&sort=price&page=2 HTTP/1.1
The server would respond with:
"pathname": "/products",
"query": {
"category": "electronics",
"sort": "price",
"page": "2"
"fullUrl": "/products?category=electronics&sort=price&page=2"
Working with Query Strings
For more advanced query string handling, you can use the
querystring
module:
Example: Using querystring Module
const http = require('http');
const { URL } = require('url');
const querystring = require('querystring');
const server = http.createServer((req, res) => {
// Using the newer URL API (Node.js 10+)
const baseURL = 'http://' + req.headers.host + '/';
  const parsedUrl = new URL(req.url, baseURL);
// Get query parameters
const params = Object.fromEntries(parsedUrl.searchParams);
// Example of building a query string
const queryObj = {
name: 'John Doe',
age: 30,
interests: ['programming', 'music']
const queryStr = querystring.stringify(queryObj);
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({
path: parsedUrl.pathname,
params,
exampleQueryString: queryStr
}, null, 2));
server.listen(3000);
Run example »
Common URL Parsing Methods
url.parse(urlString, [parseQueryString], [slashesDenoteHost])
: Parse a URL string into an object
url.format(urlObject)
: Format a URL object into a URL string
url.resolve(from, to)
: Resolve a target URL relative to a base URL
new URL(input, [base])
: The WHATWG URL API (recommended for new code)
querystring.parse(str, [sep], [eq], [options])
: Parse a query string into an object
querystring.stringify(obj, [sep], [eq], [options])
: Stringify an object into a query string
Handling Different HTTP Methods
RESTful APIs commonly use different HTTP methods (GET, POST, PUT, DELETE, etc.) to perform different operations on resources.
Here's how to handle different HTTP methods in a Node.js HTTP server:
Example: Handling Multiple HTTP Methods
const http = require('http');
const { URL } = require('url');
// In-memory data store (for demonstration)
let todos = [
{ id: 1, task: 'Learn Node.js', completed: false },
{ id: 2, task: 'Build an API', completed: false }
const server = http.createServer((req, res) => {
const { method, url } = req;
const parsedUrl = new URL(url, `http://${req.headers.host}`);
const pathname = parsedUrl.pathname;
// Set CORS headers (for development)
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
// Handle preflight requests
if (method === 'OPTIONS') {
res.writeHead(204);
res.end();
return;
// Route: GET /todos
if (method === 'GET' && pathname === '/todos') {
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify(todos));
// Route: POST /todos
else if (method === 'POST' && pathname === '/todos') {
let body = '';
req.on('data', chunk => {
body += chunk.toString();
req.on('end', () => {
try {
const newTodo = JSON.parse(body);
newTodo.id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
todos.push(newTodo);
res.writeHead(201, { 'Content-Type': 'application/json' });
res.end(JSON.stringify(newTodo));
} catch (error) {
res.writeHead(400, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ error: 'Invalid JSON' }));
// Route: PUT /todos/:id
else if (method === 'PUT' && pathname.startsWith('/todos/')) {
const id = parseInt(pathname.split('/')[2]);
let body = '';
req.on('data', chunk => {
body += chunk.toString();
req.on('end', () => {
try {
const updatedTodo = JSON.parse(body);
const index = todos.findIndex(t => t.id === id);
if (index === -1) {
res.writeHead(404, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ error: 'Todo not found' }));
} else {
todos[index] = { ...todos[index], ...updatedTodo };
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify(todos[index]));
} catch (error) {
res.writeHead(400, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ error: 'Invalid JSON' }));
// Route: DELETE /todos/:id
else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
const id = parseInt(pathname.split('/')[2]);
const index = todos.findIndex(t => t.id === id);
if (index === -1) {
res.writeHead(404, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ error: 'Todo not found' }));
} else {
todos = todos.filter(t => t.id !== id);
res.writeHead(204);
res.end();
// 404 Not Found
else {
res.writeHead(404, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ error: 'Not Found' }));
const PORT = 3000;
server.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}/`);
Testing the API with cURL
You can test this API using cURL commands:
1. Get all todos
curl http://localhost:3000/todos
2. Create a new todo
curl -X POST http://localhost:3000/todos \
-H "Content-Type: application/json" \
-d '{"task":"New Task","completed":false}'
3. Update a todo
curl -X PUT http://localhost:3000/todos/1 \

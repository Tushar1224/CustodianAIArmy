# w3schools-nodejs-files

Source: https://www.w3schools.com/nodejs/nodejs_filesystem.asp

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
File System Module
❮ Previous
Next ❯
Introduction to Node.js File System
The Node.js File System module (fs) provides a comprehensive set of methods for working with the file system on your computer.
It allows you to perform file I/O operations in both synchronous and asynchronous ways.
Note:
The File System module is a core Node.js module, so no installation is required.
Importing the File System Module
You can import the File System module using CommonJS
require()
or ES modules
import
syntax:
CommonJS (Default in Node.js)
const fs = require('fs');
ES Modules (Node.js 14+ with "type": "module" in package.json)
import fs from 'fs';
// Or for specific methods:
// import { readFile, writeFile } from 'fs/promises';
Promise-based API
Node.js provides promise-based versions of the File System API in the
fs/promises
namespace, which is recommended for modern applications:
// Using promises (Node.js 10.0.0+)
const fs = require('fs').promises;
// Or with destructuring
const { readFile, writeFile } = require('fs').promises;
// Or with ES modules
// import { readFile, writeFile } from 'fs/promises';
Common Use Cases
File Operations
Read and write files
Create and delete files
Append to files
Rename and move files
Change file permissions
Directory Operations
Create and remove directories
List directory contents
Watch for file changes
Get file/directory stats
Check file existence
Advanced Features
File streams
File descriptors
Symbolic links
File watching
Working with file permissions
Performance Tip:
For large files, consider using streams (
fs.createReadStream
fs.createWriteStream
) to avoid high memory usage.
Reading Files
Node.js provides several methods to read files, including both callback-based and promise-based approaches.
The most common method is
fs.readFile()
Note:
Always handle errors when working with file operations to prevent your application from crashing.
Reading Files with Callbacks
Here's how to read a file using the traditional callback pattern:
myfile.txt
This is the content of myfile.txt
Create a Node.js file that reads the text file, and return the content:
Example: Reading a file with callbacks
const fs = require('fs');
// Read file asynchronously with callback
fs.readFile('myfile.txt', 'utf8', (err, data) => {
if (err) {
console.error('Error reading file:', err);
return;
console.log('File content:', data);
// For binary data (like images), omit the encoding
fs.readFile('image.png', (err, data) => {
if (err) throw err;
// data is a Buffer containing the file content
console.log('Image size:', data.length, 'bytes');
Run example »
Reading Files with Promises (Modern Approach)
Using
fs.promises
util.promisify
for cleaner async/await syntax:
Example: Reading a file with async/await
// Using fs.promises (Node.js 10.0.0+)
const fs = require('fs').promises;
async function readFileExample() {
try {
const data = await fs.readFile('myfile.txt', 'utf8');
console.log('File content:', data);
} catch (err) {
console.error('Error reading file:', err);
readFileExample();
// Or with util.promisify (Node.js 8.0.0+)
const { promisify } = require('util');
const readFileAsync = promisify(require('fs').readFile);
async function readWithPromisify() {
try {
const data = await readFileAsync('myfile.txt', 'utf8');
console.log(data);
} catch (err) {
console.error(err);
readWithPromisify();
Run example »
Reading Files Synchronously
For simple scripts, you can use synchronous methods, but avoid them in production servers as they block the event loop:
Example: Reading a file synchronously
const fs = require('fs');
try {
// Read file synchronously
const data = fs.readFileSync('myfile.txt', 'utf8');
console.log('File content:', data);
} catch (err) {
console.error('Error reading file:', err);
Best Practice:
Always specify the character encoding (like 'utf8') when reading text files to get a string instead of a Buffer.
Creating and Writing Files
Node.js provides several methods for creating and writing to files.
Here are the most common approaches:
1. Using
fs.writeFile()
Creates a new file or overwrites an existing file with the specified content:
Example: Writing to a file
const fs = require('fs').promises;
async function writeFileExample() {
try {
// Write text to a file
await fs.writeFile('myfile.txt', 'Hello, World!', 'utf8');
// Write JSON data
const data = { name: 'John', age: 30, city: 'New York' };
await fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Files created successfully');
} catch (err) {
console.error('Error writing files:', err);
writeFileExample();
Run example »
2. Using
fs.appendFile()
Appends content to a file, creating the file if it doesn't exist:
Example: Appending to a file
const fs = require('fs').promises;
async function appendToFile() {
try {
// Append a timestamped log entry
const logEntry = `${new Date().toISOString()}: Application started\n`;
await fs.appendFile('app.log', logEntry, 'utf8');
console.log('Log entry added');
} catch (err) {
console.error('Error appending to file:', err);
appendToFile();
Run example »
3. Using File Handles
For more control over file operations, you can use file handles:
Example: Using file handles
const fs = require('fs').promises;
async function writeWithFileHandle() {
let fileHandle;
try {
// Open a file for writing (creates if doesn't exist)
fileHandle = await fs.open('output.txt', 'w');
// Write content to the file
await fileHandle.write('First line\n');
await fileHandle.write('Second line\n');
await fileHandle.write('Third line\n');
console.log('Content written successfully');
} catch (err) {
console.error('Error writing to file:', err);
} finally {
// Always close the file handle
if (fileHandle) {
await fileHandle.close();
writeWithFileHandle();
Run example »
4. Using Streams for Large Files
For writing large amounts of data, use streams to avoid high memory usage:
Example: Writing large files with streams
const fs = require('fs');
const { pipeline } = require('stream/promises');
const { Readable } = require('stream');
async function writeLargeFile() {
// Create a readable stream (could be from HTTP request, etc.)
const data = Array(1000).fill().map((_, i) => `Line ${i + 1}: ${'x'.repeat(100)}\n`);
const readable = Readable.from(data);
// Create a writable stream to a file
const writable = fs.createWriteStream('large-file.txt');
try {
// Pipe the data from readable to writable
await pipeline(readable, writable);
console.log('Large file written successfully');
} catch (err) {
console.error('Error writing file:', err);
writeLargeFile();
Run example »
File Flags:
When opening files, you can specify different modes:
- Open for writing (file is created or truncated)
'wx'
- Like 'w' but fails if the path exists
'w+'
- Open for reading and writing (file is created or truncated)
- Open for appending (file is created if it doesn't exist)
'ax'
- Like 'a' but fails if the path exists
'r+'
- Open for reading and writing (file must exist)
Deleting Files and Directories
Node.js provides several methods to delete files and directories.
Here's how to handle different deletion scenarios:
1. Deleting a Single File
fs.unlink()
to delete a file:
Example: Deleting a file
const fs = require('fs').promises;
async function deleteFile() {
const filePath = 'file-to-delete.txt';
try {
// Check if file exists before deleting
await fs.access(filePath);
// Delete the file
await fs.unlink(filePath);
console.log('File deleted successfully');
} catch (err) {
if (err.code === 'ENOENT') {
console.log('File does not exist');
} else {
console.error('Error deleting file:', err);
deleteFile();
Run example »
2. Deleting Multiple Files
To delete multiple files, you can use Promise.all() with fs.unlink():
Example: Deleting multiple files
const fs = require('fs').promises;
const path = require('path');
async function deleteFiles() {
const filesToDelete = [
'temp1.txt',
'temp2.txt',
'temp3.txt'
try {
// Delete all files in parallel
await Promise.all(
filesToDelete.map(file =>
fs.unlink(file).catch(err => {
if (err.code !== 'ENOENT') {
console.error(`Error deleting ${file}:`, err);
console.log('Files deleted successfully');
} catch (err) {
console.error('Error during file deletion:', err);
deleteFiles();
Run example »
3. Deleting Directories
To delete directories, you have several options depending on your needs:
Example: Deleting directories
const fs = require('fs').promises;
const path = require('path');
async function deleteDirectory(dirPath) {
try {
// Check if the directory exists
const stats = await fs.stat(dirPath);
if (!stats.isDirectory()) {
console.log('Path is not a directory');
return;
// For Node.js 14.14.0+ (recommended)
await fs.rm(dirPath, { recursive: true, force: true });
// For older Node.js versions (deprecated but still works)
// await fs.rmdir(dirPath, { recursive: true });
console.log('Directory deleted successfully');
} catch (err) {
if (err.code === 'ENOENT') {
console.log('Directory does not exist');
} else {
console.error('Error deleting directory:', err);
// Usage
deleteDirectory('directory-to-delete');
Run example »
4. Emptying a Directory Without Deleting It
To remove all files and subdirectories within a directory but keep the directory itself:
Example: Emptying a directory
const fs = require('fs').promises;
const path = require('path');
async function emptyDirectory(dirPath) {
try {
// Read the directory
const files = await fs.readdir(dirPath, { withFileTypes: true });
// Delete all files and directories in parallel
await Promise.all(
files.map(file => {
const fullPath = path.join(dirPath, file.name);
return file.isDirectory()
? fs.rm(fullPath, { recursive: true, force: true })
: fs.unlink(fullPath);
console.log('Directory emptied successfully');
} catch (err) {
console.error('Error emptying directory:', err);
// Usage
emptyDirectory('directory-to-empty');
Run example »
Security Note:
Be extremely careful with file deletion, especially when using recursive options or wildcards. Always validate and sanitize file paths to prevent directory traversal attacks.
Renaming and Moving Files
fs.rename()

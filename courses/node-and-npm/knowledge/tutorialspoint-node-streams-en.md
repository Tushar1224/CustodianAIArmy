# Tutorialspoint Node Streams

Source: https://www.tutorialspoint.com/nodejs/nodejs_streams.htm

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
Node.js - Streams
Previous
Quiz
Next
What are Streams?
A stream is a collection of data. However, unlike an array or a string, the entire data in a stream object is not stored at once in the memory. Instead, a single chunk of data from the stream is brought into the memory, at a time. It makes streams more efficient. Node.js applications are best suited for developing data streaming applications.
Types of streams
Node.js processes four fundamental types of streams −
Writable
− streams to which data can be written.
Readable
− streams from which data can be read.
Duplex
− streams that are both Readable and Writable.
Transform
− Duplex streams that can modify or transform the data as it is written and read.
Each type of Stream is an EventEmitter instance and throws several events at different instance of times. For example, some of the commonly used events are −
data
− This event is fired when there is data is available to read.
− This event is fired when there is no more data to read.
error
− This event is fired when there is any error receiving or writing data.
finish
− This event is fired when all the data has been flushed to underlying system.
The examples in this chapter use a file named input.text with the following data in it.
Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!
Readable Stream
The file object acts as a stream from which the data can be read in a chunk of specific size. In the following example, we call createReadStream() function from fs module to read data from a given file. The on event of the readable stream collects the file contents till the end event is fired.
var fs = require("fs");
var data = '';
// Create a readable stream
var readerStream = fs.createReadStream('input.txt');
// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');
// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
readerStream.on('end',function() {
   console.log(data);
readerStream.on('error', function(err) {
   console.log(err.stack);
console.log("Program Ended");
Save the above script as main.js. Run the above Node.js application. It will display the contents of input.text file.
Writable Stream
The createWriteStream() function from fs module creates an object of writable stream. Its write() method stores the data in the file given to the createWriteStream() function as an argument.
Save the following code with main.js as its name.
var fs = require("fs");
var data = `Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!`;
// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');
// Write the data to stream with encoding to be utf8
writerStream.write(data,'UTF8');
// Mark the end of file
writerStream.end();
// Handle stream events --> finish, and error
writerStream.on('finish', function() {
   console.log("Write completed.");
writerStream.on('error', function(err){
   console.log(err.stack);
console.log("Program Ended");
Now open output.txt created in your current directory to check if it contains the given data.
Piping the Streams
Piping is a mechanism where we provide the output of one stream as the input to another stream. It is normally used to get data from one stream and to pass the output of that stream to another stream. There is no limit on piping operations. Now we'll show a piping example for reading from one file and writing it to another file.
Create a js file named main.js with the following code −
var fs = require("fs");
// Create a readable stream
var readerStream = fs.createReadStream('input.txt');
// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');
// Pipe the read and write operations
// read input.txt and write data to output.txt
readerStream.pipe(writerStream);
console.log("Program Ended");
Now run the main.js to see the result −
node main.js
Verify the Output.
Program Ended
Open output.txt created in your current directory; it should contain the following −
Tutorials Point is giving self learning content
to teach the world in simple and easy way!!!!!
Chaining the Streams
Chaining is a mechanism to connect the output of one stream to another stream and create a chain of multiple stream operations. It is normally used with piping operations. Now we'll use piping and chaining to first compress a file and then decompress the same.
Create a js file named main.js with the following code −
var fs = require("fs");
var zlib = require('zlib');
// Compress the file input.txt to input.txt.gz
fs.createReadStream('input.txt')
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('input.txt.gz'));
console.log("File Compressed.");
Now run the main.js to see the result −
node main.js
Verify the Output.
File Compressed.
You will find that input.txt has been compressed and it created a file input.txt.gz in the current directory. Now let's try to decompress the same file using the following code −
var fs = require("fs");
var zlib = require('zlib');
// Decompress the file input.txt.gz to input.txt
fs.createReadStream('input.txt.gz')
   .pipe(zlib.createGunzip())
   .pipe(fs.createWriteStream('input.txt'));
console.log("File Decompressed.");
Now run the main.js to see the result −
node main.js
Verify the Output.
File Decompressed.
Print Page
Previous
Quiz
Next
Advertisements

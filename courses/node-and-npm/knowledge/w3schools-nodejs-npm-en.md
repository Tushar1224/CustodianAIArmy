# w3schools-nodejs-npm

Source: https://www.w3schools.com/nodejs/nodejs_npm.asp

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
❮ Previous
Next ❯
What is NPM?
NPM is a package manager for Node.js packages, or modules if you like.
www.npmjs.com
hosts thousands of free packages to download and use.
The NPM program is installed on your computer when you install Node.js
If you installed Node.js, NPM is already ready to run on your computer!
What is a Package?
A package in Node.js contains all the files you need for a module.
Modules are JavaScript libraries you can include in your project.
Download a Package
Downloading a package is very easy.
Open the command line interface and tell NPM to download the package you want.
I want to download a package called "upper-case":
Download "upper-case":
C:\Users\
Your Name
>npm install upper-case
Now you have downloaded and installed your first package!
NPM creates a folder named "node_modules", where the package will be placed.
All packages you install in the future will be placed in this folder.
My project now has a folder structure like this:
C:\Users\
My Name
\node_modules\upper-case
Using a Package
Once the package is installed, it is ready to use.
Include the "upper-case" package the same way you include any other module:
let uc = require('upper-case');
Create a Node.js file that will convert the output "Hello World!" into upper-case letters:
Example
let http = require('http');
let uc = require('upper-case');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write(uc.upperCase("Hello World!"));
res.end();
}).listen(8080);
Run example »
Save the code above in a file called "demo_uppercase.js", and initiate the file:
Initiate demo_uppercase:
C:\Users\
Your Name
>node demo_uppercase.js
If you have followed the same steps on your computer, you will see the same result as the example:
http://localhost:8080
Global Packages
Packages can be installed globally, making them available as command-line tools anywhere on your system.
Global packages are typically used for CLI tools and utilities.
Install a package globally:
npm install -g package-name
Example: Install the http-server package globally
npm install -g http-server
After installation, you can run the package from any directory:
http-server
Note:
On some systems, you might need administrator/root privileges to install packages globally.
On Unix-like systems, use
sudo
before the command.
Updating Packages
To keep your packages up to date, you can update them using the following commands:
Update a specific package:
npm update package-name
Update all packages in your project:
npm update
Check for outdated packages:
npm outdated
Tip:
To update npm itself, run:
npm install -g npm@latest
Uninstalling a Package
To remove a package that you no longer need, you can use the uninstall command:
Remove a package:
npm uninstall package-name
Remove a global package:
npm uninstall -g package-name
Remove a package and its dependencies:
npm uninstall --save package-name
Note:
--save
flag updates your package.json file to remove the dependency.
For older versions of npm, you might need to use
--save-dev
for development dependencies.
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

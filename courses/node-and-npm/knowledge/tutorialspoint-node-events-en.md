# Tutorialspoint Node Events

Source: https://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm

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
Node.js - Event Loop
Previous
Quiz
Next
Even though JavaScript is single threaded, Node.js employs event loop to perform asynchronous non-blocking I/O operations, by delegating the operations to the system kernel whenever possible. Most modern OS kernels are multi-threaded, capable of handling multiple operations by executing them in the background. When the current operation is completed, the kernel informs Node.js so that the appropriate callback may be added to the poll queue to eventually be executed.
The event loop is initialized as soon as Node.js starts, either by providing a .js script or in REPL mode. The order of operations of the event loop are shown in the figure below −
The Timers phase executes callbacks scheduled by setTimeout() and setInterval().
The pending callbacks phase executes I/O callbacks deferred to the next loop iteration.
The poll phase has two main functions: (a) calculating how long it should block and poll for I/O, and (b) processing events in the poll queue. Node.js retrieves new I/O events and executes I/O related callbacks in this phase.
The check phase executes the callbacks immediately after the poll phase has completed. If the poll phase becomes idle and scripts have been queued with setImmediate() timer. The event loop continues to the check phase rather than waiting. The libuv library is a part of Node.js runtime, playing the role of providing support for handling asynchronous operations.
The V8 engine handles the execution of JavaScript code, whereas the Libuv library utilizes the native mechanism of the respective operating system to hanle asynchronous operations.
Finally, the close callbacks phase handles the callbacks registered with close event such as socket.on(close, function).  The close event will be emitted if the socket is closed abruptly, otherwise it will be emitted by process.nextTick() method to defer the execution of a function until the next iteration of the event loop.
Before beginning the next run of the event loop, Node.js checks if it is waiting for any asynchronous I/O or timers. If there arent any, the runtime shuts down cleanly.
Understanding how the event loop works is essential for building scalable Node.js applications. The event loop is a fundamental part of Node.js that enables asynchronous programming by ensuring the main thread is not blocked.
Print Page
Previous
Quiz
Next
Advertisements

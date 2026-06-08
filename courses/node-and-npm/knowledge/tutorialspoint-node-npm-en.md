# Tutorialspoint Node Npm

Source: https://www.tutorialspoint.com/nodejs/nodejs_npm.htm

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
Node.js - NPM
Previous
Quiz
Next
is the default package manager for the Node.js. It helps the user to manage the JavaScript packages, libraries and dependencies efficiently. With the help of the NPM, we can install, update and manage the packages for the Node.js.
NPM will get installed automatically, when we install the Node.js
Checking NPM version
To check, whether the NPM is installed or not and to observe its version, use the following command:
PS C:\Users\Lenovo> npm -v
10.9.2
Installing a Package Locally
The packages which are installed locally are placed inside the node_modules directory of the project and recorded in the package.json. This approach ensures that the every project maintains its own set of dependencies, avoiding conflicts between the different projects that may require different versions of the same package.
Let's look at the simple example, where we are going to install a package:
npm install express
This installs the package inside the node_modules directory and adds it to the package.json under dependencies. If we need to install the specific version of the package, use the following command:
npm install <package-name>@<version>
Example
npm install express@4.17.1
Benefits of Local Installation
Version Control
− The local installations allows for the specific versioning of dependencies, ensuring the stability across the environments.
Security
− Using the locally installed packages prevents the unexpected changes that can happen with the globally installed ones.
Package Installation with Flags
--save-dev
− It installs the package as a development dependency (for testing, linting, etc). For example,
npm install jest --save-dev
--save-exact
− It installs the package and locks the exact version in the package.json.
--no-save
− It installs the package without adding it to the package.json.
By understanding these installation methods helps in maintaining the well-structured and scalable Node.js project.
Installing a Package Globally
Global installation allows to access the package from anywhere on your system, making it particularly useful for the command-line tools.
Unlike the local installations, which are project-specific, global installations enable tools to be used across multiple projects without requiring repeated installations. For installing the package globally use the following command.
npm install -g <package-name>
Example
npm install -g nodemon
Benefits of Global Installation
It is useful for CLI tools like nodemon, typescript or eslint.
It enables access to the command system-wide without needing project-level installation.
It helps to streamline development workflows.
Managing Global Packages
For checking the outdated global packages and ensuring we are using the latest versions of globally installed tools, use the following command.
npm outdated -g
For Updating the global package and ensuring we are using the latest features and security patches, use the following command.
npm update -g <package-name>
Managing Dependencies
The dependency management is crucial for maintaining a stable and efficient project. NPM provides a multiple ways to handle dependencies, ensuring the smooth development and deployment. Below are the various aspects of dependency management in NPM.
Listing Installed Packages
NPM has the list command that allows to view the installed packages in the project. This can be useful for debugging, ensuring that the correct packages are installed or verifying their versions. To view all the installed packages (Locally) use the following command.
npm list
Output
When we execute, it will generate the following output.
express@1.0.0 C:\Users\Lenovo
+-- dotenv@16.4.7
+-- express@4.17.1
+-- jest@29.7.0
`-- mongoose@8.10.0
For globally installed packages.
npm list -g --depth=0
Output
When executed, it will generate an output as shown below:
C:\Users\Lenovo\AppData\Roaming\npm
`-- nodemon@3.1.9
Checking Package Versions
It is the crucial part of managing dependencies in a Node.js project. By knowing the version of installed packages, we can ensure that the project uses the correct and compatible versions, avoiding issues that arises from versions mismatches.
NPM provides the commands that allows to check the current version of a package and explore available versions. For checking the latest available version of a package use the following command.
npm show <package-name> version
For checking all available versions:
npm show <package-name> versions
Removing a Package
Removing the packages is the essential part of dependency management in any Node.js project. In some cases, we need to uninstall a package that is no longer necessary to save space or reduce complexity.
NPM provides a several ways to uninstall the packages, both locally and globally. For removing a package from the project use the following command.
npm uninstall <package-name>
For removing globally
npm uninstall -g <package-name>
Print Page
Previous
Quiz
Next
Advertisements

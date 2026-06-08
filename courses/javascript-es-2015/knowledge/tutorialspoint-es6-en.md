# Tutorialspoint Es6

Source: https://www.tutorialspoint.com/es6/es6_quick_guide.htm

ES6 - Home
ES6 - Overview
ES6 - Environment
ES6 - Syntax
ES6 - Variables
ES6 - Operators
ES6 - Decision Making
ES6 - Loops
ES6 - Functions
ES6 - Events
ES6 - Cookies
ES6 - Page Redirect
ES6 - Dialog Boxes
ES6 - Void Keyword
ES6 - Page Printing
ES6 - Objects
ES6 - Number
ES6 - Boolean
ES6 - Strings
ES6 - Symbol
ES6 - New String Methods
ES6 - Arrays
ES6 - Date
ES6 - Math
ES6 - RegExp
ES6 - HTML DOM
ES6 - Iterator
ES6 - Collections
ES6 - Classes
ES6 - Maps And Sets
ES6 - Promises
ES6 - Modules
ES6 - Error Handling
ES6 - Object Extensions
ES6 - Reflect API
ES6 - Proxy API
ES6 - Validations
ES6 - Animation
ES6 - Multimedia
ES6 - Debugging
ES6 - Image Map
ES6 - Browsers
ES7 - New Features
ES8 - New Features
ES9 - New Features
ES6 Useful Resources
ES6 - Quick Guide
ES6 - Useful Resources
ES6 - Discussion
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
ES6 - Quick Guide
Previous
Next
ES6 - Overview
ECMAScript (ES) is a scripting language specification standardized by ECMAScript International. It is used by applications to enable client-side scripting. The specification is influenced by programming languages like Self, Perl, Python, Java etc. Languages like JavaScript, Jscript and ActionScript are governed by this specification.
This tutorial introduces you to ES6 implementation in JavaScript.
JavaScript
JavaScript was developed by Brendan Eich, a developer at Netscape Communications Corporation, in 1995.JavaScript started life with the name Mocha, and was briefly named LiveScript before being officially renamed to JavaScript. It is a scripting language that is executed by the browser, i.e. on the clients end. It is used in conjunction with HTML to develop responsive webpages.
ECMA Script6s implementation discussed here covers the following new features −
Support for constants
Block Scope
Arrow Functions
Extended Parameter Handling
Template Literals
Extended Literals
Enhanced Object Properties
De-structuring Assignment
Modules
Classes
Iterators
Generators
Collections
New built in methods for various classes
Promises
ECMAScript Versions
There are nine editions of ECMA-262 which are as follows −
Edition
Name
Description
ECMAScript 1
First Edition released in 1997
ECMAScript 2
Second Edition released in 1998, minor changes to meet ISO/IEC 16262 standard
ECMAScript 3
Third Edition released in 1999 with language enhancements
ECMAScript 4
Fourth Edition release plan was dropped, few features added later in ES6 & other complex features dropped
ECMAScript 5
Fifth Edition released in 2009
ECMAScript 5.1
5.1 Edition released in 2011, minor changes to meet ISO/IEC 16262:2011 standard
ECMAScript 2015/ES6
Sixth Edition released in 2015, see ES6 chapters for new features
ECMAScript 2016/ES7
Seventh Edition released in 2016, see ES7 chapters for new features
ECMAScript 2017/ES8
Eight Edition released in 2017, see ES8 chapters for new features
ECMAScript 2018/ES9
Ninth Edition released in 2018, see ES9 chapters for new features
ES6 - Environment
In this chapter, we will discuss the setting up of the environment for ES6.
Local Environment Setup
JavaScript can run on any browser, any host, and any OS. You will need the following to write and test a JavaScript program standard −
Text Editor
The text editor helps you to write your source code. Examples of few editors include Windows Notepad, Notepad++, Emacs, vim or vi etc. Editors used may vary with the operating systems. The source files are typically named with the
extension.js
Installing Node.js
Node.js
is an open source, cross-platform runtime environment for server-side JavaScript. Node.js is required to run JavaScript without a browser support. It uses Google V8 JavaScript engine to execute the code. You may download Node.js source code or a pre-built installer for your platform. Node is available at
https://nodejs.org/en/download
Installation on Windows
Download and run the
.msi installer
for Node
To verify if the installation was successful, enter the command
node v
in the terminal window.
Installation on Mac OS X
To install node.js on OS X you can download a pre-compiled binary package which makes a nice and easy installation. Head over to
www.nodejs.org
and click the install button to download the latest package.
Install the package from the
.dmg
by following along the install wizard which will install both
node
. npm is the Node Package Manager which facilitates installs of additional packages for Node.js.
Installation on Linux
You need to install a number of
dependencies
before you can install Node.js and npm.
Ruby
. Youll need Ruby 1.8.6 or newer and GCC 4.2 or newer
Homebrew.
Homebrew is a package manager originally for the Mac, but its been ported to Linux as Linuxbrew. You can learn more about Homebrew at the
http://brew.sh/
at the
https://docs.brew.sh/Homebrew-on-Linux
Integrated Development Environment (IDE) Support
JavaScript can be built on a plethora of development environments like Visual Studio, Sublime Text 2, WebStorm/PHPStorm, Eclipse, Brackets, etc. The Visual Studio Code and Brackets IDE is discussed in this section. The development environment used here is Visual Studio Code (Windows platform).
Visual Studio Code
This is open source IDE from Visual Studio. It is available for Mac OS X, Linux, and Windows platforms. VScode is available at
https://code.visualstudio.com
Installation on Windows
Download Visual Studio Code for Windows.
Double-click on VSCodeSetup.exe
to launch the setup process. This will only take a minute.
Following is the screenshot of the IDE.
You may directly traverse to the files path by a right-click on the file → open in command prompt. Similarly, the
Reveal in Explorer
option shows the file in the File Explorer.
Installation on Mac OS X
Visual Studio Codes Mac OS X specific installation guide can be found at
https://code.visualstudio.com/docs/setup/setup-overview
Installation on Linux
Linux specific installation guide for Visual Studio Code can be found at
https://code.visualstudio.com/Docs/editor/setup.
Brackets
Brackets is a free open-source editor for web development, created by Adobe Systems. It is available for Linux, Windows and Mac OS X. Brackets is available at
http://brackets.io
You can run DOS prompt/Shell within Brackets itself by adding one more extension Brackets Shell.
Upon installation, you will find an icon of shell on the right hand side of the editor
. Once you click on the icon, you will see the shell window as shown in the following screenshot.
You are all set!!!
ES6 - Syntax
Syntax
defines the set of rules for writing programs. Every language specification defines its own syntax.
A JavaScript program can be composed of −
Variables
− Represents a named memory block that can store values for the program.
Literals
− Represents constant/fixed values.
Operators
− Symbols that define how the operands will be processed.
Keywords
− Words that have a special meaning in the context of a language.
The following table lists some keywords in JavaScript. Some commonly used keywords are listed in the following table.
break
Switch
case
throw
Else
number
string
module
type
instanceof
Typeof
finally
enum
Export
while
void
this
null
super
Catch
static
return
True
False
Modules
− Represents code blocks that can be reused across different programs/scripts.
Comments
− Used to improve code readability. These are ignored by the JavaScript engine.
Identifiers
− These are the names given to elements in a program like variables, functions, etc. The rules for identifiers are −
Identifiers can include both, characters and digits. However, the identifier cannot begin with a digit.
Identifiers cannot include special symbols except for underscore (_) or a dollar sign ($).
Identifiers cannot be keywords. They must be unique.
Identifiers are case sensitive. Identifiers cannot contain spaces.
The following table illustrates some valid and invalid identifiers.
Examples of valid identifiers
Examples of invalid identifiers
firstName
first_name
num1
$result
Var#
first name
first-name
1number
Whitespace and Line Breaks
ES6 ignores spaces, tabs, and newlines that appear in programs. You can use spaces, tabs, and newlines freely in your program and you are free to format and indent your programs in a neat and consistent way that makes the code easy to read and understand.
JavaScript is Case-sensitive
JavaScript is case-sensitive. This means that JavaScript differentiates between the uppercase and the lowercase characters.
Semicolons are Optional
Each line of instruction is called a
statement
. Semicolons are optional in JavaScript.
Example
console.log("hello world") 
console.log("We are learning ES6")
A single line can contain multiple statements. However, these statements must be separated by a semicolon.
Comments in JavaScript
Comments
are a way to improve the readability of a program. Comments can be used to include additional information about a program like the author of the code, hints about a function/construct, etc. Comments are ignored by the compiler.
JavaScript supports the following types of comments −
Single-line comments (//)
− Any text between a // and the end of a line is treated as a comment.
Multi-line comments (/*   */)
− These comments may span multiple lines.
Example
//this is single line comment  
/* This is a  
Multi-line comment 
Your First JavaScript Code
Let us start with the traditional Hello World example".
var message = "Hello World" 
console.log(message)
The program can be analyzed as −
Line 1 declares a variable by the name message. Variables are a mechanism to store values in a program.
Line 2 prints the variables value to the prompt. Here, the console refers to the terminal window. The function log () is used to display the text on the screen.
Executing the Code
We shall use Node.js to execute our code.
Step 1
− Save the file as Test.js
Step 2
− Right-click the Test.js file under the working files option in the project-explorer window of the Visual Studio Code.
Step 3
− Select Open in Command Prompt option.
Step 4
− Type the following command in Nodes terminal window.
node Test.js
The following output is displayed on successful execution of the file.
Hello World
Node.js and JS/ES6
ECMAScript 2015(ES6) features are classified into three groups −
For Shipping
− These are features that V8 considers stable.
Staged Features
− These are almost completed features but not considered stable by the V8 team.
In Progress
− These features should be used only for testing purposes.
The first category of features is fully supported and turned on by default by node. Staged features require a runtime - - harmony flag to execute.
A list of component specific CLI flags for Node.js can be found here −
https://nodejs.org/api/cli.html
The Strict Mode
The fifth edition of the ECMAScript specification introduced the Strict Mode. The Strict Mode imposes a layer of constraint on JavaScript. It makes several changes to normal JavaScript semantics.
The code can be transitioned to work in the Strict Mode by including the following −
// Whole-script strict mode syntax 
"use strict"; 
 v = "Hi!  I'm a strict mode script!";  // ERROR: Variable v is not declared
In the above snippet, the entire code runs as a constrained variant of JavaScript.
JavaScript also allows to restrict, the Strict Mode within a blocks scope as that of a function. This is illustrated as follows −
v = 15 
function f1() { 
   "use strict"; 
   var v = "Hi!  I'm a strict mode script!"; 
In, the above snippet, any code outside the function will run in the non-strict mode. All statements within the function will be executed in the Strict Mode.
ES6 and Hoisting
The JavaScript engine, by default, moves declarations to the top. This feature is termed as
hoisting
. This feature applies to variables and functions. Hoisting allows JavaScript to use a component before it has been declared. However, the concept of hoisting does not apply to scripts that are run in the Strict Mode.
Variable Hoisting and Function Hoisting are explained in the subsequent chapters.
ES6 - Variables
variable
, by definition, is a named space in the memory that stores values. In other words, it acts as a container for values in a program. Variable names are called
identifiers
. Following are the naming rules for an identifier −
Identifiers cannot be keywords.
Identifiers can contain alphabets and numbers.
Identifiers cannot contain spaces and special characters, except the underscore (_) and the dollar ($) sign.
Variable names cannot begin with a number.
Type Syntax
A variable must be declared before it is used. ES5 syntax used the
keyword to achieve the same. The ES5 syntax for declaring a variable is as follows.
//Declaration using var keyword 
var  variable_name
ES6 introduces the following variable declaration syntax −
Using the let.
Using the const.
Variable initialization
refers to the process of storing a value in the variable. A variable may be initialized either at the time of its declaration or at a later point in time.
The traditional ES5 type syntax for declaring and initializing a variable is as follows −
//Declaration using var keyword 
var variable_name = value
Example : Using Variables
var name = "Tom" 
console.log("The value in the variable is: "+name)
The above example declares a variable and prints its value.
The following output is displayed on successful execution.
The value in the variable is Tom
JavaScript and Dynamic Typing
JavaScript is an un-typed language. This means that a JavaScript variable can hold a value of any data type. Unlike many other languages, you don't have to tell JavaScript during variable declaration what type of value the variable will hold. The value type of a variable can change during the execution of a program and JavaScript takes care of it automatically. This feature is termed as
dynamic typing
JavaScriptVariable Scope
The scope of a variable is the region of your program in which it is defined. Traditionally, JavaScript defines only two scopes-global and local.
Global Scope
− A variable with global scope can be accessed from within any part of the JavaScript code.
Local Scope
− A variable with a local scope can be accessed from within a function where it is declared.
Example : Global vs. Local Variable
The following example declares two variables by the name
- one outside the function (global scope) and the other within the function (local scope).
var num = 10 
function test() { 
   var num = 100 
   console.log("value of num in test() "+num) 
console.log("value of num outside test() "+num) 
test()
The variable when referred to within the function displays the value of the locally scoped variable. However, the variable
when accessed outside the function returns the globally scoped instance.
The following output is displayed on successful execution.
value of num outside test() 10
value of num in test() 100
ES6 defines a new variable scope - The Block scope.
The Let and Block Scope
The block scope restricts a variables access to the block in which it is declared. The
keyword assigns a function scope to the variable. Unlike the var keyword, the
keyword allows the script to restrict access to the variable to the nearest enclosing block.
"use strict" 
function test() { 
   var num = 100 
   console.log("value of num in test() "+num) { 
      console.log("Inner Block begins") 
      let num = 200 
      console.log("value of num : "+num)  
test()
The script declares a variable
within the local scope of a function and re-declares it within a block using the let keyword. The value of the locally scoped variable is printed when the variable is accessed outside the inner block, while the block scoped variable is referred to within the inner block.
Note
− The strict mode is a way to opt in to a restricted variant of JavaScript.
The following output is displayed on successful execution.
value of num in test() 100 
Inner Block begins 
value of num : 200
Example: let v/s var
var no = 10; 
var no = 20; 
console.log(no);
The following output is displayed on successful execution of the above code.
Let us re-write the same code using the
keyword.
let no = 10; 
let no = 20; 
console.log(no);
The above code will throw an error: Identifier 'no' has already been declared. Any variable declared using the let keyword is assigned the block scope.
let and block level safety
If we try to declare a
variable twice within the same block, it will throw an error. Consider the following example −
<script>
   let balance = 5000 // number type
   console.log(typeof balance)
   let balance = {message:"hello"} // changing number to object type
   console.log(typeof balance)
</script>
The above code will result in the following error −
Uncaught SyntaxError: Identifier 'balance' has already been declared
let and multiple blocks
However, the same
variable can be used in different block level scopes without any syntax errors.
Example
<script>
   let count = 100
   for (let count = 1;count <= 10;count++){
      //inside for loop brackets ,count value starts from 1
      console.log("count value inside loop is ",count);
   //outside for loop brackets ,count value is 100
   console.log("count value after loop is",count);
   if(count == 100){
      //inside if brackets ,count value is 50
      let count = 50;
      console.log("count inside if block",count);
   console.log(count);
</script>
The output of the above code will be as follows −
count value inside loop is 1
count value inside loop is 2
count value inside loop is 3
count value inside loop is 4
count value inside loop is 5
count value inside loop is 6
count value inside loop is 7
count value inside loop is 8
count value inside loop is 9
count value inside loop is 10
count value after loop is 100
count inside if block 50
The const
const
declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned. Constants are block-scoped, much like variables defined using the let statement. The value of a constant cannot change through re-assignment, and it can't be re-declared.
The following rules hold true for a variable declared using the
const
keyword −
Constants cannot be reassigned a value.
A constant cannot be re-declared.
A constant requires an initializer. This means constants must be initialized during its declaration.
The value assigned to a
const
variable is mutable.
Example
const x = 10
x = 12 // will result in an error!!
The above code will return an error since constants cannot be reassigned a value. Constants variable are immutable.
Constants are Immutable
Unlike variables declared using
keyword,
constants
are immutable. This means its value cannot be changed. For example, if we try to change value of the constant variable, an error will be displayed.
<script>
   let income = 100000
   const INTEREST_RATE = 0.08
   income += 50000 // mutable
   console.log("changed income value is ",income)
   INTEREST_RATE += 0.01
   console.log("changed rate is ",INTEREST_RATE) //Error: not mutable
</script>
The output of the above code will be as follows −
changed income value is 150000
Uncaught TypeError: Assignment to constant variable
const and arrays
The following example shows how to create an immutable array. New elements can be added to the array. However, reinitializing the array will result in an error as shown below −
<script>
   const DEPT_NOS = [10,20,30,50]
   DEPT_NOS.push(40)
   console.log('dept numbers is ',DEPT_NOS)
   const EMP_IDS = [1001,1002,1003]
   console.log('employee ids',EMP_IDS)
   //re assigning variable employee ids
   EMP_IDS = [2001,2002,2003]
   console.log('employee ids after changing',EMP_IDS)
</script>
The output of the above code will be as shown below −
dept numbers is (5) [10, 20, 30, 50, 40]
employee ids (3) [1001, 1002, 1003]
Uncaught TypeError: Assignment to constant variable.
The var keyword
Prior to ES6, the
keyword was used to declare a variable in JavaScript. Variables declared using
do not support block level scope. This means if a variable is declared in a loop or
if block
it can be accessed outside the loop or the
if block
. This is because the variables declared using the
keyword support hoisting.
var and hoisting
Variable hoisting
allows the use of a variable in a JavaScript program, even before it is declared. Such variables will be initialized to
undefined
by default. JavaScript runtime will scan for variable declarations and put them to the top of the function or script. Variables declared with
keyword get hoisted to the top. Consider the following example −
<script>
   variable company is hoisted to top , var company = undefined
   console.log(company); // using variable before declaring
   var company = "TutorialsPoint"; // declare and initialized here
   console.log(company);
</script>
The output of the above code will be as shown below −
undefined
TutorialsPoint
var and block scope
block scope
restricts a variables access to the block in which it is declared. The

# Tutorialspoint Python Modules

Source: https://www.tutorialspoint.com/python/python_modules.htm

Python - Home
Python - Overview
Python - History
Python - Features
Python vs C++
Python - Hello World Program
Python - Application Areas
Python - Interpreter
Python - Environment Setup
Python - Virtual Environment
Python - Basic Syntax
Python - Variables
Python - Private Variables
Python - Data Types
Python - Type Casting
Python - Unicode System
Python - Literals
Python - Operators
Python - Arithmetic Operators
Python - Comparison Operators
Python - Assignment Operators
Python - Logical Operators
Python - Bitwise Operators
Python - Membership Operators
Python - Identity Operators
Python - Walrus Operator
Python - Operator Precedence
Python - Comments
Python - User Input
Python - Numbers
Python - Booleans
Python - Floating Points
Python - Control Flow
Python - Decision Making
Python - If Statement
Python - If else
Python - Nested If
Python - Conditional User Inputs
Python - Match-Case Statement
Python - Loops
Python - for Loops
Python - for-else Loops
Python - While Loops
Python - break Statement
Python - continue Statement
Python - pass Statement
Python - Nested Loops
Python Functions & Modules
Python - Functions
Python - Default Arguments
Python - Keyword Arguments
Python - Keyword-Only Arguments
Python - Positional Arguments
Python - Positional-Only Arguments
Python - Arbitrary Arguments
Python - Variables Scope
Python - Function Annotations
Python - Modules
Python - Packing and Unpacking
Python - Built in Functions
Python Strings
Python - Strings
Python - Slicing Strings
Python - Modify Strings
Python - String Concatenation
Python - String Formatting
Python - Escape Characters
Python - String Methods
Python - String Exercises
Python Lists
Python - Lists
Python - Access List Items
Python - Change List Items
Python - Add List Items
Python - Remove List Items
Python - Loop Lists
Python - List Comprehension
Python - Sort Lists
Python - Copy Lists
Python - Join Lists
Python - List Methods
Python - List Exercises
Python Tuples
Python - Tuples
Python - Access Tuple Items
Python - Update Tuples
Python - Unpack Tuples
Python - Loop Tuples
Python - Join Tuples
Python - Tuple Methods
Python - Namedtuple
Python - Tuple Exercises
Python Sets
Python - Sets
Python - Access Set Items
Python - Add Set Items
Python - Remove Set Items
Python - Loop Sets
Python - Join Sets
Python - Copy Sets
Python - Set Operators
Python - Set Methods
Python - Set Exercises
Python Dictionaries
Python - Dictionaries
Python - Access Dictionary Items
Python - Change Dictionary Items
Python - Add Dictionary Items
Python - Remove Dictionary Items
Python - Dictionary View Objects
Python - Loop Dictionaries
Python - Copy Dictionaries
Python - Nested Dictionaries
Python - Dictionary Methods
Python - Dictionary Exercises
Python Arrays
Python - Arrays
Python - Access Array Items
Python - Add Array Items
Python - Remove Array Items
Python - Loop Arrays
Python - Copy Arrays
Python - Reverse Arrays
Python - Sort Arrays
Python - Join Arrays
Python - Array Methods
Python - Array Exercises
Python File Handling
Python - File Handling
Python - Write to File
Python - Read Files
Python - Renaming and Deleting Files
Python - Directories
Python - File Methods
Python - OS File/Directory Methods
Python - OS Path Methods
Object Oriented Programming
Python - OOPs Concepts
Python - Classes & Objects
Python - Class Attributes
Python - Class Methods
Python - Static Methods
Python - Constructors
Python - Access Modifiers
Python - Inheritance
Python - Multiple Inheritance
Python - Multilevel Inheritance
Python - Polymorphism
Python - Method Overriding
Python - Method Overloading
Python - Dynamic Binding
Python - Dynamic Typing
Python - Abstraction
Python - Encapsulation
Python - Interfaces
Python - Packages
Python - Inner Classes
Python - Anonymous Class and Objects
Python - Singleton Class
Python - Wrapper Classes
Python - Enums
Python - Reflection
Python - Data Classes
Python Errors & Exceptions
Python - Syntax Errors
Python - Exceptions
Python - try-except Block
Python - try-finally Block
Python - Raising Exceptions
Python - Exception Chaining
Python - Nested try Block
Python - User-defined Exception
Python - Logging
Python - Assertions
Python - Warnings
Python - Built-in Exceptions
Python - Debugger (PDB)
Python Multithreading
Python - Multithreading
Python - Thread Life Cycle
Python - Creating a Thread
Python - Starting a Thread
Python - Joining Threads
Python - Naming Thread
Python - Thread Scheduling
Python - Thread Pools
Python - Main Thread
Python - Thread Priority
Python - Daemon Threads
Python - Synchronizing Threads
Python Synchronization
Python - Inter-thread Communication
Python - Thread Deadlock
Python - Interrupting a Thread
Python Networking
Python - Networking
Python - Socket Programming
Python - URL Processing
Python - Generics
Python Libraries
NumPy Tutorial
Pandas Tutorial
SciPy Tutorial
Matplotlib Tutorial
Django Tutorial
OpenCV Tutorial
Python Miscellenous
Python - Date & Time
Python - Maths
Python - Iterators
Python - Generators
Python - Generator Expressions
Python - Lambda Expressions
Python - Closures
Python - Decorators
Python - Recursion
Python - Reg Expressions
Python - PIP
Python - Database Access
Python - Weak References
Python - Serialization
Python - Templating
Python - Output Formatting
Python - Performance Measurement
Python - Data Compression
Python - CGI Programming
Python - XML Processing
Python - GUI Programming
Python - Command-Line Arguments
Python - Docstrings
Python - JSON
Python - Sending Email
Python - Further Extensions
Python - Tools/Utilities
Python - Odds and Ends
Python - GUIs
Python Advanced Concepts
Python - Abstract Base Classes
Python - Custom Exceptions
Python - Higher Order Functions
Python - Object Internals
Python - Memory Management
Python - Metaclasses
Python - Metaprogramming with Metaclasses
Python - Mocking and Stubbing
Python - Monkey Patching
Python - Signal Handling
Python - Type Hints
Python - Automation Tutorial
Python - Humanize Package
Python - Context Managers
Python - Coroutines
Python - Descriptors
Python - Diagnosing and Fixing Memory Leaks
Python - Immutable Data Structures
Python - Domain Specific Language (DSL)
Python - Data Model
Python Useful Resources
Python - Questions & Answers
Python - Interview Questions & Answers
Python - Online Quiz
Python - Quick Guide
Python - Reference
Python - Cheatsheet
Python - Projects
Python - Useful Resources
Python - Discussion
Python Compiler
NumPy Compiler
Matplotlib Compiler
SciPy Compiler
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
Python - Modules
Previous
Quiz
Next
Python Modules
The concept of
module
in Python further enhances the modularity. You can define more than one related functions together and load required functions. A module is a file containing definition of functions,
classes
variables
, constants or any other Python object. Contents of this file can be made available to any other program. Python has the
import
keyword for this purpose.
function
is a block of organized, reusable code that is used to perform a single, related action. Functions provide better modularity for your application and a high degree of code reusing.
Example of Python Module
import math
print ("Square root of 100:", math.sqrt(100))
It will produce the following
output
Square root of 100: 10.0
Python Built-in Modules
Python's standard library comes bundled with a large number of modules. They are called built-in modules. Most of these built-in modules are written in C (as the reference implementation of Python is in C), and pre-compiled into the library. These modules pack useful functionality like system-specific OS management, disk IO, networking, etc.
Here is a select list of built-in modules −
Sr.No.
Name & Brief Description
This module provides a unified interface to a number of operating system functions.
string
This module contains a number of functions for string processing
This module provides a set of powerful regular expression facilities. Regular expression (RegEx), allows powerful string search and matching for a pattern in a string
math
This module implements a number of mathematical operations for floating point numbers. These functions are generally thin wrappers around the platform C library functions.
cmath
This module contains a number of mathematical operations for complex numbers.
datetime
This module provides functions to deal with dates and the time within a day. It wraps the C runtime library.
This module provides an interface to the built-in garbage collector.
asyncio
This module defines functionality required for asynchronous processing
Collections
This module provides advanced Container datatypes.
functools
This module has Higher-order functions and operations on callable objects. Useful in functional programming
operator
Functions corresponding to the standard operators.
pickle
Convert Python objects to streams of bytes and back.
socket
Low-level networking interface.
sqlite3
A DB-API 2.0 implementation using SQLite 3.x.
statistics
Mathematical statistics functions
typing
Support for type hints
venv
Creation of virtual environments.
json
Encode and decode the JSON format.
wsgiref
WSGI Utilities and Reference Implementation.
unittest
Unit testing framework for Python.
random
Generate pseudo-random numbers
Provides functions that acts strongly with the interpreter.
requests
It simplifies HTTP requests by offering a user-friendly interface for sending and handling responses.
itertools
An iterator object is used to traverse through a collection (i.e., list, tuple etc..). This module provides various tools which are used to create and manipulate iterators.
locale
locale
module in Python is used to set and manage cultural conventions for formatting data. It allows programmers to adapt their programs to different languages and regional formatting standards by changing how numbers, dates, and currencies are displayed.
Python User-defined Modules
Any text file with
extension and containing Python code is basically a module. It can contain definitions of one or more functions, variables, constants as well as classes. Any Python object from a module can be made available to interpreter session or another Python script by import statement. A module can also include runnable code.
Creating a Python Module
Creating a module is nothing but saving a Python code with the help of any editor. Let us save the following code as
mymodule.py
def SayHello(name):
   print ("Hi {}! How are you?".format(name))
   return
You can now import mymodule in the current Python terminal.
>>> import mymodule
>>> mymodule.SayHello("Harish")
Hi Harish! How are you?
You can also import one module in another Python script. Save the following code as example.py
import mymodule
mymodule.SayHello("Harish")
Run this script from command terminal
Hi Harish! How are you?
The import Statement
In Python, the
import
keyword has been provided to load a Python object from one module. The object may be a function, class, a variable etc. If a module contains multiple definitions, all of them will be loaded in the namespace.
Let us save the following code having three functions as
mymodule.py.
def sum(x,y):
   return x+y
def average(x,y):
   return (x+y)/2
def power(x,y):
   return x**y
import mymodule
statement loads all the functions in this module in the current namespace. Each function in the imported module is an attribute of this module object.
>>> dir(mymodule)
['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'average', 'power', 'sum']
To call any function, use the module object's reference. For example, mymodule.sum().
import mymodule
print ("sum:",mymodule.sum(10,20))
print ("average:",mymodule.average(10,20))
print ("power:",mymodule.power(10, 2))
It will produce the following
output
sum:30
average:15.0
power:100
The from ... import Statement
The import statement will load all the resources of the module in the current namespace. It is possible to import specific objects from a module by using this syntax. For example −
Out of three functions in
mymodule
, only two are imported in following executable script
example.py
from mymodule import sum, average
print ("sum:",sum(10,20))
print ("average:",average(10,20))
It will produce the following output −
sum: 30
average: 15.0
Note that function need not be called by prefixing name of its module to it.
The from...import * Statement
It is also possible to import all the names from a module into the current namespace by using the following import statement −
from modname import *
This provides an easy way to import all the items from a module into the current namespace; however, this statement should be used sparingly.
The import ... as Statement
You can assign an alias name to the imported module.
from modulename as alias
alias
should be prefixed to the function while calling.
Take a look at the following
example
import mymodule as x
print ("sum:",x.sum(10,20))
print ("average:", x.average(10,20))
print ("power:", x.power(10, 2))
Locating Modules
When you import a module, the Python interpreter searches for the module in the following sequences −
The current directory.
If the module isn't found, Python then searches each directory in the shell variable PYTHONPATH.
If all else fails, Python checks the default path. On UNIX, this default path is normally /usr/local/lib/python/.
The module search path is stored in the system module sys as the
sys.path
variable. The sys.path variable contains the current directory, PYTHONPATH, and the installation-dependent default.
PYTHONPATH
Variable
The PYTHONPATH is an environment variable, consisting of a list of directories. The syntax of PYTHONPATH is the same as that of the shell variable PATH.
Here is a typical PYTHONPATH from a Windows system −
set PYTHONPATH = c:\python20\lib;
And here is a typical PYTHONPATH from a UNIX system −
set PYTHONPATH = /usr/local/lib/python
Namespaces and Scoping
Variables are names (identifiers) that map to objects. A
namespace
is a dictionary of variable names (keys) and their corresponding objects (values).
A Python statement can access variables in a
local namespace
and in the
global namespace
. If a local and a global variable have the same name, the local variable shadows the global variable.
Each function has its own local namespace. Class methods follow the same scoping rule as ordinary functions.
Python makes educated guesses on whether variables are local or global. It assumes that any variable assigned a value in a function is local.
In order to assign a value to a global variable within a function, you must first use the global statement.
The statement
global VarName
tells Python that VarName is a global variable. Python stops searching the local namespace for the variable.
Example
For example, we define a variable
Money
in the global namespace. Within the function
Money
, we assign
Money
a value,  therefore Python assumes
Money
as a local variable. However, we accessed the value of the local variable
Money
before setting it, so an UnboundLocalError is the result. Uncommenting the global statement fixes the problem.
Money = 2000
def AddMoney():
   # Uncomment the following line to fix the code:
   # global Money
   Money = Money + 1
print (Money)
AddMoney()
print (Money)
Module Attributes
In Python, a module is an object of module class, and hence it is characterized by attributes.
Following are the module attributes −
__file__ returns the physical name of the module.
__package__ returns the package to which the module belongs.
__doc__ returns the docstring at the top of the module if any
__dict__ returns the entire scope of the module
__name__ returns the name of the module
Example
Assuming that the following code is saved as
mymodule.py
"The docstring of mymodule"
def sum(x,y):
   return x+y
def average(x,y):
   return (x+y)/2
def power(x,y):
   return x**y
Let us check the attributes of mymodule by importing it in the following script −
import mymodule
print ("__file__ attribute:", mymodule.__file__)
print ("__doc__ attribute:", mymodule.__doc__)
print ("__name__ attribute:", mymodule.__name__)
It will produce the following
output
__file__ attribute: C:\math\examples\mymodule.py

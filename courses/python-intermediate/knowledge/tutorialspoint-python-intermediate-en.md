# tutorialspoint-python-intermediate

Source: https://www.tutorialspoint.com/python/python_functions.htm

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
Python - Functions
Previous
Quiz
Next
A Python function is a block of organized, reusable code that is used to perform a single, related action. Functions provide better modularity for your application and a high degree of code reusing.
A top-to-down approach towards building the processing logic involves defining blocks of independent reusable functions. A Python function may be invoked from any other function by passing required data (called
parameters
arguments
). The called function returns its result back to the calling environment.
Types of Python Functions
Python provides the following types of functions −
Sr.No
Type & Description
Built-in functions
Python's standard library includes number of built-in functions. Some of Python's built-in functions are print(), int(), len(), sum(), etc. These functions are always available, as they are loaded into computer's memory as soon as you start Python interpreter.
Functions defined in built-in modules
The standard library also bundles a number of modules. Each module defines a group of functions. These functions are not readily available. You need to import them into the memory from their respective modules.
User-defined functions
In addition to the built-in functions and functions in the built-in modules, you can also create your own functions. These functions are called user-defined functions.
Defining a Python Function
You can define custom functions to provide the required functionality. Here are simple rules to define a function in Python −
Function blocks begin with the keyword
followed by the function name and parentheses ().
Any input parameters or arguments should be placed within these parentheses. You can also define parameters inside these parentheses.
The first statement of a function can be an optional statement; the documentation string of the function or docstring.
The code block within every function starts with a colon (:) and is indented.
The statement
return [expression]
exits a function, optionally passing back an expression to the caller. A
return
statement with no arguments is the same as return None.
Syntax to Define a Python Function
def function_name( parameters ):
   "function_docstring"
   function_suite
   return [expression]
By default, parameters have a positional behavior and you need to inform them in the same order that they were defined.
Once the function is defined, you can execute it by calling it from another function or directly from the Python prompt.
Example to Define a Python Function
The following example shows how to define a function greetings(). The bracket is empty so there aren't any parameters. Here, the first line is a docstring and the function block ends with return statement.
def greetings():
   "This is docstring of greetings function"
   print ("Hello World")
   return
When this function is called,
Hello world
message will be printed.
Calling a Python Function
Defining a function only gives it a name, specifies the parameters that are to be included in the function and structures the blocks of code. Once the basic structure of a function is finalized, you can call it by using the function name itself. If the function requires any parameters, they should be passed within parentheses. If the function doesn't require any parameters, the parentheses should be left empty.
Example to Call a Python Function
Following is the example to call printme() function −
# Function definition is here
def printme( str ):
   "This prints a passed string into this function"
   print (str)
   return;
# Now you can call the function
printme("I'm first call to user defined function!")
printme("Again second call to the same function")
When the above code is executed, it produces the following output −
I'm first call to user defined function!
Again second call to the same function
Pass by Reference vs Value
In programming languages like C and C++, there are two main ways to pass variables to a function, which are
Call by Value
Call by Reference
(also known as pass by reference and pass by value). However, the way we pass variables to functions in Python differs from others.
call by value −
When a
variable
is passed to a function while calling, the value of actual arguments is copied to the variables representing the formal arguments. Thus, any changes in formal arguments does not get reflected in the actual argument. This way of passing variable is known as call by value.
call by reference −
In this way of passing variable, a reference to the object in memory is passed. Both the formal arguments and the actual arguments (variables in the calling code) refer to the same object. Hence, any changes in formal arguments does get reflected in the actual argument.
Python uses pass by reference mechanism. As variable in Python is a label or reference to the object in the memory, both the variables used as actual argument as well as formal arguments really refer to the same object in the memory. We can verify this fact by checking the id() of the passed variable before and after passing.
Example
In the following example, we are checking the id() of a variable.
def testfunction(arg):
   print ("ID inside the function:", id(arg))
var = "Hello"
print ("ID before passing:", id(var))
testfunction(var)
If the above code is executed, the id() before passing and inside the function will be displayed.
ID before passing: 1996838294128
ID inside the function: 1996838294128
The behavior also depends on whether the passed object is mutable or immutable. Python numeric object is immutable. When a numeric object is passed, and then the function changes the value of the formal argument, it actually creates a new object in the memory, leaving the original variable unchanged.
Example
The following example shows how an immutable object behaves when it is passed to a function.
def testfunction(arg):
   print ("ID inside the function:", id(arg))
   arg = arg + 1
   print ("new object after increment", arg, id(arg))
var=10
print ("ID before passing:", id(var))
testfunction(var)
print ("value after function call", var)
It will produce the following
output
ID before passing: 140719550297160
ID inside the function: 140719550297160
new object after increment 11 140719550297192
value after function call 10
Let us now pass a mutable object (such as a list or dictionary) to a function. It is also passed by reference, as the id() of list before and after passing is same. However, if we modify the list inside the function, its global representation also reflects the change.
Example
Here we pass a list, append a new item, and see the contents of original list object, which we will find has changed.
def testfunction(arg):
   print ("Inside function:",arg)
   print ("ID inside the function:", id(arg))
   arg=arg.append(100)
var=[10, 20, 30, 40]
print ("ID before passing:", id(var))
testfunction(var)
print ("list after function call", var)
It will produce the following
output
ID before passing: 2716006372544
Inside function: [10, 20, 30, 40]
ID inside the function: 2716006372544
list after function call [10, 20, 30, 40, 100]
Python Function Arguments
Function arguments
are the values or variables passed into a function when it is called. The behavior of a function often depends on the arguments passed to it.
While defining a function, you specify a list of variables (known as formal parameters) within the parentheses. These parameters act as placeholders for the data that will be passed to the function when it is called. When the function is called, value to each of the formal arguments must be provided. Those are called actual arguments.
Example
Let's modify greetings function and have name an argument. A string passed to the function as actual argument becomes name variable inside the function.
def greetings(name):
   "This is docstring of greetings function"
   print ("Hello {}".format(name))
   return
greetings("Samay")
greetings("Pratima")
greetings("Steven")
This code will produce the following output −
Hello Samay
Hello Pratima
Hello Steven
Types of Python Function Arguments
Based on how the arguments are declared while defining a Python function, they are classified into the following categories −
Positional or Required Arguments
Keyword Arguments
Default Arguments
Positional-only Arguments
Keyword-only arguments
Arbitrary or Variable-length Arguments
Positional or Required Arguments
Required arguments
are the arguments passed to a function in correct positional order. Here, the number of arguments in the function call should match exactly with the function definition, otherwise the code gives a syntax error.
Example
In the code below, we call the function
printme()
without any parameters which will give error.
# Function definition is here
def printme( str ):
   "This prints a passed string into this function"
   print (str)
   return;
# Now you can call printme function
printme()
When the above code is  executed, it produces the following result −
Traceback (most recent call last):
   File "test.py", line 11, in <module>
      printme();
TypeError: printme() takes exactly 1 argument (0 given)
Keyword Arguments
Keyword arguments
are related to the function calls. When you use keyword arguments in a function call, the caller identifies the arguments by the parameter name. This allows you to skip arguments or place them out of order because the Python interpreter is able to use the keywords provided to match the values with parameters.
Example 1
The following example shows how to use keyword arguments in Python.
# Function definition is here
def printme( str ):
   "This prints a passed string into this function"
   print (str)
   return;
# Now you can call printme function
printme( str = "My string")
When the above code is  executed, it produces the following result −
My string
Example 2
The following example gives more clear picture. Note that the order of parameters does not matter.
# Function definition is here
def printinfo( name, age ):
   "This prints a passed info into this function"
   print ("Name: ", name)
   print ("Age ", age)
   return;
# Now you can call printinfo function
printinfo( age=50, name="miki" )
When the above code is  executed, it produces the following result −
Name:  miki
Age  50
Default Arguments
default argument
is an argument that assumes a default value if a value is not provided in the function call for that argument.
Example
The following example gives an idea on default arguments, it prints default age if it is not passed −
# Function definition is here
def printinfo( name, age = 35 ):
   "This prints a passed info into this function"
   print ("Name: ", name)
   print ("Age ", age)
   return;
# Now you can call printinfo function
printinfo( age=50, name="miki" )
printinfo( name="miki" )
When the above code is executed, it produces the following result −
Name:  miki
Age  50
Name:  miki
Age  35
Positional-only arguments
Those arguments that can only be specified by their position in the function call is called as
Positional-only arguments
. They are defined by placing a "/" in the function's parameter list after all positional-only parameters. This feature was introduced with the release of Python 3.8.
The benefit of using this type of argument is that it ensures the functions are called with the correct arguments in the correct order. The positional-only arguments should be passed to a function as positional arguments, not keyword arguments.
Example
In the following example, we have defined two positional-only arguments namely "x" and "y". This method should be called with positional arguments in the order in which the arguments are declared, otherwise, we will get an error.
def posFun(x, y, /, z):
    print(x + y + z)
print("Evaluating positional-only arguments: ")
posFun(33, 22, z=11)
It will produce the following
output

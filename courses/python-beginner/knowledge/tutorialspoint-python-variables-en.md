# Tutorialspoint Python Variables

Source: https://www.tutorialspoint.com/python/python_variable_types.htm

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
Python - Variables
Previous
Quiz
Next
Python Variables
Python variables are the reserved memory locations used to store values with in a Python Program. This means that when you create a variable you reserve some space in the memory.
Based on the data type of a variable, memory space is allocated to it. Therefore, by assigning different data types to Python variables, you can store integers, decimals or characters in these variables.
Memory Addresses
Data items belonging to different data types are stored in computer's memory. Computer's memory locations are having a number or address, internally represented in binary form. Data is also stored in binary form as the computer works on the principle of binary representation. In the following diagram, a string
and a number
is shown as stored in memory locations.
If you know the assembly language, you will covert these data items and the memory address, and give a machine language instruction. However, it is not easy for everybody. Language translator such as Python interpreter performs this type of conversion. It stores the object in a randomly chosen memory location. Python's built-in
id()
function returns the address where the object is stored.
>>> "May"
>>> id("May")
2167264641264
>>> 18
>>> id(18)
140714055169352
Once the data is stored in the memory, it should be accessed repeatedly for performing a certain process. Obviously, fetching the data from its ID is cumbersome. High level languages like Python make it possible to give a suitable alias or a label to refer to the memory location.
In the above example, let us label the location of May as month, and location in which 18 is stored as age. Python uses the assignment operator (=) to bind an object with the label.
>>> month="May"
>>> age=18
The data object (May) and its name (month) have the same id(). The id() of 18 and age are also same.
>>> id(month)
2167264641264
>>> id(age)
140714055169352
The label is an identifier. It is usually called as a variable. A Python variable is a symbolic name that is a reference or pointer to an object.
Creating Python Variables
Python variables do not need explicit declaration to reserve memory space or you can say to create a variable. A Python variable is created automatically when you assign a value to it. The equal sign (=) is used to assign values to variables.
The operand to the left of the = operator is the name of the variable and the operand to the right of the = operator is the value stored in the variable. For example −
Example to Create Python Variables
This example creates different types (an integer, a float, and a string) of variables.
counter = 100          # Creates an integer variable
miles   = 1000.0       # Creates a floating point variable
name    = "Zara Ali"   # Creates a string variable
Printing Python Variables
Once we create a Python variable and assign a value to it, we can print it using
print()
function. Following is the extension of previous example and shows how to print different variables in Python:
Example to Print Python Variables
This example prints variables.
counter = 100          # Creates an integer variable
miles   = 1000.0       # Creates a floating point variable
name    = "Zara Ali"   # Creates a string variable
print (counter)
print (miles)
print (name)
Here, 100, 1000.0 and  "Zara Ali" are the values assigned to
counter
miles
, and
name
variables, respectively. When running the above Python program, this produces the following result −
1000.0
Zara Ali
Deleting Python Variables
You can delete the reference to a number object by using the del statement. The syntax of the del statement is −
del var1[,var2[,var3[....,varN]]]]
You can delete a single object or multiple objects by using the del statement. For example −
del var
del var_a, var_b
Example
Following examples shows how we can delete a variable and if we try to use a deleted variable then Python interpreter will throw an error:
counter = 100
print (counter)
del counter
print (counter)
This will produce the following result:
Traceback (most recent call last):
  File "main.py", line 7, in <module>
    print (counter)
NameError: name 'counter' is not defined
Getting Type of a Variable
You can get the data type of a Python variable using the python built-in function type() as follows.
Example: Printing Variables Type
x = "Zara"
y =  10
z =  10.10
print(type(x))
print(type(y))
print(type(z))
This will produce the following result:
<class 'str'>
<class 'int'>
<class 'float'>
Casting Python Variables
You can specify the data type of a variable with the help of casting as follows:
Example
This example demonstrates case sensitivity of variables.
x = str(10)    # x will be '10'
y = int(10)    # y will be 10 
z = float(10)  # z will be 10.0
print( "x =", x )
print( "y =", y )
print( "z =", z )
This will produce the following result:
x = 10
y = 10
z = 10.0
Case-Sensitivity of Python Variables
Python variables are case sensitive which means
are two different variables:
age = 20
Age = 30
print( "age =", age )
print( "Age =", Age )
This will produce the following result:
age = 20
Age = 30
Python Variables - Multiple Assignment
Python allows to initialize more than one variables in a single statement. In the following case, three variables have same value.
>>> a=10
>>> b=10
>>> c=10
Instead of separate assignments, you can do it in a single assignment statement as follows −
>>> a=b=c=10
>>> print (a,b,c)
10 10 10
In the following case, we have three variables with different values.
>>> a=10
>>> b=20
>>> c=30
These separate assignment statements can be combined in one. You need to give comma separated variable names on left, and comma separated values on the right of = operator.
>>> a,b,c = 10,20,30
>>> print (a,b,c)
10 20 30
Let's try few examples in script mode: −
a = b = c = 100
print (a)
print (b)
print (c)
This produces the following result:
Here, an integer object is created with the value 1, and all three variables are assigned to the same memory location. You can also assign multiple objects to multiple variables. For example −
a,b,c = 1,2,"Zara Ali"
print (a)
print (b)
print (c)
This produces the following result:
Zara Ali
Here, two integer objects with values 1 and 2 are assigned to variables a and b respectively, and one string object with the value "Zara Ali" is assigned to the variable c.
Python Variables - Naming Convention
Every Python variable should have a unique name like a, b, c. A variable name can be meaningful like color, age, name etc. There are certain rules which should be taken care while naming a Python variable:
A variable name must start with a letter or the underscore character
A variable name cannot start with a number or any special character like $, (, * % etc.
A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ )
Python variable names are case-sensitive which means Name and NAME are two different variables in Python.
Python reserved keywords cannot be used naming the variable.
If the name of variable contains multiple words, we should use these naming patterns −
Camel case
− First letter is a lowercase, but first letter of each subsequent word is in uppercase. For example: kmPerHour, pricePerLitre
Pascal case
− First letter of each word is in uppercase. For example: KmPerHour,
PricePerLitre
Snake case
− Use single underscore (_) character to separate words. For example: km_per_hour, price_per_litre
Example
Following are valid Python variable names:
counter = 100
_count  = 100
name1 = "Zara"
name2 = "Nuha"
Age  = 20
zara_salary = 100000
print (counter)
print (_count)
print (name1)
print (name2)
print (Age)
print (zara_salary)
This will produce the following result:
Zara
Nuha
100000
Example
Following are invalid Python variable names:
1counter = 100
$_count  = 100
zara-salary = 100000
print (1counter)
print ($count)
print (zara-salary)
This will produce the following result:
File "main.py", line 3
    1counter = 100
SyntaxError: invalid syntax
Example
Once you use a variable to identify a data object, it can be used repeatedly without its id() value. Here, we have a variables height and width of a rectangle. We can compute the area and perimeter with these variables.
>>> width=10
>>> height=20
>>> area=width*height
>>> area
>>> perimeter=2*(width+height)
>>> perimeter
Use of variables is especially advantageous when writing scripts or programs. Following script also uses the above variables.
#! /usr/bin/python3
width = 10
height = 20
area = width*height
perimeter = 2*(width+height)
print ("Area = ", area)
print ("Perimeter = ", perimeter)
Save the above script with .py extension and execute from command-line. The result would be −
Area = 200
Perimeter = 60
Python Local Variables
Python Local Variables are defined inside a function. We can not access variable outside the function.
A Python functions is a piece of reusable code and you will learn more about function in
Python - Functions
tutorial.
Example
Following is an example to show the usage of local variables:
def sum(x,y):
   sum = x + y
   return sum
print(sum(5, 10))
This will produce the following result −
Python Global Variables
Any variable created outside a function can be accessed within any function and so they have global scope.

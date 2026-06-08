# Tutorialspoint Python Tuples

Source: https://www.tutorialspoint.com/python/python_tuples.htm

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
Python - Tuples
Previous
Quiz
Next
Tuple is one of the built-in data types in Python. A Python tuple is a sequence of comma separated items, enclosed in parentheses (). The items in a Python tuple need not be of same data type.
Following are some examples of Python tuples −
tup1 = ("Rohan", "Physics", 21, 69.75)
tup2 = (1, 2, 3, 4, 5)
tup3 = ("a", "b", "c", "d")
tup4 = (25.50, True, -55, 1+2j)
The empty tuple is written as two parentheses containing nothing −
tup1 = ();
To write a tuple containing a single value you have to include a comma, even though there is only one value −
tup1 = (50,);
Following are the points to be noted −
In Python, tuple is a sequence data type. It is an ordered collection of items. Each item in the tuple has a unique position index, starting from 0.
In C/C++/Java array, the array elements must be of same type. On the other hand, Python tuple may have objects of different data types.
Python tuple and list both are sequences. One major difference between the two is, Python list is mutable, whereas tuple is immutable. Although any item from the tuple can be accessed using its index, and cannot be modified, removed or added.
Accessing Values in Tuples
To access values in tuple, use the square brackets for slicing along with the index or indices to obtain value available at that index. For example −
tup1 = ('physics', 'chemistry', 1997, 2000);
tup2 = (1, 2, 3, 4, 5, 6, 7 );
print ("tup1[0]: ", tup1[0]);
print ("tup2[1:5]: ", tup2[1:5]);
When the above code is  executed, it produces the following result −
tup1[0]:  physics
tup2[1:5]:  [2, 3, 4, 5]
Updating Tuples
Tuples are immutable which means you cannot update or change the values of tuple elements. You are able to take portions of existing tuples to create new tuples as the following example demonstrates −
tup1 = (12, 34.56);
tup2 = ('abc', 'xyz');
# Following action is not valid for tuples
# tup1[0] = 100;
# So let's create a new tuple as follows
tup3 = tup1 + tup2;
print (tup3);
When the above code is executed, it produces the following result −
(12, 34.56, 'abc', 'xyz')
Delete Tuple Elements
Removing individual tuple elements is not possible. There is, of course, nothing wrong with putting together another tuple with the undesired elements discarded.
To explicitly remove an entire tuple, just use the
statement. For example −
tup = ('physics', 'chemistry', 1997, 2000);
print (tup);
del tup;
print ("After deleting tup : ");
print (tup);
This produces the following result. Note an exception raised, this is because after
del tup
tuple does not exist any more −
('physics', 'chemistry', 1997, 2000)
After deleting tup :
Traceback (most recent call last):
   File "test.py", line 9, in <module>
      print (tup);
NameError: name 'tup' is not defined
Python Tuple Operations
In Python, Tuple is a sequence. Hence, we can concatenate two tuples with + operator and concatenate multiple copies of a tuple with "*" operator. The membership operators "in" and "not in" work with tuple object.
Python Expression
Results
Description
(1, 2, 3) + (4, 5, 6)
(1, 2, 3, 4, 5, 6)
Concatenation
('Hi!',) * 4
('Hi!', 'Hi!', 'Hi!', 'Hi!')
Repetition
3 in (1, 2, 3)
True
Membership
Even if there is only one object in a tuple, you must give a comma after it. Otherwise, it is treated as a string.
Indexing, Slicing, and Matrixes
Because tuples are sequences, indexing and slicing work the same way for tuples as they do for strings. Assuming following input −
L = ('spam', 'Spam', 'SPAM!')
Python Expression
Results
Description
L[2]
'SPAM!'
Offsets start at zero
L[-2]
'Spam'
Negative: count from the right
L[1:]
['Spam', 'SPAM!']
Slicing fetches sections
No Enclosing Delimiters
Any set of multiple objects, comma-separated, written without identifying symbols, i.e., brackets for lists, parentheses for tuples, etc., default to tuples, as indicated in these short examples −
print ('abc', -4.24e93, 18+6.6j, 'xyz');
x, y = 1, 2;
print ("Value of x , y : ", x,y);
When the above code is executed, it produces the following result −
abc -4.24e+93 (18+6.6j) xyz
Value of x , y : 1 2
Built-in Functions with Tuples
Following are the built-in functions we can use with tuples −
Sr.No.
Function with Description
cmp(tuple1, tuple2)
Compares elements of both tuples.
len(tuple)
Gives the total length of the tuple.
max(tuple)
Returns item from the tuple with max value.
min(tuple)
Returns item from the tuple with min value.
tuple(seq)
Converts a list into tuple.
Print Page
Previous
Quiz
Next
Advertisements

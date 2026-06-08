# Tutorialspoint Python Lists

Source: https://www.tutorialspoint.com/python/python_lists.htm

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
Python - Lists
Previous
Quiz
Next
Python Lists
List is one of the built-in data types in Python. A Python list is a sequence of comma separated items, enclosed in square brackets [ ]. The items in a Python list need not be of the same data type.
Following are some examples of Python lists −
list1 = ["Rohan", "Physics", 21, 69.75]
list2 = [1, 2, 3, 4, 5]
list3 = ["a", "b", "c", "d"]
list4 = [25.50, True, -55, 1+2j]
List is an ordered collection of items. Each item in a list has a unique position index, starting from 0.
A list in Python is similar to an array in C, C++ or Java. However, the major difference is that in C/C++/Java, the array elements must be of same type. On the other hand, Python lists may have objects of different data types.
A Python list is mutable. Any item from the list can be accessed using its index, and can be modified. One or more objects from the list can be removed or added. A list may have same item at more than one index positions.
Accessing Values in Lists
access values in lists
, use the square brackets for slicing along with the index or indices to obtain value available at that index. For example −
list1 = ['physics', 'chemistry', 1997, 2000];
list2 = [1, 2, 3, 4, 5, 6, 7 ];
print ("list1[0]: ", list1[0])
print ("list2[1:5]: ", list2[1:5])
When the above code is executed, it produces the following result −
list1[0]:  physics
list2[1:5]:  [2, 3, 4, 5]
Updating Lists
You can update single or multiple elements of lists by giving the slice on the left-hand side of the assignment operator, and you can add to elements in a list with the append() method. For example −
list = ['physics', 'chemistry', 1997, 2000];
print ("Value available at index 2 : ")
print (list[2])
list[2] = 2001;
print ("New value available at index 2 : ")
print (list[2])
When the above code is executed, it produces the following result −
Value available at index 2 :
1997
New value available at index 2 :
2001
Delete List Elements
remove a list element
, you can use either the del statement if you know exactly which element(s) you are deleting or the remove() method if you do not know. For example −
list1 = ['physics', 'chemistry', 1997, 2000];
print (list1)
del list1[2];
print ("After deleting value at index 2 : ")
print (list1)
When the above code is executed, it produces following result −
['physics', 'chemistry', 1997, 2000]
After deleting value at index 2 :
['physics', 'chemistry', 2000]
Note
− remove() method is discussed in subsequent section.
Python List Operations
In Python, List is a sequence. Hence, we can concatenate two lists with "+" operator and concatenate multiple copies of a list with "*" operator. The membership operators "in" and "not in" work with list object.
Python Expression
Results
Description
[1, 2, 3] + [4, 5, 6]
[1, 2, 3, 4, 5, 6]
Concatenation
['Hi!'] * 4
['Hi!', 'Hi!', 'Hi!', 'Hi!']
Repetition
3 in [1, 2, 3]
True
Membership
Indexing, Slicing, and Matrixes
Because lists are sequences, indexing and slicing work the same way for lists as they do for strings.
Assuming following input −
L = ['spam', 'Spam', 'SPAM!']
Python Expression
Results
Description
L[2]
SPAM!
Offsets start at zero
L[-2]
Spam
Negative: count from the right
L[1:]
['Spam', 'SPAM!']
Slicing fetches sections
Python List Methods
Python includes following list methods −
Sr.No.
Methods with Description
list.append(obj)
Appends object obj to list.
list.clear()
Clears the contents of list.
list.copy()
Returns a copy of the list object.
list.count(obj)
Returns count of how many times obj occurs in list
list.extend(seq)
Appends the contents of seq to list
list.index(obj)
Returns the lowest index in list that obj appears
list.insert(index, obj)
Inserts object obj into list at offset index
list.pop(obj=list[-1])
Removes and returns last object or obj from list
list.remove(obj)
Removes object obj from list
list.reverse()
Reverses objects of list in place
list.sort([func])
Sorts objects of list, use compare func if given
Built-in Functions with Lists
Following are the built-in functions we can use with lists −
Sr.No.
Function with Description
cmp(list1, list2)
Compares elements of both lists.
len(list)
Gives the total length of the list.
max(list)
Returns item from the list with max value.
min(list)
Returns item from the list with min value.
list(seq)
Converts a tuple into list.
Print Page
Previous
Quiz
Next
Advertisements

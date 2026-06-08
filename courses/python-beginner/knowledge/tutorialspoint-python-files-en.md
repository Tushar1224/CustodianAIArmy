# Tutorialspoint Python Files

Source: https://www.tutorialspoint.com/python/python_files_io.htm

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
Python - Files I/O
Previous
Quiz
Next
This chapter covers all the basic I/O functions available in Python. For more functions, please refer to standard Python documentation.
Printing to the Screen
The simplest way to produce output is using the
print
statement where you can pass zero or more expressions separated by commas. This function converts the expressions you pass into a string and writes the result to standard output as follows −
#!/usr/bin/python
print "Python is really a great language,", "isn't it?"
This produces the following result on your standard screen −
Python is really a great language, isn't it?
Reading Keyboard Input
Python provides two built-in functions to read a line of text from standard input, which by default comes from the keyboard. These functions are −
raw_input
input
raw_input
Function
raw_input([prompt])
function reads one line from standard input and returns it as a string (removing the trailing newline).
#!/usr/bin/python
str = raw_input("Enter your input: ")
print "Received input is : ", str
This prompts you to enter any string and it would display same string on the screen. When I typed "Hello Python!", its output is like this −
Enter your input: Hello Python
Received input is :  Hello Python
input
Function
input([prompt])
function is equivalent to raw_input, except that it assumes the input is a valid Python expression and returns the evaluated result to you.
#!/usr/bin/python
str = input("Enter your input: ")
print "Received input is : ", str
This would produce the following result against the entered input −
Enter your input: [x*5 for x in range(2,10,2)]
Recieved input is :  [10, 20, 30, 40]
Opening and Closing Files
Until now, you have been reading and writing to the standard input and output. Now, we will see how to use actual data files.
Python provides basic functions and methods necessary to manipulate files by default. You can do most of the file manipulation using a
file
object.
open
Function
Before you can read or write a file, you have to open it using Python's built-in
open()
function. This function creates a
file
object, which would be utilized to call other support methods associated with it.
Syntax
file object = open(file_name [, access_mode][, buffering])
Here are parameter details −
file_name
− The file_name argument is a string value that contains the name of the file that you want to access.
access_mode
− The access_mode determines the mode in which the file has to be opened, i.e., read, write, append, etc. A complete list of possible values is given below in the table. This is optional parameter and the default file access mode is read (r).
buffering
− If the buffering value is set to 0, no buffering  takes place. If the buffering value is 1, line buffering is performed while accessing a file. If you specify the buffering value as an integer greater than 1, then buffering action is performed with the indicated buffer size. If negative, the buffer size is the system default(default behavior).
Here is a list of the different modes of opening a file −
Sr.No.
Modes & Description
Opens a file for reading only. The file pointer is placed at the beginning of the file. This is the default mode.
Opens a file for reading only in binary format. The file pointer is placed at the beginning of the file. This is the default mode.
Opens a file for both reading and writing. The file pointer placed at the beginning of the file.
Opens a file for both reading and writing in binary format. The file pointer placed at the beginning of the file.
Opens a file for writing only. Overwrites the file if the file exists. If the file does not exist, creates a new file for writing.
Opens a file for writing only in binary format. Overwrites the file if the file exists. If the file does not exist, creates a new file for writing.
Opens a file for both writing and reading. Overwrites the existing file if the file exists. If the file does not exist, creates a new file for reading and writing.
Opens a file for both writing and reading in binary format. Overwrites the existing file if the file exists. If the file does not exist, creates a new file for reading and writing.
Opens a file for appending. The file pointer is at the end of the file if the file exists. That is, the file is in the append mode. If the file does not exist, it creates a new file for writing.
Opens a file for appending in binary format. The file pointer is at the end of the file if the file exists. That is, the file is in the append mode. If the file does not exist, it creates a new file for writing.
Opens a file for both appending and reading. The file pointer is at the end of the file if the file exists. The file opens in the append mode. If the file does not exist, it creates a new file for reading and writing.
Opens a file for both appending and reading in binary format. The file pointer is at the end of the file if the file exists. The file opens in the append mode. If the file does not exist, it creates a new file for reading and writing.
file
Object Attributes
Once a file is opened and you have one
file
object, you can get various information related to that file.
Here is a list of all attributes related to file object −
Sr.No.
Attribute & Description
file.closed
Returns true if file is closed, false otherwise.
file.mode
Returns access mode with which file was opened.
file.name
Returns name of the file.
file.softspace
Returns false if space explicitly required with print, true otherwise.
Example
#!/usr/bin/python
# Open a file
fo = open("foo.txt", "wb")
print "Name of the file: ", fo.name
print "Closed or not : ", fo.closed
print "Opening mode : ", fo.mode
print "Softspace flag : ", fo.softspace
This produces the following result −
Name of the file:  foo.txt
Closed or not :  False
Opening mode :  wb
Softspace flag :  0
close()
Method
The close() method of a
file
object flushes any unwritten information and closes the file object, after which no more writing can be done.
Python automatically closes a file when the reference object of a file is reassigned to another file. It is a good practice to use the close() method to close a file.
Syntax
fileObject.close()
Example
#!/usr/bin/python
# Open a file
fo = open("foo.txt", "wb")
print "Name of the file: ", fo.name
# Close opend file
fo.close()
This produces the following result −
Name of the file:  foo.txt
Reading and Writing Files
file
object provides a set of access methods to make our lives easier. We would see how to use
read()
write()
methods to read and write files.
write()
Method
write()
method writes any string to an open file. It is important to note that Python strings can have binary data and not just text.
The write() method does not add a newline character ('\n') to the end of the string −
Syntax
fileObject.write(string)
Here, passed parameter is the content to be written into the opened file.
Example
#!/usr/bin/python
# Open a file
fo = open("foo.txt", "wb")
fo.write( "Python is a great language.\nYeah its great!!\n")
# Close opend file
fo.close()
The above method would create
foo.txt
file and would write given content in that file and finally it would close that file. If you would open this file, it would have following content.
Python is a great language.
Yeah its great!!
read()
Method
read()
method reads a string from an open file. It is important to note that Python strings can have binary data. apart from text data.
Syntax
fileObject.read([count])
Here, passed parameter is the number of bytes to be read from the opened file. This method starts reading from the beginning of the file and if
count
is missing, then it tries to read as much as possible, maybe until the end of file.
Example
Let's take a file
foo.txt
, which we created above.
#!/usr/bin/python
# Open a file
fo = open("foo.txt", "r+")
str = fo.read(10);
print "Read String is : ", str
# Close opend file
fo.close()
This produces the following result −
Read String is :  Python is
File Positions
tell()
method tells you the current position within the file; in other words, the next read or write will occur at that many bytes from the beginning of the file.
seek(offset[, from])
method changes the current file position. The
offset
argument indicates the number of bytes to be moved. The
from
argument specifies the reference position from where the bytes are to be moved.
from
is set to 0, it means use the beginning of the file as the reference position and 1 means use the current position as the reference position and if it is set to 2 then the end of the file would be taken as the reference position.
Example
Let us take a file
foo.txt
, which we created above.
#!/usr/bin/python
# Open a file
fo = open("foo.txt", "r+")
str = fo.read(10)
print "Read String is : ", str
# Check current position
position = fo.tell()
print "Current file position : ", position
# Reposition pointer at the beginning once again
position = fo.seek(0, 0);
str = fo.read(10)
print "Again read String is : ", str
# Close opend file
fo.close()
This produces the following result −
Read String is :  Python is
Current file position :  10
Again read String is :  Python is
Renaming and Deleting Files
Python
module provides methods that help you perform file-processing operations, such as renaming and deleting files.
To use this module you need to import it first and then you can call any related functions.
The rename() Method
rename()
method takes two arguments, the current filename and the new filename.
Syntax
os.rename(current_file_name, new_file_name)
Example
Following is the example to rename an existing file
test1.txt
#!/usr/bin/python
import os
# Rename a file from test1.txt to test2.txt
os.rename( "test1.txt", "test2.txt" )
remove()
Method
You can use the
remove()
method to delete files by supplying the name of the file to be deleted as the argument.

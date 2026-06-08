# Tutorialspoint Python Strings

Source: https://www.tutorialspoint.com/python/python_strings.htm

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
Python - Strings
Previous
Quiz
Next
Python
string
is an immutable sequence of
Unicode characters
. Each character has a unique
numeric value
as per the UNICODE standard. But, the sequence as a whole, doesn't have any numeric value even if all the characters are digits. To differentiate the string from numbers and other identifiers, the sequence of characters is included within single, double or triple quotes in its literal representation. Hence, 1234 is a number (integer) but '1234' is a string.
Creating Python Strings
As long as the same sequence of characters is enclosed,
single
double
triple
quotes don't matter. Hence, following string representations are equivalent.
Example
>>> 'Welcome To TutorialsPoint'
'Welcome To TutorialsPoint'
>>> "Welcome To TutorialsPoint"
'Welcome To TutorialsPoint'
>>> '''Welcome To TutorialsPoint'''
'Welcome To TutorialsPoint'
>>> """Welcome To TutorialsPoint"""
'Welcome To TutorialsPoint'
Looking at the above statements, it is clear that, internally Python stores strings as included in single quotes.
In older versions strings are stored internally as 8-bit ASCII, hence it is required to attach 'u' to make it Unicode. Since Python 3, all strings are represented in Unicode. Therefore, It is no longer necessary now to add 'u' after the string.
Accessing Values in Strings
Python does not support a character type; these are treated as strings of length one, thus also considered a substring.
To access substrings, use the square brackets for slicing along with the index or indices to obtain your substring. For example −
var1 = 'Hello World!'
var2 = "Python Programming"
print ("var1[0]: ", var1[0])
print ("var2[1:5]: ", var2[1:5])
When the above code is executed, it produces the following result −
var1[0]:  H
var2[1:5]:  ytho
Updating Strings
You can "update" an existing string by (re)assigning a variable to another string. The new value can be related to its previous value or to a completely different string altogether. For example −
var1 = 'Hello World!'
print ("Updated String :- ", var1[:6] + 'Python')
When the above code is executed, it produces the following result −
Updated String :-  Hello Python
Visit our
Python - Modify Strings
tutorial to know more about updating/modifying strings.
Escape Characters
Following table is a list of escape or non-printable characters that can be represented with backslash notation.
escape character
gets interpreted; in a single quoted as well as double quoted strings.
Backslash notation
Hexadecimal character
Description
0x07
Bell or alert
0x08
Backspace
Control-x
\C-x
Control-x
0x1b
Escape
0x0c
Formfeed
\M-\C-x
Meta-Control-x
0x0a
Newline
\nnn
Octal notation, where n is in the range 0.7
0x0d
Carriage return
0x20
Space
0x09
0x0b
Vertical tab
Character x
\xnn
Hexadecimal notation, where n is in the range 0.9, a.f, or A.F
String Special Operators
Assume string variable
holds 'Hello' and variable
holds 'Python', then −
Operator
Description
Example
&plus;
Concatenation - Adds values on either side of the operator
a &plus; b will give HelloPython
Repetition - Creates new strings, concatenating multiple copies of the same string
a*2 will give -HelloHello
Slice - Gives the character from the given index
a[1] will give e
[ : ]
Range Slice - Gives the characters from the given range
a[1:4] will give ell
Membership - Returns true if a character exists in the given string
H in a will give 1
not in
Membership - Returns true if a character does not exist in the given string
M not in a will give 1
Raw String - Suppresses actual meaning of Escape characters. The syntax for raw strings is exactly the same as for normal strings with the exception of the raw string operator, the letter "r," which precedes the quotation marks. The "r" can be lowercase (r) or uppercase (R) and must be placed immediately preceding the first quote mark.
print r'\n' prints \n and print R'\n'prints \n
Format - Performs String formatting
See at next section
String Formatting Operator
One of Python's coolest features is the string format operator %. This operator is unique to strings and makes up for the pack of having functions from C's printf() family. Following is a simple example −
print ("My name is %s and weight is %d kg!" % ('Zara', 21))
When the above code is executed, it produces the following result −
My name is Zara and weight is 21 kg!
Here is the list of complete set of symbols which can be used along with % −
Sr.No.
Format Symbol & Conversion
character
string conversion via str() prior to formatting
signed decimal integer
signed decimal integer
unsigned decimal integer
octal integer
hexadecimal integer (lowercase letters)
hexadecimal integer (UPPERcase letters)
exponential notation (with lowercase 'e')
exponential notation (with UPPERcase 'E')
floating point real number
the shorter of %f and %e
the shorter of %f and %E
Other supported symbols and functionality are listed in the following table −
Sr.No.
Symbol & Functionality
argument specifies width or precision
left justification
&plus;
display the sign
<sp>
leave a blank space before a positive number
add the octal leading zero ( '0' ) or hexadecimal leading '0x' or '0X', depending on whether 'x' or 'X' were used.
pad from left with zeros (instead of spaces)
'%%' leaves you with a single literal '%'
(var)
mapping variable (dictionary arguments)
m.n.
m is the minimum total width and n is the number of digits to display after the decimal point (if appl.)
Visit our
Python - String Formatting
tutorial to learn about various ways to format strings.
Double Quotes in Python Strings
You want to embed some text in double quotes as a part of string, the string itself should be put in single quotes. To embed a single quoted text, string should be written in double quotes.
Example
var = 'Welcome to "Python Tutorial" from TutorialsPoint'
print ("var:", var)
var = "Welcome to 'Python Tutorial' from TutorialsPoint"
print ("var:", var)
It will produce the following
output
var: Welcome to "Python Tutorial" from TutorialsPoint
var: Welcome to 'Python Tutorial' from TutorialsPoint
Triple Quotes
To form a string with triple quotes, you may use triple single quotes, or triple double quotes − both versions are similar.
Example
var = '''Welcome to TutorialsPoint'''
print ("var:", var)
var = """Welcome to TutorialsPoint"""
print ("var:", var)
It will produce the following
output
var: Welcome to TutorialsPoint
var: Welcome to TutorialsPoint
Python Multiline Strings
Triple quoted string is useful to form a multi-line string.
Example
var = '''
Welcome To
Python Tutorial
from TutorialsPoint
print ("var:", var)
It will produce the following
output
var:
Welcome To
Python Tutorial
from TutorialsPoint
Arithmetic Operators with Strings
A string is a non-numeric data type. Obviously, we cannot use arithmetic operators with string operands. Python raises TypeError in such a case.
print ("Hello"-"World")
On executing the above program it will generate the following error −
>>> "Hello"-"World"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for -: 'str' and 'str'
Getting Type of Python Strings
A string in Python is an object of str class. It can be verified with type() function.
Example
var = "Welcome To TutorialsPoint"
print (type(var))
It will produce the following
output
<class 'str'>
Built-in String Methods
Python includes the following built-in methods to manipulate strings −
Sr.No.
Methods with Description
capitalize()
Capitalizes first letter of string.
casefold()
Converts all uppercase letters in string to lowercase. Similar to lower(), but works on UNICODE characters alos.
center(width, fillchar)
Returns a space-padded string with the original string centered to a total of width columns.
count(str, beg= 0,end=len(string))
Counts how many times str occurs in string or in a substring of string if starting index beg and ending index end are given.
decode(encoding='UTF-8',errors='strict')
Decodes the string using the codec registered for encoding. encoding defaults to the default string encoding.
encode(encoding='UTF-8',errors='strict')
Returns encoded string version of string; on error, default is to raise a ValueError unless errors is given with 'ignore' or 'replace'.
endswith(suffix, beg=0, end=len(string))
Determines if string or a substring of string (if starting index beg and ending index end are given) ends with suffix; returns true if so and false otherwise.
expandtabs(tabsize=8)
Expands tabs in string to multiple spaces; defaults to 8 spaces per tab if tabsize not provided.
find(str, beg=0 end=len(string))
Determine if str occurs in string or in a substring of string if starting index beg and ending index end are given returns index if found and -1 otherwise.

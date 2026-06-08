# tutorialspoint-python-advanced

Source: https://www.tutorialspoint.com/python/python_reg_expressions.htm

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
Python - Regular Expressions
Previous
Quiz
Next
A regular expression is a special sequence of characters that helps you match or find other strings or sets of strings, using a specialized syntax held in a pattern. Regular expression are popularly known as regex or regexp.
Usually, such patterns are used by string-searching algorithms for "find" or "find and replace" operations on strings, or for input validation.
Large scale text processing in data science projects requires manipulation of textual data. The regular expressions processing is supported by many programming languages including Python. Python's standard library has
module for this purpose.
Since most of the functions defined in
module work with raw strings, let us first understand what the raw strings are.
Raw Strings
Regular expressions use the backslash character ('\') to indicate special forms or to allow special characters to be used without invoking their special meaning. Python on the other hand uses the same character as escape character. Hence Python uses the raw string notation.
A string become a raw string if it is prefixed with r or R before the quotation symbols. Hence 'Hello' is a normal string were are r'Hello' is a raw string.
>>> normal="Hello"
>>> print (normal)
Hello
>>> raw=r"Hello"
>>> print (raw)
Hello
In normal circumstances, there is no difference between the two. However, when the escape character is embedded in the string, the normal string actually interprets the escape sequence, where as the raw string doesn't process the escape character.
>>> normal="Hello\nWorld"
>>> print (normal)
Hello
World
>>> raw=r"Hello\nWorld"
>>> print (raw)
Hello\nWorld
In the above example, when a normal string is printed the escape character '\n' is processed to introduce a newline. However because of the raw string operator 'r' the effect of escape character is not translated as per its meaning.
Metacharacters
Most letters and characters will simply match themselves. However, some characters are special metacharacters, and don't match themselves. Meta characters are characters having a special meaning, similar to * in wild card.
Here's a complete list of the metacharacters −
. ^ $ * + ? { } [ ] \ | ( )
The square bracket symbols[ and ] indicate a set of characters that you wish to match. Characters can be listed individually, or as a range of characters separating them by a '-'.
Sr.No.
Metacharacters & Description
[abc]
match any of the characters a, b, or c
[a-c]
which uses a range to express the same set of characters.
[a-z]
match only lowercase letters.
[0-9]
match only digits.
complements the character set in [].[^5] will match any character except'5'.
'\'is an escaping metacharacter. When followed by various characters it forms various special sequences. If you need to match a [ or \, you can precede them with a backslash to remove their special meaning: \[ or \\.
Predefined sets of characters represented by such special sequences beginning with '\' are listed below −
Sr.No.
Metacharacters & Description
Matches any decimal digit; this is equivalent to the class [0-9].
Matches any non-digit character; this is equivalent to the class [^0-9].
Matches any whitespace character; this is equivalent to the class [\t\n\r\f\v].
Matches any non-whitespace character; this is equivalent to the class [^\t\n\r\f\v].
Matches any alphanumeric character; this is equivalent to the class [a-zAZ0-9_].
Matches any non-alphanumeric character. equivalent to the class [^a-zAZ0-9_].
Matches with any single character except newline '\n'.
match 0 or 1 occurrence of the pattern to its left
1 or more occurrences of the pattern to its left
0 or more occurrences of the pattern to its left
boundary between word and non-word and /B is opposite of /b
[..]
Matches any single character in a square bracket and [^..] matches any single character not in square bracket.
It is used for special meaning characters like \. to match a period or \+ for plus sign.
{n,m}
Matches at least n and at most m occurrences of preceding
a| b
Matches either a or b
Python's re module provides useful functions for finding a match, searching for a pattern, and substitute a matched string with other string etc.
The re.match() Function
This function attempts to match RE
pattern
at the start of
string
with optional
flags
. Following is the
syntax
for this function −
re.match(pattern, string, flags=0)
Here is the description of the parameters −
Sr.No.
Parameter & Description
pattern
This is the regular expression to be matched.
String
This is the string, which would be searched to match the pattern at the beginning of string.
Flags
You can specify different flags using bitwise OR (|). These are modifiers, which are listed in the table below.
re.match()
function returns a
match
object on success,
None
on failure. A match object instance contains information about the match: where it starts and ends, the substring it matched, etc.
The match object's start() method returns the starting position of pattern in the string, and end() returns the endpoint.
If the pattern is not found, the match object is None.
We use
group(num)
groups()
function of
match
object to get matched expression.
Sr.No.
Match Object Methods & Description
group(num=0)
This method returns entire match (or specific subgroup num)
groups()
This method returns all matching subgroups in a tuple (empty if there weren't any)
Example
import re
line = "Cats are smarter than dogs"
matchObj = re.match( r'Cats', line)
print (matchObj.start(), matchObj.end())
print ("matchObj.group() : ", matchObj.group())
It will produce the following
output
matchObj.group() : Cats
The re.search() Function
This function searches for first occurrence of RE
pattern
within the
string
, with optional
flags
. Following is the
syntax
for this function −
re.search(pattern, string, flags=0)
Here is the description of the parameters −
Sr.No.
Parameter & Description
Pattern
This is the regular expression to be matched.
String
This is the string, which would be searched to match the pattern anywhere in the string.
Flags
You can specify different flags using bitwise OR (|). These are modifiers, which are listed in the table below.
re.search
function returns a
match
object on success,
none
on failure. We use
group(num)
groups()
function of
match
object to get the matched expression.
Sr.No.
Match Object Methods & Description
group(num=0)
This method returns entire match (or specific subgroup num)
groups()
This method returns all matching subgroups in a tuple (empty if there weren't any)
Example
import re
line = "Cats are smarter than dogs"
matchObj = re.search( r'than', line)
print (matchObj.start(), matchObj.end())
print ("matchObj.group() : ", matchObj.group())
It will produce the following
output
17 21
matchObj.group() : than
Matching Vs Searching
Python offers two different primitive operations based on regular expressions,
match
checks for a match only at the beginning of the string, while
search
checks for a match anywhere in the string (this is what Perl does by default).
Example
import re
line = "Cats are smarter than dogs";
matchObj = re.match( r'dogs', line, re.M|re.I)
if matchObj:
   print ("match --> matchObj.group() : ", matchObj.group())
else:
   print ("No match!!")
searchObj = re.search( r'dogs', line, re.M|re.I)
if searchObj:
   print ("search --> searchObj.group() : ", searchObj.group())
else:
   print ("Nothing found!!")
When the above code is executed, it produces the following
output
No match!!
search --> matchObj.group() : dogs
The re.findall() Function
The findall() function returns all non-overlapping matches of pattern in string, as a list of strings or tuples. The string is scanned left-to-right, and matches are returned in the order found. Empty matches are included in the result.
Syntax
re.findall(pattern, string, flags=0)
Parameters
Sr.No.
Parameter & Description
Pattern
This is the regular expression to be matched.
String
This is the string, which would be searched to match the pattern anywhere in the string.
Flags
You can specify different flags using bitwise OR (|). These are modifiers, which are listed in the table below.
Example
import re
string="Simple is better than complex."
obj=re.findall(r"ple", string)
print (obj)
It will produce the following
output
['ple', 'ple']
Following code obtains the list of words in a sentence with the help of findall() function.
import re
string="Simple is better than complex."
obj=re.findall(r"\w*", string)
print (obj)
It will produce the following
output
['Simple', '', 'is', '', 'better', '', 'than', '', 'complex', '', '']
The re.sub() Function
One of the most important
methods that use regular expressions is
Syntax
re.sub(pattern, repl, string, max=0)
This method replaces all occurrences of the RE

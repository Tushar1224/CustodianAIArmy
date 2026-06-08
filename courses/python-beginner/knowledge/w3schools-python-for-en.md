# w3schools-python-for

Source: https://www.w3schools.com/python/python_for_loops.asp

Menu
See More
Sign In
Get Certified
Upgrade
Academy
Spaces
Practice
Get Certified
Upgrade
Academy
Spaces
Practice
HTML
JAVASCRIPT
PYTHON
JAVA
HOW TO
W3.CSS
BOOTSTRAP
REACT
MYSQL
JQUERY
EXCEL
DJANGO
NUMPY
PANDAS
NODEJS
TYPESCRIPT
ANGULAR
ANGULARJS
POSTGRESQL
MONGODB
KOTLIN
SWIFT
SASS
GEN AI
SCIPY
CYBERSECURITY
DATA SCIENCE
INTRO TO PROGRAMMING
INTRO TO HTML & CSS
BASH
RUST
TOOLS
Python
Tutorial
Python HOME
Python Intro
Python Get Started
Python Syntax
Syntax
Statements
Code Challenge
Python Output
Print Text
Print Numbers
Code Challenge
Python Comments
Comments
Code Challenge
Python Variables
Python Variables
Variable Names
Assign Multiple Values
Output Variables
Global Variables
Variable Exercises
Code Challenge
Python Data Types
Data Types
Code Challenge
Python Numbers
Numbers
Code Challenge
Python Casting
Casting
Code Challenge
Python Strings
Python Strings
Slicing Strings
Modify Strings
Concatenate Strings
Format Strings
Escape Characters
String Methods
String Exercises
Code Challenge
Python Booleans
Booleans
Code Challenge
Python Operators
Python Operators
Arithmetic Operators
Assignment Operators
Ternary Operator
Comparison Operators
Logical Operators
Identity Operators
Membership Operators
Bitwise Operators
Operator Precedence
Code Challenge
Python Lists
Python Lists
Access List Items
Change List Items
Add List Items
Remove List Items
Loop Lists
List Comprehension
Sort Lists
Copy Lists
Join Lists
List Methods
List Exercises
Code Challenge
Python Tuples
Python Tuples
Access Tuples
Update Tuples
Unpack Tuples
Loop Tuples
Join Tuples
Tuple Methods
Tuple Exercises
Code Challenge
Python Sets
Python Sets
Access Set Items
Add Set Items
Remove Set Items
Loop Sets
Join Sets
Frozenset
Set Methods
Set Exercises
Code Challenge
Python Dictionaries
Python Dictionaries
Access Items
Change Items
Add Items
Remove Items
Loop Dictionaries
Copy Dictionaries
Nested Dictionaries
Dictionary Methods
Dictionary Exercises
Code Challenge
Python If...Else
Python If
Python Elif
Python Else
Shorthand If
Logical Operators
Nested If
Pass Statement
Code Challenge
Python Match
Match
Code Challenge
Python While Loops
While Loops
Code Challenge
Python For Loops
For Loops
Code Challenge
Python Functions
Python Functions
Python Arguments
Python *args / **kwargs
Python Scope
Python Decorators
Python Lambda
Python Recursion
Python Generators
Code Challenge
Python Range
Range
Code Challenge
Python Arrays
Arrays
Code Challenge
Python Iterators
Iterators
Code Challenge
Python Modules
Modules
Code Challenge
Python Dates
Dates
Code Challenge
Python Math
Math
Code Challenge
Python JSON
JSON
Code Challenge
Python RegEx
RegEx
Code Challenge
Python PIP
Python Try...Except
Try...Except
Code Challenge
Python String Formatting
String Formatting
Code Challenge
Python None
None
Code Challenge
Python User Input
Python VirtualEnv
Python Classes
Python OOP
Python Classes/Objects
Classes/Objects
Code Challenge
Python __init__ Method
__init__ Method
Code Challenge
Python self Parameter
self Parameter
Code Challenge
Python Class Properties
Class Properties
Code Challenge
Python Class Methods
Class Methods
Code Challenge
Python Inheritance
Inheritance
Code Challenge
Python Polymorphism
Polymorphism
Code Challenge
Python Encapsulation
Encapsulation
Code Challenge
Python Inner Classes
File Handling
Python File Handling
Python Read Files
Python Write/Create Files
Python Delete Files
Python Modules
NumPy Tutorial
Pandas Tutorial
SciPy Tutorial
Django Tutorial
Python Matplotlib
Matplotlib Intro
Matplotlib Get Started
Matplotlib Pyplot
Matplotlib Plotting
Matplotlib Markers
Matplotlib Line
Matplotlib Labels
Matplotlib Grid
Matplotlib Subplot
Matplotlib Scatter
Matplotlib Bars
Matplotlib Histograms
Matplotlib Pie Charts
Machine Learning
Getting Started
Mean Median Mode
Standard Deviation
Percentile
Data Distribution
Normal Data Distribution
Scatter Plot
Linear Regression
Polynomial Regression
Multiple Regression
Scale
Train/Test
Decision Tree
Confusion Matrix
Hierarchical Clustering
Logistic Regression
Grid Search
Categorical Data
K-means
Bootstrap Aggregation
Cross Validation
AUC - ROC Curve
K-nearest neighbors
Python DSA
Python DSA
Lists and Arrays
Stacks
Queues
Linked Lists
Hash Tables
Trees
Binary Trees
Binary Search Trees
AVL Trees
Graphs
Linear Search
Binary Search
Bubble Sort
Selection Sort
Insertion Sort
Quick Sort
Counting Sort
Radix Sort
Merge Sort
Python MySQL
MySQL Get Started
MySQL Create Database
MySQL Create Table
MySQL Insert
MySQL Select
MySQL Where
MySQL Order By
MySQL Delete
MySQL Drop Table
MySQL Update
MySQL Limit
MySQL Join
Python MongoDB
MongoDB Get Started
MongoDB Create DB
MongoDB Collection
MongoDB Insert
MongoDB Find
MongoDB Query
MongoDB Sort
MongoDB Delete
MongoDB Drop Collection
MongoDB Update
MongoDB Limit
Python Cert
Python Certificate
Python Reference
Python Overview
Python Built-in Functions
Python String Methods
Python List Methods
Python Dictionary Methods
Python Tuple Methods
Python Set Methods
Python File Methods
Python Keywords
Python Exceptions
Python Glossary
Module Reference
Built-in Modules
Random Module
Requests Module
Statistics Module
Math Module
cMath Module
Python How To
Remove List Duplicates
Reverse a String
Add Two Numbers
Python Examples
Python Examples
Python Compiler
Python Exercises
Python Quiz
Python Challenges
Python Practice Problems
Python Server
Python Syllabus
Python Study Plan
Python Interview Q&A
Python Bootcamp
Python Training
Python
For Loops
❮ Previous
Next ❯
Python For Loops
loop is used for iterating over a sequence (that is either a list, a tuple, 
a dictionary, a set, or a string).
This is less like the
keyword in other programming languages, and works more like an iterator method as found in other object-orientated programming languages.
With the
loop we can execute a set of statements, once for each item in a list, tuple, set etc.
Example
Print each fruit in a fruit list:
fruits = ["apple", "banana", "cherry"]
  x in fruits:
print(x)
Try it Yourself »
loop does not require an indexing variable to set beforehand.
Looping Through a String
Even strings are iterable objects, they contain a sequence of characters:
Example
Loop through the letters in the word "banana":
for x in "banana":
print(x)
Try it Yourself »
The break Statement
With the
break
statement we can stop the 
loop before it has looped through all the items:
Example
Exit the loop when
is "banana":
fruits = ["apple", "banana", "cherry"]
for x in fruits:
print(x)
if x == 
  "banana":
break
Try it Yourself »
Example
Exit the loop when
is "banana", 
but this time the break comes before the print:
fruits = ["apple", "banana", "cherry"]
for x in fruits:
if x == 
  "banana":
break
print(x)
Try it Yourself »
The continue Statement
With the
continue
statement we can stop the 
current iteration of the loop, and continue with the next:
Example
Do not print banana:
fruits = ["apple", "banana", "cherry"]
for x in fruits:
if x == 
  "banana":
continue
print(x)
Try it Yourself »
The range() Function
To loop through a set of code a specified number of times, we can use the
range()
function,
range()
function returns a sequence of numbers, starting from 0 by default, and increments by 1 (by default), and ends at a specified number.
Example
Using the range() function:
for x in range(6):
print(x)
Try it Yourself »
Note that
range(6)
is not the values of 0 to 6, but the values 0 to 5.
range()
function defaults to 0 as a starting value, however it is possible to specify the starting value by adding a parameter:
range(2, 6)
, which 
means values from 2 to 6 (but not including 6):
Example
Using the start parameter:
for x in range(2, 6):
print(x)
Try it Yourself »
range()
function defaults to increment the sequence by 1,
however it is possible to specify the increment value by adding a third parameter:
range(2, 30,
Example
Increment the sequence with 3 (default is 1):
for x in range(2, 30, 3):
print(x)
Try it Yourself »
Else in For Loop
else
keyword in a
loop specifies a block of code to be 
executed when the loop is finished:
Example
Print all numbers from 0 to 5, and print a message when the loop has ended:
for x in range(6):
print(x)
else:
print("Finally finished!")
Try it Yourself »
Note:
else
block will NOT be executed if the loop is stopped by a
break
statement.
Example
Break the loop when
is 3, and see what happens with the
else
block:
for x in range(6):
if x == 3: break
print(x)
else:
print("Finally finished!")
Try it Yourself »
Nested Loops

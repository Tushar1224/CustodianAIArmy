# w3schools-python-datatypes

Source: https://www.w3schools.com/python/python_datatypes.asp

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
Data Types
❮ Previous
Next ❯
Built-in Data Types
In programming, data type is an important concept.
Variables can store data of different types, and different types can do 
different things.
Python has the following data types built-in by default, in these categories:
Text Type:
Numeric Types:
float
complex
Sequence Types:
list
tuple
range
Mapping Type:
dict
Set Types:
frozenset
Boolean Type:
bool
Binary Types:
bytes
bytearray
memoryview
None Type:
NoneType
Getting the Data Type
You can get the data type of any object by using the
type()
function:
Example
Print the data type of the variable x:
x = 5
print(type(x))
Try it Yourself »
Setting the Data Type
In Python, the data type is set when you assign a value to a variable:
Example
Data Type
Try it
x = "Hello World"
Try it »
x = 20
Try it »
x = 20.5
float
Try it »
x = 1j
complex
Try it »
x = ["apple", "banana", "cherry"]
list
Try it »
x = ("apple", "banana", "cherry")
tuple
Try it »
x = range(6)
range
Try it »
x = {"name" : "John", "age" : 36}
dict
Try it »
x = {"apple", "banana", "cherry"}
Try it »
x = frozenset({"apple", "banana", "cherry"})
frozenset
Try it »
x = True
bool
Try it »
x = b"Hello"
bytes
Try it »
x = bytearray(5)
bytearray
Try it »
x = memoryview(bytes(5))
memoryview
Try it »
x = None
NoneType
Try it »
Setting the Specific Data Type
If you want to specify the data type, you can use the following 
constructor functions:
Example
Data Type
Try it
x = str("Hello World")
Try it »
x = int(20)
Try it »
x = float(20.5)
float
Try it »
x = complex(1j)
complex
Try it »
x = list(("apple", "banana", "cherry"))
list
Try it »
x = tuple(("apple", "banana", "cherry"))
tuple
Try it »
x = range(6)
range
Try it »
x = dict(name="John", age=36)
dict
Try it »
x = set(("apple", "banana", "cherry"))
Try it »
x = frozenset(("apple", "banana", "cherry"))
frozenset
Try it »
x = bool(5)
bool
Try it »
x = bytes(5)
bytes
Try it »
x = bytearray(5)
bytearray
Try it »

# w3schools-python-lambda

Source: https://www.w3schools.com/python/python_lambda.asp

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
Lambda
❮ Previous
Next ❯
Lambda Functions
A lambda function is a small anonymous function.
A lambda function can take any number of arguments, but can only have one expression.
Syntax
lambda
arguments
expression
The expression is executed and the result is returned:
Example
Add 10 to argument
, and 
  return the result:
x = lambda a : a + 10
print(x(5))
Try it Yourself »
Lambda functions can take any number of arguments:
Example
Multiply argument
with argument
and return the 
  result:
x = lambda a, b : a * b
print(x(5, 6))
Try it Yourself »
Example
Summarize argument
, and
  return the 
  result:
x = lambda a, b, c : a + b + c
print(x(5, 6, 
Try it Yourself »
Why Use Lambda Functions?
The power of lambda is better shown when you use them as an anonymous 
function inside another function.
Say you have a function definition that takes one argument, and that argument 
will be multiplied with an unknown number:
def myfunc(n):
return lambda a : a * n
Use that function definition to make a function that always doubles the 
number you send in:
Example
def myfunc(n):
return lambda a : a * n
mydoubler = myfunc(2)
print(mydoubler(11))
Try it Yourself »
Or, use the same function definition to make a function that always
triples
number you send in:
Example
def myfunc(n):
return lambda a : a * n
mytripler = myfunc(3)
print(mytripler(11))
Try it Yourself »
Or, use the same function definition to make both functions, in the same 
program:
Example
def myfunc(n):
return lambda a : a * n
mydoubler = myfunc(2)
mytripler = myfunc(3)
print(mydoubler(11))
print(mytripler(11))
Try it Yourself »
Use lambda functions when an anonymous function is required for a short period of time.
Lambda with Built-in Functions
Lambda functions are commonly used with built-in functions like
map()
filter()
, and
sorted()
Using Lambda with map()
map()
function applies a function to every item in an iterable:
Example
Double all numbers in a list:
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)
Try it Yourself »
Using Lambda with filter()
filter()
function creates a list of items for which a function returns
True
Example
Filter out odd numbers from a list:
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
odd_numbers = list(filter(lambda x: x % 2 != 0, numbers))
print(odd_numbers)
Try it Yourself »
Using Lambda with sorted()
sorted()
function can use a lambda as a key for custom sorting:
Example
Sort a list of tuples by the second element:
students = [("Emil", 25), ("Tobias", 22), ("Linus", 28)]
sorted_students = sorted(students, key=lambda x: x[1])
print(sorted_students)
Try it Yourself »
Example
Sort strings by length:
words = ["apple", "pie", "banana", "cherry"]
sorted_words = sorted(words, key=lambda x: len(x))
print(sorted_words)
Try it Yourself »
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS
PLUS
SPACES
GET CERTIFIED
FOR TEACHERS
BOOTCAMPS
CONTACT US
Contact Sales
If you want to use W3Schools services as an educational institution, team or enterprise, send us an e-mail:
sales@w3schools.com
Report Error
If you want to report an error, or if you want to make a suggestion, send us an e-mail:

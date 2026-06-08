# w3schools-python-arrays

Source: https://www.w3schools.com/python/python_arrays.asp

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
Arrays
❮ Previous
Next ❯
Note:
Python does not have built-in support for Arrays, 
Python Lists
can be used instead.
Arrays
Note:
This page shows you how to use LISTS as ARRAYS, however, to work with arrays in Python you will have to import
  a library, like the
NumPy library
Arrays are used to store multiple values in one single variable:
Example
Create an array containing car names:
cars = ["Ford", "Volvo", "BMW"]
Try it Yourself »
What is an Array?
An array is a special variable, which can hold more than one value at a time.
If you have a list of items (a list of car names, for example), storing the 
cars in single variables could look like this:
car1 = "Ford"
car2 = "Volvo"
car3 = "BMW"
However, what if you want to loop through the cars and find a specific one? 
And what if you had not 3 cars, but 300?
The solution is an array!
An array can hold many values under a single name, and you can 
access the values by referring to an index number.
Access the Elements of an Array
You refer to an array element by referring to the
index number
Example
Get the value of the first array item:
x = cars[0]
Try it Yourself »
Example
Modify the value of the first array item:
cars[0] = "Toyota"
Try it Yourself »
The Length of an Array
Use the
len()
method to return the length of 
an array (the number of elements in an array).
Example
Return the number of elements in the
cars
array:
x = len(cars)
Try it Yourself »
Note:
The length of an array is always one more than the highest array index.
Looping Array Elements
You can use the
for in
loop to loop through all the elements of an array.
Example
Print each item in the
cars
array:
for x in cars:
print(x)
Try it Yourself »
Adding Array Elements
You can use the
append()
method to add an element to an array.
Example
Add one more element to the
cars
array:
cars.append("Honda")
Try it Yourself »
Removing Array Elements
You can use the
pop()
method to remove an element from the array.
Example
Delete the second element of the
cars
array:
cars.pop(1)
Try it Yourself »
You can also use the
remove()
method to remove an element from the array.
Example
Delete the element that has the value "Volvo":
cars.remove("Volvo")
Try it Yourself »
Note:
The list's
remove()
method 
  only removes the first occurrence of the specified value.
Array Methods
Python has a set of built-in methods that you can use on lists/arrays.
Method
Description
append()
Adds an element at 
  the end of the list
clear()
Removes all the 
  elements from the list
copy()
Returns a copy of the 
  list
count()
Returns the number of 
  elements with the specified value
extend()
Add the elements of a 
  list (or any iterable), to the end of the current list
index()
Returns the index of 
  the first element with the specified value
insert()
Adds an element at 
  the specified position
pop()
Removes the element at the 
  specified position
remove()
Removes the first 

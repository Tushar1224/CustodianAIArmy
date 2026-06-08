# w3schools-python-modules

Source: https://www.w3schools.com/python/python_modules.asp

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
Modules
❮ Previous
Next ❯
What is a Module?
Consider a module to be the same as a code library.
A file containing a set of functions you want to include in your application.
Create a Module
To create a module just save the code you want in a file with the file extension
Example
Save this code in a file named
mymodule.py
def greeting(name):
print("Hello, " + name)
Use a Module
Now we can use the module we just created, by using the
import
statement:
Example
Import the module named mymodule, and call the greeting function:
import mymodule
mymodule.greeting("Jonathan")
Run Example »
Note:
When using a function from a module, use the syntax:
module_name.function_name
Variables in Module
The module can contain functions, as already described, but also variables of 
all types (arrays, dictionaries, objects etc):
Example
Save this code in the file
mymodule.py
person1 = {
"name": "John",
"age": 36,
"country": "Norway"
Example
Import the module named mymodule, and access the person1 dictionary:
import mymodule
a = mymodule.person1["age"]
print(a)
Run Example »
Naming a Module
You can name the module file whatever you like, but it must have the file extension
Re-naming a Module
You can create an alias when you import a module, by using the
keyword:
Example
Create an alias for
mymodule
called
import mymodule as mx
a = mx.person1["age"]
print(a)
Run Example »
Built-in Modules
There are several built-in modules in Python, which you can import whenever you like.
Example
Import and use the
platform
module:
import platform
x = platform.system()
print(x)
Try it Yourself »
Using the dir() Function
There is a built-in function to list all the function names (or variable 
names) in a module. The
dir()
function:
Example
List all the defined names belonging to the platform module:
import platform
x = dir(platform)
print(x)
Try it Yourself »
Note:
dir()
function can be used on
modules, also the ones you create yourself.
Import From Module
You can choose to import only parts from a module, by using the
from
keyword.
Example
The module named
mymodule
has one function 
and one dictionary:
def greeting(name):
print("Hello, " + name)
person1 
"name": "John",
"age": 36,
"country": 
  "Norway"
Example
Import only the person1 dictionary from the module:
from mymodule import person1
print (person1["age"])
Run Example »
Note:
When importing using the
from
keyword, do not use the module name when referring to elements in the module. 
  Example:
person1["age"]
mymodule.person1["age"]
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
help@w3schools.com
Top Tutorials
HTML Tutorial

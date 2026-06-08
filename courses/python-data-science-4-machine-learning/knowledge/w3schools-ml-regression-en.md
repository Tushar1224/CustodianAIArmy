# w3schools-ml-regression

Source: https://www.w3schools.com/python/python_ml_linear_regression.asp

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
Machine Learning - Linear Regression
❮ Previous
Next ❯
Regression
The term regression is used when you try to find the relationship between variables.
In Machine Learning, and in statistical modeling, that relationship is used to predict the outcome of future events.
Linear Regression
Linear regression uses the relationship between the data-points to draw a straight line through 
all them.
This line can be used to predict future values.
In Machine Learning, predicting the future is very important.
How Does it Work?
Python has methods for finding a relationship between data-points and to draw a line of linear regression. 
We will show you 
how to use these methods instead of going through the mathematic formula.
In the example below, the x-axis represents age, and the y-axis represents speed. We have registered the age and speed of 13 cars as they were passing a 
tollbooth. Let us see if the data we collected could be used in a linear 
regression:
Example
Start by drawing a scatter plot:
import matplotlib.pyplot as plt
x = [5,7,8,7,2,17,2,9,4,11,12,9,6]
  [99,86,87,88,111,86,103,87,94,78,77,85,86]
plt.scatter(x, y)
plt.show()
Result:
Run example »
Example
Import
scipy
and draw the line of Linear Regression:
import matplotlib.pyplot as plt
from scipy import stats
x = [5,7,8,7,2,17,2,9,4,11,12,9,6]
  [99,86,87,88,111,86,103,87,94,78,77,85,86]
slope, intercept, r, 
  p, std_err = stats.linregress(x, y)
def myfunc(x):
return slope * x + intercept
mymodel = list(map(myfunc, x))
plt.scatter(x, y)
plt.plot(x, mymodel)
plt.show()
Result:
Run example »
Example Explained
Import the modules you need.
You can learn about the Matplotlib module in our
Matplotlib Tutorial
You can learn about the SciPy module in our
SciPy Tutorial
import matplotlib.pyplot as plt
from scipy 
  import stats
Create the arrays that represent the values of the x and y axis:
x = [5,7,8,7,2,17,2,9,4,11,12,9,6]
y = [99,86,87,88,111,86,103,87,94,78,77,85,86]
Execute a method that returns some important key values of Linear Regression:
slope, intercept, r, 
  p, std_err = stats.linregress(x, y)
Create a function that uses the
slope
intercept
values to return a new value. This 
new value represents where on the y-axis the corresponding x value will be 
placed:
def myfunc(x):
return slope * x + intercept
Run each value of the x array through the function. This will result in a new 
array with new values for the y-axis:
mymodel = list(map(myfunc, x))
Draw the original scatter plot:
plt.scatter(x, y)
Draw the line of linear regression:
plt.plot(x, mymodel)
Display the diagram:
plt.show()
R for Relationship
It is important to know how the relationship between the values of the 
x-axis and the values of the y-axis is, if there are no relationship the linear 
regression can not be used to predict anything.
This relationship - the coefficient of correlation - is called
value ranges from -1 to 1, where 0 means no relationship, and 1 
(and -1) 
means 100% related.
Python and the Scipy module will compute this value for you, all you have to 
do is feed it with the x and y values.
Example
How well does my data fit in a linear regression?
from scipy import stats
  [5,7,8,7,2,17,2,9,4,11,12,9,6]
  [99,86,87,88,111,86,103,87,94,78,77,85,86]
slope, intercept, r, 
  p, std_err = stats.linregress(x, y)
print(r)
Try it Yourself »
Note:
The result -0.76 shows that there is a relationship, 
  not perfect, but it indicates that we could use linear regression in future 
  predictions.
Predict Future Values
Now we can use the information we have gathered to predict future values.
Example: Let us try to predict the speed of a 10 years old car.
To do so, we need the same
myfunc()
function 
from the example above:
def myfunc(x):
return slope * x + intercept
Example
Predict the speed of a 10 years old car:
from scipy import stats
x = [5,7,8,7,2,17,2,9,4,11,12,9,6]
  [99,86,87,88,111,86,103,87,94,78,77,85,86]
slope, intercept, r, 
  p, std_err = stats.linregress(x, y)
def myfunc(x):
return slope * x + intercept
speed = myfunc(10)
print(speed)
Run example »
The example predicted a speed at 85.6, which we also could read from the 
diagram:
Bad Fit?
Let us create an example where linear regression would not be the best method 
to predict future values.
Example

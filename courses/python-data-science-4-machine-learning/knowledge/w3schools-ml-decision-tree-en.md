# w3schools-ml-decision-tree

Source: https://www.w3schools.com/python/python_ml_decision_tree.asp

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
Machine Learning - Decision Tree
❮ Previous
Next ❯
Decision Tree
In this chapter we will show you how to make a "Decision Tree". A Decision 
Tree is a Flow Chart, and can help you make decisions based on previous experience.
In the example, a person will try to decide if he/she should go to a comedy show or 
not.
Luckily our example person has registered every time there was a comedy show 
in town, and registered some information about the comedian, and also 
registered if he/she went or not.
Experience
Rank
Nationality
Now, based on this data set, Python can create a decision tree that can be used to decide 
if any new shows are worth attending to.
How Does it Work?
First, read the dataset with pandas:
Example
Read and print the data set:
import pandas
df = pandas.read_csv("data.csv")
print(df)
Run example »
To make a decision tree, all data has to be numerical.
We have to convert the non numerical columns 'Nationality' and 'Go' into numerical values.
Pandas has a
map()
method that takes a dictionary with information on how to 
convert the values.
{'UK': 0, 'USA': 1, 'N': 2}
Means convert the values 'UK' to 0, 'USA' to 1, and 'N' to 2.
Example
Change string values into numerical values:
d = {'UK': 0, 
  'USA': 1, 'N': 2}
df['Nationality'] = df['Nationality'].map(d)
  {'YES': 1, 'NO': 0}
df['Go'] = df['Go'].map(d)
print(df)
Run example »
Then we have to separate the
feature
columns from the
target
column.
The feature columns are the columns that we try to predict
from
, and 
the target column is the column with the values we try to predict.
Example
is the feature columns,
is the target column:
features = ['Age', 'Experience', 'Rank', 'Nationality']
X = df[features]
y = df['Go']
print(X)
print(y)
Run example »
Now we can create the actual decision tree, fit it with our details. Start by 
importing the modules we need:
Example
Create and display a Decision Tree:
import pandas
from sklearn import tree
from sklearn.tree import 
  DecisionTreeClassifier
import matplotlib.pyplot as plt
df = 
  pandas.read_csv("data.csv")
d = {'UK': 0, 'USA': 1, 'N': 2}
df['Nationality'] 
  = df['Nationality'].map(d)
d = {'YES': 1, 'NO': 0}
df['Go'] = df['Go'].map(d)
features = ['Age', 'Experience', 'Rank', 'Nationality']
X = df[features]
y = df['Go']
dtree = DecisionTreeClassifier()
dtree = dtree.fit(X, 
tree.plot_tree(dtree, feature_names=features)
Run example »
Result Explained
The decision tree uses your earlier decisions to calculate the odds for you to wanting to go see 
a comedian or not.
Let us read the different aspects of the decision tree:
Rank
Rank <= 6.5
means that every comedian with a rank of 6.5 or 
lower will follow the
True
arrow (to the left), and the rest will 
follow the
False
arrow (to the right).
gini = 0.497
refers to the quality of the 
split, and is always a number between 0.0 and 0.5, where 0.0 would mean all of 
the samples got the same result, and 0.5 would mean that the split is done 
exactly in the middle.
samples = 13
means that there are 13 
comedians left at this point in the decision, which is all of them since this is 
the first step.
value = [6, 7]
means that of these 13 
comedians, 6 will get a "NO", and 7 will get a 
"GO".
Gini
There are many ways to split the samples, we use the GINI method in this tutorial.
The Gini method uses this formula:
Gini = 1 - (x/n)
- (y/n)
Where
is the number of positive answers("GO"),
is the number of samples, and
is the number of negative answers ("NO"), 
which gives us this calculation:
1 - (7 / 13)
- (6 / 13)
= 0.497
The next step contains two boxes, one box for the comedians with a 'Rank' of 
6.5 or lower, and one box with the rest.
True - 5 Comedians End Here:
gini = 0.0
means all of the samples got the 
same result.

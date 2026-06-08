# w3schools-pandas-series

Source: https://www.w3schools.com/python/pandas/pandas_series.asp

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
Pandas Tutorial
Pandas HOME
Pandas Intro
Pandas Getting Started
Pandas Series
Pandas DataFrames
Pandas Read CSV
Pandas Read JSON
Pandas Analyzing Data
Cleaning Data
Cleaning Data
Cleaning Empty Cells
Cleaning Wrong Format
Cleaning Wrong Data
Removing Duplicates
Correlations
Pandas Correlations
Plotting
Pandas Plotting
Pandas Cert
Pandas Certificate
Quiz/Exercises
Pandas Editor
Pandas Quiz
Pandas Exercises
Pandas Syllabus
Pandas Study Plan
References
DataFrames Reference
Pandas
Series
❮ Previous
Next ❯
What is a Series?
A Pandas Series is like a column in a table.
It is a one-dimensional array holding data of any type.
Example
Create a simple Pandas Series from a list:
import pandas as pd
a = [1, 7, 2]
myvar = pd.Series(a)
print(myvar)
Try it Yourself »
Labels
If nothing else is specified, the values are labeled with their index number. First value 
has index 0, second value has index 1 etc.
This label can be used to access a specified value.
Example
Return the first value of the Series:
print(myvar[0])
Try it Yourself »
Create Labels
With the
index
argument, you can name your own labels.
Example
Create your own labels:
import pandas as pd
a = [1, 7, 2]
myvar = pd.Series(a, index = ["x", "y", "z"])
print(myvar)
Try it Yourself »
When you have created labels, you can access an item by referring to the label.
Example
Return the value of "y":
print(myvar["y"])
Try it Yourself »
Key/Value Objects as Series
You can also use a key/value object, like a dictionary, when creating a Series.
Example
Create a simple Pandas Series from a dictionary:
import pandas as pd
calories = {"day1": 420, "day2": 380, "day3": 
  390}
myvar = pd.Series(calories)
print(myvar)
Try it Yourself »
Note:
The keys of the dictionary become the labels.
To select only some of the items in the dictionary, use the
index
argument and specify only the items you want to include in the Series.
Example
Create a Series using only data from "day1" and "day2":
import pandas as pd
calories = {"day1": 420, "day2": 380, "day3": 
  390}
myvar = pd.Series(calories, 
  index = ["day1", "day2"])
print(myvar)
Try it Yourself »
DataFrames
Data sets in Pandas are usually multi-dimensional tables, called DataFrames.
Series is like a column, a DataFrame is the whole table.
Example
Create a DataFrame from two Series:
import pandas as pd
data = {
"calories": [420, 380, 390],
"duration": 
  [50, 40, 45]
myvar = pd.DataFrame(data)
print(myvar)
Try it Yourself »
You will learn about
DataFrames in the next chapter
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
CSS Tutorial
JavaScript Tutorial
How To Tutorial
SQL Tutorial
Python Tutorial
W3.CSS Tutorial
Bootstrap Tutorial
PHP Tutorial
Java Tutorial
C++ Tutorial
jQuery Tutorial
Top References
HTML Reference
CSS Reference
JavaScript Reference
SQL Reference
Python Reference
W3.CSS Reference
Bootstrap Reference
PHP Reference
HTML Colors
Java Reference
AngularJS Reference
jQuery Reference
Top Examples
HTML Examples
CSS Examples
JavaScript Examples
How To Examples
SQL Examples
Python Examples
W3.CSS Examples
Bootstrap Examples
PHP Examples
Java Examples
XML Examples
jQuery Examples
Get Certified
HTML Certificate
CSS Certificate
JavaScript Certificate
Front End Certificate
SQL Certificate
Python Certificate
PHP Certificate
jQuery Certificate
Java Certificate
C++ Certificate
C# Certificate
XML Certificate
FORUM
ABOUT
ACADEMY
W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning.
Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness
of all content. While using W3Schools, you agree to have read and accepted our
terms of use
cookies
privacy policy
Copyright 1999-2026
by Refsnes Data. All Rights Reserved.
W3Schools is Powered by W3.CSS

# w3schools-pandas-df

Source: https://www.w3schools.com/python/pandas/pandas_dataframes.asp

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
DataFrames
❮ Previous
Next ❯
What is a DataFrame?
A Pandas DataFrame is a 2 dimensional data structure, like a 2 dimensional 
array, or a table with rows and columns.
Example
Create a simple Pandas DataFrame:
import pandas as pd
data = {
"calories": [420, 380, 390],
"duration": 
  [50, 40, 45]
#load data into a DataFrame object:
df = pd.DataFrame(data)
print(df)
Result
calories  duration
  0       420        50
  1       380        40
  2       390        45
Try it Yourself »
Locate Row
As you can see from the result above, the DataFrame is like a table with rows and columns.
Pandas use the
attribute to return  
one or more specified row(s)
Example
Return row 0:
#refer to the row index:
print(df.loc[0])
Result
calories    420
  duration     50
  Name: 0, dtype: int64
Try it Yourself »
Note:
This example returns a Pandas
Series
Example
Return row 0 and 1:
#use a list of indexes:
print(df.loc[[0, 1]])
Result
calories  duration
  0       420        50
  1       380        40
Try it Yourself »
Note:
When using
, the 
  result is a Pandas
DataFrame
Named Indexes
With the
index
argument, you can name your own indexes.
Example
Add a list of names to give each row a name:
import pandas as pd
data = {
"calories": [420, 380, 390],
"duration": 
  [50, 40, 45]
df = pd.DataFrame(data, index = ["day1", "day2", 
  "day3"])
print(df)
Result
calories  duration
  day1       420        50
  day2       380        40
  day3       390        45
Try it Yourself »
Locate Named Indexes
Use the named index in the
attribute to return the specified row(s).
Example
Return "day2":
#refer to the named index:
print(df.loc["day2"])
Result
calories    380
  duration     40
  Name: day2, dtype: int64
Try it Yourself »
Load Files Into a DataFrame
If your data sets are stored in a file, Pandas can load them into a DataFrame.
Example
Load a comma separated file (CSV file) into a DataFrame:
import pandas as pd
df = pd.read_csv('data.csv')
print(df)
Try it Yourself »
You will learn more about importing files in the next chapters.
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

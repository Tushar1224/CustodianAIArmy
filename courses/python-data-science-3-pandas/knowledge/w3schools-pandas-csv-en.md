# w3schools-pandas-csv

Source: https://www.w3schools.com/python/pandas/pandas_csv.asp

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
Read CSV
❮ Previous
Next ❯
Read CSV Files
A simple way to store big data sets is to use CSV files (comma separated 
files).
CSV files contains plain text and is a well know format that can be read by everyone including Pandas.
In our examples we will be using a CSV file called 'data.csv'.
Download data.csv
. or
Open 
data.csv
Example
Load the CSV into a DataFrame:
import pandas as pd
df = pd.read_csv('data.csv')
print(df.to_string())
Try it Yourself »
Tip:
to_string()
to print the entire 
  DataFrame.
If you have a large DataFrame with many rows, Pandas will only return the first 5 rows, and the last 5 rows:
Example
Print the DataFrame without the
to_string()
method:
import pandas as pd
df = pd.read_csv('data.csv')
print(df)
Try it Yourself »
max_rows
The number of rows returned is defined in Pandas option settings.
You can check your system's maximum rows with the
pd.options.display.max_rows
statement.
Example
Check the number of maximum returned rows:
import pandas as pd
print(pd.options.display.max_rows)
Try it Yourself »
In my system the number is 60, which means that if the DataFrame contains more than 60 rows,
print(df)
statement will return only the headers and the first and last 5 rows.
You can change the maximum rows number with the same statement.
Example
Increase the maximum number of rows to display the entire DataFrame:
import pandas as pd
pd.options.display.max_rows 
  = 9999
df = pd.read_csv('data.csv')
print(df)
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

# geeksforgeeks-python-json

Source: https://www.geeksforgeeks.org/read-json-file-using-python/

Courses
Tutorials
Practice
Jobs
Python Tutorial
Data Types
Interview Questions
Examples
Quizzes
DSA Python
Data Science
NumPy
Pandas
Practice
Django
Flask
Share Your Experiences
Python Fundamentals
Introduction
Input & Output
Variables
Operators
Keywords
Data Types
Conditional Statements
Loops
Functions
Python Data Structures
String
List
Tuples
Dictionary
Arrays
Advanced Python
OOP Concepts
Exception Handling
File Handling
Python Database
MongoDB
MySQL
Packages
Modules
DSA Libraries
Python GUI
Data Science with Python
Numpy
Pandas
Matplotlib
Seaborn
StatsModel
Model Building
TensorFlow
PyTorch
Web Development with Python
Flask
Django
Django ORM
Jinja2 Templating
Django Templates
REST API
Build API with DRF
Python Practice
Quiz
Practice Problems
Interview Q & A
Python Courses
Python Programming Course
Data Analytics Course with AI
Tech Interview 101 Course | DSA and System Design
Summer SkillUp
Explore
Read JSON file using Python
Last Updated :
23 May, 2026
JSON stands for JavaScript Object Notation. It is a lightweight text format used to store and exchange structured data. Python provides a built-in json module to read and write this format.
Example: Reading JSON File using Python. We will be using Python’s json module, which offers several methods to work with JSON data. In particular,
loads() and load()
are used to read JSON from strings and files, respectively.
Python
import
json
with
open
'data.json'
file
data
json
load
file
print
json
dumps
data
indent
Output:
"emp_details": [
"emp_name": "Shubham",
"email": "ksingh.shubh@gmail.com",
"job_profile": "intern"
"emp_name": "Gaurav",
"email": "gaurav.singh@gmail.com",
"job_profile": "developer"
"emp_name": "Nikhil",
"email": "nikhil@geeksforgeeks.org",
"job_profile": "Full Time"
In this example, we are reading data from the "data.json" file, and the output retains the same structured format as the original JSON content.
json.dumps(obj, indent=4): converts the Python object back to a JSON string with 4-space indentation.
Error Handling While Reading JSON
We can handle common errors while reading JSON using try-except blocks to make our code more reliable, maintainable and production-ready.
1. FileNotFoundError
This error occurs when Python cannot locate the JSON file you are trying to read. Handling it prevents your program from crashing when the file is missing.
json.load(file): Reads JSON data from a file.
open(filename, mode='r'): Opens a file safely for reading.
with statement: Ensures the file is properly closed after reading.
try-except: Captures the error and allows us handle it gracefully.
Python
import
json
with
open
'data.json'
file
data
json
load
file
print
"File data ="
data
except
FileNotFoundError
print
"Error: The file 'data.json' was not found."
Output if file missing:
Error: The file 'data.json' was not found.
2. JSONDecodeError
This error occurs when the JSON data is malformed or not properly formatted. Handling it ensures your program doesn’t crash due to invalid JSON.
Python
import
json
with
open
'data.json'
file
data
json
load
file
print
"File data ="
data
except
json
JSONDecodeError
print
"Error: Failed to decode JSON from the file."
Output if JSON is malformed:
Error: Failed to decode JSON from the file.
Deserialize a JSON String to an Object in Python
Deserialization is the process of converting JSON data into corresponding Python objects, such as dictionaries and lists.
In Python, the json.load() and json.loads() methods are used for deserialization.
json.load() reads and parses JSON data from a file object.
json.loads() parses JSON data from a string.
After deserialization, the top-level JSON object is typically converted into a Python dict or list, depending on the structure of the JSON data.
The table below shows how JSON data types are mapped to their corresponding Python objects.
JSON Data Type
Python Object Type
Object
dict
Array
list
String
Number (integer)
Number (floating-point)
float
True
True (bool)
False
False (bool)
null
None
Comment
Article Tags:
Article Tags:
Technical Scripter
Python
Technical Scripter 2019
Python-json
Spotlight
More

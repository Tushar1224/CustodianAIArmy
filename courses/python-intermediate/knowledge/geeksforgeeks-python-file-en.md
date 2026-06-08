# geeksforgeeks-python-file

Source: https://www.geeksforgeeks.org/file-handling-python/

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
File Handling in Python
Last Updated :
18 Apr, 2026
File handling refers to the process of performing operations on a file, such as creating, opening, reading, writing and closing it through a programming interface. It involves managing the data flow between the program and the file system on the storage device, ensuring that data is handled safely and efficiently.
Need for File Handling
Store data permanently, even after the program ends.
Access external files like .txt, .csv, .json, etc.
Process large files efficiently without using much memory.
Automate tasks like reading configs or saving outputs.
Opening a File
To open a file, we can use
open()
function, which requires file-path and mode as arguments.
Note:
We will use a sample file named geek.txt for all examples in this article. To download
click here
Syntax:
file = open('filename.txt', 'mode')
filename.txt:
name (or path) of the file to be opened.
mode:
mode in which you want to open the file (read, write, append, etc.).
Note:
If you don’t specify the mode, Python uses
(read mode) by default.
Basic Example: Opening a File
Python
open
"geek.txt"
print
Explanation:
code opens file
geek.txt
in read mode. If the file exists, it returns a file object connected to that file; if the file does not exist, Python raises a FileNotFoundError.
Closing a File
file.close() method closes the file and releases the system resources. If the file was opened in write or append mode, closing ensures that all changes are properly saved.
Python
file
open
"geek.txt"
# Perform file operations
file
close
We will also see later how closing can be handled automatically using the with statement and how to ensure files close properly using exception handling.
Checking File Properties
Once the file is open, we can check some of its properties:
Python
open
"geek.txt"
print
"Filename:"
name
print
"Mode:"
mode
print
"Is Closed?"
closed
close
print
"Is Closed?"
closed
Output
Filename: geek.txt
Mode: r
Is Closed? False
Is Closed? True
Explanation:
f.name:
Returns the name of the file that was opened (in this case, "geek.txt").
f.mode:
Tells us the mode in which the file was opened. Here, it’s 'r' which means read mode.
f.closed:
Returns a boolean value- False when file is currently open otherwise True.
Reading a File
Reading a file
can be achieved by
file.read()
which reads the entire content of the file. After reading, it’s good practice to close the file to free up system resources.
Example:
Reading a File in Read Mode (r)
Python
file
open
"geek.txt"
content
file
read
print
content
file
close
Output
Hello world
GeeksforGeeks
123 456
Writing a File
Writing to a file
is done using the mode "w". This creates a new file if it doesn’t exist, or overwrites the existing file if it does. The write() method is used to add content. After writing, make sure to close the file.
Example:
Writing to a file (overwrites if file exists)
Python
with
open
"geek.txt"
file
file
write
"Hello, Python!
file
write
"File handling is easy with Python."
print
"File written successfully"
Output
Hello, Python!
File handling is easy with Python.
Explanation:
"w" mode opens the file for writing (overwrites existing content if the file already exists).
write() method adds new text to the file.
When using with, the file closes automatically at the end of the block.
Using with Statement
Instead of manually opening and closing the file, you can use the
with statement
, which automatically handles closing. This reduces the risk of file corruption and resource leakage.
Example:
Let's assume we have a file named
geek.txt
that contains text "
Hello, World!
Python
with
open
"geek.txt"
file
content
file
read
print
content
Output
Hello, World!
Handling Exceptions When Closing a File
It's important to
handle exceptions
to ensure that files are closed properly, even if an error occurs during file operations. Here, the finally block ensures the file is closed even if an error occurs.
Python
file
open
"geek.txt"
content
file
read
print
content
except
FileNotFoundError
print
"Error:"
finally
file
close
Output
Hello, World!
Explanation:
try block contains code that may raise an error.
except block handles specific errors like missing files.
finally block ensures the file is always closed, even if an error occurs.
Related articles:
Modes in File Handling
Comment
Article Tags:
Article Tags:
Python
python-io
python

# geeksforgeeks-python-exceptions

Source: https://www.geeksforgeeks.org/python-exception-handling/

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
Python Exception Handling
Last Updated :
29 May, 2026
Exception Handling allows a program to handle unexpected errors during execution in a controlled way, instead of crashing abruptly. It enables programs to detect errors, manage them properly and continue execution wherever possible.
Handles runtime errors such as invalid input, file not found, division by zero and type mismatches that occur during program execution.
Helps improve program reliability by ensuring the application does not terminate unexpectedly when an error occurs.
Below is a basic example demonstrating how to catch an exception and handle it gracefully:
Python
except
ZeroDivisionError
print
"Can't be divided by zero!"
Output
Can't be divided by zero!
Explanation:
Dividing a number by 0 raises a
ZeroDivisionError
. The try block contains code that may fail and except block catches the error, printing a safe message instead of stopping the program.
Syntax
Python provides four main keywords for handling exceptions: try, except, else and finally each plays a unique role. Let's see syntax:
try:
# Code
except SomeException:
# Code
else:
# Code
finally:
# Code
try:
Runs the risky code that might cause an error.
except:
Catches and handles the error if one occurs.
else:
Executes only if no exception occurs in try.
finally:
Runs regardless of what happens useful for cleanup tasks like closing files.
Example:
This code attempts division and handles errors gracefully using try-except-else-finally.
Python
except
ZeroDivisionError
print
"You can't divide by zero!"
except
ValueError
print
"Enter a valid number!"
else
print
"Result is"
finally
print
"Execution complete."
Output
You can't divide by zero!
Execution complete.
Explanation:
try block attempts division, except blocks catch specific errors, else block executes only if no errors occur, while finally block always runs, signaling end of execution.
Refer to
Python Built-in Exceptions
for some common exceptions.
Catching Exceptions
We can handle errors more efficiently by specifying the types of exceptions we expect. This can make code both safer and easier to debug.
1. Specific Exceptions
Catching specific exceptions makes code to respond to different exception types differently. It precisely makes your code safer and easier to debug. It avoids masking bugs by only reacting to the exact problems you expect.
Example:
This code handles ValueError and ZeroDivisionError with different messages.
Python
# This will cause ValueError
"str"
# Inverse calculation
except
ValueError
print
"Not Valid!"
except
ZeroDivisionError
print
"Zero has no inverse!"
Output
Not Valid!
Explanation:
A ValueError occurs because "str" cannot be converted to an integer. If conversion had succeeded but x were 0, a ZeroDivisionError would have been caught instead.
2. Multiple Exceptions
We can catch multiple exceptions in a single block if we need to handle them in the same way or we can separate them if different types of exceptions require different handling.
Example:
This code attempts to convert list elements and handles ValueError, TypeError and IndexError.
Python
"10"
"twenty"
# 'twenty' cannot be converted to int
total
except
ValueError
TypeError
print
"Error"
except
IndexError
print
"Index out of range."
Output
Error invalid literal for int() with base 10: 'twenty'
Explanation:
The ValueError is raised when trying to convert "twenty" to an integer. A TypeError could occur if incompatible types were used, while IndexError would trigger if the list index was out of range.
3. Catch-All Handlers and Their Risks
Catch-all handler is used to call to catch any exception (similar to else statement). Use only except keyword to define it:
Example:
This code tries dividing a string by a number, which causes a TypeError.
Python
# Risky operation: dividing string by number
"100"
except
ArithmeticError
print
"Arithmetic problem."
except
print
"Something went wrong!"
Output
Something went wrong!
Explanation:
A TypeError occurs because you can’t divide a string by a number. The bare except catches it, but this can make debugging harder since the actual error type is hidden. Use bare except only as a net.
Raise an Exception
We raise an exception using the
raise
keyword followed by an instance of the exception class that we want to trigger. We can choose from built-in exceptions or define our own custom exceptions by inheriting from Python's built-in Exception class.
Syntax:
raise ExceptionType("Error message")
Example:
This code raises a ValueError if an invalid age is given.
Python
raise
ValueError
"Age cannot be negative."
print
"Age set to
except
ValueError
print
Output
Age cannot be negative.
Explanation:
The function checks if age is invalid. If it is, it raises a ValueError. This prevents invalid states from entering the program.
We can create custom exceptions to address application-specific errors, for detailed information refer to
Creating Custom Exceptions
Errors vs Exceptions
Errors and exceptions are both issues in a program, but they differ in severity and handling.
Error:
Issues in the program logic such as SyntaxError, etc. It occurs at compile time.
Exception:
Problems that occur at runtime and can be managed using exception handling (e.g., invalid input, missing files).
To know more about Errors and Exception, refer to this article
Errors and Exceptions
Comment
Article Tags:
Article Tags:
Python

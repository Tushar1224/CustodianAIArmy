# geeksforgeeks-python-generators

Source: https://www.geeksforgeeks.org/generators-in-python/

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
Generators in Python
Last Updated :
12 Dec, 2025
generator function
is a special type of function that returns an iterator object. Instead of using return to send back a single value, generator functions use
yield
to produce a series of results over time. The function pauses its execution after yield, maintaining its state between iterations.
Python
while
yield
print
Output
Explanation:
This generator function fun yields numbers from 1 up to a specified max. Each call to
next()
on the generator object resumes execution right after the yield statement, where it last left off.
Why Do We Need Generators?
Memory Efficient :
Handle large or infinite data without loading everything into memory.
No List Overhead :
Yield items one by one, avoiding full list creation.
Lazy Evaluation :
Compute values only when needed, improving performance.
Support Infinite Sequences :
Ideal for generating unbounded data like Fibonacci series.
Pipeline Processing :
Chain generators to process data in stages efficiently.
Let's take a deep dive in python generators:
Creating Generators
Creating a generator in Python is as simple as defining a function with at least one yield statement. When called, this function doesn’t return a single value; instead, it returns a generator object that supports the iterator protocol. The generator has the following syntax in
Python
def generator_function_name(parameters):
# Your code here
yield expression
# Additional code can follow
Example:
we will create a simple generator that will yield three integers. Then we will print these integers by using Python
for loop
Python
yield
yield
yield
# Driver code to check above generator function
print
Output
Yield vs Return
Yield:
is used in generator functions to provide a sequence of values over time. When yield is executed, it pauses the function, returns the current value and retains the state of the function. This allows the function to continue from same point when called again, making it ideal for generating large or complex sequences efficiently.
Return:
is used to exit a function and return a final value. Once return is executed, function is terminated immediately and no state is retained. This is suitable for cases where a single result is needed from a function.
Example with return:
Python
return
print
Output
Generator Expression
Generator expressions
are a concise way to create generators. They are similar to list comprehensions but use parentheses instead of square brackets and are more memory efficient.
Syntax:
(expression for item in iterable)
Example:
We will create a generator object that will print the squares of integers between the range of 1 to 6 (exclusive).
Python
range
print
Output
Applications of Generators in Python
Suppose we need to create a stream of Fibonacci numbers. Using a generator makes this easy, you just call next() to get the next number without worrying about the stream ending.
Generators are especially useful for processing large data files, like logs, because they handle data in small parts, saving memory and we do not have to load the entire file at once
While
iterators
can do similar tasks, generators are quicker to write since we don’t need to define __next__ and __iter__ methods manually.
Comment
Article Tags:
Article Tags:
Python
python

# geeksforgeeks-python-decorators

Source: https://www.geeksforgeeks.org/decorators-in-python/

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
Decorators in Python
Last Updated :
29 May, 2026
Decorators are flexible way to modify or extend behavior of functions or methods, without changing their actual code.
A decorator is essentially a function that takes another function as an argument and returns a new function with enhanced functionality.
They are often used in scenarios such as logging, authentication and memoization, allowing us to add additional functionality to existing functions or methods in a clean, reusable way.
Python Decorators
Example:
Below is an example to demonstrate how decorator functions:
Python
decorator
func
wrapper
print
"Before calling the function."
func
print
"After calling the function."
return
wrapper
@decorator
greet
print
"Hello, World!"
greet
Output
Before calling the function.
Hello, World!
After calling the function.
Explanation:
decorator takes the greet function as an argument.
It returns a new function (wrapper) that first prints a message, calls greet() and then prints another message.
@decorator syntax is a shorthand for greet = decorator(greet).
Decorator with Parameters
Decorators often need to work with functions that have arguments. We use *args and **kwargs so our wrapper can accept any number of arguments.
Example:
Let's see an example of a decorator that adds functionality before and after a function call.
Python
decorator_name
func
wrapper
args
kwargs
print
"Before execution"
result
func
args
kwargs
print
"After execution"
return
result
return
wrapper
@decorator_name
return
print
Output
Before execution
After execution
Explanation:
decorator_name(func) is the decorator function. It takes another function (func) as input.
wrapper(*args, **kwargs) nested function that wraps func. *args collects positional arguments, **kwargs collects keyword arguments, so wrapper works with any function.
@decorator_name equivalent to writing add = decorator_name(add) after the function definition.
Functions as First-Class Objects
Functions are
first-class objects
, meaning they can be treated like any other object (such as integers, strings or lists). This allows functions to be assigned to variables, passed as arguments, returned from other functions and stored in data structures, including decorators.
Example:
This code demonstrates all four properties of functions as first-class objects.
Python
# Assigning a function to a variable
greet
return
"Hello,
say_hi
greet
print
say_hi
"Alex"
# Passing a function as an argument
apply
return
apply
say_hi
"Elon"
print
# Returning a function from another function
make_mult
mult
return
return
mult
make_mult
print
Output
Hello, Alex!
Hello, Elon!
Explanation:
greet() is assigned to say_hi variable, which is used to print a greeting for "Alex".
apply() takes a function and a value as arguments, applies function to value and returns the result.
apply is demonstrated by passing say_hi and "Elon", printing a greeting for "Elon".
make_mult() creates a multiplier function based on a given factor.
Role of First-Class Functions in Decorators:
Decorators take a function as input to modify or enhance its behavior.
They return a new function that wraps the original, adding behavior before or after execution.
The original function is replaced by decorated function when assigned to same name.
Higher-Order Functions
Higher-order functions
are functions that either take other functions as input, return a function as output, or both. They allow functions to be treated like data, making code more flexible and reusable.
Example:
This code shows a higher-order function that takes another function as an argument and applies it to a given value.
Python
return
square
return
square
print
Output
Explanation:
fun is a higher-order function because it takes another function f as an argument and applies it to the value x.
Role of Higher-Order Functions in Decorators: Decorators are higher-order functions that take a function, modify it and return a new one with extended or altered behavior.
Types of Decorators
1. Function Decorators: used to wrap and enhance functions by adding extra behavior before or after the original function runs.
Example:
In this Example, a decorator prints a message before and after executing wrapped function.
Python
simple_decorator
func
wrapper
print
">>> Starting function"
func
print
">>> Function finished"
return
wrapper
@simple_decorator
greet
print
"Hello, World!"
greet
Output
>>> Starting function
Hello, World!
>>> Function finished
Explanation:
simple_decorator(func) takes the function greet as an argument (func) and returns a new function (wrapper) that adds some functionality before and after calling original function.
@simple_decorator is the decorator syntax. It applies simple_decorator to greet function.
Calling greet() when greet() is called, it doesn't just execute original function but first runs added behavior from wrapper function.
2. Method Decorators: Special decorators used for methods inside a class. They work like function decorators but handle the self parameter for instance methods.
Example:
Here, a decorator prints a message before and after a method is executed, while correctly handling self argument.
Python
method_decorator
func
wrapper
self
args
kwargs
print
"Before method execution"
func
self
args
kwargs
print
"After method execution"
return
return
wrapper
class
MyClass
@method_decorator
say_hello
self
print
"Hello!"
MyClass
say_hello
Output
Before method execution
Hello!
After method execution
Explanation:
method_decorator(func) takes method (say_hello) as an argument (func). It returns a wrapper function that adds behavior before and after calling original method.
wrapper(self, *args, **kwargs) must accept self because it is a method of an instance. self is instance of class and *args and **kwargs allow for other arguments to be passed if needed.
@method_decorator applies method_decorator to say_hello method of MyClass.
Calling obj.say_hello() say_hello method is now wrapped with additional behavior.
3. Class Decorators: used to modify or enhance behavior of a class. Like function decorators, class decorators are applied to class definition. They work by taking class as an argument and returning a modified version of class.
Example:
This code demonstrates a class decorator that adds a class_name attribute to a class, storing class’s name.
Python
class_name
__name__
return
@fun
class
Person
pass
print
Person
class_name
Output
Person
Explanation:
fun(cls) adds a new attribute, class_name, to class cls. The value of class_name is set to the name of class (cls.__name__).
@fun applies the fun decorator to the Person class.
After decorator, Person.class_name stores the string "Person", which is printed as the output.
Built-in Decorators
1. @staticmethod: used to define a method that doesn't operate on an instance of class (i.e., it doesn't use self). Static methods are called on class itself, not on an instance of class.
Example:
This example shows how to define and use a @staticmethod inside a class.
Python
class
MathOperations
@staticmethod
return
MathOperations
print
Output
Explanation:
add is a static method defined with @staticmethod decorator.
It can be called directly on class MathOperations without creating an instance.
2. @classmethod: used to define a method that operates on class itself (i.e., it uses cls). Class methods can access and modify class state that applies across all instances of class.
Example:
This code defines a class Employee with a class variable raise_amount and a class method set_raise_amount that updates this variable for entire class.
Python
class
Employee
raise_amount
1.05
__init__
self
name
salary
self
name
name
self
salary
salary
@classmethod
set_raise_amount
amount
raise_amount
amount
Employee
set_raise_amount
1.10
print
Employee
raise_amount
Output
Explanation:
set_raise_amount is a class method defined with @classmethod decorator.
It can modify class variable raise_amount for  class Employee and all its instances.
3. @property: used to define a method as a property, which allows to access it like an attribute. This is useful for encapsulating implementation of a method while still providing a simple interface.
Example:
This code defines a circle class demonstrating @property for controlled attribute access, allowing safe updates to radius.
Python
class
Circle
__init__
self
radius
self
_radius
radius
@property
radius
self
return
self
_radius
@radius
setter
radius
self
value
value
self
_radius
value
else
raise
ValueError
"Radius cannot be negative"
@property
area
self
return
3.14159
self
_radius
Circle
print
radius
print
area
radius
print
area
Output
78.53975
314.159
Explanation:
radius and area are properties defined with @property decorator.
radius property also has a setter method to allow modification with validation.
These properties provide a way to access and modify private attributes while maintaining encapsulation.
Chaining Multiple Decorators
Chaining decorators
means applying multiple decorators to same function. Each decorator wraps function in sequence, adding layered behavior.
Example:
This example shows how chaining decorators works by applying two decorators in different orders to see how output changes.
Python
decor1
func
inner
func
return
return
inner
decor
func
inner
func
return
return
inner
@decor1
@decor
return
@decor
@decor1
num2
return
print
print
num2
Output
Explanation:
In num(), decor runs first -> 10 becomes 20, then decor1 squares it -> 400.
In num2(), decor1 runs first -> 10 becomes 100, then decor doubles it -> 200.
Application of Decorators
Logging: Track function calls (e.g., @logger).
Authentication: Restrict access in web apps (e.g., Flask/Django).
Rate Limiting: Control API usage per user.
Caching: Store results using functools.lru_cache.
Retry Logic: Automatically retry failed network calls.
Related Articles:
Closures
Inner Function
Comment
Article Tags:
Article Tags:
Technical Scripter
Python

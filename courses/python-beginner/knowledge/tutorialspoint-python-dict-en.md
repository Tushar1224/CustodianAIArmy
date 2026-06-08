# Tutorialspoint Python Dict

Source: https://www.tutorialspoint.com/python/python_dictionary.htm

Python - Home
Python - Overview
Python - History
Python - Features
Python vs C++
Python - Hello World Program
Python - Application Areas
Python - Interpreter
Python - Environment Setup
Python - Virtual Environment
Python - Basic Syntax
Python - Variables
Python - Private Variables
Python - Data Types
Python - Type Casting
Python - Unicode System
Python - Literals
Python - Operators
Python - Arithmetic Operators
Python - Comparison Operators
Python - Assignment Operators
Python - Logical Operators
Python - Bitwise Operators
Python - Membership Operators
Python - Identity Operators
Python - Walrus Operator
Python - Operator Precedence
Python - Comments
Python - User Input
Python - Numbers
Python - Booleans
Python - Floating Points
Python - Control Flow
Python - Decision Making
Python - If Statement
Python - If else
Python - Nested If
Python - Conditional User Inputs
Python - Match-Case Statement
Python - Loops
Python - for Loops
Python - for-else Loops
Python - While Loops
Python - break Statement
Python - continue Statement
Python - pass Statement
Python - Nested Loops
Python Functions & Modules
Python - Functions
Python - Default Arguments
Python - Keyword Arguments
Python - Keyword-Only Arguments
Python - Positional Arguments
Python - Positional-Only Arguments
Python - Arbitrary Arguments
Python - Variables Scope
Python - Function Annotations
Python - Modules
Python - Packing and Unpacking
Python - Built in Functions
Python Strings
Python - Strings
Python - Slicing Strings
Python - Modify Strings
Python - String Concatenation
Python - String Formatting
Python - Escape Characters
Python - String Methods
Python - String Exercises
Python Lists
Python - Lists
Python - Access List Items
Python - Change List Items
Python - Add List Items
Python - Remove List Items
Python - Loop Lists
Python - List Comprehension
Python - Sort Lists
Python - Copy Lists
Python - Join Lists
Python - List Methods
Python - List Exercises
Python Tuples
Python - Tuples
Python - Access Tuple Items
Python - Update Tuples
Python - Unpack Tuples
Python - Loop Tuples
Python - Join Tuples
Python - Tuple Methods
Python - Namedtuple
Python - Tuple Exercises
Python Sets
Python - Sets
Python - Access Set Items
Python - Add Set Items
Python - Remove Set Items
Python - Loop Sets
Python - Join Sets
Python - Copy Sets
Python - Set Operators
Python - Set Methods
Python - Set Exercises
Python Dictionaries
Python - Dictionaries
Python - Access Dictionary Items
Python - Change Dictionary Items
Python - Add Dictionary Items
Python - Remove Dictionary Items
Python - Dictionary View Objects
Python - Loop Dictionaries
Python - Copy Dictionaries
Python - Nested Dictionaries
Python - Dictionary Methods
Python - Dictionary Exercises
Python Arrays
Python - Arrays
Python - Access Array Items
Python - Add Array Items
Python - Remove Array Items
Python - Loop Arrays
Python - Copy Arrays
Python - Reverse Arrays
Python - Sort Arrays
Python - Join Arrays
Python - Array Methods
Python - Array Exercises
Python File Handling
Python - File Handling
Python - Write to File
Python - Read Files
Python - Renaming and Deleting Files
Python - Directories
Python - File Methods
Python - OS File/Directory Methods
Python - OS Path Methods
Object Oriented Programming
Python - OOPs Concepts
Python - Classes & Objects
Python - Class Attributes
Python - Class Methods
Python - Static Methods
Python - Constructors
Python - Access Modifiers
Python - Inheritance
Python - Multiple Inheritance
Python - Multilevel Inheritance
Python - Polymorphism
Python - Method Overriding
Python - Method Overloading
Python - Dynamic Binding
Python - Dynamic Typing
Python - Abstraction
Python - Encapsulation
Python - Interfaces
Python - Packages
Python - Inner Classes
Python - Anonymous Class and Objects
Python - Singleton Class
Python - Wrapper Classes
Python - Enums
Python - Reflection
Python - Data Classes
Python Errors & Exceptions
Python - Syntax Errors
Python - Exceptions
Python - try-except Block
Python - try-finally Block
Python - Raising Exceptions
Python - Exception Chaining
Python - Nested try Block
Python - User-defined Exception
Python - Logging
Python - Assertions
Python - Warnings
Python - Built-in Exceptions
Python - Debugger (PDB)
Python Multithreading
Python - Multithreading
Python - Thread Life Cycle
Python - Creating a Thread
Python - Starting a Thread
Python - Joining Threads
Python - Naming Thread
Python - Thread Scheduling
Python - Thread Pools
Python - Main Thread
Python - Thread Priority
Python - Daemon Threads
Python - Synchronizing Threads
Python Synchronization
Python - Inter-thread Communication
Python - Thread Deadlock
Python - Interrupting a Thread
Python Networking
Python - Networking
Python - Socket Programming
Python - URL Processing
Python - Generics
Python Libraries
NumPy Tutorial
Pandas Tutorial
SciPy Tutorial
Matplotlib Tutorial
Django Tutorial
OpenCV Tutorial
Python Miscellenous
Python - Date & Time
Python - Maths
Python - Iterators
Python - Generators
Python - Generator Expressions
Python - Lambda Expressions
Python - Closures
Python - Decorators
Python - Recursion
Python - Reg Expressions
Python - PIP
Python - Database Access
Python - Weak References
Python - Serialization
Python - Templating
Python - Output Formatting
Python - Performance Measurement
Python - Data Compression
Python - CGI Programming
Python - XML Processing
Python - GUI Programming
Python - Command-Line Arguments
Python - Docstrings
Python - JSON
Python - Sending Email
Python - Further Extensions
Python - Tools/Utilities
Python - Odds and Ends
Python - GUIs
Python Advanced Concepts
Python - Abstract Base Classes
Python - Custom Exceptions
Python - Higher Order Functions
Python - Object Internals
Python - Memory Management
Python - Metaclasses
Python - Metaprogramming with Metaclasses
Python - Mocking and Stubbing
Python - Monkey Patching
Python - Signal Handling
Python - Type Hints
Python - Automation Tutorial
Python - Humanize Package
Python - Context Managers
Python - Coroutines
Python - Descriptors
Python - Diagnosing and Fixing Memory Leaks
Python - Immutable Data Structures
Python - Domain Specific Language (DSL)
Python - Data Model
Python Useful Resources
Python - Questions & Answers
Python - Interview Questions & Answers
Python - Online Quiz
Python - Quick Guide
Python - Reference
Python - Cheatsheet
Python - Projects
Python - Useful Resources
Python - Discussion
Python Compiler
NumPy Compiler
Matplotlib Compiler
SciPy Compiler
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
Python - Dictionaries
Previous
Quiz
Next
Dictionaries in Python
In Python, a dictionary is a built-in data type that stores data in key-value pairs. It is an unordered, mutable, and indexed collection. Each key in a dictionary is unique and maps to a value. Dictionaries are often used to store data that is related, such as information associated with a specific entity or object, where you can quickly retrieve a value based on its key.
Python's dictionary is an example of a mapping type. A mapping object 'maps' the value of one object to another. To establish mapping between a key and a value, the colon (:) symbol is put between the two.
Each key-value pair is separated by a comma and enclosed within curly braces {}. The key and value within each pair are separated by a colon (:), forming the structure key:value.
Given below are some examples of Python dictionary objects −
capitals = {"Maharashtra":"Mumbai", "Gujarat":"Gandhinagar", "Telangana":"Hyderabad", "Karnataka":"Bengaluru"}
numbers = {10:"Ten", 20:"Twenty", 30:"Thirty",40:"Forty"}
marks = {"Savita":67, "Imtiaz":88, "Laxman":91, "David":49}
Key Features of Dictionaries
Following are the key features of dictionaries −
Unordered −
The elements in a dictionary do not have a specific order. Python dictionaries before version 3.7 did not maintain insertion order. Starting from Python 3.7, dictionaries maintain insertion order as a language feature.
Mutable −
You can change, add, or remove items after the dictionary has been created.
Indexed −
Although dictionaries do not have numeric indexes, they use keys as indexes to access the associated values.
Unique Keys −
Each key in a dictionary must be unique. If you try to assign a value to an existing key, the old value will be replaced by the new value.
Heterogeneous −
Keys and values in a dictionary can be of any data type.
Example 1
Only a number, string or tuple can be used as key. All of them are immutable. You can use an object of any type as the value. Hence following definitions of dictionary are also valid −
d1 = {"Fruit":["Mango","Banana"], "Flower":["Rose", "Lotus"]}
d2 = {('India, USA'):'Countries', ('New Delhi', 'New York'):'Capitals'}
print (d1)
print (d2)
It will produce the following
output
{'Fruit': ['Mango', 'Banana'], 'Flower': ['Rose', 'Lotus']}
{'India, USA': 'Countries', ('New Delhi', 'New York'): 'Capitals'}
Example 2
Python doesn't accept mutable objects such as list as key, and raises TypeError.
d1 = {["Mango","Banana"]:"Fruit", "Flower":["Rose", "Lotus"]}
print (d1)
It will raise a TypeError −
Traceback (most recent call last):
   File "C:\Users\Sairam\PycharmProjects\pythonProject\main.py", line 8, in <module>
d1 = {["Mango","Banana"]:"Fruit", "Flower":["Rose", "Lotus"]}
     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
TypeError: unhashable type: 'list'
Example 3
You can assign a value to more than one keys in a dictionary, but a key cannot appear more than once in a dictionary.
d1 = {"Banana":"Fruit", "Rose":"Flower", "Lotus":"Flower", "Mango":"Fruit"}
d2 = {"Fruit":"Banana","Flower":"Rose", "Fruit":"Mango", "Flower":"Lotus"}
print (d1)
print (d2)
It will produce the following
output
{'Banana': 'Fruit', 'Rose': 'Flower', 'Lotus': 'Flower', 'Mango': 'Fruit'}
{'Fruit': 'Mango', 'Flower': 'Lotus'}
Creating a Dictionary
You can create a dictionary in Python by placing a comma-separated sequence of key-value pairs within curly braces {}, with a colon : separating each key and its associated value. Alternatively, you can use the dict() function.
Example
The following example demonstrates how to create a dictionary called "student_info" using both curly braces and the dict() function −
# Creating a dictionary using curly braces
sports_player = {
   "Name": "Sachin Tendulkar",
   "Age": 48,
   "Sport": "Cricket"
print ("Dictionary using curly braces:", sports_player)
# Creating a dictionary using the dict() function
student_info = dict(name="Alice", age=21, major="Computer Science")
print("Dictionary using dict():",student_info)
The result produced is as shown below −
Dictionary using curly braces: {'Name': 'Sachin Tendulkar', 'Age': 48, 'Sport': 'Cricket'}
Dictionary using dict(): {'name': 'Alice', 'age': 21, 'major': 'Computer Science'}
Accessing Dictionary Items
You can access the value associated with a specific key using square brackets [] or the get() method −
student_info = {
   "name": "Alice",
   "age": 21,
   "major": "Computer Science"
# Accessing values using square brackets
name = student_info["name"]
print("Name:",name)  
# Accessing values using the get() method
age = student_info.get("age")
print("Age:",age)
The result obtained is as follows −
Name: Alice
Age: 21
Modifying Dictionary Items
You can modify the value associated with a specific key or add a new key-value pair −
student_info = {
   "name": "Alice",
   "age": 21,
   "major": "Computer Science"
# Modifying an existing key-value pair
student_info["age"] = 22
# Adding a new key-value pair
student_info["graduation_year"] = 2023
print("The modified dictionary is:",student_info)
Output of the above code is as follows −
The modified dictionary is: {'name': 'Alice', 'age': 22, 'major': 'Computer Science', 'graduation_year': 2023}
Removing Dictionary Items
You can remove items using the del statement, the pop() method, or the popitem() method −
student_info = {
   "name": "Alice",
   "age": 22,
   "major": "Computer Science",
   "graduation_year": 2023
# Removing an item using the del statement
del student_info["major"]
# Removing an item using the pop() method
graduation_year = student_info.pop("graduation_year")
print(student_info)
Following is the output of the above code −
{'name': 'Alice', 'age': 22}
Iterating Through a Dictionary
You can iterate through the keys, values, or key-value pairs in a dictionary using loops −
student_info = {
   "name": "Alice",
   "age": 22,
   "major": "Computer Science",
   "graduation_year": 2023
# Iterating through keys
for key in student_info:
   print("Keys:",key, student_info[key])
# Iterating through values
for value in student_info.values():
   print("Values:",value)
# Iterating through key-value pairs
for key, value in student_info.items():
   print("Key:Value:",key, value)
After executing the above code, we get the following output −
Keys: name Alice
Keys: age 22
Keys: major Computer Science
Keys: graduation_year 2023
Values: Alice
Values: 22
Values: Computer Science
Values: 2023
Key:Value: name Alice
Key:Value: age 22
Key:Value: major Computer Science
Key:Value: graduation_year 2023
Properties of Dictionary Keys
Dictionary values have no restrictions. They can be any arbitrary Python object, either standard objects or user-defined objects. However, same is not true for the keys.
There are two important points to remember about dictionary keys −
More than one entry per key not allowed. Which means no duplicate key is allowed. When duplicate keys encountered during assignment, the last assignment wins. For example −
dict = {'Name': 'Zara', 'Age': 7, 'Name': 'Manni'}
print ("dict['Name']: ", dict['Name'])
When the above code is  executed, it produces the following result −
dict['Name']:  Manni
Keys must be immutable. Which means you can use strings, numbers or tuples as dictionary keys but something like ['key'] is not allowed. Following is a simple example −
dict = {['Name']: 'Zara', 'Age': 7}
print ("dict['Name']: ", dict['Name'])
When the above code is executed, it produces the following result −
Traceback (most recent call last):
   File "test.py", line 3, in <module>
      dict = {['Name']: 'Zara', 'Age': 7};
TypeError: unhashable type: 'list'
Python Dictionary Operators
In Python, following operators are defined to be used with dictionary operands. In the example, the following dictionary objects are used.
d1 = {'a': 2, 'b': 4, 'c': 30}
d2 = {'a1': 20, 'b1': 40, 'c1': 60}
Operator
Description
Example
dict[key]
Extract/assign the value mapped with key
print (d1['b']) retrieves 4
d1['b'] = 'Z' assigns new value to key 'b'
dict1|dict2
Union of two dictionary objects, returning new object
d3=d1|d2 ; print (d3)
{'a': 2, 'b': 4, 'c': 30, 'a1': 20, 'b1': 40, 'c1': 60}
dict1|=dict2
Augmented dictionary union operator
d1|=d2; print (d1)
{'a': 2, 'b': 4, 'c': 30, 'a1': 20, 'b1': 40, 'c1': 60}
Python Dictionary Methods
Python includes following dictionary methods −
Sr.No.
Methods with Description
dict.clear()
Removes all elements of dictionary
dict
dict.copy()
Returns a shallow copy of dictionary
dict
dict.fromkeys()
Create a new dictionary with keys from seq and values
value
dict.get(key, default=None)
key, returns value or default if key not in dictionary
dict.has_key(key)
Returns
true
if key in dictionary
dict
false
otherwise
dict.items()
Returns a list of
dict
's (key, value) tuple pairs
dict.keys()
Returns list of dictionary dict's keys
dict.setdefault(key, default=None)
Similar to get(), but will set dict[key]=default if
is not already in dict
dict.update(dict2)
Adds dictionary
dict2
's key-values pairs to
dict
dict.values()
Returns list of dictionary
dict
's values
Built-in Functions with Dictionaries
Following are the built-in functions we can use with Dictionaries −
Sr.No.
Function with Description
cmp(dict1, dict2)

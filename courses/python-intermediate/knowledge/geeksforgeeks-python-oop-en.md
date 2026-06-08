# geeksforgeeks-python-oop

Source: https://www.geeksforgeeks.org/python-oops-concepts/

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
Python OOP Concepts
Last Updated :
8 Jun, 2026
Object Oriented Programming empowers developers to build modular, maintainable and scalable applications. OOP is a way of organizing code that uses objects and classes to represent real-world entities and their behavior. In OOP, object has attributes thing that has specific data and can perform certain actions using methods.
Organizes code into classes and objects.
Supports encapsulation to group data and methods together.
Enables inheritance for reusability and hierarchy.
Allows polymorphism for flexible method implementation.
Object Oriented Programming
Class
A class is a collection of objects.
Classes
are blueprints for creating objects. A class defines a set of attributes and methods that the created objects (instances) can have.
Classes are created by keyword class.
Attributes are the variables that belong to a class.
Attributes are always public and can be accessed using the dot (.) operator.
Example:
Myclass.Myattribute
Creating a Class
Here, class keyword indicates that we are creating a class followed by name of the class (Dog in this case).
Python
class
species
"Canine"
# Class attribute
__init__
self
name
self
name
name
# Instance attribute
self
# Instance attribute
Explanation:
class Dog: creates a class named Dog, which acts as a blueprint for dog objects.
species is a class attribute, meaning it is shared by all instances of the class.
__init__()
is a constructor method that runs automatically when a new object is created. It is used to initialize object data.
self
refers to the current object, allowing each object to store and access its own data.
self.name and self.age are instance attributes, unique to each Dog object created from the class.
Objects
Object
is an instance of a Class. It represents a specific implementation of the class and holds its own data. An object consists of:
State: represented by the attributes and reflects the properties of an object.
Behavior: represented by the methods of an object and reflects the response of an object to other objects.
Identity: gives a unique name to an object and enables one object to interact with other objects.
Creating Object
Creating an object involves instantiating a class to create a new instance of that class. This process is also referred to as object instantiation.
Python
class
species
"Canine"
# Class attribute
__init__
self
name
self
name
name
# Instance attribute
self
# Instance attribute
# Creating an object of the Dog class
dog1
"Buddy"
print
dog1
name
print
dog1
species
Output
Buddy
Canine
Explanation:
dog1 = Dog("Buddy", 3):
Creates an object of the Dog class with name as "Buddy" and age as 3.
dog1.name:
Accesses the instance attribute name of the dog1 object.
dog1.species:
Accesses the class attribute species of the dog1 object.
Four Pillars of OOP
Four Pillars of Object-Oriented Programming (OOP) form the foundation for designing structured, reusable and maintainable software.
1. Inheritance
Inheritance
allows a class (child class) to acquire properties and methods of another class (parent class). It supports hierarchical classification and promotes code reuse.
Inheritance in Python
2. Polymorphism
Polymorphism
means "same operation, different behavior." It allows functions or methods with the same name to work differently depending on the type of object they are acting upon.
The flowchart below represents the different types of polymorphism, showing how a single interface can exhibit multiple behaviors at compile-time and run-time.
Types of Polymorphism
3. Encapsulation
Encapsulation
is the bundling of data (attributes) and methods (functions) within a class, restricting access to some components to control interactions. A class is an example of encapsulation as it groups together member functions, variables and other related data in a single unit.
Encapsulation in Python
4. Data Abstraction
Abstraction
hides the internal implementation details while exposing only the necessary functionality. It helps focus on "what to do" rather than "how to do it."
Data Abstraction in Python
Related Articles:
Static Method
Operator Overloading
Comment
Article Tags:
Article Tags:
Python
python-oop-concepts

# geeksforgeeks-python-unittest

Source: https://www.geeksforgeeks.org/unit-testing-python-unittest/

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
Python Unittest Tutorial
Last Updated :
5 Jun, 2026
Unit testing checks small pieces of code (like functions or classes) to confirm they work correctly. In
Python
, this is done with the unittest framework, which is built into the standard library and follows the xUnit style. The unittest module is widely used because:
No setup needed as it comes pre-installed in Python.
Supports test cases, fixtures, assertions, and test suites.
Can discover and run tests across the project.
Reliable for projects of any size, with easy integration into other tools.
This makes unittest a dependable choice for creating systematic and automated tests in Python.
Example:
Testing a Simple Addition
Unittest framework allows developers to verify that functions produce the expected results. A test case is created by inheriting from unittest.TestCase and defining methods that start with test_.
Python
import
unittest
return
class
TestAdd
unittest
TestCase
test_addition
self
self
assertEqual
__name__
"__main__"
unittest
main
Output
----------------------------------------------------------------------
Ran 1 test in 0.000s
Explanation:
add() returns the sum of two numbers.
TestAdd inherits from unittest.TestCase, making it a test case class.
test_addition() verifies that add(2, 3) returns 5.
assertEqual() checks whether the actual result matches the expected value.
Assert Methods
Unittest has many methods to assert on the values, types and existence of variables. Below are some of the methods that are commonly used to write assertions:
Method
Description
.assertEqual(a, b)
Checks if a is equal to b, similar to the expression a == b.
.assertTrue(x)
Asserts that the boolean value of x is True, equivalent to bool(x) is True.
.assertIsInstance(a, b)
Asserts that a is an instance of class b, similar to the expression isinstance(a, b).
.assertIsNone(x)
Ensures that x is None, similar to the expression x is None.
.assertFalse(x)
Asserts that the boolean value of x is False, similar to bool(x) is False.
.assertIs(a, b)
Verifies if a is identical to b, akin to the expression a is b.
.assertIn(a, b)
Checks if a is a member of b, akin to the expression a in b.
OOP Concepts Supported by Unittest Framework
Unit testing is associated with white-box testing as tests are usually written with knowledge of the internal code structure. However, unit tests can also be designed from a black-box perspective.
test fixture:
A test fixture is used as a baseline for running tests to ensure that there is a fixed environment in which tests are run so that results are repeatable. For example creating temporary databases or starting a server process.
test case:
A test case is a set of conditions which is used to determine whether a system under test works correctly.
test suite:
Test suite is a collection of testcases that are used to test a software program to show that it has some specified set of behaviours by executing the aggregated tests together.
test runner:
A test runner is a component which set up the execution of tests and provides the outcome to the user.
More Examples
Example 1:
We will write a simple function add() that returns the sum of two numbers. Using unittest framework, we create a test case class TestAddFunction to verify different scenarios of this function.
Python
#test.py
import
unittest
return
class
TestAddFunction
unittest
TestCase
test_add_positive_numbers
self
self
assertEqual
test_add_negative_numbers
self
self
assertEqual
test_add_mixed_numbers
self
self
assertEqual
self
assertEqual
__name__
'__main__'
unittest
main
To run the unit tests, run the following command in your terminal:
python test.py
Output
----------------------------------------------------------------------
Ran 3 tests in 0.001s
If a test fails (e.g., expected value is changed), output shows the failed test:
======================================================================
FAIL: test_add_positive_numbers (__main__.TestAddFunction)
----------------------------------------------------------------------
Traceback (most recent call last):
AssertionError: 3 != 2
----------------------------------------------------------------------
Ran 3 tests in 0.001s
FAILED (failures=1)
Use -v option for detailed results:
python test.py -v
Output
test_add_mixed_numbers (__main__.TestAddFunction) ... ok
test_add_negative_numbers (__main__.TestAddFunction) ... ok
test_add_positive_numbers (__main__.TestAddFunction) ... ok
Ran 3 tests in 0.002s
Outcomes Possible in Unit Testing
All tests passed.
FAIL:
Test assertion failed (AssertionError).
ERROR:
Test raised an unexpected exception.
Example 2:
This example demonstrates testing different string operations using unittest framework. The test case class TestStringMethods includes multiple tests to verify string properties and behavior.
Python
import
unittest
class
TestStringMethods
unittest
TestCase
setUp
self
pass
# Returns True if the string contains 4 a.
test_strings_a
self
self
assertEqual
'aaaa'
# Returns True if the string is in upper case.
test_upper
self
self
assertEqual
'foo'
upper
'FOO'
test_isupper
self
self
assertTrue
'FOO'
isupper
self
assertFalse
'Foo'
isupper
test_strip
self
'geeksforgeeks'
self
assertEqual
strip
'geek'
'sforgeeks'
# Returns true if the string splits and matches
# the given output.
test_split
self
'hello world'
self
assertEqual
split
'hello'
'world'
with
self
assertRaises
TypeError
split
__name__
'__main__'
unittest
main
Output
.....
----------------------------------------------------------------------
Ran 5 tests in 0.000s
Explanation:
assertEqual():
Checks if the result equals the expected value.
assertTrue() / assertFalse():
Verifies if a condition is True or False.
assertRaises():
Confirms a specific exception is raised.
test_strings_a():
Verifies character multiplication.
test_upper():
Checks string conversion to uppercase.
test_isupper():
Checks uppercase property of string.
test_strip():
Ensures specified characters are removed from string.
test_split():
Checks splitting of string and validates TypeError for invalid input.
unittest.main():
Runs all tests and provides a command-line interface.
Comment
Article Tags:
Article Tags:
Python
Python unittest-library
Python Testing

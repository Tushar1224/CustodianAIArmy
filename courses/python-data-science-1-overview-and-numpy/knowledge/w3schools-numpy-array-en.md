# w3schools-numpy-array

Source: https://www.w3schools.com/python/numpy/numpy_creating_arrays.asp

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
NumPy
Tutorial
NumPy HOME
NumPy Intro
NumPy Getting Started
NumPy Creating Arrays
NumPy Array Indexing
NumPy Array Slicing
NumPy Data Types
NumPy Copy vs View
NumPy Array Shape
NumPy Array Reshape
NumPy Array Iterating
NumPy Array Join
NumPy Array Split
NumPy Array Search
NumPy Array Sort
NumPy Array Filter
NumPy
Random
Random Intro
Data Distribution
Random Permutation
Seaborn Module
Normal Distribution
Binomial Distribution
Poisson Distribution
Uniform Distribution
Logistic Distribution
Multinomial Distribution
Exponential Distribution
Chi Square Distribution
Rayleigh Distribution
Pareto Distribution
Zipf Distribution
NumPy
ufunc
ufunc Intro
ufunc Create Function
ufunc Simple Arithmetic
ufunc Rounding Decimals
ufunc Logs
ufunc Summations
ufunc Products
ufunc Differences
ufunc Finding LCM
ufunc Finding GCD
ufunc Trigonometric
ufunc Hyperbolic
ufunc Set Operations
NumPy
Cert
NumPy Certificate
Quiz/Exercises
NumPy Editor
NumPy Quiz
NumPy Exercises
NumPy Syllabus
NumPy Study Plan
NumPy
Creating Arrays
❮ Previous
Next ❯
Create a NumPy ndarray Object
NumPy is used to work with arrays. The array object in NumPy is called
ndarray
We can create a NumPy
ndarray
object by using the
array()
function.
Example
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(arr)
print(type(arr))
Try it Yourself »
type():
This built-in Python function tells us the type of the object passed to it. Like in above code 
  it shows that
numpy.ndarray
type.
To create an
ndarray
we can pass a list, tuple or any array-like object into the
array()
method, and it will be converted into an
ndarray
Example
Use a tuple to create a NumPy array:
import numpy as np
arr = np.array((1, 2, 3, 4, 5))
print(arr)
Try it Yourself »
Dimensions in Arrays
A dimension in arrays is one level of array depth (nested arrays).
nested array:
are arrays that have arrays as their elements.
0-D Arrays
0-D arrays, 
or Scalars, are the elements in an array. Each value in an array is a 0-D array.
Example
Create a 0-D array with value 42
import numpy as np
arr = np.array(42)
print(arr)
Try it Yourself »
1-D Arrays
An array that has 0-D arrays as its elements is called uni-dimensional or 1-D array.
These are the most common and basic arrays.
Example
Create a 1-D array containing the values 1,2,3,4,5:
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(arr)
Try it Yourself »
2-D Arrays
An array that has 1-D arrays as its elements is called a 2-D array.
These are often used to represent matrix or 2nd order tensors.
NumPy has a whole sub module dedicated towards matrix operations called
numpy.mat
Example
Create a 2-D array containing two arrays with the values 1,2,3 and 4,5,6:
import numpy as np
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr)
Try it Yourself »
3-D arrays
An array that has 2-D arrays (matrices) as its elements is called 3-D array.
These are often used to represent a 3rd order tensor.
Example
Create a 3-D array with two 2-D arrays, both containing two arrays with the 
values 1,2,3 and 4,5,6:
import numpy as np
arr = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]])
print(arr)
Try it Yourself »
Check Number of Dimensions?
NumPy Arrays provides the
ndim
attribute that returns an integer that tells us how many dimensions the array have.
Example
Check how many dimensions the arrays have:
import numpy as np
a = np.array(42)
b = np.array([1, 2, 3, 4, 5])
c = np.array([[1, 2, 3], [4, 5, 6]])
d = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]])
print(a.ndim)
print(b.ndim)
print(c.ndim)
print(d.ndim)
Try it Yourself »
Higher Dimensional Arrays
An array can have any number of dimensions.
When the array is created, you can define the number of dimensions by using 
ndmin
argument.
Example
Create an array with 5 dimensions and verify that it has 5 dimensions:
import numpy as np
arr = np.array([1, 2, 3, 4], ndmin=5)
print(arr)
print('number of dimensions :', arr.ndim)
Try it Yourself »
In this array the innermost dimension (5th dim) has 4 elements,
the 4th dim has 1 element that is the vector,
the 3rd dim has 1 element that is the matrix with the vector,
the 2nd dim has 1 element that is 3D array and 1st dim has 1 element that is a 4D array.
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

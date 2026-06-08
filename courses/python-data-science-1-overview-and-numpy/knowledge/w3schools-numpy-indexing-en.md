# w3schools-numpy-indexing

Source: https://www.w3schools.com/python/numpy/numpy_array_indexing.asp

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
Array Indexing
❮ Previous
Next ❯
Access Array Elements
Array indexing is the same as accessing an array element.
You can access an array element by referring to its index number.
The indexes in NumPy arrays start with 0, meaning that the first element  
has index 0, and the second has index 1 etc.
Example
Get the first element from the following array:
import numpy as np
arr = np.array([1, 2, 3, 4])
print(arr[0])
Try it Yourself »
Example
Get the second element from the following array.
import numpy as np
arr = np.array([1, 2, 3, 4])
print(arr[1])
Try it Yourself »
Example
Get third and fourth elements from the following array and add them.
import numpy as np
arr = np.array([1, 2, 3, 4])
print(arr[2] + 
  arr[3])
Try it Yourself »
Access 2-D Arrays
To access elements from 2-D arrays we can use comma separated integers representing 
dimension and the index of the element.
Think of 2-D arrays like a table with rows and columns, where the dimension 
represents the row and the index represents the column.
Example
Access the element on the first row, second column:
import numpy as np
arr = np.array([[1,2,3,4,5], [6,7,8,9,10]])
print('2nd element on 1st row: ', arr[0, 1])
Try it Yourself »
Example
Access the element on the 2nd row, 5th column:
import numpy as np
arr = np.array([[1,2,3,4,5], [6,7,8,9,10]])
print('5th element on 
  2nd row: ', arr[1, 4])
Try it Yourself »
Access 3-D Arrays
To access elements from 3-D arrays we can use comma separated integers representing 
the dimensions and the index of the element.
Example
Access the third element of the second array of the first array:
import numpy as np
arr = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 
  9], [10, 11, 12]]])
print(arr[0, 1, 2])
Try it Yourself »
Example Explained
arr[0, 1, 2]
prints the value
And this is why:
The first number represents the first dimension, which contains two arrays:
[[1, 2, 3], [4, 5, 6]]
and:
[[7, 8, 9], [10, 11, 12]]
Since we selected
, we are left with the first array:
[[1, 2, 3], [4, 5, 6]]
The second number represents the second dimension, which also contains two arrays:
[1, 2, 3]
and:
[4, 5, 6]
Since we selected
, we are left with the second array:
[4, 5, 6]
The third number represents the third dimension, which contains three values:
Since we selected
, we end up with the third value:
Negative Indexing
Use negative indexing to access an array from the end.
Example
Print the last element from the 2nd dim:
import numpy as np
arr = np.array([[1,2,3,4,5], [6,7,8,9,10]])
print('Last element 
  from 
  2nd dim: ', arr[1, -1])
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

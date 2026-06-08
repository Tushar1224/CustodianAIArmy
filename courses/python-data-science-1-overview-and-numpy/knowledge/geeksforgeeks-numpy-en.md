# geeksforgeeks-numpy

Source: https://www.geeksforgeeks.org/python-numpy/

Courses
Tutorials
Practice
Jobs
Practice Problems
Java
Python
JavaScript
Data Science
Machine Learning
Courses
Linux
DevOps
Share Your Experiences
Introduction
NumPy Introduction
Python NumPy
NumPy Array in Python
Basics of NumPy Arrays
Numpy - ndarray
Data type Object (dtype) in NumPy Python
Creating NumPy Array
Numpy - Array Creation
numpy.arange() in Python
numpy.zeros() in Python
NumPy - Create array filled with all ones
NumPy -  linspace()  Function
numpy.eye() in Python
Creating a one-dimensional NumPy array
How to create an empty and a full NumPy array
Create a Numpy array filled with all zeros - Python
How to generate 2-D Gaussian array using NumPy?
How to create a vector in Python using NumPy
Python - Numpy fromrecords() method
NumPy Array Manipulation
NumPy Copy and View of Array
How to Copy NumPy array into another array?
Appending values at the end of an NumPy array
How to swap columns of a given NumPy array?
Insert a new axis within a NumPy array
numpy.hstack() in Python
numpy.vstack() in python
Joining NumPy Array
Combining a One and a Two-Dimensional NumPy Array
Numpy np.ma.concatenate() method-Python
Numpy dstack() method-Python
Splitting Arrays in NumPy
How to compare two NumPy arrays?
Find the union of two NumPy arrays
Find unique rows in a NumPy array
Numpy np.unique() method-Python
numpy.trim_zeros() in Python
Courses
Python Programming Course
Data Analytics Course
Data Science and ML Course
Summer SkillUp
Explore
Python NumPy
Last Updated :
31 Mar, 2026
Numpy
is a general-purpose array-processing package. It provides a high-performance multidimensional array object and tools for working with these arrays. It is the fundamental package for scientific computing with Python. Besides its obvious scientific uses, Numpy can also be used as an efficient multi-dimensional container of generic data.
Numpy Fundamentals
Arrays in Numpy
A NumPy array is a structured collection of elements of the same data type stored in a table format.
The number of dimensions is called the rank and the size along each dimension is called the shape.
In NumPy, arrays are called ndarray and elements are accessed using square brackets [], often created from nested Python lists.
Creating a Numpy Array
Arrays in Numpy can be created by multiple ways, with various number of Ranks, defining the size of the Array. Arrays can also be created with the use of various data types such as lists, tuples, etc. The type of the resultant array is deduced from the type of the elements in the sequences.
Note:
Type of array can be explicitly defined while creating the array.
Python
import
numpy
array
print
array
print
array
print
Output
[1 2 3]
[[1 2 3]
 [4 5 6]]
[1 3 2]
Accessing the Array Index
In a numpy array, indexing or accessing the array index can be done in multiple ways. To print a range of an array, slicing is done. Slicing of an array is defining a range in a new array which is used to print a range of elements from the original array. Since, sliced array holds a range of elements of the original array, modifying content with the help of sliced array modifies the original array content.
Python
import
numpy
array
arr2
print
"first 2 rows and alternate columns(0 and 2):
arr2
arr3
print
Elements at indices (1, 3), "
"(1, 2), (0, 1), (3, 0):
arr3
Output
first 2 rows and alternate columns(0 and 2):
 [[-1.  0.]
 [ 4.  6.]]
Elements at indices (1, 3), (1, 2), (0, 1), (3, 0):
 [0. 6. 2. 3.]
Basic Array Operations
In numpy, arrays allow a wide range of operations which can be performed on a particular array or a combination of Arrays. These operations include some basic Mathematical operation as well as Unary and Binary operations.
Python
import
numpy
array
array
print
"Adding 1 to every element:"
print
Subtracting 2 from each element:"
print
Sum of all array elements: "
print
Array sum:
Output
Adding 1 to every element: [[2 3]
 [4 5]]
Subtracting 2 from each element: [[ 2  1]
 [ 0 -1]]
Sum of all array elements:  10
Array sum:
 [[5 5]
 [5 5]]
Data Types in Numpy
A NumPy array is a table of elements (usually numbers) of the same data type, indexed by a tuple of positive integers. Each array has a dtype that defines the type of its elements and how they are stored in memory. NumPy provides many numeric data types and you can either let NumPy guess the type or specify it explicitly when creating an array.
Constructing a Datatype Object
In Numpy, datatypes of Arrays need not to be defined unless a specific datatype is required. Numpy tries to guess the datatype for Arrays which are not predefined in the constructor function.
Python
import
numpy
array
print
dtype
array
print
dtype
array
dtype
int64
print
dtype
Output
int64
float64
int64
Math Operations on DataType array
In Numpy arrays, basic mathematical operations are performed element-wise on the array. These operations are applied both as operator overloads and as functions. Many useful functions are provided in Numpy for performing computations on Arrays such as sum for addition of Array elements, T for Transpose of elements, etc.
Python
import
numpy
arr1
array
dtype
float64
arr2
array
dtype
float64
arr1
arr2
print
Sum1
arr1
print
Sum1
Sqrt
sqrt
arr1
print
Sqrt
Trans_arr
arr1
print
Trans_arr
Output
[[ 7. 13.]
 [ 4. 14.]]
19.0
[[2.         2.64575131]
 [1.41421356 2.44948974]]
[[4. 2.]
 [7. 6.]]
To learn about default numpy methods, refer to
Numpy Methods
Programs on Numpy
Get unique values from a list
Multiply all numbers in list
Transpose a matrix
Multiplication of two Matrices
Checkerboard pattern of nxn
Graph Plotting in Python |
Set 1
Set 2
Set 3
Related Articles
Basic Slicing and Advanced Indexing
rand vs normal in Numpy.random
Advanced Array Operations
Comment
Article Tags:
Article Tags:
Numpy
Python-numpy

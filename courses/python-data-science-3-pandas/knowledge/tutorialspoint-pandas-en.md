# Tutorialspoint Pandas

Source: https://www.tutorialspoint.com/python_pandas/index.htm

Python Pandas - Home
Python Pandas - Introduction
Python Pandas - Environment Setup
Python Pandas - Basics
Python Pandas - Introduction to Data Structures
Python Pandas - Index Objects
Python Pandas - Panel
Python Pandas - Basic Functionality
Python Pandas - Indexing & Selecting Data
Python Pandas - Series
Python Pandas - Series
Python Pandas - Slicing a Series Object
Python Pandas - Attributes of a Series Object
Python Pandas - Arithmetic Operations on Series Object
Python Pandas - Converting Series to Other Objects
Python Pandas - DataFrame
Python Pandas - DataFrame
Python Pandas - Accessing DataFrame
Python Pandas - Slicing a DataFrame Object
Python Pandas - Modifying DataFrame
Python Pandas - Removing Rows from a DataFrame
Python Pandas - Arithmetic Operations on DataFrame
Python Pandas - IO Tools
Python Pandas - IO Tools
Python Pandas - Working with CSV Format
Python Pandas - Reading & Writing JSON Files
Python Pandas - Reading Data from an Excel File
Python Pandas - Writing Data to Excel Files
Python Pandas - Working with HTML Data
Python Pandas - Clipboard
Python Pandas - Working with HDF5 Format
Python Pandas - Comparison with SQL
Python Pandas - Data Handling
Python Pandas - Sorting
Python Pandas - Reindexing
Python Pandas - Iteration
Python Pandas - Concatenation
Python Pandas - Statistical Functions
Python Pandas - Descriptive Statistics
Python Pandas - Working with Text Data
Python Pandas - Function Application
Python Pandas - Options & Customization
Python Pandas - Window Functions
Python Pandas - Aggregations
Python Pandas - Merging/Joining
Python Pandas - MultiIndex
Python Pandas - Basics of MultiIndex
Python Pandas - Indexing with MultiIndex
Python Pandas - Advanced Reindexing with MultiIndex
Python Pandas - Renaming MultiIndex Labels
Python Pandas - Sorting a MultiIndex
Python Pandas - Binary Operations
Python Pandas - Binary Comparison Operations
Python Pandas - Boolean Indexing
Python Pandas - Boolean Masking
Python Pandas - Data Reshaping & Pivoting
Python Pandas - Pivoting
Python Pandas - Stacking & Unstacking
Python Pandas - Melting
Python Pandas - Computing Dummy Variables
Python Pandas - Categorical Data
Python Pandas - Categorical Data
Python Pandas - Ordering & Sorting Categorical Data
Python Pandas - Comparing Categorical Data
Python Pandas - Handling Missing Data
Python Pandas - Missing Data
Python Pandas - Filling Missing Data
Python Pandas - Interpolation of Missing Values
Python Pandas - Dropping Missing Data
Python Pandas - Calculations with Missing Data
Python Pandas - Handling Duplicates
Python Pandas - Duplicated Data
Python Pandas - Counting & Retrieving Unique Elements
Python Pandas - Duplicated Labels
Python Pandas - Grouping & Aggregation
Python Pandas - GroupBy
Python Pandas - Time-series Data
Python Pandas - Date Functionality
Python Pandas - Timedelta
Python Pandas - Sparse Data Structures
Python Pandas - Sparse Data
Python Pandas - Visualization
Python Pandas - Visualization
Python Pandas - Additional Concepts
Python Pandas - Caveats & Gotchas
Python Pandas Useful Resources
Python Pandas - Quick Guide
Python Pandas - Cheatsheet
Python Pandas - Useful Resources
Python Pandas - Discussion
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
Python Pandas Tutorial
Pandas
is an open-source, BSD-licensed Python library providing high-performance, easy-to-use data structures and data analysis tools for the
Python programming language
. This
Pandas tutorial
has been prepared for those who want to learn about the foundations and advanced features of the Pandas Python package. Python with Pandas is used in a wide range of fields including academic and commercial domains including finance, economics, Statistics, analytics, etc. In this tutorial, we will learn the various features of Python Pandas and how to use them in practice.
What is Pandas?
Pandas
is a powerful Python library that is specifically designed to work on data frames that have "relational" or "labeled" data. Its aim aligns with doing real-world data analysis using Python. Its flexibility and functionality make it indispensable for various data-related tasks. Hence, this Python package works well for data manipulation, operating a dataset, exploring a data frame, data analysis, and machine learning-related tasks. To work on it we should first install it using a pip command like "pip install pandas" and then import it like "import pandas as pd". After successfully installing and importing, we can enjoy the innovative functions of pandas to work on datasets or data frames. Pandas versatility and ease of use make it a go-to tool for working with structured data in Python.
Generally, Pandas operates a data frame using
Series
DataFrame
; where Series works on a one-dimensional labeled array holding data of any type like
integers
strings
, and
objects
, while a DataFrame is a two-dimensional data structure that manages and operates data in tabular form (using rows and columns).
This Pandas Tutorial is based on the Latest Pandas 2.3.3 version.
Why Pandas?
The beauty of Pandas is that it simplifies the task related to data frames and makes it simple to do many of the time-consuming, repetitive tasks involved in working with data frames, such as:
Import datasets
− available in the form of spreadsheets, comma-separated values (CSV) files, and more.
Data cleansing
− dealing with missing values and representing them as NaN, NA, or NaT.
Size mutability
− columns can be added and removed from DataFrame and higher-dimensional objects.
Data normalization
− normalize the data into a suitable format for analysis.
Data alignment
− objects can be explicitly aligned to a set of labels.
Intuitive merging and joining data sets – we can merge and join datasets.
Reshaping and pivoting of datasets
− datasets can be reshaped and pivoted as per the need.
Efficient manipulation and extraction
− manipulation and extraction of specific parts of extensive datasets using intelligent label-based slicing, indexing, and subsetting techniques.
Statistical analysis
− to perform statistical operations on datasets.
Data visualization
− Visualize datasets and uncover insights.
Python Online Compiler
Our Python Pandas tutorial provides various examples to explain different concepts. We have provided
Online Python Compiler/Interpreter
. You can Edit and Execute almost all the examples directly from your browser without the need to set up your development environment.
Try to click the icon
to run the following Python code to print conventional "Hello, World!".
Below code box allows you to change the value of the code. Try to change the value inside
print()
and run it again to verify the result.
# This is my first Python program.
# This will print 'Hello, World!' as the output
print ("Hello, World!");
Applications of Pandas
The most common applications of Pandas are as follows:
Data Cleaning
− Pandas provides functionalities to clean messy data, deal with incomplete or inconsistent data, handle missing values, remove duplicates, and standardize formats to do effective data analysis.
Data Exploration
− Pandas easily summarize statistics, find trends, and visualize data using built-in plotting functions, Matplotlib, or Seaborn integration.
Data Preparation
− Pandas may pivot, melt, convert variables, and merge datasets based on common columns to prepare data for analysis.
Data Analysis
− Pandas supports descriptive statistics, time series analysis, group-by operations, and custom functions.
Data Visualisation
− Pandas itself has basic plotting capabilities; it integrates and supports data visualization libraries like Matplotlib, Seaborn, and Plotly to create innovative visualizations.
Time Series Analysis
− Pandas supports
date/time
indexing
, resampling, frequency conversion, and rolling statistics for time series data.
Data Aggregation and Grouping
Pandas groupby() function
lets you aggregate data and compute group-wise summary statistics or apply functions to groups.
Data Input/Output
− Pandas makes data input and export easy by reading and writing CSV, Excel, JSON, SQL databases, and more.
Machine Learning
− Pandas works well with Scikit-learn for data preparation, feature engineering, and model input data.
Web Scraping
− Pandas may be used with BeautifulSoup or Scrapy to parse and analyse structured web data for web scraping and data extraction.
Financial Analysis
− Pandas is commonly used in finance for stock market data analysis, financial indicator calculation, and portfolio optimization.
Text Data Analysis
− Pandas' string manipulation, regular expressions, and text mining functions help analyse textual data.
Experimental Data Analysis
− Pandas makes manipulating and analysing large datasets, performing statistical tests, and visualizing results easy.
Audience: Who Should Learn Pandas
This
Pandas tutorial
has been prepared for those who want to learn about the foundations and advanced features of the Pandas Python package. It is most widely used in the domain of data science, engineering, research, agriculture science, management, statistics, and other related fields where computation on a data set requires or explores the data frames to find out the data insights that are required to make fruitful decisions. After completing this tutorial, you will find yourself skilled in pandas Python package from where you can take yourself to the next levels of expertise on other Python packages like Matplotlib, SciPy, scikit-learn, scikit-image, and many more to keep mastering Python language.
Pandas library uses most of the functionalities of NumPy. It is suggested to you to go through our tutorial on
NumPy
Prerequisites To Learn Pandas
You should have a basic understanding of computer programming. A basic understanding of Python and any of the programming languages is a plus. Basic knowledge of statistics and mathematics is helpful for data analysis and interpretation. Pandas provide functions for descriptive statistics, aggregation, and computation of summary metrics. By having a strong foundation of above mentioned, you'll be well-equipped to leverage the power of Pandas for data manipulation and analysis tasks.
Pandas Codebase
You can find the source for the Pandas at
https://github.com/jvns/pandas-cookbook
Frequently Asked Questions about Python Pandas
There are some very Frequently Asked Questions(FAQ) about Python Pandas, this section tries to answer them briefly.
What is Python pandas used for?
Pandas is a Python library used for data manipulation and analysis. It is widely used in the domain of data science, engineering, research, agriculture science, management, statistics, and other related fields where you need to work with datasets.
List Key Features of Pandas.
The key features of Pandas as follows −
Fast and Efficient DataFrame Object.
Pandas supports various data loading tools for in-memory data objects.
Data alignment and handling of missing data.
Pandas allows you to reshaping and pivoting of datasets.
Label-based slicing, indexing and subsetting of large data sets.
Insert or delete columns from a data structure.
Group by data for aggregation and transformations.
High performance merging and joining.
Time Series functionality.
Define Series in Pandas?
A Series in Pandas is a one-dimensional labeled array capable of holding data of any type (integer, string, float, Python objects, etc.).
What are the two main data types in pandas?
The two primary data structures of pandas are −
Series (1-dimensional)
DataFrame (2-dimensional)
Why do we need pandas in Python?
Pandas is the best tool for handling real-world messy data. It is built on top of NumPy and is open-source. Pandas allows for fast and effective data manipulation using its data structures, Series and DataFrame. It handles missing data, supports multiple file formats, and facilitates data cleaning and analysis.
Is Python pandas free for commercial use?
Yes, Python pandas is free for commercial use. It is accessible to everyone and free for users to use and modify.
Who developed Python pandas?
Pandas development began in 2008 at AQR Capital Management. By the end of 2009, it had been open-sourced, and it is now actively supported by a community of contributors worldwide.
What is the structure of pandas?
The two primary data structures of pandas are:
Series
− 1-dimensional labeled array.
DataFrame
− 2-dimensional table of data with labeled axes.
How to Install Pandas in Python?
The easiest way to install pandas is to install it as part of the Anaconda distribution, a cross-platform distribution for data analysis and scientific computing. The Conda package manager is the recommended installation method for most users. For further details, refer to our
Environment Setup
Tutorial.
What is the difference between pandas and NumPy?
Pandas provides high-level data manipulation tools built on top of NumPy. The Pandas module mainly works with tabular data, whereas the NumPy module works with numerical data.
What can you do using Pandas?
Pandas is a Python package that provides fast, flexible, and expressive data structures designed to make working with "relational" or "labeled" data both easy and intuitive. It is a fundamental high-level building block for performing practical, real-world data analysis in Python, aiming to be the most powerful and flexible open-source data analysis/manipulation tool available in any language.
Which is the best place to learn Python pandas?
The best place to learn Python pandas is through our comprehensive and user-friendly tutorial. Our Python Pandas tutorial provides an excellent starting point for understanding data analysis programming with Python pandas. You can explore our simple and effective learning materials at your own pace.
How to Learn Python pandas?
Following are some tips to learn Python Pandas −
Decide to learn Python Pandas and stay committed to your goal.
Install the necessary tools like Anaconda or Miniconda on your computer.
Start with our Python Pandas tutorial and progress step by step from the basics.
Read more articles, watch online courses, or buy a book on Python Pandas to deepen your understanding.
Apply what youve learned by developing small projects that incorporate Python Pandas and other technologies.
How do I handle missing values in a DataFrame?
You can handle missing values in a DataFrame by −
Inserting missing data
Performing calculations with missing data
Dropping missing data
Filling missing data
Print Page
Previous
Next
Advertisements

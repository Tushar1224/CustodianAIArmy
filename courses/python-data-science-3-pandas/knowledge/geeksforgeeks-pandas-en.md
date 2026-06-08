# geeksforgeeks-pandas

Source: https://www.geeksforgeeks.org/python-pandas-dataframe/

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
Pandas Introduction
How to Install Pandas in Python?
How To Use Jupyter Notebook - An Ultimate Guide
Creating Objects
Creating a Pandas DataFrame
Python Pandas Series
Creating a Pandas Series
Viewing Data
Pandas Dataframe/Series.head() method - Python
Pandas Dataframe/Series.tail() method - Python
Pandas DataFrame describe() Method
Selection & Slicing
Dealing with Rows and Columns in Pandas DataFrame
Pandas Extracting rows using .loc[] - Python
Extracting rows using Pandas .iloc[] in Python
Indexing and Selecting Data with Pandas
Boolean Indexing in Pandas
Python | Pandas DataFrame.ix[ ]
Python | Pandas Series.str.slice()
How to take column-slices of DataFrame in Pandas?
Operations
Python | Pandas.Series.apply()
Apply function to every row in a Pandas DataFrame
Python | Pandas Series.apply()
Pandas dataframe.aggregate() | Python
Pandas DataFrame mean() Method
Python | Pandas Series.mean()
Python | Pandas dataframe.mad()
Python | Pandas Series.mad() to  calculate Mean Absolute Deviation of a Series
Python | Pandas dataframe.sem()
Python | Pandas Series.value_counts()
Pandas Index.value_counts()-Python
Applying Lambda functions to Pandas Dataframe
Manipulating Data
Adding New Column to Existing DataFrame in Pandas
Python | Delete rows/columns from DataFrame using Pandas.drop()
Python | Pandas DataFrame.truncate
Python | Pandas Series.truncate()
Iterating over rows and columns in Pandas DataFrame
Pandas Dataframe.sort_values()
Python | Pandas Dataframe.sort_values() | Set-2
How to add one row in existing Pandas DataFrame?
Grouping Data
Pandas GroupBy
Grouping Rows in pandas
Combining Multiple Columns in Pandas groupby with Dictionary
Merging, Joining, Concatenating and Comparing
Python | Pandas Merging, Joining and Concatenating
Python | Pandas Series.str.cat() to concatenate string
Python - Pandas dataframe.append()
Python | Pandas Series.append()
Pandas Index.append() - Python
Python | Pandas Series.combine()
Add a row at top in pandas DataFrame
Python | Pandas str.join() to join string/list elements with passed delimiter
Join two text columns into a single column in Pandas
How To Compare Two Dataframes with Pandas compare?
How to compare the elements of the two Pandas Series?
Working with Date and Time
Python | Working with date and time using Pandas
Python | Pandas Timestamp.timestamp
Python | Pandas Timestamp.now
Python | Pandas Timestamp.isoformat
Python | Pandas Timestamp.date
Python | Pandas Timestamp.replace
Pandas.to_datetime()-Python
Python | pandas.date_range() method
Working With Text Data
Python | Pandas Working With Text Data
Python | Pandas Series.str.lower(), upper() and title()
Python | Pandas Series.str.replace() to replace text in a series
Python | Pandas Series.replace()
Python | Pandas Series.str.strip(), lstrip() and rstrip()
Python | Pandas tseries.offsets.DateOffset
Working with CSV and Excel files
Pandas Read CSV in Python
Saving a Pandas Dataframe as a CSV
Loading Excel spreadsheet as pandas DataFrame
Creating a Dataframe using Excel Files
Python | Working with Pandas and XlsxWriter | Set - 1
Python | Working with Pandas and XlsxWriter | Set – 2
Python | Working with Pandas and XlsxWriter | Set – 3
Visualization
Data Visualization with Pandas
Data analysis and Visualization with Python
Data Analysis and Visualization with Python | Set 2
Box plot visualization with Pandas and Seaborn
Applications and Projects
How to do a vLookup in Python using Pandas
Convert CSV to HTML Table in Python
KDE Plot Visualization with Pandas and Seaborn
Analyzing Selling Price of used Cars using Python
Add CSS to the Jupyter Notebook using Pandas
Pandas Interview Questions
Courses
Python Programming Course
Data Analytics Course
Data Science and ML Course
Summer SkillUp
Explore
Pandas DataFrame
Last Updated :
6 Dec, 2025
A Pandas DataFrame is a two-dimensional table-like structure in Python where data is arranged in rows and columns. It’s one of the most commonly used tools for handling data and makes it easy to organize, analyze and manipulate data. It can store different types of data such as numbers, text and dates across its columns. The main parts of a DataFrame are:
Data
: Actual values in the table.
Rows
: Labels that identify each row.
Columns
: Labels that define each data category.
In this article, we’ll see the key components of a DataFrame and see how to work with it to make data analysis easier and more efficient.
DataFrame
Creating a Pandas DataFrame
Pandas allows us to create a DataFrame from many data sources. We can create DataFrames directly from Python objects like lists and dictionaries or by reading data from external files like CSV, Excel or SQL databases.
Here are some ways by which we create a dataframe:
1. Creating DataFrame using a List
If we have a simple list of data, we can easily
create a DataFrame
by passing that list to the pd.DataFrame() function.
Python
import
pandas
'Geeks'
'For'
'Geeks'
'is'
'portal'
'for'
'Geeks'
DataFrame
print
Output:
Output
2. Creating DataFrame from dict of ndarray/lists
We can create a DataFrame from a dictionary where the keys are column names and the values are lists or arrays.
All arrays/lists must have the same length.
If an index is provided, it must match the length of the arrays.
If no index is provided, Pandas will use a default range index (0, 1, 2, …).
Python
import
pandas
data
'Name'
'Tom'
'nick'
'krish'
'jack'
'Age'
DataFrame
data
print
Output:
For more details refer to
Creating a Pandas DataFrame
Working With Rows and Columns in Pandas DataFrame
We can perform basic operations on rows/columns like selecting, deleting, adding and renaming.
1. Column Selection
In Order to
select a column
in Pandas DataFrame, we can either access the columns by calling them by their columns name.
Python
import
pandas
data
'Name'
'Jai'
'Princi'
'Gaurav'
'Anuj'
'Age'
'Address'
'Delhi'
'Kanpur'
'Allahabad'
'Kannauj'
'Qualification'
'Msc'
'MA'
'MCA'
'Phd'
DataFrame
data
print
'Name'
'Qualification'
Output:
2. Row Selection
Pandas provide unique methods for selecting rows from a Data frame.
DataFrame.loc[]
method is used for label-based selection
Here we’ll be using
nba.csv
dataset in below examples for better understanding.
Python
import
pandas
data
read_csv
"/content/nba.csv"
index_col
"Name"
first
data
"Avery Bradley"
second
data
"R.J. Hunter"
print
first
\n\n\n
second
Output:
For more Details refer to
Dealing with Rows and Columns
Indexing and Selecting Data in Pandas DataFrame
Indexing in pandas means simply selecting particular rows and columns of data from a DataFrame. It allows us to access subsets of data such as:
Selecting all rows and some columns.
Selecting some rows and all columns.
Selecting a specific subset of rows and columns.
Indexing can also be known as
Subset Selection
1. Indexing a Dataframe using indexing operator []
The indexing operator [] is the basic way to select data in Pandas. We can use this operator to access columns from a DataFrame. This method allows us to retrieve one or more columns. The .loc and .iloc indexers also use the indexing operator to make selections.
In order to select a single column, we simply put the name of the column in-between the brackets.
Python
import
pandas
data
read_csv
"/content/nba.csv"
index_col
"Name"
first
data
"Age"
print
first
Output:
2. Indexing a DataFrame using .loc[ ]
.loc
method is used to select data by label. This means it uses the row and column labels to access specific data points. .loc[] is versatile because it can select both rows and columns simultaneously based on labels.
In order to select a single row using .loc[], we put a single row label in a .loc function.
Python
import
pandas
data
read_csv
"/content/nba.csv"
index_col
"Name"
first
data
"Avery Bradley"
second
data
"R.J. Hunter"
print
first
\n\n\n
second
Output:
3. Indexing a DataFrame using .iloc[ ]
.iloc()
method allows us to select data based on integer position. Unlike .loc[] (which uses labels) .iloc[] requires us to specify row and column positions as integers (0-based indexing).
In order to select a single row using .iloc[], we can pass a single integer to .iloc[] function.
Python
import
pandas
data
read_csv
"/content/nba.csv"
index_col
"Name"
row2
data
iloc
print
row2
Output:
For more Details refer
Indexing and Selecting Data with Pandas
Boolean Indexing in Pandas
Working with Missing Data
Missing Data can occur when no information is available for one or more items or for an entire row/column. In Pandas missing data is represented as NaN (Not a Number). Missing data can be problematic in real-world datasets where data is incomplete. Pandas provides several methods to handle such missing data effectively:
1. Checking for Missing Values using isnull() and notnull()
To check for missing values (NaN) we can use two useful functions:
isnull()
: It returns True for NaN (missing) values and False otherwise.
notnull()
: It returns the opposite, True for non-missing values and False for NaN values.
Python
import
pandas
import
numpy
dict
'First Score'
'Second Score'
'Third Score'
DataFrame
dict
print
isnull
Output:
2. Filling Missing Values using fillna(), replace() and interpolate()
In order to fill null values in a datasets, we use fillna(), replace() and interpolate() function these function replace NaN values with some value of their own. All these function help in filling a null values in datasets of a DataFrame. Interpolate() function is used to fill NA values in the dataframe but it uses various interpolation technique to fill the missing values rather than hard-coding the value.
Python
import
pandas
import
numpy
dict
'First Score'
'Second Score'
'Third Score'
DataFrame
dict
print
fillna
3. Dropping Missing Values using dropna()
If we want to remove rows or columns with missing data we can use the dropna() method. This method is flexible which allows us to drop rows or columns depending on the configuration.
Python
import
pandas
import
numpy
dict
'First Score'
'Second Score'
'Third Score'
'Fourth Score'
DataFrame
dict
print
Output:
Now we drop rows with at least one Nan value (Null value).
Python
import
pandas
import
numpy
dict
'First Score'
'Second Score'
'Third Score'
'Fourth Score'
DataFrame
dict
print
dropna
Output:
For more Details refer to
Working with Missing Data in Pandas
Iterating over rows and columns
Iteration refers to the process of accessing each item one at a time. In Pandas, it means iterating through rows or columns in a DataFrame to access or manipulate the data. We can iterate over rows and columns to extract values or perform operations on each item.
1. Iterating Over Rows
There are several ways to iterate over the rows of a Pandas DataFrame and three common methods are:
iteritems()
iterrows()
itertuples()
Each method provides different ways to iterate over the rows which depends on our specific needs.
Python
import
pandas
dict
'name'
"aparna"
"pankaj"
"sudhir"
"Geeku"
'degree'
"MBA"
"BCA"
"M.Tech"
"MBA"
'score'
DataFrame
dict
print
Output:
Here we apply
iterrows()
function in order to get a each element of rows.
Python
import
pandas
dict
'name'
"aparna"
"pankaj"
"sudhir"
"Geeku"
'degree'
"MBA"
"BCA"
"M.Tech"
"MBA"
'score'
DataFrame
dict
iterrows
print
print
Output:
2. Iterating Over Columns
In order to iterate over columns, we need to create a list of dataframe columns and then iterating through that list to pull out the dataframe columns.
Python
import
pandas
dict
'name'
"aparna"
"pankaj"
"sudhir"
"Geeku"
'degree'
"MBA"
"BCA"
"M.Tech"
"MBA"
'score'
DataFrame
dict
print
Output:
Now here we iterate through columns in order to iterate through columns we first create a list of dataframe columns and then iterate through list.
Python
columns
list
columns
print
Output:
For more Details refer to
Iterating over rows and columns in Pandas DataFrame
DataFrame Methods for Working with Data
Pandas has a variety of methods for manipulating data in a DataFrame. Here's are some useful DataFrame methods:
FUNCTION
DESCRIPTION
index()
Method returns index (row labels) of the DataFrame
insert()
Method inserts a column into a DataFrame
add()
Method returns addition of dataframe and other, element-wise (binary operator add)
sub()
Method returns subtraction of dataframe and other element-wise (binary operator sub)
mul()
Method returns multiplication of dataframe and other, element-wise (binary operator mul)
div()
Method returns floating division of dataframe and other element-wise (binary operator truediv)
unique()
Method extracts the unique values in the dataframe
nunique()
Method returns count of the unique values in the dataframe
value_counts()
Method counts the number of times each unique value occurs within the Series
columns()
Method returns the column labels of the DataFrame
axes()
Method returns a list representing the axes of the DataFrame
isnull()
Method creates a Boolean Series for extracting rows with null values
notnull()
Method creates a Boolean Series for extracting rows with non-null values
isin()
Method extracts rows from a DataFrame where a column value exists in a predefined collection
dtypes()
Method returns a Series with the data type of each column. The result’s index is the original DataFrame’s columns
astype()
Method converts the data types in a Series
values()
Method returns a Numpy representation of the DataFrame i.e only the values in the DataFrame will be returned, the axes labels will be removed
sort_values()
Method sorts a data frame in Ascending or Descending order of passed Column
sort_index()
Method sorts the values in a DataFrame based on their index positions or labels instead of their values but sometimes a data frame is made out of two or more data frames and hence later index can be changed using this method
loc[]
Method retrieves rows based on index label
iloc[]
Method retrieves rows based on index position
ix[]
Method retrieves DataFrame rows based on either index label or index position. This method combines the best features of the .loc[] and .iloc[] methods
rename()
Method is called on a DataFrame to change the names of the index labels or column names
drop()

# geeksforgeeks-matplotlib

Source: https://www.geeksforgeeks.org/python-introduction-matplotlib/

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
Introduction to Matplotlib
Last Updated :
9 Apr, 2026
Matplotlib is a Python library for creating static, interactive and animated visualizations from data. It provides flexible and customizable plotting functions that help in understanding data patterns, trends and relationships effectively.
Introduction to Matplotlib
Example:
Let's create a simple line plot using Matplotlib, showcasing the ease with which you can visualize data.
Python
import
matplotlib.pyplot
plot
show
Output
Simplest plot in Matplotlib
Components or Parts of Matplotlib Figure
Anatomy of a Matplotlib Plot:
This section dives into the key components of a Matplotlib plot, including figures, axes, titles and legends, essential for effective data visualization.
Matplotlib
The parts of a Matplotlib figure include (as shown in the figure above):
Figure
: The overarching container that holds all plot elements, acting as the canvas for visualizations.
Axes
: The areas within the figure where data is plotted; each figure can contain multiple axes.
Axis
: Represents the x-axis and y-axis, defining limits, tick locations and labels for data interpretation.
Lines and Markers
: Lines connect data points to show trends, while markers denote individual data points in plots like scatter plots.
Title and Labels
: The title provides context for the plot, while axis labels describe what data is being represented on each axis.
Matplotlib Pyplot
Pyplot
is a module within Matplotlib that provides a MATLAB-like interface for making plots. It simplifies the process of adding plot elements such as lines, images and text to the axes of the current figure.
Steps to Use Pyplot
Import Matplotlib:
Start by importing matplotlib.pyplot as plt.
Create Data:
Prepare your data in the form of lists or arrays.
Plot Data
: Use plt.plot() to create the plot.
Customize Plot
: Add titles, labels and other elements using methods like plt.title(), plt.xlabel() and plt.ylabel().
Display Plot
: Use plt.show() to display the plot.
Let's visualize a basic plot and understand basic components of matplotlib figure:
Python
import
matplotlib.pyplot
subplots
plot
marker
label
"Data Points"
set_title
"Basic Components of Matplotlib Figure"
set_xlabel
"X-Axis"
set_ylabel
"Y-Axis"
show
Output
Basic Components of matplotlib figure
Different Types of Plots in Matplotlib
Matplotlib offers a wide range of plot types to suit various data visualization needs. Here are some of the most commonly used types of plots in Matplotlib:
1. Line Chart
Line chart is one of the basic plots and can be created using plot() function. It is used to represent a relationship between two data X and Y on a different axis.
Syntax:
matplotlib.pyplot.plot(x, y)
Parameter:
x, y Coordinates for data points.
Example:
This code plots a simple line chart with labeled axes and a title using Matplotlib.
Python
import
matplotlib.pyplot
plot
title
"Line Chart"
ylabel
'Y-Axis'
xlabel
'X-Axis'
show
Output
2. Bar Chart
Bar chart displays categorical data using rectangular bars whose lengths are proportional to the values they represent. It can be plotted vertically or horizontally to compare different categories.
Syntax:
matplotlib.pyplot.bar(x, height)
Parameter:
Categories or positions on x-axis
height:
Heights of the bars (y-axis values).
Example:
This code creates a simple bar chart to show total bills for different days. X-axis represents the days and Y-axis shows total bill amount.
Python
import
matplotlib.pyplot
'Thur'
'Fri'
'Sat'
'Sun'
title
"Bar Chart"
xlabel
"Day"
ylabel
"Total Bill"
show
Output
3. Histogram
Histogram shows the distribution of data by grouping values into bins. The hist() function is used to create it, with X-axis showing bins and Y-axis showing frequencies.
Syntax:
matplotlib.pyplot.hist(x, bins=None)
Parameter:
Input data.
bins:
Number of bins (intervals) to group data.
Example:
This code plots a histogram to show frequency distribution of total bill values from the list x. It uses 10 bins and adds axis labels and a title for clarity.
Python
import
matplotlib.pyplot
hist
bins
color
'steelblue'
title
"Histogram"
xlabel
"Total Bill"
ylabel
"Frequency"
show
Output
4. Scatter Plot
Scatter plots are used to observe relationships between variables. The scatter() method in the matplotlib library is used to draw a scatter plot.
Syntax:
matplotlib.pyplot.scatter(x, y)
Parameter: x, y
Coordinates of the points.
Example:
This code creates a scatter plot to visualize the relationship between days and total bill amounts using scatter().
Python
import
matplotlib.pyplot
'Thur'
'Fri'
'Sat'
'Sun'
'Thur'
'Fri'
'Sat'
'Sun'
scatter
title
"Scatter Plot"
xlabel
"Day"
ylabel
"Total Bill"
show
Output
5. Pie Chart
Pie chart is a circular chart used to show data as proportions or percentages. It is created using the pie(), where each slice (wedge) represents a part of the whole.
Syntax:
matplotlib.pyplot.pie(x, labels=None, autopct=None)
Parameter:
Data values for pie slices.
labels:
Names for each slice.
autopct:
Format to display percentage (e.g., '%1.1f%%').
Example:
This code creates a simple pie chart to visualize distribution of different car brands. Each slice of pie represents the proportion of cars for each brand in the dataset.
Python
import
matplotlib.pyplot
import
pandas
cars
'AUDI'
'BMW'
'FORD'
'TESLA'
'JAGUAR'
data
data
labels
cars
title
" Pie Chart"
show
Output
6. Box Plot
Box plot is a simple graph that shows how data is spread out. It displays the minimum, maximum, median and quartiles and also helps to spot outliers easily.
Syntax:
matplotlib.pyplot.boxplot(x, notch=False, vert=True)
Parameter:
Data for which box plot is to be drawn (usually a list or array).
notch:
If True, draws a notch to show the confidence interval around the median.
vert:
If True, boxes are vertical. If False, they are horizontal.
Example:
This code creates a box plot to show the data distribution and compare three groups using matplotlib
Python
import
matplotlib.pyplot
data
boxplot
data
xlabel
"Groups"
ylabel
"Values"
title
"Box Plot"
show
Output
7. Heatmap
Heatmap is a graphical representation of data where values are shown as colors. It helps visualize patterns, correlations or intensity in a matrix-like format. It is created using
imshow()
method in Matplotlib.
Syntax:
matplotlib.pyplot.imshow(X, cmap='viridis')
Parameter:
2D array (data to display as an image or heatmap).
cmap:
Sets the color map.
Example:
This code creates a heatmap of random 10×10 data using imshow(). It uses 'viridis' color map and colorbar() adds a color scale.
Python
import
matplotlib.pyplot
import
numpy
random
seed
data
random
rand
imshow
data
cmap
'viridis'
interpolation
'nearest'
colorbar
xlabel
'X-axis Label'
ylabel
'Y-axis Label'
title
'Heatmap'
show
Output
Explanation:
np.random.seed(0):
Ensures same random values every time (reproducibility).
np.random.rand(10, 10):
Generates a 10×10 array of random numbers between 0 and 1.
Key Features of Matplotlib
Versatile Plotting
: Create a wide variety of visualizations, including line plots, scatter plots, bar charts and histograms.
Extensive Customization
: Control every aspect of your plots, from colors and markers to labels and annotations.
Seamless Integration with NumPy
: Effortlessly plot data arrays directly, enhancing data manipulation capabilities.
High-Quality Graphics
: Generate publication-ready plots with precise control over aesthetics.
Cross-Platform Compatibility
: Use Matplotlib on Windows, macOS and Linux without issues.
Interactive Visualizations
: Engage with your data dynamically through interactive plotting features.
Related Article:
Matplotlib Tutorial
Line chart
Bar chart
Histogram
Scatter plot
Pie chart
Box plot
Heatmap
Comment
Article Tags:
Article Tags:
Python
Python-Library
Python-matplotlib
Data Analytics

# geeksforgeeks-sql

Source: https://www.geeksforgeeks.org/sql-tutorial/

Courses
Tutorials
Practice
Jobs
Projects
Interview Questions
Quiz
DBMS
PostgreSQL
Django
ReactJS
Vue.js
AngularJS
REST API
Share Your Experiences
Basics
Data Types
Operators
Commands
Database Operations
CREATE TABLE
Queries & Operations
SELECT Query
INSERT INTO
UPDATE
DELETE
WHERE
Aliases
Joins & Functions
Joins
CROSS JOIN
Date Functions
String functions
Data Constraints & Aggregate Functions
NOT NULL Constraint
PRIMARY KEY
Count()
SUM()
MAX()
AVG()
Advanced SQL Topics
Subquery
Window Functions
Stored Procedures
Triggers
Performance Tuning
TRANSACTIONS
Database Design & Security
ER Model
Normalization
Keys in Relational Model
SQL Injection
Data Encryption
SQL Backup
ORM in DBMS
Courses
Data Analytics Course
OS, CN, DBMS Course
DSA and System Design Course
Summer SkillUp
Explore
SQL Tutorial
Last Updated :
23 May, 2026
Structured Query Language (SQL) is the standard language used to interact with relational databases.
Mainly used to manage data. Whether you want to create, delete, update or read data, SQL provides commands to perform these operations.
Widely supported across various database systems like MySQL oracle, PostgreSQL, SQL Server and many others.
Mainly works with Relational Databases (data is stored in the form of tables).
Writing First SQL Query
Before running SQL queries you need to set up a database server like MySQL, PostgreSQL or SQLite. Here, we are going to use MySQL server. Follow below steps to set up a basic SQL Environment:
Install MySQL in your system
Start MySQL Server
Access MySQL Command Line
After your MySQL environment is set up, you can write your SQL program. Below is the example to display " Hello World" using SQL.
1. Create a database named test_db
CREATE DATABASE test_db;
2. Use the test_db database
USE test_db;
3. Create a table named greetings
CREATE TABLE greetings (
    id INT PRIMARY KEY,
    message VARCHAR(255)
3. Insert the message 'Hello, World!' into the greetings table
INSERT INTO greetings (id,message)
VALUES (1,'Hello, World!');
4. Retrieve the message from the greetings table
SELECT message FROM greetings;
Output:
Note:
Try replacing "Hello World!" with your name in the SQL query. It's a fun way to see how databases store and display your own data! Give it a try and watch your name pop up!
SQL Basics
Covers core concepts like introduction, data types, operators, commands, comments, applications and SQL career path to build a strong foundation
Introduction
Data Types
Operators
Commands
Comments
Wildcards Operators
Applications
Career Path
SQL Database
This section guides you through the process of creating and managing databases. Learn how to create, select, rename and drop databases with practical examples.
CREATE
SELECT
RENAME
DROP
SQL Tables
Tables are the core data structures in databases organizing data into rows and columns. This section covers how to create, modify and manage tables effectively.
CREATE
DROP
RENAME
TRUNCATE
COPY
TEMP
ALTER
Auto Increment
Sequences
SQL Queries
Master writing SQL queries to interact with and manipulate data stored in your tables. This section covers common query types and operations.
SELECT
INSERT INTO
INSERT Multiple Rows
UPDATE
DELETE Statement
DELETE Duplicate Rows
Dynamic
SQL Clauses
Unlock useful ways to filter organize and group your query results. Clauses help you refine your data extraction.
WHERE
WITH
HAVING
ORDER By
Group By
LIMIT
Distinct
Row Limiting
Aliases
SQL Operators
SQL Operators refers to the fundamental symbols and keywords within the SQL that enable users to perform various operations. Operators let you build complex query conditions.
Logical
LIKE
NOT EQUAL
IS NULL
UNION
UNION ALL
EXCEPT
BETWEEN
ALL & ANY
INTERSECT
EXISTS
CASE
SQL Aggregate Functions
SQL Aggregate Functions help calculate totals, averages and other summary values from data easily.
Introduction
Count()
SUM()
MIN()
MAX()
AVG()
Data Constraints
Constraints define rules on data to ensure accuracy, consistency and prevent invalid entries in the database.
NOT NULL
Primary Key
Foreign Key
Composite Key
Unique
Alternate Key
CHECK
DEFAULT
SQL Joins
SQL joins combine data from multiple tables based on related columns to retrieve meaningful results.
Introduction
Outer
Left
Right
Full
Cross
Self
UPDATE
DELETE
Recursive
SQL Functions
SQL functions offer an efficient and versatile approach to data analysis. Enhance your queries with built-in functions that manipulate data types and perform calculations.
Date
String
Numeric
Statistical
JSON
Conversion
Datatype
LTRIM
UPPER
RTRIM
Regular Expressions
SQL Views
Focuses on creating and managing views using CREATE, UPDATE, RENAME and DROP VIEW for simplified and secure data access.
CREATE
UPDATE
RENAME
DROP
SQL Indexes
Improve query performance by creating indexes that speed up data retrieval.
Introduction
Create
Drop
Show
Unique
Clustered & Non-Clustered
SQL Subquery
Covers nested queries including subqueries, correlated subqueries and nested queries for complex data retrieval.
Introduction
Correlated Subqueries
Nested Queries
Advanced SQL & Databases
Covers advanced concepts like query optimization, complex operations and handling large-scale databases using joins, functions and stored procedures.
Database Design & Modeling
Includes ER modeling, ER diagrams, mapping to relational models, normalization, functional dependencies and design techniques to build efficient and scalable databases.
Introduction
Entity Relationship Diagrams (ERDs)
Mapping from ER Model to Relational Model
Introduction of Database Normalization
Functional Dependency & Attribute Closure
Types of Functional dependencies
Rules of Inference
Normal Forms in DBMS
Denormalization in Databases
Database Design
Database Security
Focuses on protecting databases using SQL injection prevention, encryption, backup and recovery techniques to ensure data safety and integrity.
Injection
Types of SQL Injection
Data Encryption
Database Recovery Techniques
Backup
Restore SQL Server Database From Backup
Database Connectivity
Explains how applications connect to databases using technologies like ORM, ODM and ODBC for efficient data interaction across programming languages.
ORM (Object-Relational Mapping)
ODM (Object-Document Mapping)
ODBC (Open Database Connectivity)
Miscellaneous Topics
Explore advanced and useful SQL concepts to deepen your knowledge
Pivot and Unpivot
Trigger
Hosting
Performance Tuning
Stored Procedures
Transactions
Window functions
Cursors
Common Table Expressions
Database Tuning
Exercises, Interview Questions & Cheat Sheet
Provides practice exercises, interview questions and a cheat sheet for quick revision of SQL concepts.
Exercises
Quiz
Interview Questions
SQL Interview Questions For Business Analyst
Cheat Sheet
Latest Trend [2025]:
SQL Server 2025 introduces AI-driven features directly within the SQL engine. It supports native vector data types and AI model management, allowing developers to run AI tasks directly in SQL without external tools.
Related Articles
30 Days of SQL ( From Basic to Advanced)
DBMS Interview Questions
Multiple Choice Questions of SQLs
Commonly asked DBMS interview questions
SQL Interview Questions For Business Analyst
Comment
Article Tags:
Article Tags:
Databases
DBMS-SQL

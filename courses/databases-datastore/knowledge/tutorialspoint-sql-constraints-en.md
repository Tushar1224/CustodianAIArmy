# Tutorialspoint Sql Constraints

Source: https://www.tutorialspoint.com/sql/sql-constraints.htm

SQL - Home
SQL - Roadmap
SQL - Overview
SQL - RDBMS Concepts
SQL - Databases
SQL - Syntax
SQL - Data Types
SQL - Operators
SQL - Expressions
SQL - Comments
SQL Database
SQL - Create Database
SQL - Drop Database
SQL - Select Database
SQL - Rename Database
SQL - Show Databases
SQL - Backup Database
SQL Table
SQL - Create Table
SQL - Show Tables
SQL - Rename Table
SQL - Truncate Table
SQL - Clone Tables
SQL - Temporary Tables
SQL - Alter Tables
SQL - Drop Table
SQL - Delete Table
SQL - Constraints
SQL Queries
SQL - Insert Query
SQL - Select Query
SQL - Select Into
SQL - Insert Into Select
SQL - Update Query
SQL - Delete Query
SQL - Sorting Results
SQL Views
SQL - Create Views
SQL - Update Views
SQL - Drop Views
SQL - Rename Views
SQL Operators and Clauses
SQL - Where Clause
SQL - Top Clause
SQL - Distinct Clause
SQL - Order By Clause
SQL - Group By Clause
SQL - Having Clause
SQL - AND & OR
SQL - BOOLEAN (BIT) Operator
SQL - LIKE Operator
SQL - IN Operator
SQL - ANY, ALL Operators
SQL - EXISTS Operator
SQL - CASE
SQL - NOT Operator
SQL - NOT EQUAL
SQL - IS NULL
SQL - IS NOT NULL
SQL - NOT NULL
SQL - BETWEEN Operator
SQL - UNION Operator
SQL - UNION vs UNION ALL
SQL - INTERSECT Operator
SQL - EXCEPT Operator
SQL - Aliases
SQL Joins
SQL - Using Joins
SQL - Inner Join
SQL - Left Join
SQL - Right Join
SQL - Cross Join
SQL - Full Join
SQL - Self Join
SQL - Delete Join
SQL - Update Join
SQL - Left Join vs Right Join
SQL - Union vs Join
SQL Keys
SQL - Unique Key
SQL - Primary Key
SQL - Foreign Key
SQL - Composite Key
SQL - Alternate Key
SQL Indexes
SQL - Indexes
SQL - Create Index
SQL - Drop Index
SQL - Show Indexes
SQL - Unique Index
SQL - Clustered Index
SQL - Non-Clustered Index
Advanced SQL
SQL - Wildcards
SQL - Injection
SQL - Hosting
SQL - Min & Max
SQL - Null Functions
SQL - Check Constraint
SQL - Default Constraint
SQL - Stored Procedures
SQL - NULL Values
SQL - Transactions
SQL - Sub Queries
SQL - Handling Duplicates
SQL - Using Sequences
SQL - Auto Increment
SQL - Date & Time
SQL - Cursors
SQL - Common Table Expression
SQL - Group By vs Order By
SQL - IN vs EXISTS
SQL - Database Tuning
SQL Function Reference
SQL - Date Functions
SQL - String Functions
SQL - Aggregate Functions
SQL - Numeric Functions
SQL - Text & Image Functions
SQL - Statistical Functions
SQL - Logical Functions
SQL - Cursor Functions
SQL - JSON Functions
SQL - Conversion Functions
SQL - Datatype Functions
SQL Useful Resources
SQL - Questions and Answers
SQL - Cheatsheet
SQL - Quick Guide
SQL - Useful Functions
SQL - Useful Resources
SQL - Discussion
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
SQL Constraints
What Are SQL Constraints?
Why Should We Use Constraints?
Types of SQL Constraints
SQL Create Constraints
SQL NOT NULL Constraint
SQL UNIQUE Constraint
SQL PRIMARY KEY Constraint
SQL FOREIGN KEY Constraint
SQL CHECK Constraint
SQL DEFAULT Constraint
Using Multiple Constraints Together
Adding Constraints to an Existing Table Using ALTER TABLE
Previous
Quiz
Next
What Are SQL Constraints?
constraints
are rules applied to columns or tables in a database to make sure that the data stored is correct and meaningful. These rules help to control what kind of data can be inserted, updated, or deleted.
Constraints can be added at the time of table creation or modified later using the
ALTER TABLE
command.
Why Should We Use Constraints?
Using SQL constraints is important for keeping your database accurate and organized:
They ensure that only valid data is entered (e.g., preventing letters in a phone number).
They prevent saving incorrect or incomplete data, such as missing required fields or duplicate emails.
They maintain proper relationships between tables (e.g., orders must be linked to valid customers).
They help to eliminate missing or duplicate data entries.
Overall, constraints reduce errors and make databases more easier to manage.
Types of SQL Constraints
Following are the common types of SQL constraints:
NOT NULL:
Ensures a column cannot have NULL values.
UNIQUE:
Ensures all values in a column are different.
PRIMARY KEY:
Uniquely identifies each record in a table.
FOREIGN KEY:
Ensures referential integrity by linking to the primary key of another table.
CHECK:
Ensures all values in a column satisfy a specific condition.
DEFAULT:
Sets a default value for a column when no value is specified.
SQL Create Constraints
You can define constraints while creating a table using the
CREATE TABLE
statement. This ensures that validation rules are enforced from the beginning.
If the table already exists, you can still add constraints later using the
ALTER TABLE
statement.
Syntax
Following is the basic syntax to define constraints during table creation:
CREATE TABLE table_name (
   column1 datatype constraint,
   column2 datatype constraint,
   columnN datatype constraint,
   table_constraint
Constraints can be column-level (applied to a specific column) or table-level (applied across multiple columns, such as
PRIMARY KEY
FOREIGN KEY
SQL NOT NULL Constraint
NOT NULL
constraint in SQL ensures that a column cannot have
NULL
values. It makes sure that every row in the table includes a value for that column. This is useful for important fields like IDs, usernames, or emails where missing data is not allowed.
Example
In the following example, we create a
CUSTOMERS
table where the
NAME
columns are marked as
NOT NULL
. This means every customer must have an ID and a Name:
CREATE TABLE CUSTOMERS (
   ID INT NOT NULL,
   NAME VARCHAR(50) NOT NULL
We get the output as shown below:
Query OK, 0 rows affected (0.05 sec)
Verification
You can test the constraint by trying to insert a row with missing values:
INSERT INTO CUSTOMERS (ID) VALUES (101);
This will generate an error because the
NAME
field cannot be
NULL
ERROR 1364 (HY000): Field 'NAME' doesn't have a default value
SQL UNIQUE Constraint
UNIQUE
constraint in SQL ensures that values in a column are different. It prevents duplicate entries and is useful for fields like usernames, emails, or any data that must be unique for each record.
Example
In the following example, we create a
CUSTOMERS
table where the
EMAIL
column is marked as
UNIQUE
. This means no two customers can have the same email address:
CREATE TABLE CUSTOMERS (
   ID INT NOT NULL,
   NAME VARCHAR(50) NOT NULL,
   EMAIL VARCHAR(100) UNIQUE
Following is the output obtained:
Query OK, 0 rows affected (0.07 sec)
Verification
You can test the constraint by inserting rows with the same email:
INSERT INTO CUSTOMERS (ID, NAME, EMAIL) VALUES (1, 'Khilan', 'khilan@example.com');
INSERT INTO CUSTOMERS (ID, NAME, EMAIL) VALUES (2, 'Kaushik', 'khilan@example.com');
The second insert will generate an error because the email already exists in the table:
ERROR 1062 (23000): Duplicate entry 'khilan@example.com' for key 'customers.EMAIL'
SQL PRIMARY KEY Constraint
PRIMARY KEY
constraint in SQL uniquely identifies each record in a table. It ensures that the column (or combination of columns) has
unique
values and does not allow
NULL
. Every table should have a primary key to maintain data integrity.
Example
In the following example, we create a
CUSTOMERS
table where the
column is defined as the
PRIMARY KEY
. This means each customer must have a unique ID, and it cannot be null:
CREATE TABLE CUSTOMERS (
   ID INT PRIMARY KEY,
   NAME VARCHAR(50),
   EMAIL VARCHAR(100)
This produces the following output:
Query OK, 0 rows affected (0.06 sec)
Verification
You can test the constraint by inserting two rows with the same ID value:
INSERT INTO CUSTOMERS (ID, NAME, EMAIL) VALUES (1, 'Khilan', 'khilan@example.com');
INSERT INTO CUSTOMERS (ID, NAME, EMAIL) VALUES (1, 'Kaushik', 'kaushik@example.com');
The second insert will generate an error because the
must be unique as a primary key:
ERROR 1062 (23000): Duplicate entry '1' for key 'customers.PRIMARY'
SQL FOREIGN KEY Constraint
FOREIGN KEY
constraint in SQL is used to establish a relationship between two tables. It ensures that the value in a column (or set of columns) matches a value in the primary key of another table. This helps maintain
referential integrity
between related data.
Example
In the following example, we first create a
DEPARTMENTS
table with
DEPT_ID
as its primary key. Then, we create a
CUSTOMERS
table where
DEPT_ID
is a foreign key that references the
DEPT_ID
column of the
DEPARTMENTS
table:
CREATE TABLE DEPARTMENTS (
   DEPT_ID INT PRIMARY KEY,
   DEPT_NAME VARCHAR(100)
CREATE TABLE CUSTOMERS (
   ID INT PRIMARY KEY,
   NAME VARCHAR(50),
   DEPT_ID INT,
   FOREIGN KEY (DEPT_ID) REFERENCES DEPARTMENTS(DEPT_ID)
We get the output as shown below:
Query OK, 0 rows affected (0.04 sec)
Query OK, 0 rows affected (0.05 sec)
Verification
You can test the foreign key constraint by trying to insert a record in the
CUSTOMERS
table with a
DEPT_ID
that doesn't exist in the
DEPARTMENTS
table:
INSERT INTO CUSTOMERS (ID, NAME, DEPT_ID) VALUES (1, 'Khilan', 10);
This will generate an error because the value
is not present in the
DEPARTMENTS.DEPT_ID
column:
ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`testdb`.`customers`, CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`DEPT_ID`) REFERENCES `departments` (`DEPT_ID`))
SQL CHECK Constraint
CHECK
constraint in SQL is used to limit the range or format of values that can be entered into a column. It ensures that all values in a column satisfy a specific condition. This is helpful for maintaining data accuracy and validity, for example, restricting age to a minimum value.
Example
In the following example, we create a
CUSTOMERS
table with a
CHECK
constraint on the
column to ensure only customers aged 18 or older are allowed:
CREATE TABLE CUSTOMERS (
   ID INT PRIMARY KEY,
   NAME VARCHAR(50),
   AGE INT CHECK (AGE >= 18)
The result produced is as follows:
Query OK, 0 rows affected (0.04 sec)
Verification
You can test the constraint by trying to insert a record with an age below 18:
INSERT INTO CUSTOMERS (ID, NAME, AGE) VALUES (1, 'Ramesh', 15);
This will generate an error because the
value violates the CHECK condition:
ERROR 3819 (HY000): Check constraint 'customers_chk_1' is violated.
SQL DEFAULT Constraint
DEFAULT
constraint in SQL is used to automatically assign a default value to a column if no value is specified during data insertion. This helps to ensure that a column is always filled with a meaningful value even when the user omits it in the
INSERT
statement.
Example
In the following example, we create a
CUSTOMERS
table where the
SALARY
column has a default value of
5000.00
. If a user inserts a row without specifying the salary, this default value will be used:
CREATE TABLE CUSTOMERS (
   ID INT PRIMARY KEY,
   NAME VARCHAR(50),
   SALARY DECIMAL(10,2) DEFAULT 5000.00
We get the output as shown below:
Query OK, 0 rows affected (0.04 sec)
Verification
You can test the default value by inserting a row without providing a value for
SALARY
INSERT INTO CUSTOMERS (ID, NAME) VALUES (1, 'Komal');
Then, run a
SELECT
query to see the result:
SELECT * FROM CUSTOMERS;
You will get the following output where the
SALARY
is automatically set to
5000.00
NAME
SALARY
Neha
5000.00
Using Multiple Constraints Together
In SQL, you can apply multiple constraints to a single column or across multiple columns in a table.
For example, a column can be defined as
NOT NULL
UNIQUE
, and also have a
DEFAULT
value. Additionally, table-level constraints like
PRIMARY KEY
FOREIGN KEY
can also be combined for complete data validation.
Syntax
Following is the basic syntax to apply multiple constraints in SQL:
CREATE TABLE table_name (
   column1 datatype CONSTRAINT1 CONSTRAINT2 ...,
   column2 datatype CONSTRAINT3 ...,
   [table_constraints]
Example
In the example below, we create a
CUSTOMERS
table that uses multiple constraints. The
column is a
PRIMARY KEY
(which also implies
NOT NULL
UNIQUE
), the
NAME
column cannot be
NULL
, and the
SALARY
column has a default value. A
CHECK
constraint is applied on
to ensure only adults are added:
CREATE TABLE CUSTOMERS (
   ID INT PRIMARY KEY,
   NAME VARCHAR(50) NOT NULL,
   EMAIL VARCHAR(100) UNIQUE,
   AGE INT CHECK (AGE >= 18),
   SALARY DECIMAL(10,2) DEFAULT 5000.00
This table ensures data integrity by combining multiple constraints across different columns.
Query OK, 0 rows affected (0.11 sec)
Verification
You can verify this by inserting a valid and an invalid record as shown below:
-- Valid record
INSERT INTO CUSTOMERS (ID, NAME, EMAIL, AGE) VALUES (1, 'Ravi', 'ravi@mail.com', 22);
-- Invalid record (violates CHECK constraint on AGE)
INSERT INTO CUSTOMERS (ID, NAME, EMAIL, AGE) VALUES (2, 'Ankit', 'ankit@mail.com', 16);
The second query will throw an error as shown below:
ERROR 3819 (HY000): Check constraint 'customers_chk_1' is violated.
Adding Constraints to an Existing Table Using ALTER TABLE
In SQL, you can modify an existing table to add constraints even after it has been created. This is useful when you want to enforce new rules without dropping and recreating the table. The
ALTER TABLE
statement allows you to add, modify, or drop constraints as needed.
Syntax
Following is the basic syntax for modifying an existing column to add NOT NULL constraint:
ALTER TABLE table_name 
MODIFY column_name datatype NOT NULL;
Following is the another syntax for adding a new constraint like CHECK:
ALTER TABLE table_name 
ADD CONSTRAINT constraint_name CHECK (condition);
Example: Add NOT NULL Constraint
Suppose the
NAME
column in the
CUSTOMERS
table was initially allowed to have
NULL
values. You can now modify it to disallow NULLs:
ALTER TABLE CUSTOMERS 
MODIFY NAME VARCHAR(100) NOT NULL;
Following is the output obtained:
Query OK, 0 rows affected (0.08 sec)
Records: 0  Duplicates: 0  Warnings: 0
Example: Add CHECK Constraint
If you want to ensure that the
SALARY
column always contains positive values, you can add a
CHECK
constraint:
ALTER TABLE CUSTOMERS 
ADD CONSTRAINT chk_salary CHECK (SALARY > 0);
This produces the following output:
Query OK, 0 rows affected (0.06 sec)
Records: 0  Duplicates: 0  Warnings: 0
Verification
You can verify these changes by inserting a record that violates the constraints:
-- This will fail because NAME cannot be NULL
INSERT INTO CUSTOMERS (ID, SALARY) VALUES (101, 4500);
-- This will fail due to the CHECK constraint on SALARY
INSERT INTO CUSTOMERS (ID, NAME, SALARY) VALUES (102, 'Anita', -2000);
After executing the above code, we get the following output:
ERROR 1048 (23000): Column 'NAME' cannot be null
ERROR 3819 (HY000): Check constraint 'chk_salary' is violated.
Print Page
Previous
Quiz
Next
Advertisements

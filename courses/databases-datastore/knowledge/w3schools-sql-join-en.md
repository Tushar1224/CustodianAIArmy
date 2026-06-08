# w3schools-sql-join

Source: https://www.w3schools.com/sql/sql_join.asp

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
Tutorial
SQL HOME
SQL Intro
SQL Syntax
SQL Select
SQL Select Distinct
SQL Where
SQL Order By
SQL And
SQL Or
SQL Not
SQL Insert Into
SQL Null Values
SQL Update
SQL Delete
SQL Select Top
SQL Aggregate Functions
SQL Min()
SQL Max()
SQL Count()
SQL Sum()
SQL Avg()
SQL Like
SQL Wildcards
SQL In
SQL Between
SQL Aliases
SQL Joins
SQL Inner Join
SQL Left Join
SQL Right Join
SQL Full Join
SQL Self Join
SQL Union
SQL Union All
SQL Group By
SQL Having
SQL Exists
SQL Any
SQL All
SQL Select Into
SQL Insert Into Select
SQL Case
SQL Null Functions
SQL Stored Procedures
SQL Comments
SQL Operators
Database
SQL Create DB
SQL Drop DB
SQL Backup DB
SQL Create Table
SQL Drop Table
SQL Alter Table
SQL Constraints
SQL Not Null
SQL Unique
SQL Primary Key
SQL Foreign Key
SQL Check
SQL Default
SQL Create Index
SQL Auto Increment
SQL Dates
SQL Views
SQL Injection
SQL Parameters
SQL Prepared Statements
SQL Hosting
Cert
SQL Certificate
References
SQL Data Types
SQL Keywords
ADD CONSTRAINT
ALTER
ALTER COLUMN
ALTER TABLE
ALTER VIEW
BACKUP DATABASE
BETWEEN
CASE
CHECK
COLUMN
CONSTRAINT
CREATE
CREATE DATABASE
CREATE INDEX
CREATE OR REPLACE VIEW
CREATE TABLE
CREATE PROCEDURE
CREATE UNIQUE INDEX
CREATE VIEW
DATABASE
DEFAULT
DELETE
DESC
DISTINCT
DROP
DROP COLUMN
DROP CONSTRAINT
DROP DATABASE
DROP DEFAULT
DROP INDEX
DROP TABLE
DROP VIEW
EXEC
EXISTS
FOREIGN KEY
FROM
FULL OUTER JOIN
GROUP BY
HAVING
INDEX
INNER JOIN
INSERT INTO
INSERT INTO SELECT
IS NULL
IS NOT NULL
JOIN
LEFT JOIN
LIKE
LIMIT
NOT NULL
ORDER BY
OUTER JOIN
PRIMARY KEY
PROCEDURE
RIGHT JOIN
ROWNUM
SELECT
SELECT DISTINCT
SELECT INTO
SELECT TOP
TABLE
TRUNCATE TABLE
UNION
UNION ALL
UNIQUE
UPDATE
VALUES
VIEW
WHERE
MySQL Functions
String Functions:
ASCII
CHAR_LENGTH
CHARACTER_LENGTH
CONCAT
CONCAT_WS
FIELD
FIND_IN_SET
FORMAT
INSERT
INSTR
LCASE
LEFT
LENGTH
LOCATE
LOWER
LPAD
LTRIM
POSITION
REPEAT
REPLACE
REVERSE
RIGHT
RPAD
RTRIM
SPACE
STRCMP
SUBSTR
SUBSTRING
SUBSTRING_INDEX
TRIM
UCASE
UPPER
Numeric Functions:
ACOS
ASIN
ATAN
ATAN2
CEIL
CEILING
COUNT
DEGREES
FLOOR
GREATEST
LEAST
LOG10
LOG2
POWER
RADIANS
RAND
ROUND
SIGN
SQRT
TRUNCATE
Date Functions:
ADDDATE
ADDTIME
CURDATE
CURRENT_DATE
CURRENT_TIME
CURRENT_TIMESTAMP
CURTIME
DATE
DATEDIFF
DATE_ADD
DATE_FORMAT
DATE_SUB
DAYNAME
DAYOFMONTH
DAYOFWEEK
DAYOFYEAR
EXTRACT
FROM_DAYS
HOUR
LAST_DAY
LOCALTIME
LOCALTIMESTAMP
MAKEDATE
MAKETIME
MICROSECOND
MINUTE
MONTH
MONTHNAME
PERIOD_ADD
PERIOD_DIFF
QUARTER
SECOND
SEC_TO_TIME
STR_TO_DATE
SUBDATE
SUBTIME
SYSDATE
TIME
TIME_FORMAT
TIME_TO_SEC
TIMEDIFF
TIMESTAMP
TO_DAYS
WEEK
WEEKDAY
WEEKOFYEAR
YEAR
YEARWEEK
Advanced Functions:
BINARY
CASE
CAST
COALESCE
CONNECTION_ID
CONV
CONVERT
CURRENT_USER
DATABASE
IFNULL
ISNULL
LAST_INSERT_ID
NULLIF
SESSION_USER
SYSTEM_USER
USER
VERSION
SQL Server Functions
String Functions:
ASCII
CHAR
CHARINDEX
CONCAT
Concat with +
CONCAT_WS
DATALENGTH
DIFFERENCE
FORMAT
LEFT
LOWER
LTRIM
NCHAR
PATINDEX
QUOTENAME
REPLACE
REPLICATE
REVERSE
RIGHT
RTRIM
SOUNDEX
SPACE
STUFF
SUBSTRING
TRANSLATE
TRIM
UNICODE
UPPER
Numeric Functions:
ACOS
ASIN
ATAN
ATN2
CEILING
COUNT
DEGREES
FLOOR
LOG10
POWER
RADIANS
RAND
ROUND
SIGN
SQRT
SQUARE
Date Functions:
CURRENT_TIMESTAMP
DATEADD
DATEDIFF
DATEFROMPARTS
DATENAME
DATEPART
GETDATE
GETUTCDATE
ISDATE
MONTH
SYSDATETIME
YEAR
Advanced Functions
CAST
COALESCE
CONVERT
CURRENT_USER
ISNULL
ISNUMERIC
NULLIF
SESSION_USER
SESSIONPROPERTY
SYSTEM_USER
USER_NAME
MS Access Functions
String Functions:
Concat with &
CurDir
Format
InStr
InstrRev
LCase
Left
LTrim
Replace
Right
RTrim
Space
Split
StrComp
StrConv
StrReverse
Trim
UCase
Numeric Functions:
Count
Format
Randomize
Round
Date Functions:
Date
DateAdd
DateDiff
DatePart
DateSerial
DateValue
Format
Hour
Minute
Month
MonthName
Second
Time
TimeSerial
TimeValue
Weekday
WeekdayName
Year
Other Functions:
CurrentUser
Environ
IsDate
IsNull
IsNumeric
SQL Quick Ref
Examples
SQL Examples
SQL Editor
SQL Quiz
SQL Exercises
SQL Server
SQL Syllabus
SQL Study Plan
SQL Bootcamp
SQL Training
Joins
❮ Previous
Next ❯
The SQL JOIN Clause
JOIN
clause is used to combine rows from two or more tables, based on a related column between them.
Here are the different types of JOINs in SQL:
(INNER) JOIN
: Returns only rows that have
matching values
in both tables
LEFT (OUTER) JOIN
: Returns
all rows from the left table
, and only the matched rows from the right table
RIGHT (OUTER) JOIN
: Returns
all rows from the right table
, and only the matched rows from the left table
FULL (OUTER) JOIN
: Returns
all rows
when there is a match in either the left or right table
Look at an order in "Orders" table:
OrderID
CustomerID
OrderDate
10308
1996-09-18
Then, look at a customer in the "Customers" table:
CustomerID
CustomerName
ContactName
Country
Ana Trujillo Emparedados y helados
Ana Trujillo
Mexico
Here we see that the "CustomerID" column in the "Orders" table refers to the
"CustomerID" in the "Customers" table. The relationship between the two tables above
is the "CustomerID" column.
Then, we can create the following SQL statement (that contains an
INNER JOIN
that selects records that have matching values in both tables:
Example
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
Try it Yourself »
and it will produce something like this:
OrderID
CustomerName
OrderDate
10308
Ana Trujillo Emparedados y helados
1996-09-18
10365
Antonio Moreno Taquería

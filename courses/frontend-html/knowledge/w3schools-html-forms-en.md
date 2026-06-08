# w3schools-html-forms

Source: https://www.w3schools.com/html/html_forms.asp

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
HTML
Tutorial
HTML HOME
HTML Introduction
Introduction
Exercises
HTML Editors
HTML Basic
Basic
Exercises
Code Challenge
HTML Elements
Elements
Exercises
Code Challenge
HTML Attributes
Attributes
Exercises
Code Challenge
HTML Headings
Headings
Exercises
Code Challenge
HTML Paragraphs
Paragraphs
Exercises
Code Challenge
HTML Styles
Styles
Exercises
Code Challenge
HTML Formatting
Formatting
Exercises
Code Challenge
HTML Quotations
Quotations
Exercises
Code Challenge
HTML Comments
Comments
Exercises
Code Challenge
HTML Colors
Colors
Exercises
Code Challenge
HTML CSS
Exercises
Code Challenge
HTML Links
Links
Link Colors
Link Bookmarks
Exercises
Code Challenge
HTML Images
Images
Image Map
Background Images
The Picture Element
Exercises
Code Challenge
HTML Favicon
Favicon
Exercises
HTML Page Title
Page Title
Exercises
HTML Tables
HTML Tables
Table Borders
Table Sizes
Table Headers
Padding & Spacing
Colspan & Rowspan
Table Styling
Table Colgroup
Exercises
Code Challenge
HTML Lists
Lists
Unordered Lists
Ordered Lists
Other Lists
Exercises
Code Challenge
HTML Block & Inline
Block & Inline
Exercises
Code Challenge
HTML Div
Exercises
Code Challenge
HTML Classes
Classes
Exercises
Code Challenge
HTML Id
Exercises
Code Challenge
HTML Buttons
Buttons
Code Challenge
HTML Iframes
Iframes
Exercises
Code Challenge
HTML JavaScript
JavaScript
Exercises
Code Challenge
HTML File Paths
File Paths
Code Challenge
HTML Head
Head
Exercises
Code Challenge
HTML Layout
Layout
Code Challenge
HTML Responsive
Responsive
Exercises
Code Challenge
HTML Computercode
Computercode
Exercises
Code Challenge
HTML Semantics
Semantics
Exercises
Code Challenge
HTML Style Guide
HTML Entities
Entities
Exercises
Code Challenge
HTML Symbols
HTML Emojis
HTML Charsets
HTML URL Encode
HTML vs. XHTML
HTML
Forms
HTML Forms
Forms
Exercises
Code Challenge
HTML Form Attributes
Form Attributes
Exercises
HTML Form Elements
Form Elements
Exercises
Code Challenge
HTML Input Types
Input Types
Exercises
Code Challenge
HTML Input Attributes
Input Attributes
Exercises
Input Form Attributes
Input Form Attributes
Exercises
HTML
Graphics
HTML Canvas
Canvas
Code Challenge
HTML SVG
Code Challenge
HTML
Media
HTML Media
HTML Video
Video
Code Challenge
HTML Audio
Audio
Code Challenge
HTML Plug-ins
HTML YouTube
HTML
APIs
HTML Web APIs
HTML Geolocation
HTML Drag and Drop
HTML Web Storage
HTML Web Workers
HTML SSE
HTML
Cert
HTML Certificate
HTML
Examples
HTML Examples
HTML Editor
HTML Quiz
HTML Exercises
HTML Challenges
HTML Website
HTML Syllabus
HTML Study Plan
HTML Interview Prep
HTML Bootcamp
HTML Summary
HTML Accessibility
HTML
References
HTML Tag List
HTML Attributes
HTML Global Attributes
HTML Browser Support
HTML Events
HTML Colors
HTML Canvas
HTML Audio/Video
HTML Doctypes
HTML Character Sets
HTML URL Encode
HTML Lang Codes
HTTP Messages
HTTP Methods
PX to EM Converter
Keyboard Shortcuts
HTML
Forms
❮ Previous
Next ❯
An HTML form is used to collect user input. The user input is 
most often sent to a server for processing.
Example
Try it Yourself »
The <form> Element
The HTML
<form>
element is used to 
create an HTML form for user input:
<form>
form elements
</form>
<form>
element is a container for different types of input elements, 
such as: text fields, checkboxes, radio 
buttons, submit buttons, etc.
the different form elements are covered in this chapter:
HTML Form Elements
The <input> Element
The HTML
<input>
element is the most 
used form element.
<input>
element can be displayed in 
many ways, depending on the
type
attribute.
Here are some examples:
Type
Description
<input type="text">
Displays a single-line text input field
<input type="radio">
Displays a radio button (for selecting one of many choices)
<input type="checkbox">
Displays a checkbox (for selecting zero or more of many choices)
<input type="submit">
Displays a submit button (for submitting the form)
<input type="button">
Displays a clickable button
All the different input types are covered in this chapter:
HTML Input Types
Text Fields
<input type="text">
defines a single-line input field for 
text input.
Example
A form with input fields for text:
<form>
<label for="fname">First name:</label><br>
<input 
  type="text" id="fname" name="fname"><br>
<label for="lname">Last 
  name:</label><br>
<input type="text" id="lname" name="lname">
</form>
Try it Yourself »
This is how the HTML code above will be displayed in a browser:
Note:
The form itself is not visible. Also note that the default width 
of an input field is 20 characters.
The <label> Element
Notice the use of the
<label>
element in the 
example above.
<label>
tag defines a label for many 
form elements.
<label>
element is useful for 
screen-reader users, because the screen-reader will read out loud the label when 
the user focuses on the input element.
<label>
element also helps users who have 
difficulty clicking on very small regions (such as radio buttons or checkboxes) 
- because when the user clicks the text within the
<label>
element, it toggles 
the radio button/checkbox.
attribute of the
<label>
tag should 
be equal to the
attribute of the
<input>
element to bind them together.
Radio Buttons
<input type="radio">
defines a radio button.
Radio buttons let a user select ONE of a limited number of choices.
Example
A form with radio buttons:
<p>Choose your favorite Web language:</p>
<form>
<input type="radio" id="html" name="fav_language" 
  value="HTML">
<label for="html">HTML</label><br>
<input 
  type="radio" id="css" name="fav_language" value="CSS">
<label 
  for="css">CSS</label><br>
<input type="radio" id="javascript" 
  name="fav_language" value="JavaScript">
<label for="javascript">JavaScript</label>
</form>
Try it Yourself »
This is how the HTML code above will be displayed in a browser:
Choose your favorite Web language:
Checkboxes
<input type="checkbox">
defines a
checkbox
Checkboxes let a user select ZERO or MORE options of a limited number of choices.
Example
A form with checkboxes:
<form>
<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
<label for="vehicle1"> I have a bike</label><br>
<input 
  type="checkbox" id="vehicle2" name="vehicle2" value="Car">
<label for="vehicle2"> 
  I have a car</label><br>
<input type="checkbox" 
  id="vehicle3" name="vehicle3" 
  value="Boat">
<label for="vehicle3"> I have a boat</label>
</form>
Try it Yourself »
This is how the HTML code above will be displayed in a browser:
The Submit Button
<input type="submit">
defines a button for submitting the form data to a form-handler.
The form-handler is typically a file on the server with a script for processing 
input data.
The form-handler is specified in the form's
action
attribute.
Example
A form with a submit button:
<form action="/action_page.php">
<label for="fname">First 
  name:</label><br>
<input type="text" id="fname" name="fname" 
  value="John"><br>
<label for="lname">Last name:</label><br>
<input type="text" id="lname" name="lname" value="Doe"><br><br>
<input type="submit" value="Submit">
</form>
Try it Yourself »
This is how the HTML code above will be displayed in a browser:
The Name Attribute for <input>
Notice that each input field must have a
name
attribute to be submitted.
If the
name
attribute is omitted, the value of the input field will not be sent at all.
Example
This example will not submit the value of the "First name" input field:
<form action="/action_page.php">
<label for="fname">First 
  name:</label><br>
<input type="text" id="fname" value="John"><br><br>
<input type="submit" value="Submit">
</form>
Try it Yourself »
Video: HTML Forms
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

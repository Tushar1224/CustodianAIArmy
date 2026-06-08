# w3schools-html-links

Source: https://www.w3schools.com/html/html_links.asp

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
Links
❮ Previous
Next ❯
Links are found in nearly all web pages. Links allow users to click their way from page to page.
HTML Links - Hyperlinks
HTML links are hyperlinks.
You can click on a link and jump to another document.
When you move the mouse over a link, the mouse arrow will turn into a little hand.
Note:
A link does not have to be text. A link can be an image 
  or any other HTML element!
HTML Links - Syntax
The HTML
tag defines a hyperlink. 
It has the following syntax:
<a href="
link text
</a>
The most important attribute of the
element is the
href
attribute, which indicates the link's destination.
link text
is the part that will be visible to the reader.
Clicking on the link text, will send the reader to the specified URL address.
Example
This example shows how to create a link to W3Schools.com:
<a href="https://www.w3schools.com/">Visit W3Schools.com!</a>
Try it Yourself »
By default, links will appear as follows in all browsers:
An unvisited link is underlined and blue
A visited link is underlined and purple
An active link is underlined and red
Tip:
Links can of course be styled with CSS, to get 
  another look!
HTML Links - The target Attribute
By default, the linked page will be displayed in the current browser window. 
To change this, you must specify another target for the link.
target
attribute specifies where to open the linked document.
target
attribute can have one of the following values:
_self
- Default. Opens the document in 
  the same window/tab as it was clicked
_blank
- Opens the document in a new window or tab
_parent
- Opens the document in the parent frame
_top
- Opens the document in the full body of the window
Example
Use target="_blank" to open the linked document in a new browser window or tab:
<a href="https://www.w3schools.com/"
target="_blank">Visit W3Schools!</a>
Try it Yourself »
Absolute URLs vs. Relative URLs
Both examples above are using an
absolute URL
(a full web address) 
in the
href
attribute.
A local link (a link to a page within the same website) is specified with a
relative URL
(without 
the "https://www" part):
Example
<h2>Absolute URLs</h2>
<p><a href="https://www.w3.org/">W3C</a></p>
<p><a href="https://www.google.com/">Google</a></p>
<h2>Relative 
  URLs</h2>
<p><a href="html_images.asp">HTML Images</a></p>
<p><a href="/css/default.asp">CSS 
  Tutorial</a></p>
Try it Yourself »
HTML Links - Use an Image as a Link
To use an image as a link, just put the
<img>
tag inside the
tag:
Example
<a href="default.asp">
<img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;">
</a>
Try it Yourself »
Link to an Email Address
mailto:
inside the
href
attribute to create a link that opens the user's email program (to 
let them send a new email):
Example
<a href="mailto:someone@example.com">Send email</a>
Try it Yourself »
Button as a Link
To use an HTML button as a link, you have to add some JavaScript code.
JavaScript allows you to specify what happens at certain events, such as a click of a button:
Example
<button 
  onclick="document.location='default.asp'">HTML Tutorial</button>
Try it Yourself »
Tip:
Learn more about JavaScript in our
JavaScript Tutorial
Link Titles
title
attribute specifies extra information about an element.
The information is most often shown as a tooltip text when the mouse moves over the element.
Example
<a href="https://www.w3schools.com/html/" title="Go to W3Schools HTML 
  section">Visit our HTML Tutorial</a>
Try it Yourself »
More on Absolute URLs and Relative URLs
Example
Use a full URL to link to a web page:
<a href="https://www.w3schools.com/html/default.asp">HTML tutorial</a>
Try it Yourself »
Example
Link to a page located in the html folder on the current web site:
<a href="/html/default.asp">HTML tutorial</a>
Try it Yourself »
Example
Link to a page located in the same folder as the current page:
<a href="default.asp">HTML tutorial</a>
Try it Yourself »
You can read more about file paths in the chapter
HTML 
File Paths
Chapter Summary
Use the
element to define a link
Use the
href
attribute to define the link address
Use the
target
attribute to define where to open the linked document
Use the
<img>
element (inside
  to use an image as a link
Use the
mailto:
scheme inside the
href
attribute to create a link that opens the user's email program
HTML Link Tags
Description
Defines a hyperlink
For a complete list of all available HTML tags, visit our
HTML Tag Reference
Video: HTML Links
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

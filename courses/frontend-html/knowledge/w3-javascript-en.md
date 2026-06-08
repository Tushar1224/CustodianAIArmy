# HTML Javascript

Source: https://www.w3schools.com/html/html_scripts.asp

HTML
JavaScript
❮ Previous
Next ❯
JavaScript makes HTML pages more dynamic and interactive.
Example
My First JavaScript
Click me to display Date and Time
Try it Yourself »
The HTML <script> Tag
The HTML
<script>
tag is used to define a client-side script 
(JavaScript).
<script>
element either contains script statements, or it points to an 
external script file through the
attribute.
Common uses for JavaScript are image manipulation, form validation, and 
dynamic changes of content.
To select an HTML element, JavaScript most often uses the
document.getElementById()
method.
This JavaScript example writes "Hello JavaScript!" into an HTML element with id="demo":
Example
<script>
document.getElementById("demo").innerHTML = "Hello JavaScript!";
</script>
Try it Yourself »
Tip:
You can learn much more about JavaScript in our
JavaScript Tutorial
A Taste of JavaScript
Here are some examples of what JavaScript can do:
Example
JavaScript can change content:
document.getElementById("demo").innerHTML = "Hello JavaScript!";
Try it Yourself »
Example
JavaScript can change styles:
document.getElementById("demo").style.fontSize = "25px";
document.getElementById("demo").style.color = "red";
document.getElementById("demo").style.backgroundColor = "yellow";
Try it Yourself »
Example
JavaScript can change attributes:
document.getElementById("image").src = "picture.gif";
Try it Yourself »
The HTML <noscript> Tag
The HTML
<noscript>
tag defines an alternate content 
to be displayed to users that 
have disabled scripts in their browser or have a browser that doesn't support 
scripts:
Example
<script>
document.getElementById("demo").innerHTML = "Hello JavaScript!";
</script>
<noscript>Sorry, your browser does not support JavaScript!</noscript>
Try it Yourself »
HTML Script Tags
Description
<script>
Defines a client-side script
<noscript>
Defines an alternate content for users that do not support client-side 
scripts
For a complete list of all available HTML tags, visit our
HTML Tag Reference
Video: HTML and JavaScript
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS

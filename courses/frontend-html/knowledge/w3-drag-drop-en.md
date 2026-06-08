# HTML Drag Drop

Source: https://www.w3schools.com/html/html5_draganddrop.asp

HTML
Drag and Drop API
❮ Previous
Next ❯
The HTML Drag and Drop API enables an element to be dragged and dropped.
Example
Drag the W3Schools image into the second rectangle.
Drag and Drop
Drag and drop is a very common feature. It is when you "grab" an object and drag it to a different location.
Browser Support
The numbers in the table specify the first browser version that fully supports Drag and Drop.
Drag and Drop
12.0
HTML Drag and Drop API Example
The example below is a simple drag and drop example:
Example
<!DOCTYPE HTML>
<html>
<head>
<script>
function dragstartHandler(ev) {
ev.dataTransfer.setData("text", 
  ev.target.id);
function dragoverHandler(ev) {
ev.preventDefault();
function dropHandler(ev) {
ev.preventDefault();
const data = ev.dataTransfer.getData("text");
ev.target.appendChild(document.getElementById(data));
</script>
</head>
<body>
<div id="div1" ondrop="dropHandler(event)" 
  ondragover="dragoverHandler(event)"></div>
<img id="img1" src="img_logo.gif" 
  draggable="true" ondragstart="dragstartHandler(event)" width="336" 
  height="69">
</body>
</html>
Try it Yourself »
It might seem complicated, but lets go through all the different parts of a drag and drop event.
Make an Element Draggable
First of all: To make an element draggable, set the
draggable
attribute to true:
<img id="img1" draggable="true">
  id="p1" draggable="true">Draggable text</p>
What to Drag - ondragstart and setData()
Then, specify what should happen when the element is dragged.
In the example above, the
ondragstart
attribute 
of the <img> element calls a function (dragstartHandler(ev)), 
that specifies what data to be dragged.
dataTransfer.setData()
method sets the data type and the value of the 
dragged data:
function dragstartHandler(ev) {
ev.dataTransfer.setData("text", 
  ev.target.id);
In this case, the data type is "text" and the value is the id of the draggable element ("img1").
Where to Drop - ondragover
ondragover
attrribute of the <div> 
element calls a function (dragoverHandler(ev)), that specifies where the dragged data can be dropped.
By default, data/elements cannot be dropped in other elements. To allow a drop, 
we must prevent the default handling of the element.
This is done by calling the
preventDefault()
method for the ondragover event:
function dragoverHandler(ev) {
ev.preventDefault();
Do the Drop - ondrop
When the dragged data is dropped, a drop event occurs.
In the example above, the ondrop attribute of the <div> element calls a function, dropHandler(event):
function dropHandler(ev) {
ev.preventDefault();
const 
   data = ev.dataTransfer.getData("text");
ev.target.appendChild(document.getElementById(data));
Code explained:
Call
preventDefault()
to prevent the browser default handling of the data (default is open as link on drop)
Get the dragged data with the
dataTransfer.getData()
method. This method will return any data that was set to the same type in the
setData()
method
The dragged data is the id of the dragged element ("img1")
Append the dragged element into the drop element
More Examples
Example
How to drag and drop an <h1> element to a <div> element:
<script>
function dragstartHandler(ev) {
ev.dataTransfer.setData("text", 
  ev.target.id);
function dragoverHandler(ev) {
ev.preventDefault();
function dropHandler(ev) {
ev.preventDefault();
const data = 
  ev.dataTransfer.getData("text");
ev.target.appendChild(document.getElementById(data));
</script>
</head>
<body>
<div id="div1" ondrop="dropHandler(event)" 
  ondragover="dragoverHandler(event)"></div>
<h1 id="h1" 
  draggable="true" ondragstart="dragstartHandler(event)">W3Schools.com</h1>
Try it Yourself »
Example
How to drag and drop an <a> element to a <div> element:
<script>
function dragstartHandler(ev) {
ev.dataTransfer.setData("text", 
  ev.target.id);
function dragoverHandler(ev) {
ev.preventDefault();
function dropHandler(ev) {
ev.preventDefault();
const data = 
  ev.dataTransfer.getData("text");
ev.target.appendChild(document.getElementById(data));
</script>
</head>
<body>
<div id="div1" ondrop="dropHandler(event)" 
  ondragover="dragoverHandler(event)"></div>
  id="link1" href="https://w3schools.com" draggable="true" ondragstart="dragstartHandler(event)">W3Schools.com</a>
Try it Yourself »
Example
How to drag and drop an image back and forth between two <div> elements:
Try it Yourself »
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS

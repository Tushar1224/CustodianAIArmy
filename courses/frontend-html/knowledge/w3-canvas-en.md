# HTML Canvas

Source: https://www.w3schools.com/html/html5_canvas.asp

HTML
Canvas Graphics
❮ Previous
Next ❯
Your browser does not support the <canvas> element.
The HTML
<canvas>
element is used to draw graphics on a web page.
The graphic to the left is created with
<canvas>
. It shows four 
elements: a red rectangle, a gradient rectangle,
a multicolor rectangle, and a multicolor text.
What is HTML Canvas?
The HTML
<canvas>
element is used to draw graphics, on the fly, via JavaScript.
<canvas>
element is only a container for graphics. You must use  
JavaScript to actually draw the graphics.
Canvas has several methods for drawing paths, boxes, circles, text, and adding images.
Canvas is supported by all major browsers.
Canvas Examples
A canvas is a rectangular area on an HTML page. By default, a canvas has no border and no content.
The markup looks like this:
<canvas id="myCanvas" width="200" height="100"></canvas>
Note:
Always specify an
attribute (to be referred to in a script), 
and a
width
height
attribute to define the size of the canvas. To add a border, use the
style
attribute.
Here is an example of a basic, empty canvas:
Your browser does not support the canvas element.
Example
<canvas id="myCanvas" width="200" height="100"
style="border:1px solid 
#000000;">
</canvas>
Try it Yourself »
Add a JavaScript
After creating the rectangular canvas area, you must add a JavaScript to do 
the drawing.
Here are some examples:
Draw a Line
Your browser does not support the canvas element
Example
<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();
</script>
Try it Yourself »
Draw a Circle
Your browser does not support the canvas element
Example
<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
</script>
Try it Yourself »
Draw a Text
Your browser does not support the canvas element
Example
<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);
</script>
Try it Yourself »
Stroke Text
Your browser does not support the canvas element
Example
<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.strokeText("Hello World", 10, 50);
</script>
Try it Yourself »
Draw Linear Gradient
Your browser does not support the canvas element
Example
<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// Create gradient
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);
</script>
Try it Yourself »
Draw Circular Gradient
Your browser does not support the canvas element
Example
<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// Create gradient
var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);
</script>
Try it Yourself »
Draw Image
Example
<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("scream");
ctx.drawImage(img, 10, 10);
</script>
Try it Yourself »
HTML Canvas Tutorial
To learn more about
<canvas>
, please 
read our
HTML Canvas Tutorial
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS

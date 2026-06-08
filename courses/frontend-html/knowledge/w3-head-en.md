# HTML Head

Source: https://www.w3schools.com/html/html_head.asp

HTML -
The Head Element
❮ Previous
Next ❯
The HTML
<head>
element
is a container for the following elements:
<title>
<style>
<meta>
<link>
<script>
, and
<base>
The HTML <head> Element
<head>
element is a container for metadata (data 
about data) and is placed between the
<html>
tag and the
<body>
tag.
HTML metadata is data about the HTML document. Metadata is not displayed on 
the page.
Metadata typically define the document title, character set, styles, scripts, and other meta information.
The HTML <title> Element
<title>
element defines the title of the document. 
The title must be text-only, and it is shown in the browser's title bar or in 
the page's tab.
<title>
element is required in HTML documents!
The content of a page title is very important for search engine optimization 
(SEO)! The page title is used by search engine algorithms to decide the order 
when listing pages in search results.
<title>
element:
defines a title in the browser toolbar
provides a title for the page when it is added to favorites
displays a title for the page in search engine-results
So, try to make the title as accurate and meaningful as possible!
A simple HTML document:
Example
<!DOCTYPE html>
<html>
<head>
<title>A Meaningful Page 
 Title</title>
</head>
<body>
The content of the document......
</body>
</html>
Try it Yourself »
The HTML <style> Element
<style>
element is used to define style information for a 
single HTML page:
Example
<style>
body {background-color: powderblue;}
h1 {color: red;}
p {color: blue;}
</style>
Try it Yourself »
The HTML <link> Element
<link>
element defines the 
relationship between the current document and an external resource.
<link>
tag is most often used to link to external style sheets:
Example
<link rel="stylesheet" href="mystyle.css">
Try it Yourself »
Tip:
To learn all about CSS, visit our
CSS Tutorial
The HTML <meta> Element
<meta>
element is typically used 
to specify the character set, page description, keywords, author of the document, 
and viewport settings.
The metadata will not be displayed on the page, but is used by browsers (how to display content 
or reload page), 
by search engines (keywords), and other web services.
Examples
Define the character set used:
<meta charset="UTF-8">
Define keywords for search engines:
<meta name="keywords" content="HTML, CSS, JavaScript">
Define a description of your web page:
<meta name="description" content="Free Web tutorials">
Define the author of a page:
<meta name="author" content="John Doe">
Refresh document every 30 seconds:
<meta http-equiv="refresh" content="30">
Setting the viewport to make your website look good on all devices:
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Example of
<meta>
tags:
Example
<meta charset="UTF-8">
<meta name="description" content="Free Web tutorials">
<meta name="keywords" content="HTML, CSS, JavaScript">
<meta name="author" content="John 
  Doe">
Try it Yourself »
Setting The Viewport
The viewport is the user's visible area of a web page. It varies with the device 
- it will be smaller on a mobile phone than on a computer screen.
You should include the following
<meta>
element in all your web pages:
<meta name="viewport" content="width=device-width, initial-scale=1.0">
This gives the browser instructions on how 
to control the page's dimensions and scaling.
width=device-width
part sets the width of the page to follow the screen-width of the device (which will vary depending on the device).
initial-scale=1.0
part sets the initial zoom level when the page is first loaded by the browser.
Here is an example of a web page
without
the viewport meta tag, and the same web page
with
the viewport meta tag:
Tip:
If you are browsing this page with a phone or a tablet, you can click on the two links below to see the difference.
Without the 
viewport meta tag
With the 
viewport meta tag
The HTML <script> Element
<script>
element is used to define client-side JavaScripts.
The following JavaScript writes "Hello JavaScript!" into an HTML element with id="demo":
Example
<script>
function myFunction() {
document.getElementById("demo").innerHTML = "Hello JavaScript!";
</script>
Try it Yourself »
Tip:
To learn all about JavaScript, visit our
JavaScript Tutorial
The HTML <base> Element
<base>
element specifies the base URL and/or target for all relative URLs in a page.
<base>
tag must have either an 
href or a target attribute present, or both.
There can only be one single
<base>
element in a document!
Example
Specify a default URL and a default target for all links on a page:
<head>
<base href="https://www.w3schools.com/" target="_blank">
</head>
<body>
<img src="images/stickman.gif" width="24" height="39" 
   alt="Stickman">
<a href="tags/tag_base.asp">HTML base Tag</a>
</body>
Try it Yourself »
Chapter Summary
<head>
element is a container for metadata (data 
about data)
<head>
element is placed between the
<html>
tag and the
<body>
<title>
element is required and 
  it defines the title of the document
<style>
element is used to 
  define style information for a single document
<link>
tag is most often used to link to external style sheets
<meta>
element is typically 
  used to specify the character set, page description, keywords, author of the 
  document, and viewport settings
<script>
element is used to define client-side JavaScripts
<base>
element specifies the 
  base URL and/or target for all relative URLs in a page
HTML head Elements
Description
<head>
Defines information about the document
<title>
Defines the title of a document
<base>
Defines a default address or a default target for all links on a page
<link>
Defines the relationship between a document and an external resource
<meta>
Defines metadata about an HTML document
<script>
Defines a client-side script
<style>
Defines style information for a document
For a complete list of all available HTML tags, visit our
HTML Tag Reference
Video: HTML Head
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS

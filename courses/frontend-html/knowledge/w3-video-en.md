# HTML Video

Source: https://www.w3schools.com/html/html5_video.asp

HTML
Video
❮ Previous
Next ❯
The HTML
<video>
element is used to 
show a video on a web page.
Video
Example
Courtesy of
Big Buck Bunny
Your browser does not support HTML5 video.
Try it Yourself »
The HTML <video> Element
To show a video in HTML, use the
<video>
element:
Example
<video width="320" height="240" controls>
<source src="movie.mp4" type="video/mp4">
<source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video>
Try it Yourself »
How it Works
controls
attribute adds video controls, like play, pause, and volume.
It is a good idea to always include
width
height
attributes. If height and width are not set, the page 
might flicker while the video loads.
<source>
element allows you to specify alternative video 
files which the browser may choose from. The browser will use the first recognized format.
The text between the
<video>
</video>
tags will only be displayed 
in browsers that do not 
support the
<video>
element.
HTML <video> Autoplay
To start a video automatically, use the
autoplay
attribute:
Example
<video width="320" height="240" autoplay>
<source src="movie.mp4" type="video/mp4">
<source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video>
Try it Yourself »
Note:
Chromium browsers do not 
allow autoplay in most cases. However, muted autoplay is always allowed.
muted
after
autoplay
to let your video start playing automatically (but muted):
Example
<video width="320" height="240" autoplay muted>
<source src="movie.mp4" type="video/mp4">
<source src="movie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video>
Try it Yourself »
Browser Support
The numbers in the table specify the first browser version that fully supports the
<video>
element.
Element
<video>
10.5
HTML Video Formats
There are three supported video formats: MP4, WebM, and Ogg. The browser support for the different formats is:
Browser
WebM
Edge
Chrome
Firefox
Safari
Opera
HTML Video - Media Types
File Format
Media Type
video/mp4
WebM
video/webm
video/ogg
HTML Video - Methods, Properties, and Events
The HTML DOM defines methods, properties, and events for the
<video>
element.
This allows you to load, play, and pause videos, as well as setting duration and volume.
There are also DOM events that can notify you when a video begins to play, is paused, etc.
Example: Using JavaScript
Play/Pause
Small
Normal
Your browser does not support HTML5 video.
Video courtesy of
Big Buck Bunny
Try it Yourself »
For a full DOM reference, go to our
HTML Audio/Video DOM Reference
HTML Video Tags
Description
<video>
Defines a video or movie
<source>
Defines multiple media resources for media elements, such as <video> and <audio>
<track>
Defines text tracks in media players
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS

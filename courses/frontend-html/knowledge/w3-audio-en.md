# HTML Audio

Source: https://www.w3schools.com/html/html5_audio.asp

HTML
Audio
❮ Previous
Next ❯
The HTML
<audio>
element is used to 
play an audio file on a web page.
The HTML <audio> Element
To play an audio file in HTML, use the
<audio>
element:
Example
<audio controls>
<source src="horse.ogg" type="audio/ogg">
<source src="horse.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
Try it Yourself »
HTML Audio - How It Works
controls
attribute adds audio controls, like play, pause, and volume.
<source>
element allows you to specify alternative audio 
files which the browser may choose from. The browser will use the first recognized format.
The text between the
<audio>
</audio>
tags will only be displayed 
in browsers that do not 
support the
<audio>
element.
HTML <audio> Autoplay
To start an audio file automatically, use the
autoplay
attribute:
Example
<audio controls autoplay>
<source src="horse.ogg" type="audio/ogg">
<source src="horse.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
Try it Yourself »
Note:
Chromium browsers do not 
allow autoplay in most cases. However, muted autoplay is always allowed.
muted
after
autoplay
to let your audio file start playing automatically (but muted):
Example
<audio controls autoplay muted>
<source src="horse.ogg" type="audio/ogg">
<source src="horse.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
Try it Yourself »
Browser Support
The numbers in the table specify the first browser version that fully supports the
<audio>
element.
Element
<audio>
10.5
HTML Audio Formats
There are three supported audio formats: MP3, WAV, and OGG. The browser support for the different formats is:
Browser
Edge/IE
YES*
YES*
Chrome
Firefox
Safari
Opera
*From Edge 79
HTML Audio - Media Types
File Format
Media Type
audio/mpeg
audio/ogg
audio/wav
HTML Audio - Methods, Properties, and Events
The HTML DOM defines methods, properties, and events for the
<audio>
element.
This allows you to load, play, and pause audios, as well as set duration and volume.
There are also DOM events that can notify you when an audio begins to play, is paused, etc.
For a full DOM reference, go to our
HTML Audio/Video DOM Reference
HTML Audio Tags
Description
<audio>
Defines sound content
<source>
Defines multiple media resources for media elements, such as <video> and 
<audio>
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS

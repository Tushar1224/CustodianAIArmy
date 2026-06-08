# w3schools-react-events

Source: https://www.w3schools.com/react/react_events.asp

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
React
Tutorial
React Home
React Intro
React Get Started
React First App
React Render HTML
React Upgrade
React ES6
React ES6
ES6 Classes
ES6 Arrow Functions
ES6 Variables
ES6 Array map()
ES6 Destructuring
ES6 Spread Operator
ES6 Modules
ES6 Ternary Operator
ES6 Template Strings
React JSX Intro
React JSX Expressions
React JSX Attributes
React JSX If Statements
React Components
React Class
React Props
React Props Destructuring
React Props Children
React Events
React Conditionals
React Lists
React Forms
React Forms Submit
React Textarea
React Select
React Multiple Inputs
React Checkbox
React Radio
React Portals
React Suspense
React CSS Styling
React CSS Modules
React CSS-in-JS
React Router
React Transitions
React Forward Ref
React HOC
React Sass
React
Hooks
What is Hooks?
React useState
React useEffect
React useContext
React useRef
React useReducer
React useCallback
React useMemo
React Custom Hooks
React Cert
React Certificate
React Exercises
React Compiler
React Quiz
React Exercises
React Syllabus
React Study Plan
React Server
React Interview Prep
React Bootcamp
React Events
❮ Previous
Next ❯
Just like HTML DOM events, React can perform actions based on user events.
React has the same events as HTML: click, change, mouseover etc.
Adding Events
React events are written in camelCase syntax:
onClick
instead of
onclick
React event handlers are written inside curly 
braces:
onClick={shoot}
instead of
onclick="shoot()"
React:
<button onClick={shoot}>Take the Shot!</button>
HTML:
<button onclick="shoot()">Take the Shot!</button>
Example:
Put the
shoot
function inside the
Football
component:
function Football() {
  const shoot = () => {
    alert("Great Shot!");
  return (
    <button onClick={shoot}>Take the shot!</button>
createRoot(document.getElementById('root')).render(
  <Football />
Example »
Passing Arguments
To pass an argument to an event handler, use an arrow function.
Example:
Send "Goal!" as a parameter to the
shoot
function, using arrow 
  function:
function Football() {
  const shoot = (a) => {
    alert(a);
  return (
    <button onClick={() => shoot("Goal!")}>Take the shot!</button>
createRoot(document.getElementById('root')).render(
  <Football />
Example »
React Event Object
Event handlers have access to the React event that triggered the function.
In our example the event is the "click" event.
Example:
Arrow Function: Sending the event object manually:
function Football() {
  const shoot = (a, b) => {
    alert(b.type);
    'b' represents the React event that triggered the function,
    in this case the 'click' event
  return (
    <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
createRoot(document.getElementById('root')).render(
  <Football />
Example »
This will come in handy when we look at
Form
a later chapter.
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
ACADEMY
W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning.
Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness
of all content. While using W3Schools, you agree to have read and accepted our
terms of use
cookies
privacy policy
Copyright 1999-2026
by Refsnes Data. All Rights Reserved.
W3Schools is Powered by W3.CSS

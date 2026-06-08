# w3schools-react-props

Source: https://www.w3schools.com/react/react_props.asp

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
React Props
❮ Previous
Next ❯
Props are arguments passed into React components.
Props are passed to components via HTML attributes.
props
stands for properties.
React Props
React Props are like function arguments in JavaScript
attributes 
in HTML.
To send props into a component, use the same syntax as HTML attributes:
Example
Add a
brand
attribute to the
element:
createRoot(document.getElementById('root')).render(
  <Car brand="Ford" />
The component receives the argument as a
props
object:
Example
Use the
brand
attribute in the
component:
function Car(props) {
  return (
    <h2>I am a {props.brand}!</h2>
Example »
The name of the object is
props
, but you can call it anything you want.
Example
You can use
myobj
instead of
props
in the component:
function Car(myobj) {
  return (
    <h2>I am a {myobj.brand}!</h2>
Example »
Pass Multiple Properties
You can send as many properties as you want.
Every attribute is sent to the
component as object properties.
Example
Send multiple properties to the
component:
createRoot(document.getElementById('root')).render(
  <Car brand="Ford" model="Mustang" color="red" />
All properties are received in the
component inside the
props
object:
Example
Use the property values in the
component:
function Car(props) {
  return (
    <h2>I am a {props.color} {props.brand} {props.model}!</h2>
Run Example »
Different Data Types
React props can be of any data type, including variables, numbers, strings, objects, arrays, and more.
Strings can be sent inside quotes as in the examples above, but numbers, variables, and objects need to be sent inside curly brackets.
Example
Numbers has to be sent inside curly brackets to be treated as numbers:
createRoot(document.getElementById('root')).render(
  <Car year={1969} />
Run Example »
Example
Variables has to be sent inside curly brackets:
let x = "Ford";
createRoot(document.getElementById('root')).render(
  <Car brand={x} />
Run Example »
Example
Objects and Arrays has to be sent inside curly brackets:
let x = [1964, 1965, 1966];
let y = {name: "Ford", model: "Mustang"};
createRoot(document.getElementById('root')).render(
  <Car years={x} carinfo={y} />
Run Example »
Object Props
The component treats objects like objects, and you can use the dot notation to access the properties.
Example
Use the dot notation to access object properties:
function Car(props) {
  return (
      <h2>My {props.carinfo.name} {props.carinfo.model}!</h2>
      <p>It is {props.carinfo.color} and it is from {props.carinfo.year}!</p>
const carInfo = {
  name: "Ford",
  model: "Mustang",
  color: "red",
  year: 1969
createRoot(document.getElementById('root')).render(
  <Car carinfo={carInfo} />
Example »
Array Props
Array props can be accessed using the indexes.
Example
Use the indexes to access array properties:
function Car(props) {
  return (
    <h2>My car is a {props.carinfo[0]} {props.carinfo[1]}!</h2>
const carInfo = ["Ford", "Mustang"];
createRoot(document.getElementById('root')).render(
  <Car carinfo={carInfo} />
Example »
Pass Props from Component to Component
Attributes are also how you pass data from one component to another, as parameters.
Example
Send the
brand
attribute from the
Garage
component to the
component:
function Car(props) {
  return (
    <h2>I am a {props.brand}!</h2>
function Garage() {
  return (
      <h1>Who lives in my garage?</h1>
      <Car brand="Ford" />
createRoot(document.getElementById('root')).render(
  <Garage />
Example »
Note:
React Props are read-only! You will get an error if you try to change their 
value.
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

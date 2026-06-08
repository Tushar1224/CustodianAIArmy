# w3schools-react-components

Source: https://www.w3schools.com/react/react_components.asp

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
React Components
❮ Previous
Next ❯
Components are like functions that return HTML elements.
React Components
Components are independent and reusable bits of code.
They serve the same purpose as JavaScript functions,
but work in isolation and return HTML.
Components come in two types, Class components and Function components, in 
this tutorial we will concentrate on Function components.
In older React code bases, you may find Class components primarily used.
It is now suggested to use Function components along with Hooks, instead of Class components.
Class components are still supported, check the
Class components
section for more information.
Create Your First Component
When creating a React component, the component's name
MUST
start with an 
upper case letter.
React components returns HTML code.
Example
Create a Function component called
function Car() {
  return (
    <h2>Hi, I am a Car!</h2>
Rendering a Component
Now your React application has a component called
, which returns an
<h2>
element.
To use this component in your application, refer to it like this:
<Car />
Example
Display the
component in the "root" element:
createRoot(document.getElementById('root')).render(
  <Car />
Example »
Props
Arguments can be passed into a component as
props
, which stands for properties.
You send the arguments into the component as HTML attributes.
You will learn more about
props
in our
React Props chapter
Example
Use an attribute to pass a color to the
component, and use it in the
render
function:
function Car(props) {
  return (
    <h2>I am a {props.color} Car!</h2>
createRoot(document.getElementById('root')).render(
  <Car color="red"/>
Example »
Components in Components
We can refer to components inside other components:
Example
Use the
component inside the
Garage
component:
function Car() {
  return (
    <h2>I am a Car!</h2>
function Garage() {
  return (
      <h1>Who lives in my Garage?</h1>
      <Car />
createRoot(document.getElementById('root')).render(
  <Garage />
Example »
Rendering a Component Twice
We can render a component multiple times:
Example
Use the
component twice inside the
Garage
component:
function Car() {
  return (
    <h2>I am a Car!</h2>
function Garage() {
  return (
      <h1>Who lives in my Garage?</h1>
      <Car />
      <Car />
createRoot(document.getElementById('root')).render(
  <Garage />
Example »
The example above might be a bit useless, but if we change the content of the
component, by using arguments, it makes more sense:
Example
Use the
component to display two different cars:
function Car(props) {
  return (
    <h2>I am a {props.brand}!</h2>
function Garage() {
  return (
      <h1>Who lives in my Garage?</h1>
      <Car brand="Ford" />
      <Car brand="BMW" />
createRoot(document.getElementById('root')).render(
  <Garage />
Example »
Components in Files
React is all about re-using code, and it can be a good idea to split your components into separate files.
To do that, create a new file in the
folder with a
.jsx
file extension and put the code inside it:
Note that the filename must start with an uppercase character.
Example
This is the new file, we named it
Vehicle.jsx
function Car() {
  return (
    <h2>Hi, I am a Car!</h2>
export default Car;
To be able to use the
component, you have to import the
Vehicle.jsx
file in your 
application.
Example
Now we import the
Vehicle.jsx
file in the application, and we can use the
component as if it was created here.
import { createRoot } from 'react-dom/client'
import Car from './Vehicle.jsx';
createRoot(document.getElementById('root')).render(
  <Car />
Example »
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

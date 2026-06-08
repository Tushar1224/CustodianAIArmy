# w3schools-react-jsx

Source: https://www.w3schools.com/react/react_jsx.asp

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
React JSX
❮ Previous
Next ❯
What is JSX?
JSX stands for JavaScript XML.
JSX allows us to write HTML in React.
JSX makes it easier to write and add HTML in React.
Coding JSX
JSX allows us to write HTML elements in JavaScript and place them in the DOM 
without any
createElement()
and/or
appendChild()
methods.
JSX converts HTML tags into react elements.
You are not required to use JSX, but JSX makes it easier to write React applications.
Here are two examples. The first uses JSX and the second does 
not:
Example 1
JSX:
const myElement = <h1>I Love JSX!</h1>;
createRoot(document.getElementById('root')).render(
  myElement
Example »
Example 2
Without JSX:
const myElement = React.createElement('h1', {}, 'I do not use JSX!');
createRoot(document.getElementById('root')).render(
  myElement
Example »
As you can see in the first example, JSX allows us to write HTML directly within the JavaScript code.
JSX is an extension of the JavaScript language based on ES6, and is translated into regular JavaScript at runtime.
Expressions in JSX
With JSX you can write expressions inside curly braces
The expression can be a React variable, or property, or any other valid JavaScript expression. JSX will execute the expression and return the result:
Example
Execute the expression
5 + 5
const myElement = <h1>React is {5 + 5} times better with JSX</h1>;
Example »
Inserting a Large Block of HTML
To write HTML on multiple lines, put the HTML inside parentheses:
Example
Create a list with three list items:
const myElement = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
Example »
One Top Level Element
The HTML code must be wrapped in
top level element.
So if you like to write
paragraphs, you must put them inside a 
parent element, like a
element.
Example
Wrap two paragraphs inside one DIV element:
const myElement = (
  <div>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </div>
Example »
JSX will throw an error if the HTML is not correct, or if the HTML misses a 
parent element.
Alternatively, you can use a "fragment" to wrap multiple lines.
This will prevent unnecessarily adding extra nodes to the DOM.
A fragment looks like an empty HTML tag:
<></>
Example
Wrap two paragraphs inside a fragment:
const myElement = (
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
Example »
Elements Must be Closed
JSX follows XML rules, and therefore HTML elements must be properly closed.
Example
Close empty elements with
const myElement = <input type="text" />;
Example »
JSX will throw an error if the HTML is not properly closed.
Attribute class = className
class
attribute is a much used attribute 
in HTML, but since JSX is rendered as JavaScript, and the
class
keyword is a reserved word in JavaScript, 
you are not allowed to use it in JSX.
Use attribute
className
instead.
JSX solved this by using
className
instead. 
When JSX is rendered, it translates
className
attributes into
class
attributes.
Example
Use attribute
className
instead of
class
in JSX:
const myElement = <h1 className="myclass">Hello World</h1>;
Example »
Comments in JSX
Comments in JSX are written with
{/* */}
Example
Comments in JSX:
const myElement = <h1>Hello {/* Wonderful */} World </h1>;
Example »
JSX in React Components
React uses components to build UIs. Components are independent and reusable bits of code.
React components are like JavaScript functions, and return HTML.
JSX works perfect inside React components
Example
JSX in Components:
function Car() {
  return (
      <h2>My Car</h2>
      <p>It is a Ford Mustang.</p>
createRoot(document.getElementById('root')).render(
  <Car />
Example »
Inside the components, you can do some other operations before returning the HTML:
Example
JSX in Components:
function Car() {
  const brand = "Ford";
  const model = "Mustang";
  return (
      <h2>My Car</h2>
      <p>It is a {brand} {model}.</p>
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

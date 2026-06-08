# w3schools-react-hooks

Source: https://www.w3schools.com/react/react_hooks.asp

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
React Hooks
❮ Previous
Next ❯
Hooks allow functions to have access to state and other React features without using classes.
They provide a more direct API to React concepts like props, state, context, refs, and lifecycle.
What is a Hook?
Hooks are functions that let you "hook into" React state and lifecycle features from functional components.
Example:
Here is an example of a Hook. Don't worry if it doesn't make sense. We will go into more detail in the
next section
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
function FavoriteColor() {
  const [color, setColor] = useState("red");
  return (
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      <button
        type="button"
        onClick={() => setColor("pink")}
      >Pink</button>
      <button
        type="button"
        onClick={() => setColor("green")}
      >Green</button>
createRoot(document.getElementById('root')).render(
  <FavoriteColor />
Example »
You must
import
Hooks from
react
Here we are using the
useState
Hook to keep track of the application state.
State generally refers to application data or properties that need to be tracked.
Hook Rules
There are 3 rules for hooks:
Hooks can only be called inside React function components.
Hooks can only be called at the top level of a component.
Hooks cannot be conditional
Note:
Hooks will not work in React class components.
Custom Hooks
If you have stateful logic that needs to be reused in several components, you can build your own custom Hooks.
We'll go into more detail in the
Custom Hooks section
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

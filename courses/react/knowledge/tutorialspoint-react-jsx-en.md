# Tutorialspoint React Jsx

Source: https://www.tutorialspoint.com/reactjs/reactjs_jsx.htm

React - Home
React - Introduction
React - Roadmap
React - Installation
React - Features
React - Advantages & Disadvantages
React - Architecture
React - Creating a React Application
React - JSX
React - Components
React - Nested Components
React - Using Newly Created Components
React - Component Collection
React - Styling
React - Properties (props)
React - Creating Components using Properties
React - props Validation
React - Constructor
React - Component Life Cycle
React - Event management
React - Creating an Event−Aware Component
React - Introduce Events in Expense Manager APP
React - State Management
React - State Management API
React - Stateless Component
React - State Management Using React Hooks
React - Component Life Cycle Using React Hooks
React - Layout Component
React - Pagination
React - Material UI
React - Http Server
React - Http client programming
React - Form Programming
React - Forms
React - Controlled Component
React - Uncontrolled Component
React - Formik
React - Conditional Rendering
React - Lists
React - Keys
React - Routing
React - Redux
React - Animation
React - Bootstrap
React - Map
React - Table
React - Managing State Using Flux
React - Testing
React - CLI Commands
React - Building and Deployment
React - Example
Hooks
React - Introduction to Hooks
React - Using useState
React - Using useEffect
React - Using useContext
React - Using useRef
React - Using useReducer
React - Using useCallback
React - Using useMemo
React - Custom Hooks
React Advanced
React - Accessibility
React - Code Splitting
React - Context
React - Error Boundaries
React - Forwarding Refs
React - Fragments
React - Higher Order Components
React - Integrating With Other Libraries
React - Optimizing Performance
React - Profiler API
React - Portals
React - React Without ES6 ECMAScript
React - React Without JSX
React - Reconciliation
React - Refs and the DOM
React - Render Props
React - Static Type Checking
React - Strict Mode
React - Web Components
Additional Concepts
React - Date Picker
React - Helmet
React - Inline Style
React - PropTypes
React - BrowserRouter
React - DOM
React - Carousel
React - Icons
React - Form Components
React - Reference API
React Useful Resources
React - Quick Guide
React - Cheatsheet
React - Axios CheatSheet
React - Useful Resources
React - Discussion
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
React - Using JSX
Previous
Quiz
Next
As we learned earlier, React JSX is an extension to JavaScript. It allows writing a JavaScript code that looks like an HTML code. For instance, consider the following code:
const element = <h1>Hello React!</h1>
The tag provided in the code above is known as JSX. JSX is mainly used to provide information about the appearance of an interface. However, it is not completely a template language but a syntax extension to JavaScript. JSX produces elements that are rendered into a DOM, in order to specify what the output must look like.
Using JSX in ReactJS
JSX enables the developer to create a virtual DOM using XML syntax. It compiles down to pure JavaScript (
React.createElement function calls
), therefore, it can be used inside any valid JavaScript code.
Assign to a variable.
var greeting = <h1>Hello React!</h1>
Assign to a variable based on a condition.
var canGreet = true; 
if(canGreet) { 
   greeting = <h1>Hello React!</h1> 
Can be used as return value of a function.
function Greeting() { 
   return <h1>Hello React!</h1> 
greeting = Greeting()
Can be used as argument of a function.
function Greet(message) { 
   const root = ReactDOM.createRoot(document.getElementById('react-app'));
   root.render(message);
Greet(<h1>Hello React!</h1>)
Why JSX?
Using JSX with React is not mandatory, as there are various options to achieve the same thing as JSX; but it is helpful as a visual aid while working with UI inside a JavaScript code.
JSX performs optimization while translating the code to JavaScript, making it faster than regular JavaScript.
React uses components that contain both markup and logic in a single file, instead of separate files.
Most of the errors can be found at compilation time, as the data flow is unidirectional.
Creating templates becomes easier with JSX.
We can use JSX inside of conditional statements (if−else) and loop statements (for loops), can assign it to variables, accept it as arguments, or return it from functions.
Using JSX can prevent Cross Site Scripting attacks, or injection attacks.
Expressions in JSX
JSX supports expression in pure JavaScript syntax. Expression has to be enclosed inside the curly braces,
. Expression can contain all variables available in the context, where the JSX is defined. Let us create simple JSX with expression.
Example
<script type="text/babel">
   var cTime = new Date().toTimeString();
   ReactDOM.render(
      <div><p>The current time is {cTime}</p></div>, 
      document.getElementById('react-app') );
</script>
Output
Here,
cTime
used in the JSX using expression. The output of the above code is as follows,
The Current time is 21:19:56 GMT+0530(India Standard Time)
One of the positive side effects of using expression in JSX is that it prevents
Injection attacks
as it converts any string into html safe string.
Functions in JSX
JSX supports user defined JavaScript function. Function usage is similar to expression. Let us create a simple function and use it inside JSX.
Example
<script type="text/babel">
   var cTime = new Date().toTimeString();
   ReactDOM.render(
      <div><p>The current time is {cTime}</p></div>, 
      document.getElementById('react-app') 
</script>
Output
Here,
getCurrentTime()
is used get the current time and the output is similar as specified below −
The Current time is 21:19:56 GMT+0530(India Standard Time)
Attributes in JSX
JSX supports HTML like attributes. All HTML tags and its attributes are supported. Attributes has to be specified using camelCase convention (and it follows JavaScript DOM API) instead of normal HTML attribute name. For example, class attribute in HTML has to be defined as
className
. The following are few other examples −
htmlFor
instead of
tabIndex
instead of
tabindex
onClick
instead of
onclick
Example
<style>
   .red { color: red }
</style>
<script type="text/babel">
   function getCurrentTime() {
      return new Date().toTimeString();
   ReactDOM.render(
      <div>
         <p>The current time is <span className="red">{getCurrentTime()}</span></p>
      </div>,
      document.getElementById('react-app') 
</script>
Output
The output is as follows −
The Current time is
22:36:55 GMT+0530(India Standard Time)
Using Expression within Attributes
JSX supports expression to be specified inside the attributes. In attributes, double quote should not be used along with expression. Either expression or string using double quote has to be used. The above example can be changed to use expression in attributes.
<style>
   .red { color: red }
</style>
<script type="text/babel">
   function getCurrentTime() {
      return new Date().toTimeString();
   var class_name = "red";
   ReactDOM.render(
      <div>
         <p>The current time is <span className={class_name}>{getCurrentTime()}</span></p>
      </div>, 
      document.getElementById('react-app') 
</script>
Nested Elements in JSX
Nested elements in JSX can be used as JSX Children. They are very useful while displaying the nested components. You can use any type of elements together including tags, literals, functions, expressions etc. But false, null, undefined, and true are all valid elements of JSX; they just don't render as these JSX expressions will all render to the same thing. In this case, JSX is similar to HTML.
Following is a simple code to show the usage of nested elements in JSX −
<div>
   This is a list:
   <ul>
      <li>Element 1</li>
      <li>Element 2</li>
   </ul>
</div>
Print Page
Previous
Quiz
Next
Advertisements

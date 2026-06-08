# Tutorialspoint React Components

Source: https://www.tutorialspoint.com/reactjs/reactjs_components.htm

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
React - Components
Previous
Quiz
Next
React component is the building block of a React application. Let us learn how to create a new React component and the features of React components in this chapter.
A React component represents a small chunk of user interface in a webpage. The primary job of a React component is to render its user interface and update it whenever its internal state is changed. In addition to rendering the UI, it manages the events belongs to its user interface. To summarize, React component provides below functionalities.
Initial rendering of the user interface.
Management and handling of events.
Updating the user interface whenever the internal state is changed.
React component accomplish these feature using three concepts −
Properties
− Enables the component to receive input.
Events
− Enable the component to manage DOM events and end-user interaction.
State
− Enable the component to stay stateful. Stateful component updates its UI with respect to its state.
There are two types of components in React. They are −
Function Components
Class Components
Function Components
A function component is literally defined as JavaScript functions. This React component accepts a single object argument and returns a React element. Note that an element in React is not a component, but a component is comprised of multiple elements. Following is the syntax for the function component in React:
function function_name(argument_name) {
   function_body;
Class Components
Similarly, class components are basic classes that are made of multiple functions. All class components of React are subclasses of the
React.Component
class, hence, a class component must always extend it. Following is the basic syntax −
class class_name extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
Let us learn all the concept one-by-one in the upcoming chapters.
Creating a React component
React library has two component types. The types are categorized based on the way it is being created.
Function component − Uses plain JavaScript function.
ES6 class component − Uses ES6 class.
The core difference between function and class component are −
Function components are very minimal in nature. Its only requirement is to return a
React element
function Hello() { 
   return '<div>Hello</div>' 
The same functionality can be done using ES6 class component with little extra coding.
class ExpenseEntryItem extends React.Component {         
   render() { 
      return ( 
         <div>Hello</div> 
Class components supports state management out of the box whereas function components does not support state management. But, React provides a hook,
useState()
for the function components to maintain its state.
Class component have a life cycle and access to each life cycle events through dedicated callback apis. Function component does not have life cycle. Again, React provides a hook,
useEffect()
for the function component to access different stages of the component.
Creating a class component
Let us create a new React component (in our expense-manager app), ExpenseEntryItem to showcase an expense entry item. Expense entry item consists of name, amount, date and category. The object representation of the expense entry item is −
   'name': 'Mango juice', 
   'amount': 30.00, 
   'spend_date': '2020-10-10' 
   'category': 'Food', 
Open
expense-manager
application in your favorite editor.
Next, create a file,
ExpenseEntryItem.css
under
src/components
folder to style our component.
Next, create a file,
ExpenseEntryItem.js
under
src/components
folder by extending
React.Component
import React from 'react'; 
import './ExpenseEntryItem.css'; 
class ExpenseEntryItem extends React.Component { 
Next, create a method
render
inside the
ExpenseEntryItem
class.
class ExpenseEntryItem extends React.Component { 
   render() { 
Next, create the user interface using JSX and return it from
render
method.
class ExpenseEntryItem extends React.Component {
   render() {
      return (
         <div>
            <div><b>Item:</b> <em>Mango Juice</em></div>
            <div><b>Amount:</b> <em>30.00</em></div>
            <div><b>Spend Date:</b> <em>2020-10-10</em></div>
            <div><b>Category:</b> <em>Food</em></div>
         </div>
Next, specify the component as default export class.
import React from 'react';
import './ExpenseEntryItem.css';
class ExpenseEntryItem extends React.Component {
   render() {
      return (
         <div>
            <div><b>Item:</b> <em>Mango Juice</em></div>
            <div><b>Amount:</b> <em>30.00</em></div>
            <div><b>Spend Date:</b> <em>2020-10-10</em></div>
            <div><b>Category:</b> <em>Food</em></div>
         </div>
export default ExpenseEntryItem;
Now, we successfully created our first React component. Let us use our newly created component in
index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import ExpenseEntryItem from './components/ExpenseEntryItem'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ExpenseEntryItem />);
Example
The same functionality can be done in a webpage using CDN as shown below −
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8" />
      <title>React application :: ExpenseEntryItem component</title>
   </head>
   <body>
      <div id="react-app"></div>
      <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <script type="text/babel">
         class ExpenseEntryItem extends React.Component {
            render() {
               return (
                  <div>
                     <div><b>Item:</b> <em>Mango Juice</em></div>
                     <div><b>Amount:</b> <em>30.00</em></div>
                     <div><b>Spend Date:</b> <em>2020-10-10</em></div>
                     <div><b>Category:</b> <em>Food</em></div>
                  </div>
         ReactDOM.render(
            <ExpenseEntryItem />,
            document.getElementById('react-app') );
      </script>
   </body>
</html>
Next, serve the application using npm command.
npm start
Output
Next, open the browser and enter
http://localhost:3000
in the address bar and press enter.
Item: Mango Juice
Amount: 30.00
Spend Date: 2020-10-10
Category: Food
Creating a function component
React component can also be created using plain JavaScript function but with limited features. Function based React component does not support state management and other advanced features. It can be used to quickly create a simple component.
The above
ExpenseEntryItem
can be rewritten in function as specified below −
function ExpenseEntryItem() {
   return (
      <div>
         <div><b>Item:</b> <em>Mango Juice</em></div>
         <div><b>Amount:</b> <em>30.00</em></div>
         <div><b>Spend Date:</b> <em>2020-10-10</em></div>
         <div><b>Category:</b> <em>Food</em></div>
      </div>
Here, we just included the render functionality and it is enough to create a simple React component.
Splitting Components
Even if JavaScript is said to be simpler to execute, there are many times where the code gets complex due to large number of classes or dependencies for a relatively simple project. And with larger codes, the loading time in a browser gets longer. As a result, reducing the efficiency of its performance. This is where code-splitting can be used. Code splitting is used to divide components or bundles into smaller chunks to improve the performance.
Code splitting will only load the components that are currently needed by the browser. This process is known as lazy load. This will drastically improve the performance of your application. One must observe that we are not trying to reduce the amount of code with this, but just trying to reduce the burden of browser by loading components that the user might never need. Let us look at an example code.
Example
Let us first see the bundled code of a sample application to perform any operation.
// file name = app.js
import { sub } from './math.js';
console.log(sub(23, 14));
// file name = math.js
export function sub(a, b) {
  return a - b;
The Bundle for the application above will look like this −
function sub(a, b) {
  return a - b;
console.log(sub(23, 14));
Now, the best way to introduce code splitting in your application is by using dynamic import().
// Before code-splitting
import { sub } from './math';
console.log(add(23, 14));
// After code-splitting
import("./math").then(math => {
  console.log(math.sub(23, 14));
When this syntax is used (in bundles like Webpack), code-splitting will automatically begin. But if you are Create React App, the code-splitting is already configured for you and you can start using it immediately.
Print Page
Previous
Quiz
Next
Advertisements

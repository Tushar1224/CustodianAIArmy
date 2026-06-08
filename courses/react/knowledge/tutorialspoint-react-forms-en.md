# Tutorialspoint React Forms

Source: https://www.tutorialspoint.com/reactjs/reactjs_forms.htm

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
React - Forms
Previous
Quiz
Next
In this chapter, we will learn how to use forms in React.
Simple Example
In the following example, we will set an input form with
value = {this.state.data}
. This allows to update the state whenever the input value changes. We are using
onChange
event that will watch the input changes and update the state accordingly.
App.js
import React from 'react';
class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data: 'Initial data...'
   updateState(e) {
      this.setState({data: e.target.value});
   render() {
      return (
         <div>
            <input type = "text" value = {this.state.data} 
               onChange = {this.updateState} />
            <h4>{this.state.data}</h4>
         </div>
export default App;
index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './components/App';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App /gt;);
When the input text value changes, the state will be updated.
Complex Example
In the following example, we will see how to use forms from child component.
onChange
method will trigger state update that will be passed to the child input
value
and rendered on the screen. A similar example is used in the Events chapter. Whenever we need to update state from child component, we need to pass the function that will handle updating (
updateState
) as a prop (
updateStateProp
App.jsx
import React from 'react';
class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data: 'Initial data...'
      this.updateState = this.updateState.bind(this);
   updateState(e) {
      this.setState({data: e.target.value});
   render() {
      return (
         <div>
            <Content myDataProp = {this.state.data} 
               updateStateProp = {this.updateState}></Content>
         </div>
class Content extends React.Component {
   render() {
      return (
         <div>
            <input type = "text" value = {this.props.myDataProp} 
               onChange = {this.props.updateStateProp} />
            <h3>{this.props.myDataProp}</h3>
         </div>
export default App;
index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './components/App';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App /gt;);
This will produce the following result.
reactjs_form.htm
Print Page
Previous
Quiz
Next
Advertisements

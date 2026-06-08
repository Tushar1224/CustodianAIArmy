# Tutorialspoint React Props

Source: https://www.tutorialspoint.com/reactjs/reactjs_props_overview.htm

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
ReactJS - Props Overview
Previous
Quiz
Next
The main difference between state and props is that
props
are immutable. This is why the container component should define the state that can be updated and changed, while the child components should only pass data from the state using props.
Using Props
When we need immutable data in our component, we can just add props to
reactDOM.render()
function in
main.js
and use it inside our component.
App.jsx
import React from 'react';
class App extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.headerProp}</h1>
            <h2>{this.props.contentProp}</h2>
         </div>
export default App;
main.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
ReactDOM.render(<App headerProp = "Header from props..." contentProp = "Content
   from props..."/>, document.getElementById('app'));
export default App;
This will produce the following result.
Default Props
You can also set default property values directly on the component constructor instead of adding it to the
reactDom.render()
element.
App.jsx
import React from 'react';
class App extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.headerProp}</h1>
            <h2>{this.props.contentProp}</h2>
         </div>
App.defaultProps = {
   headerProp: "Header from props...",
   contentProp:"Content from props..."
export default App;
main.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
ReactDOM.render(<App/>, document.getElementById('app'));
Output is the same as before.
State and Props
The following example shows how to combine
state
and props in your app. We are setting the state in our parent component and passing it down the component tree using
props
. Inside the
render
function, we are setting
headerProp
contentProp
used in child components.
App.jsx
import React from 'react';
class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         header: "Header from props...",
         content: "Content from props..."
   render() {
      return (
         <div>
            <Header headerProp = {this.state.header}/>
            <Content contentProp = {this.state.content}/>
         </div>
class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>{this.props.headerProp}</h1>
         </div>
class Content extends React.Component {
   render() {
      return (
         <div>
            <h2>{this.props.contentProp}</h2>
         </div>
export default App;
main.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
ReactDOM.render(<App/>, document.getElementById('app'));
The result will again be the same as in the previous two examples, the only thing that is different is the source of our data, which is now originally coming from the
state
. When we want to update it, we just need to update the state, and all child components will be updated. More on this in the Events chapter.
Print Page
Previous
Quiz
Next
Advertisements

# Tutorialspoint React Router

Source: https://www.tutorialspoint.com/reactjs/reactjs_router.htm

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
ReactJS - Router
Previous
Quiz
Next
In this chapter, we will learn how to set up routing for an app.
Step 1 - Install a React Router
A simple way to install the
react-router
is to run the following code snippet in the
command prompt
window.
C:\Users\username\Desktop\reactApp>npm install react-router
Step 2 - Create Components
In this step, we will create four components. The
component will be used as a tab menu. The other three components
(Home), (About)
(Contact)
are rendered once the route has changed.
main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
class App extends React.Component {
   render() {
      return (
         <div>
            <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            </ul>
            {this.props.children}
         </div>
export default App;
class Home extends React.Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
         </div>
export default Home;
class About extends React.Component {
   render() {
      return (
         <div>
            <h1>About...</h1>
         </div>
export default About;
class Contact extends React.Component {
   render() {
      return (
         <div>
            <h1>Contact...</h1>
         </div>
export default Contact;
Step 3 - Add a Router
Now, we will add routes to the app. Instead of rendering
element like in the previous example, this time the
Router
will be rendered. We will also set components for each route.
main.js
ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "contact" component = {Contact} />
      </Route>
   </Router>
), document.getElementById('app'))
When the app is started, we will see three clickable links that can be used to change the route.
Print Page
Previous
Quiz
Next
Advertisements

# Tutorialspoint React Lifecycle

Source: https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm

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
React - Component Life Cycle
Previous
Quiz
Next
In React, Life cycle of a component represents the different stages of the component during its existence. React provides callback function to attach functionality in each and every stages of the React life cycle. Let us learn the life cycle (and the related API) of a React component in this chapter.
Life cycle API
Each React component has three distinct stages.
Mounting
− Mounting represents the rendering of the React component in the given DOM node.
Updating
− Updating represents the re-rendering of the React component in the given DOM node during state changes / updates.
Unmounting
− Unmounting represents the removal of the React component.
React provides a collection of life cycle events (or callback API) to attach functionality, which will to be executed during the various stages of the component. The visualization of life cycle and the sequence in which the life cycle events (APIs) are invoked as shown below.
constructor()
− Invoked during the initial construction phase of the React component. Used to set initial state and properties of the component.
render()
− Invoked after the construction of the component is completed. It renders the component in the virtual DOM instance. This is specified as mounting of the component in the DOM tree.
componentDidMount()
− Invoked after the initial mounting of the component in the DOM tree. It is the good place to call API endpoints and to do network requests. In our clock component, setInterval function can be set here to update the state (current date and time) for every second.
componentDidMount() { 
   this.timeFn = setInterval( () => this.setTime(), 1000); 
componentDidUpdate()
Similar to ComponentDidMount()
but invoked during the update phase. Network request can be done during this phase but only when there is difference in component's current and previous properties.
The signature of the API is as follows −
componentDidUpdate(prevProps, prevState, snapshot)
prevProps
− Previous properties of the component.
prevState
− Previous state of the component.
snapshot
− Current rendered content.
componentWillUnmount()
− Invoked after the component is unmounted from the DOM. This is the good place to clean up the object. In our clock example, we can stop updating the date and time in this phase.
componentDidMount() { 
   this.timeFn = setInterval( () => this.setTime(), 1000); 
shouldComponentUpdate()
− Invoked during the update phase. Used to specify whether the component should update or not. If it returns false, then the update will not happen.
The signature is as follows −
shouldComponentUpdate(nextProps, nextState)
nextProps
− Upcoming properties of the component
nextState
− Upcoming state of the component
getDerivedStateFromProps
− Invoked during both initial and update phase and just before the
render()
method. It returns the new state object. It is rarely used where the changes in properties results in state change. It is mostly used in animation context where the various state of the component is needed to do smooth animation.
The signature of the API is as follows −
static getDerivedStateFromProps(props, state)
props
− current properties of the component
state
− Current state of the component
This is a static method and does not have access to
this
object.
getSnapshotBeforeUpdate
− Invoked just before the rendered content is commited to DOM tree. It is mainly used to get some information about the new content. The data returned by this method will be passed to
ComponentDidUpdate()
method. For example, it is used to maintain the user's scroll position in the newly generated content. It returns user's scroll position. This scroll position is used by
componentDidUpdate()
to set the scroll position of the output in the actual DOM.
The signature of the API is as follows −
getSnapshotBeforeUpdate(prevProps, prevState)
prevProps
− Previous properties of the component.
prevState
− Previous state of the component.
Working example of life cycle API
Let us use life cycle api in our
react-clock-app
application.
Step 1
− Open
react-clock-hook-app
in your favorite editor.
Open
src/components/Clock.js
file and start editing.
Step 2
− Remove the
setInterval()
method from the constructor.
constructor(props) { 
   super(props); 
   this.state = { 
      date: new Date() 
Step 3
− Add
componentDidMount()
method and call
setInterval()
to update the date and time every second. Also, store the reference to stop updating the date and time later.
componentDidMount() { 
   this.setTimeRef = setInterval(() => this.setTime(), 1000); 
componentWillUnmount()
method and call clearInterval() to stop the date and time update calls.
componentWillUnmount() { 
   clearInterval(this.setTimeRef) 
Now, we have updated the Clock component and the complete source code of the component is given below −
import React from 'react';
class Clock extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         date: new Date()
   componentDidMount() {
      this.setTimeRef = setInterval(() => this.setTime(), 1000); 
   componentWillUnmount() {
      clearInterval(this.setTimeRef)
   setTime() {
      this.setState((state, props) => {
         console.log(state.date);
         return {
            date: new Date()
   render() {
      return (
         <div>
            <p>The current time is {this.state.date.toString()}</p>
         </div>
export default Clock;
Next, open index.js and use
setTimeout
to remove the clock from the DOM after 5 seconds.
import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/Clock';
ReactDOM.render(
   <React.StrictMode>
      <Clock />
   </React.StrictMode>,
   document.getElementById('root')
setTimeout(() => {
   ReactDOM.render(
      <React.StrictMode>
         <div><p>Clock is removed from the DOM.</p></div>
      </React.StrictMode>,
      document.getElementById('root')
}, 5000);
Serve the application using npm command.
npm start
Open the browser and enter
http://localhost:3000
in the address bar and press enter.
The clock will be shown for 5 second and then, it will be removed from the DOM. By checking the console log, we can found that the cleanup code is properly executed.
Life cycle API in Expense manager app
Let us add life cycle api in the expense manager and log it whenever the api is called. This will give insight about the life cycle of the component.
Step 1
− Open
expense-manager
application in your favorite editor.
Next, update ExpenseEntryItemList component with below methods.
componentDidMount() {
   console.log("ExpenseEntryItemList :: Initialize :: componentDidMount :: Component mounted");
shouldComponentUpdate(nextProps, nextState) {
   console.log("ExpenseEntryItemList :: Update :: shouldComponentUpdate invoked :: Before update");
   return true;
static getDerivedStateFromProps(props, state) {
   console.log("ExpenseEntryItemList :: Initialize / Update :: getDerivedStateFromProps :: Before update");
   return null;
getSnapshotBeforeUpdate(prevProps, prevState) {
   console.log("ExpenseEntryItemList :: Update :: getSnapshotBeforeUpdate :: Before update");
   return null;
componentDidUpdate(prevProps, prevState, snapshot) {
   console.log("ExpenseEntryItemList :: Update :: componentDidUpdate :: Component updated");
componentWillUnmount() {
   console.log("ExpenseEntryItemList :: Remove :: componentWillUnmount :: Component unmounted");
Step 2
− Serve the application using npm command.
npm start
Open the browser and enter
http://localhost:3000
in the address bar and press enter.
Next, check the console log. It will show the life cycle api during initialization phase as shown below.
ExpenseEntryItemList :: Initialize / Update :: getDerivedStateFromProps :: Before update 
ExpenseEntryItemList :: Initialize :: componentDidMount :: Component mounted
Remove an item and then, check the console log. It will show the life cycle api during the update phase as shown below.
ExpenseEntryItemList :: Initialize / Update :: getDerivedStateFromProps :: Before update 
ExpenseEntryItemList.js:109 ExpenseEntryItemList :: Update :: shouldComponentUpdate invoked :: Before update 
ExpenseEntryItemList.js:121 ExpenseEntryItemList :: Update :: getSnapshotBeforeUpdate :: Before update 
ExpenseEntryItemList.js:127 ExpenseEntryItemList :: Update :: componentDidUpdate :: Component updated
Finally, remove all the life cycle api as it may hinder the application performance. Life cycle api should be used only if the situation demands.
Print Page
Previous
Quiz
Next
Advertisements

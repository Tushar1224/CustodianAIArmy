# Tutorialspoint React Events

Source: https://www.tutorialspoint.com/reactjs/reactjs_events.htm

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
React - Event Management
Previous
Quiz
Next
Events are just some actions performed by a user to interact with any application. They can be the smallest of actions, like hovering a mouse pointer on an element that triggers a drop-down menu, resizing an application window, or dragging and dropping elements to upload them etc. Events in React are divided into three categories:
Mouse Events
− onClick, onDrag, onDoubleClick
Keyboard Events
− onKeyDown, onKeyPress, onKeyUp
Focus Events
− onFocus, onBlur
For each of these events, JavaScript provides responses. So, every time an event is performed by the user, it usually requires some type of reaction from the application; and these reactions are defined as some functions or blocks of code, called
Event Handlers
. This entire process of working with events using Event Handlers is known as
Event Management
Event Management in ReactJS
Event management is one of the important features in a web application. It enables the user to interact with the application. React supports all events available in a web application. React event handling is very similar to DOM events with little changes. Following are some of the common events one can observe in React-based websites −
Clicking on a component.
Scrolling the current page.
Hovering over elements of the current page.
Submitting a form.
Redirecting to another webpage.
Loading images.
Synthetic React Events
In JavaScript, when an event is specified, you will be dealing with a react event type called a
synthetic event
instead of regular DOM events. SyntheticEvent is a simple cross-browser wrapper for native event instances making the events work identically across all browsers. All event handlers must be passed as instances of this wrapper. However, it is expensive in terms of CPU resources as every synthetic event created needs to be garbage-collected. Every synthetic event object has the following attributes:
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
Since synthetic events use a lot of resources, they are usually reused and all its properties will be nullified after invoking the event callback to optimize their performance in the browser. SyntheticEvent has the same interface as the native event. And as the synthetic events are authorized by the document node, native events are triggered first followed by the synthetic events.
Adding an Event
As we have already seen, React has the same events as HTML: click, change, mouseover etc. However, the React events are defined with a camelCase and the reaction is written inside the curly braces instead. The syntax of adding an event differs in a functional component and class component.
Following is the syntax to add an onClick event in a functional component of React:
onClick = {action to be performed}
Following is the syntax to add an onClick event in a class component of React:
onClick = {this.action_to_be_performed}
Handling an Event
Let us now learn how to handle these events in a React application with the help of the following step-by-step process.
Define an event handler method to handle the given event.
log() { 
   console.log("Event is fired"); 
React provides an alternative syntax using lambda function to define event handler. The lambda syntax is −
log = () => { 
   console.log("Event is fired"); 
Passing Arguments to Event Handler
There are two methods available to pass arguments to an Event Handler:
Arrow Method
Bind Method
Arrow Method
If you want to know the target of the event, then add an argument
in the handler method. React will send the event target details to the handler method.
log(e) { 
   console.log("Event is fired"); 
   console.log(e.target); 
The alternative lambda syntax is −
log = (e) => { 
   console.log("Event is fired"); 
   console.log(e.target); 
If you want to send extra details during an event, then add the extra details as initial argument and then add argument
for event target.
log(extra, e) { 
   console.log("Event is fired"); 
   console.log(e.target); 
   console.log(extra); 
   console.log(this); 
The alternative lambda syntax is as follows −
log = (extra, e) => { 
   console.log("Event is fired"); 
   console.log(e.target); 
   console.log(extra); 
   console.log(this); 
Bind Method
We can also bind the event handler method in the constructor of the component. This will ensure the availability of
this
in the event handler method.
constructor(props) { 
   super(props); 
   this.logContent = this.logContent.bind(this); 
If the event handler is defined in alternate lambda syntax, then the binding is not needed.
this
keyword will be automatically bound to the event handler method.
Set the event handler method for the specific event as specified below −
<div onClick={this.log}> ... </div>
To set extra arguments, bind the event handler method and then pass the extra information as second argument.
<div onClick={this.log.bind(this, extra)}> ... </div>
The alternate lambda syntax is as follows −
<div onClick={this.log(extra, e)}> ... </div>
Here,
Create a event-aware component
Introduce events in Expense manager app
Print Page
Previous
Quiz
Next
Advertisements

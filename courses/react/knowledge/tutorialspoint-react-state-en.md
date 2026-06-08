# Tutorialspoint React State

Source: https://www.tutorialspoint.com/reactjs/reactjs_state.htm

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
React - State
Previous
Quiz
Next
State management is one of the important and unavoidable features of any dynamic application. React provides a simple and flexible API to support state management in a React component. Let us understand how to maintain state in React application in this chapter.
What is state?
State
represents the value of a dynamic properties of a React component at a given instance. React provides a dynamic data store for each component. The internal data represents the state of a React component and can be accessed using this.state member variable of the component. Whenever the state of the component is changed, the component will re-render itself by calling the
render()
method along with the new state.
A simple example to better understand the state management is to analyse a real-time clock component. The clock component primary job is to show the date and time of a location at the given instance. As the current time will change every second, the clock component should maintain the current date and time in it's state. As the state of the clock component changes every second, the clock's
render()
method will be called every second and the
render()
method show the current time using it's current state.
The simple representation of the state is as follows −
   date: '2020-10-10 10:10:10' 
Let us create a new
Clock
component in the
Stateless Component
chapter.
Defining a State
State in React can be used with functional and class components. To work with state in a component, there must exist a starting point, i.e. initial state. This initial state of a component must be defined in the constructor of the component's class. Following is the syntax to define a state of any Class −
state = {attribute: "value"};
Let us look at a sample code for a class component with an initial state −
Class SampleClass extends React.Component
    constructor(props)
        super(props);
        this.state = { name : "John Doe" };
Creating a state Object
React components have a built-in state object. The state object is used to store all the property values that belong to the component in which this state is defined. When the state object changes, the component re-renders.
Let us look at a sample code to demonstrate how to create a state object in React.
Class BookClass extends React.Component
   constructor(props)
      super(props);
      this.state = { name : "John Doe" };
   render() {
      return (
      <div>
         <h1>Name of the Author</h1>
      </div>
To understand state management better, check the following chapters.
State management API
State management using React Hooks
Component Life cycle
Component life cycle using React Hooks
Layout in component
Pagination
Material UI
Print Page
Previous
Quiz
Next
Advertisements

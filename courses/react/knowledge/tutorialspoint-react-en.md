# tutorialspoint-react

Source: https://www.tutorialspoint.com/reactjs/index.htm

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
React Tutorial
What is React?
Who should learn React?
Why Learn React?
React Example Code
Features of React
Prerequisites to Learn React
Getting Started with React
React Jobs and Salary
Frequently Asked Questions on React
This React tutorial includes all of the most recent updates up to version 19.2.0 and covers every topic, from fundamental to advanced. React is the most recommended JavScript library to learn now because of its core foundation of features and large community.
What is React?
React is an open-source JavaScript library for building dynamic and interactive user interfaces(UIs). React is developed and released by
Facebook
. Facebook is continuously working on the React library and enhancing it by fixing bugs and introducing new features.
Who should learn React?
This tutorial is prepared for beginners to working professionals who are aspiring to make a career in the field of developing front-end web applications. This tutorial is intended to make you comfortable in getting started with the React concepts with examples.
Why Learn React?
There are several reasons to learn React, as per the demand in the development industry of React developers and features React has to offer that can not be replaced by other frameworks or libraries.
Ease of Use:
React does not require writing lengthy codes as it supports the Components concept so a small amount of code can be created and can be used in multiple places.
Multiple Module Support:
There are so many modules in React that can be used to make your development more scalable, and manageable at a fast pace.
Multiple Apps Development:
By using React knowledge we can create Web Pages, Web Apps, Mobile Apps, and VR Apps. There are a lot of websites that are using React like Airbnb, Cloudflare, Facebook, Instagram, etc.
Easy Migration:
Because of its easy learning curve migration from other technologies became so easy. There are tons of resources to learn React from basics to advanced.
Large Community:
React has one of the largest communities to help you when you are in trouble debugging your codes or get stuck learning new things.
React Example Code
As this is sample code without the environment setup this code will not work to set up the React environment check
React Installation
article.
import React from 'react';
import ReactDOM from 'react-dom/client';
function Greeting(props) {
   return <h1>Welcome to TutorialsPoint</h1>
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Greeting />);
Features of React
React plays an essential role in the front-end ecosystem. There are so many important features of React as it is the most demanding library for front-end development.
Virtual DOM:
Virtual DOM is a special kind of DOM that is used in React. Virtual DOM represents the real DOM of the current HTML document. Whenever there is a change in the HTML document, React checks the updated virtual DOM with the previous state of the Virtual DOM and updates only the difference in th actual/real DOM.
Reusable Components:
Components need to be written a single time and can be used multiple times by just calling that component where we require that component.
One-Way Data Binding:
One-way data binding prevents the data in a component from flowing backward. A component can pass the data to its child component only. This will simplify the data handling and reduce the complexity.
To know more about the features of React please check
React Features
article.
Prerequisites to Learn React
Before proceeding with this tutorial, we assume that the readers have the basic knowledge in
HTML
JavaScript
concepts.
Getting Started with React
To get started with React we need to clear our fundamentals first before proceeding into complex topics. We will recommend you to code along with each article you read this will help you to understand the concepts. If you can create a project along with your learning that will be more helpful.
Basics of React
React Introduction
React Installation
React Features
React Architecture
React JSX
React Application
React Fragments
React Conditional Rendering
React CLI Commands
React Components
Component
is the heart of React, it is the building block of a React application. A React component represents a small chunk of user interface in a webpage.
Components
React - Use Component
React Nested Components
React Component Collection
React Component Using Properties
React Component Life Cycle
React Event-Aware Component
React Stateless Component
React Layout Component
React States
State represents the value of the dynamic properties of a React component at a given instance. React provides a dynamic data store for each component.
React State Management
React State Management API
React State Management through Hooks
React Hooks
Hooks are plain JavaScript functions having access to state and lifecycle events of the component in which it is used. In general, hooks start with the use keyword.
React Introduction to Hooks
React useState Hook
React useEffect Hook
React useContext Hook
React useRef Hook
React useReducer Hook
React useCallback Hook
React useMemo Hook
React Custom Hooks
React Props
Props are used to pass data between components. In real-world projects we need the components to interact with each other which is not possible with the states as it is private to that particular component.
React Props
React Props Validation
Other Important Topics of React
There are a few more things that you need to know about React as it is updating itself at a fast pace so you have to keep up with the new features as well. You can check our recently React published articles on this
link
. These articles are not part of our tutorial.
React Pagination
React Lists
React Keys
React Router
React Redux
React Animation
React Jobs and Salary
React is popular front-end library in these days. There are a lot compnaies that hire React developers like facebook, instagram, airbnb, etc.
React Developer - Salary ranges in between  1.5 Lakhs to  16.0 Lakhs with an average annual salary of  7.3 Lakhs
Frequently Asked Questions on React
It is a front-end focused JavaScript library mainly used to build single or multi-page web application interfaces.
There is no difference between React and React both are the same.
React's data flow is much easier than Angular, as it follows one-way data binding as well React also provides some exceptional features that no libraries provide. Because of that, the community of React is larger, so you can get help immediately.
As we said at the beginning of this article, this course is for beginners as well as for advanced.
React.js Articles
You can explore a set of React.js articles at
React.js Articles
Previous
Next
Advertisements

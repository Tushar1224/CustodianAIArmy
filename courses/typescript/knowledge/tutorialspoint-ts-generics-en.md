# Tutorialspoint Ts Generics

Source: https://www.tutorialspoint.com/typescript/typescript_generics.htm

TypeScript - Home
TypeScript - Roadmap
TypeScript - Overview
TypeScript - Environment Setup
TypeScript - Basic Syntax
TypeScript vs. JavaScript
TypeScript - Features
TypeScript - Variables
TypeScript - let & const
TypeScript - Operators
TypeScript - Types
TypeScript - Type Annotations
TypeScript - Type Inference
TypeScript - Numbers
TypeScript - Strings
TypeScript - Boolean
TypeScript - Arrays
TypeScript - Tuples
TypeScript - Enums
TypeScript - Any
TypeScript - Never
TypeScript - Union
TypeScript - Literal Types
TypeScript - Symbols
TypeScript - null vs. undefined
TypeScript - Type Aliases
TypeScript Control Flow
TypeScript - Decision Making
TypeScript - If Statement
TypeScript - If Else Statement
TypeScript - Nested If Statements
TypeScript - Switch Statement
TypeScript - Loops
TypeScript - For Loop
TypeScript - While Loop
TypeScript - Do While Loop
TypeScript Functions
TypeScript - Functions
TypeScript - Function Types
TypeScript - Optional Parameters
TypeScript - Default Parameters
TypeScript - Anonymous Functions
TypeScript - Function Constructor
TypeScript - Rest Parameter
TypeScript - Parameter Destructuring
TypeScript - Arrow Functions
TypeScript Interfaces
TypeScript - Interfaces
TypeScript - Extending Interfaces
TypeScript Classes and Objects
TypeScript - Classes
TypeScript - Objects
TypeScript - Access Modifiers
TypeScript - Readonly Properties
TypeScript - Inheritance
TypeScript - Static Methods and Properties
TypeScript - Abstract Classes
TypeScript - Accessors
TypeScript - Duck-Typing
TypeScript Advanced Types
TypeScript - Intersection Types
TypeScript - Type Guards
TypeScript - Type Assertions
TypeScript Type Manipulation
TypeScript - Creating Types from Types
TypeScript - Keyof Type Operator
TypeScript - Typeof Type Operator
TypeScript - Indexed Access Types
TypeScript - Conditional Types
TypeScript - Mapped Types
TypeScript - Template Literal Types
TypeScript Generics
TypeScript - Generics
TypeScript - Generic Constraints
TypeScript - Generic Interfaces
TypeScript - Generic Classes
TypeScript Miscellaneous
TypeScript - Triple-Slash Directives
TypeScript - Namespaces
TypeScript - Modules
TypeScript - Ambients
TypeScript - Decorators
TypeScript - Type Compatibility
TypeScript - Date Object
TypeScript - Iterators and Generators
TypeScript - Mixins
TypeScript - Utility Types
TypeScript - Boxing and Unboxing
TypeScript - tsconfig.json
From JavaScript To TypeScript
TypeScript Useful Resources
TypeScript - Quick Guide
TypeScript - Cheatsheet
TypeScript - Useful Resources
TypeScript - Discussion
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
TypeScript - Generics
Previous
Quiz
Next
Generics are a powerful feature in TypeScript that allow you to write reusable code that can work with different types of data. They act like placeholders that can be filled with specific data types when you use the generic code. This improves code flexibility and maintainability.
Problem Examples
Before going deep into TypeScript generics, let's understand the problem examples where you need to apply generics.
Let's start with the example below, where you want to log the value of the variable passed as a parameter.
Example
In the code below, we have defined the
printVar()
function which takes the number value as a parameter and logs the value in the console. Next, we invoke the function by passing 10 as an argument.
function printVar(val: number) {
    console.log(val); // Prints the value of val
printVar(10); // Invokes the function with a number
On compiling, it will generate the following JavaScript code.
function printVar(val) {
    console.log(val); // Prints the value of val
printVar(10); // Invokes the function with a number
Output
Its output is as follows
Now, let's suppose you want to extend the use case of the
printVar()
function to print the value of other types of variables like string, boolean, etc. One way of doing that is as shown in the example below.
Example
In the code below, the
printVar()
function can accept the arguments of number, string, or boolean type.
function printVar(val: number | string | boolean) {
    console.log(val); // Prints the value of val
printVar(true); // Invokes the function with a boolean value
On compiling, it will generate the following JavaScript code.
function printVar(val) {
    console.log(val); // Prints the value of val
printVar(true); // Invokes the function with a boolean value
Output
The output is as follows
true
What if you want to print the array or object value? You need to extend the types of the 'val' parameter, and it makes the code complex to read.
Another way to use the parameters of 'any' data type is as shown in the example below.
Example
In the code below, the type of the 'val' parameter is
. So, it can accept any type of value as an argument.
function printVar(val: any) {
    console.log(val); // Prints the value of val
printVar("Hello world!"); // Invokes the function with a boolean value
On compiling, it will generate the following JavaScript code
function printVar(val) {
    console.log(val); // Prints the value of val
printVar("Hello world!"); // Invokes the function with a boolean value
Output
Its output is as follows
Hello world!
The problem with the above code is that you won't have a reference to the data type inside the function. Whether you pass a string, number, boolean, array, etc. as a function argument, you will get the 'any' type of the variable in the function.
Here, generic functions come into the picture.
TypeScript Generics
In TypeScript, generics is a concept that allows to creation of reusable components like functions, classes, interfaces, etc. It creates a function, classes, etc. which can work with multiple data types instead of the single data type. In short, it allows developers to create programs that can work with multiple data types and are scalable in the long term.
Syntax
Users can follow the syntax below to use the generic variables with functions in TypeScript.
function printVar<T>(val: T) {
    // execute the code
printVar(val);
Developers can use the type variable in the angular bracket(<>) after the function name.
After that, you can use the type variable
as a type of the parameters.
Here, developers can use any valid identifier instead of 'T'.
After that, you can call the function with the value of any data type, and the function automatically captures the data type of the variable.
Example
In the example below, the
printVar()
function is a generic function, which takes the value of any data type as an argument, and prints it.
After that, we have invoked the function with array, object, and boolean value. In the output, users can observe that it prints the value of different types of variables without any error.
function printVar<T>(val: T) { // T is a generic type
    console.log("data: ", val);
let arr = [1, 2, 3];
let obj = { name: "John", age: 25 };
printVar(arr); // Val is array
printVar(obj); // Val is Object
printVar(true); // Val is boolean
On compiling, it will generate the following JavaScript code.
function printVar(val) {
    console.log("data: ", val);
let arr = [1, 2, 3];
let obj = { name: "John", age: 25 };
printVar(arr); // Val is array
printVar(obj); // Val is Object
printVar(true); // Val is boolean
Output
The output of the above example code is as follows
data:  [ 1, 2, 3 ]
data:  { name: 'John', age: 25 }
data:  true
Example
In this code, we
printVar()
function is a generic function, which takes the type of the variable value passed as a parameter. While invoking the function, we have passed the value of different data types, and users can observe the type of each variable in the output.
function printVar<T>(val: T) { // T is a generic type
    console.log("data: ", typeof val);
printVar(2); // Val is number
printVar("Hello"); // Val is string
printVar(true); // Val is boolean
On compiling, it will generate the following JavaScript code.
function printVar(val) {
    console.log("data: ", typeof val);
printVar(2); // Val is number
printVar("Hello"); // Val is string
printVar(true); // Val is boolean
Output
The output of the above example code is as follows
data:  number
data:  string
data:  boolean
Example
In the code below, the
concatenate()
function takes two parameters of type
, respectively. It uses the spread operator to concatenate the value of the 'first' and 'second' parameters.
Next, we call the function to concatenate two strings and arrays. In the output, we can observe that the
concatenate()
function executes without any error and prints the final output in the console.
function concatenate<T, U>(first: T, second: U): T & U {
    return {...first, ...second};
// Example usage with strings
const resultString = concatenate("Hello, ", "world!");
console.log(resultString); // Output: Hello, world!
// Example usage with arrays
const resultArray = concatenate([1, 2, 3], [4, 5, 6]);
console.log(resultArray); // Output: [1, 2, 3, 4, 5, 6]
On compiling, it will generate the following JavaScript code.
function concatenate(first, second) {
    return Object.assign(Object.assign({}, first), second);
// Example usage with strings
const resultString = concatenate("Hello, ", "world!");
console.log(resultString); // Output: Hello, world!
// Example usage with arrays
const resultArray = concatenate([1, 2, 3], [4, 5, 6]);
console.log(resultArray); // Output: [1, 2, 3, 4, 5, 6]
Output
The output of the above example code is as follows
  '0': 'w',
  '1': 'o',
  '2': 'r',
  '3': 'l',
  '4': 'd',
  '5': '!',
  '6': ' '
{ '0': 4, '1': 5, '2': 6 }
Benefits of Generics
Here are some benefits of using generics in TypeScript.
Type Safety:
Generics enforce type consistency, reducing runtime errors by catching mistakes at compile time.
Code Reusability:
Developers can define a single generic function, class, or interface that works with different data types. It reduces the code duplication.
Improved Readability:
By using Generics, developers can write cleaner and easy-to-read code.
Enhanced Performance:
You can increase the performance of the application by avoiding unnecessary type casting and checks via using generics.
Print Page
Previous
Quiz
Next
Advertisements

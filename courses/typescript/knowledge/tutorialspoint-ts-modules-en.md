# Tutorialspoint Ts Modules

Source: https://www.tutorialspoint.com/typescript/typescript_modules.htm

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
TypeScript - Modules
Previous
Quiz
Next
A module is designed with the idea to organize code written in TypeScript. Modules are broadly divided into −
Internal Modules
External Modules
Internal Module
Internal modules came in earlier version of Typescript. This was used to logically group classes, interfaces, functions into one unit and can be exported in another module. This logical grouping is named namespace in latest version of TypeScript. So internal modules are obsolete instead we can use namespace. Internal modules are still supported, but its recommended to use namespace over internal modules.
Internal Module Syntax (Old)
module TutorialPoint { 
   export function add(x, y) {  
      console.log(x+y); 
Namespace Syntax (New)
namespace TutorialPoint { 
   export function add(x, y) { console.log(x + y);} 
JavaScript generated in both cases are same
var TutorialPoint; 
(function (TutorialPoint) { 
   function add(x, y) { 
      console.log(x + y); 
   TutorialPoint.add = add; 
})(TutorialPoint || (TutorialPoint = {}));
External Module
External modules in TypeScript exists to specify and load dependencies between multiple external
files. If there is only one
file used, then external modules are not relevant. Traditionally dependency management between JavaScript files was done using browser script tags (<script></script>). But thats not extendable, as its very linear while loading modules. That means instead of loading files one after other there is no asynchronous option to load modules. When you are programming js for the server for example NodeJs you dont even have script tags.
There are two scenarios for loading dependents
files from a single main JavaScript file.
Client Side - RequireJs
Server Side - NodeJs
Selecting a Module Loader
To support loading external JavaScript files, we need a module loader. This will be another
library. For browser the most common library used is RequieJS. This is an implementation of AMD (Asynchronous Module Definition) specification. Instead of loading files one after the other, AMD can load them all separately, even when they are dependent on each other.
Defining External Module
When defining external module in TypeScript targeting CommonJS or AMD, each file is considered as a module. So its optional to use internal module with in external module.
If you are migrating TypeScript from AMD to CommonJs module systems, then there is no additional work needed. The only thing you need to change is just the compiler flag Unlike in JavaScript there is an overhead in migrating from CommonJs to AMD or vice versa.
The syntax for declaring an external module is using keyword export and import.
Syntax
//FileName : SomeInterface.ts 
export interface SomeInterface { 
   //code declarations 
To use the declared module in another file, an import keyword is used as given below. The file name is only specified no extension used.
import someInterfaceRef = require(./SomeInterface);
Example
Lets understand this using an example.
// IShape.ts 
export interface IShape { 
   draw(); 
// Circle.ts 
import shape = require("./IShape"); 
export class Circle implements shape.IShape { 
   public draw() { 
      console.log("Cirlce is drawn (external module)"); 
// Triangle.ts 
import shape = require("./IShape"); 
export class Triangle implements shape.IShape { 
   public draw() { 
      console.log("Triangle is drawn (external module)"); 
// TestShape.ts 
import shape = require("./IShape"); 
import circle = require("./Circle"); 
import triangle = require("./Triangle");  
function drawAllShapes(shapeToDraw: shape.IShape) {
   shapeToDraw.draw(); 
drawAllShapes(new circle.Circle()); 
drawAllShapes(new triangle.Triangle());
The command to compile the main TypeScript file for AMD systems is −
tsc --module amd TestShape.ts
On compiling, it will generate following JavaScript code for AMD.
File:IShape.js
//Generated by typescript 1.8.10
define(["require", "exports"], function (require, exports) {
File:Circle.js
//Generated by typescript 1.8.10
define(["require", "exports"], function (require, exports) {
   var Circle = (function () {
      function Circle() {
      Circle.prototype.draw = function () {
         console.log("Cirlce is drawn (external module)");
      return Circle;
   })();
   exports.Circle = Circle;
File:Triangle.js
//Generated by typescript 1.8.10
define(["require", "exports"], function (require, exports) {
   var Triangle = (function () {
      function Triangle() {
      Triangle.prototype.draw = function () {
         console.log("Triangle is drawn (external module)");
      return Triangle;
   })();
   exports.Triangle = Triangle;
File:TestShape.js
//Generated by typescript 1.8.10
define(["require", "exports", "./Circle", "./Triangle"], 
   function (require, exports, circle, triangle) {
   function drawAllShapes(shapeToDraw) {
      shapeToDraw.draw();
   drawAllShapes(new circle.Circle());
   drawAllShapes(new triangle.Triangle());
The command to compile the main TypeScript file for
Commonjs
systems is
tsc --module commonjs TestShape.ts
On compiling, it will generate following JavaScript code for
Commonjs
File:Circle.js
//Generated by typescript 1.8.10
var Circle = (function () {
   function Circle() {
   Circle.prototype.draw = function () {
      console.log("Cirlce is drawn");
   return Circle;
})();
exports.Circle = Circle;
File:Triangle.js
//Generated by typescript 1.8.10
var Triangle = (function () {
   function Triangle() {
   Triangle.prototype.draw = function () {
      console.log("Triangle is drawn (external module)");
   return Triangle;
})();
exports.Triangle = Triangle;
File:TestShape.js
//Generated by typescript 1.8.10
var circle = require("./Circle");
var triangle = require("./Triangle");
function drawAllShapes(shapeToDraw) {
   shapeToDraw.draw();
drawAllShapes(new circle.Circle());
drawAllShapes(new triangle.Triangle());
Output
Cirlce is drawn (external module)
Triangle is drawn (external module)
Print Page
Previous
Quiz
Next
Advertisements

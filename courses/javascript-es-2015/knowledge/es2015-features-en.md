# JavaScript 2015 (ES6)

## JS Tutorial

## JS Advanced

# Javascript 2015 (ES6)

## ECMAScript 2015

The second major revision to JavaScript.

ECMAScript 2015 is also known as ES6.

## New Features in JavaScript 2015 (ES6)

## Math Features

## Number Features

## Browser Support

JavaScript 2015is supported in all modern browsers sinceJune 2017:

ES6 is not supported in Internet Explorer.

## JavaScript let

Theletkeyword allows you to declare a variable with 
block scope.

### Example

Read more aboutletin the chapter:JavaScript Let.

## JavaScript const

Theconstkeyword allows you to declare a constant (a 
JavaScript variable with a constant value).

Constants are similar to let variables, except that the value cannot be changed.

### Example

Read more aboutconstin the chapter:JavaScript Const.

## Arrow Functions

Arrow functions is a short syntax for writingfunction expressions.

You don't need thefunctionkeyword, thereturnkeyword, or thecurly brackets.

### Before Arrow:

Function to compute the product of a and b

Try it Yourself »

### With Arrow

Try it Yourself »

Arrow functions do not have their ownthis.
They are not well suited for definingobject methods.

Arrow functions are not hoisted. They must be definedbeforethey are used.

You can only omit thereturnkeyword and thecurly bracketsif the function is a single
statement. Because of this, it might be a good habit to always keep them:

### Example

Learn more about Arrow Functions in the chapter:JavaScript Arrow Function.

## Object Destructuring

Destructuring assignment makes it easy to assign array values and object properties to variables.

### Example

When destructuring an object, you must use the same name for the variables
as the corresponding object keys (names).

The order of the keys (names) does not matter.

## Array Destructuring

Destructuring assignment makes it easy to assign array values and object properties to variables.

### Example

## The Spread (...) Operator

The...operator spreads an array or iterable into individual elements.ExampleThe...operator can pass arguments to a function:const numbers = [23,55,21,87,56];let minValue = Math.min(...numbers);let maxValue = Math.max(...numbers);Try it Yourself »ExampleThe...operator can be used to join arrays:const arr1 = [1, 2, 3];const arr2 = [4, 5, 6];const arr3 = [...arr1, ...arr2];Try it Yourself »Exampleconst q1 = ["Jan", "Feb", "Mar"];const q2 = ["Apr", "May", "Jun"];const q3 = ["Jul", "Aug", "Sep"];const q4 = ["Oct", "Nov", "Dec"];const year = [...q1, ...q2, ...q3, ...q4];Try it Yourself »The For/Of LoopThe JavaScriptfor/ofstatement loops 
through the values of iterable objects.for/oflets you loop over data structures 
that are iterable such as Arrays, Strings, Maps, NodeLists, and more.Thefor/ofloop has the following syntax:for (variableofiterable) {//code block to be executed}variable- For every iteration the value of the next property is 
assigned to the variable.Variablecan be declared withconst,let, orvar.iterable- An object that has iterable properties.Looping over an ArrayExampleconst cars = ["BMW", "Volvo", "Mini"];let text = "";for (let x of cars) {text += x + " ";}Try it Yourself »Looping over a StringExamplelet language = "JavaScript";let text = "";for (let x of language) {text += x + " ";}Try it Yourself »Learn more in the chapter:JavaScript Loop For/In/Of.JavaScript MapsA Map is an object that stores key-value pairs, similar to objects, but with differences:Keys can be of any data type (objects, functions, primitive values),
unlike plain objects where keys are strings.Maintains the original insertion order of keys.Being able to use an Object as a key is an important Map feature.Exampleconst fruits = new Map([["apples", 500],["bananas", 300],["oranges", 200]]);Try it Yourself »Learn more about Map objects, and the difference between a Map and an Array, in the the chapter:JavaScript Maps.JavaScript SetsA Set is an object that stores unique values of any type (primitive values, functions, objects).A Set can only contain unique values. An attempt to add a duplicate value will be ignored.Example// Create a Setconst letters = new Set();// Add some values to the Setletters.add("a");letters.add("b");letters.add("c");Try it Yourself »Learn more about Set objects in the the chapter:JavaScript Sets.JavaScript ClassesJavaScript Classes are templates for JavaScript Objects.Use the keywordclassto create a class.Always add a method namedconstructor():Syntaxclass ClassName {constructor() { ... }}Exampleclass Car {constructor(name, year) {this.name = name;this.year = year;}}The example above creates a class named "Car".The class has two initial properties: "name" and "year".A JavaScript class isnotan object.It is atemplatefor JavaScript objects.Using a ClassWhen you have a class, you can use the class to create objects:Exampleconst myCar1 = new Car("Ford", 2014);const myCar2 = new Car("Audi", 2019);Try it Yourself »Learn more about classes in the the chapter:JavaScript Classes.JavaScript PromisesA JavaScript Promise is an object representing the completion or failure of an asynchronous
operation and its values.It is a placeholder for a value that may not yet be available,
providing a structured way to handle asynchronous code.Promise Syntaxconst myPromise = new Promise(function(myResolve, myReject) {// "Producing Code" (May take some time)myResolve(); // when successfulmyReject();  // when error});// "Consuming Code" (Must wait for a fulfilled Promise).myPromise.then(function(value) { /* code if successful */ },function(error) { /* code if some error */ });Example Using a Promiseconst myPromise = new Promise(function(myResolve, myReject) {setTimeout(function() { myResolve("I love You !!"); }, 3000);});myPromise.then(function(value) {document.getElementById("demo").innerHTML = value;});Try it Yourself »Learn more about Promises in the the chapter:JavaScript Promises.The Symbol TypeA JavaScript Symbol is a primitive data type just like Number, String, or Boolean.It represents a unique "hidden" identifier that no other code can accidentally access.For instance, if different coders want to add a person.id property to a person object belonging to a third-party code,
they could mix each others values.Using Symbol() to create a unique identifiers, solves this problem:Exampleconst person = {firstName: "John",lastName: "Doe",age: 50,eyeColor: "blue"};let id = Symbol('id');person[id] = 140353;// Now person[id] = 140353// but person.id is still undefinedTry it Yourself »Symbols are always unique.If you create two symbols with the same description they will have different values:Symbol("id") == Symbol("id"); // falseDefault Parameter ValuesES6 allows function parameters to have default values.Examplefunction myFunction(x, y = 10) {// y is 10 if not passed or undefinedreturn x + y;}myFunction(5); // will return 15Try it Yourself »Function Rest ParameterThe rest parameter (...) allows a function to treat an indefinite number of arguments as an array:Examplefunction sum(...args) {let sum = 0;for (let arg of args) sum += arg;return sum;}let x = sum(4, 9, 16, 25, 29, 100, 66, 77);Try it Yourself »String.includes()Theincludes()method returnstrueif a string contains a specified value,
otherwisefalse:Examplelet text = "Hello world, welcome to the universe.";text.includes("world")    // Returns trueTry it Yourself »String.startsWith()ThestartsWith()method returnstrueif a string begins with a specified value, otherwisefalse:Examplelet text = "Hello world, welcome to the universe.";text.startsWith("Hello")   // Returns trueTry it Yourself »String.endsWith()TheendsWith()method returnstrueif a string ends with a specified value, otherwisefalse:Examplevar text = "John Doe";text.endsWith("Doe")    // Returns trueTry it Yourself »Array entries()ExampleCreate an Array Iterator, and then iterate over the key/value pairs:const fruits = ["Banana", "Orange", "Apple", "Mango"];const f = fruits.entries();for (let x of f) {document.getElementById("demo").innerHTML += x;}Try it Yourself »Theentries()method returns an Array Iterator object with key/value pairs:[0, "Banana"][1, "Orange"][2, "Apple"][3, "Mango"]Theentries()method does not change the original array.Array.from()TheArray.from()method returns an Array object from any object with a length 
property or any iterable object.ExampleCreate an Array from a String:Array.from("ABCDEFG")   // Returns [A,B,C,D,E,F,G]Try it Yourself »Array keys()Thekeys()method returns an Array Iterator object with the keys of an array.ExampleCreate an Array Iterator object, containing the keys of the array:const fruits = ["Banana", "Orange", "Apple", "Mango"];const keys = fruits.keys();let text = "";for (let x of keys) {text += x + "<br>";}Try it Yourself »Array find()Thefind()method returns the value of the first array element that passes a 
test function.This example finds (returns the value of ) the first element that is larger 
than 18:Exampleconst numbers = [4, 9, 16, 25, 29];let first = 
  numbers.find(myFunction);function myFunction(value, index, array) {return 
  value > 18;}Try it Yourself »Note that the function takes 3 arguments:The item valueThe item indexThe array itselfArray findIndex()ThefindIndex()method returns the index of the first array element that 
passes a test function.This example finds the index of the first element that is larger than 18:Exampleconst numbers = [4, 9, 16, 25, 29];let first = 
  numbers.findIndex(myFunction);function myFunction(value, index, array) {return 
  value > 18;}Try it Yourself »Note that the function takes 3 arguments:The item valueThe item indexThe array itselfModulesModules are imported in two different ways:Import from named exportsImport named exports from the file person.js:import { name, age } from "./person.js";Try it Yourself »Import from default exportsImport a default export from the file message.js:import message from "./message.js";Try it Yourself »Learn more about Modules in:JavaScript Modules.JavaScript ReflectBefore Reflect,object operationswere scattered:Using the keywordinUsing the keyworddeleteUsing methods likeObject.definePropertyUsing language mechanisms like[[Get]]and[[Set]]Reflect brings all these into cleanReflect methods.Reflect methods unifies everythingReflect methods has predictable behaviorReflect methods works perfectly with ProxyReflect.has()Example// Create an Objectconst person = {name: "John", lastname: "Doe"};let answer = Reflect.has(person, "name");Try it Yourself »Same as using theinoperator:let answer = "name" in person;Try it Yourself »Learn More...JavaScript Reflect TutorialJavaScript ProxyExample// Create an Objectconst user = { name: "Jan", age: 40 };//Create a Proxyconst proxy = new Proxy(user, {get(target, property) {log("Getting: " + property);return target[property];},set(target, property, value) {log("Setting: " + property);return target[property];}});proxy.name = "John";let text = proxy.name;Try it Yourself »Learn More...JavaScript Proxy TutorialNew Math MethodsES6 added the following methods to the Math object:Math.trunc()Math.sign()Math.cbrt()Math.log2()Math.log10()The Math.trunc() MethodMath.trunc(x)returns the integer part of x:ExampleMath.trunc(4.9);    // returns 4Math.trunc(4.7);    // returns 4Math.trunc(4.4);    // returns 4Math.trunc(4.2);    // returns 4Math.trunc(-4.2);    // returns -4Try it Yourself »The Math.sign() MethodMath.sign(x)returns -1, 0, or 1 (if x is negative, null or positive):ExampleMath.sign(-4);    // returns -1Math.sign(0);    // returns 0Math.sign(4);    // returns 1Try it Yourself »The Math.cbrt() MethodMath.cbrt(x)returns the cube root of x:ExampleMath.cbrt(8);    // returns 2Math.cbrt(64);    // returns 4Math.cbrt(125);    // returns 5Try it Yourself »The Math.log2() MethodMath.log2(x)returns the base 2 logarithm of x:ExampleMath.log2(2);    // returns 1Try it Yourself »The Math.log10() MethodMath.log10(x)returns the base 10 logarithm of x:ExampleMath.log10(10);    // returns 1Try it Yourself »New Number PropertiesES6 added the following properties to the Number object:EPSILONMIN_SAFE_INTEGERMAX_SAFE_INTEGEREPSILON ExampleThe difference between 1 and the smallest floating-point number greater than 1:let x = Number.EPSILON;Try it Yourself »MIN_SAFE_INTEGER ExampleMinimum integer value that can be precisely represented:let x = Number.MIN_SAFE_INTEGER;Try it Yourself »MAX_SAFE_INTEGER ExampleMaximum integer value that can be precisely represented:let x = Number.MAX_SAFE_INTEGER;Try it Yourself »The Number.isInteger() MethodTheNumber.isInteger()method returnstrueif the argument is an integer.ExampleNumber.isInteger(10);        // returns trueNumber.isInteger(10.5);      // returns falseTry it Yourself »The Number.isSafeInteger() MethodA safe integer is an integer that can be exactly represented as a double precision number.TheNumber.isSafeInteger()method returnstrueif the argument is a safe integer.ExampleNumber.isSafeInteger(10);    // returns trueNumber.isSafeInteger(12345678901234567890);  // returns falseTry it Yourself »Safe integers are all integers from -(253- 1) to +(253- 1).This is safe: 9007199254740991. This is not safe: 9007199254740992.New Global MethodsES6 added 2 new global number methods:isFinite()isNaN()The isFinite() MethodThe globalisFinite()method returnsfalseif the argument isInfinityorNaN.Otherwise it returnstrue:ExampleisFinite(10/0);       // returns falseisFinite(10/1);       // returns trueTry it Yourself »The isNaN() MethodThe globalisNaN()method returnstrueif the argument isNaN. Otherwise it returnsfalse:ExampleisNaN("Hello");       // returns trueTry it Yourself »JavaScript Object.assign()TheObject.assign()method copies properties from
one or more source objects to a target object.Example// Create Target Objectconst person1 = {firstName: "John",lastName: "Doe",age: 50,eyeColor: "blue"};// Create Source Objectconst person2 = {firstName: "Anne",lastName: "Smith"};// Assign Source to TargetObject.assign(person1, person2);Try it Yourself »RegExp u ModifierExampleslet text = "Hello 😄";let pattern = /\p{Emoji}/u;let result = pattern.test(text);Try it Yourself »let text = "Hello 😄";let pattern = /\p{Emoji}/;let result = pattern.test(text);Try it Yourself »DescriptionTheu(unicode) flag enables full Unicode support in the regular expression.By default, JavaScript and regex treats 4-byte Unicode characters
(like emojis or less common symbols) as two separate 2-byte "surrogate" code units.Theuflag treats the pattern as a sequence of Unicode code points, which is important for correctly
handling characters outside the Basic Multilingual Plane (BMP).RegExp y ModifierExampleslet text = "abc def ghi";let pattern = /\w+/y;// Start match from position 4pattern.lastIndex = 4;let result = text.match(pattern);Try it Yourself »let text = "abc def ghi";let pattern = /\w+/;// Start match from position 4pattern.lastIndex = 4;let result = text.match(pattern);Try it Yourself »DescriptionThey(Sticky) flag performs a "sticky" search that matches only from the lastIndex
property of the RegExp object.Theyflag  ensures that subsequent matches start immediately
after the previous one, without skipping characters.❮ PreviousNext ❯★+1Sign in to track progress

### Example

The...operator can pass arguments to a function:

### Example

The...operator can be used to join arrays:

### Example

## The For/Of Loop

The JavaScriptfor/ofstatement loops 
through the values of iterable objects.

for/oflets you loop over data structures 
that are iterable such as Arrays, Strings, Maps, NodeLists, and more.

Thefor/ofloop has the following syntax:

variable- For every iteration the value of the next property is 
assigned to the variable.Variablecan be declared withconst,let, orvar.

iterable- An object that has iterable properties.

### Looping over an Array

### Example

### Looping over a String

### Example

Learn more in the chapter:JavaScript Loop For/In/Of.

## JavaScript Maps

A Map is an object that stores key-value pairs, similar to objects, but with differences:

- Keys can be of any data type (objects, functions, primitive values),
unlike plain objects where keys are strings.
- Maintains the original insertion order of keys.

Being able to use an Object as a key is an important Map feature.

### Example

Learn more about Map objects, and the difference between a Map and an Array, in the the chapter:JavaScript Maps.

## JavaScript Sets

A Set is an object that stores unique values of any type (primitive values, functions, objects).

A Set can only contain unique values. An attempt to add a duplicate value will be ignored.

### Example

Learn more about Set objects in the the chapter:JavaScript Sets.

## JavaScript Classes

JavaScript Classes are templates for JavaScript Objects.

Use the keywordclassto create a class.

Always add a method namedconstructor():

### Syntax

### Example

The example above creates a class named "Car".

The class has two initial properties: "name" and "year".

A JavaScript class isnotan object.

It is atemplatefor JavaScript objects.

## Using a Class

When you have a class, you can use the class to create objects:

### Example

Try it Yourself »

Learn more about classes in the the chapter:JavaScript Classes.

## JavaScript Promises

A JavaScript Promise is an object representing the completion or failure of an asynchronous
operation and its values.

It is a placeholder for a value that may not yet be available,
providing a structured way to handle asynchronous code.

### Promise Syntax

### Example Using a Promise

Try it Yourself »

Learn more about Promises in the the chapter:JavaScript Promises.

## The Symbol Type

A JavaScript Symbol is a primitive data type just like Number, String, or Boolean.

It represents a unique "hidden" identifier that no other code can accidentally access.

For instance, if different coders want to add a person.id property to a person object belonging to a third-party code,
they could mix each others values.

Using Symbol() to create a unique identifiers, solves this problem:

### Example

Symbols are always unique.

If you create two symbols with the same description they will have different values:

## Default Parameter Values

ES6 allows function parameters to have default values.

### Example

## Function Rest Parameter

The rest parameter (...) allows a function to treat an indefinite number of arguments as an array:

### Example

## String.includes()

Theincludes()method returnstrueif a string contains a specified value,
otherwisefalse:

### Example

## String.startsWith()

ThestartsWith()method returnstrueif a string begins with a specified value, otherwisefalse:

### Example

## String.endsWith()

TheendsWith()method returnstrueif a string ends with a specified value, otherwisefalse:

### Example

## Array entries()

### Example

Create an Array Iterator, and then iterate over the key/value pairs:

Theentries()method returns an Array Iterator object with key/value pairs:

[0, "Banana"][1, "Orange"][2, "Apple"][3, "Mango"]

Theentries()method does not change the original array.

## Array.from()

TheArray.from()method returns an Array object from any object with a length 
property or any iterable object.

### Example

Create an Array from a String:

## Array keys()

Thekeys()method returns an Array Iterator object with the keys of an array.

### Example

Create an Array Iterator object, containing the keys of the array:

## Array find()

Thefind()method returns the value of the first array element that passes a 
test function.

This example finds (returns the value of ) the first element that is larger 
than 18:

### Example

Note that the function takes 3 arguments:

- The item value
- The item index
- The array itself

## Array findIndex()

ThefindIndex()method returns the index of the first array element that 
passes a test function.

This example finds the index of the first element that is larger than 18:

### Example

Note that the function takes 3 arguments:

- The item value
- The item index
- The array itself

## Modules

Modules are imported in two different ways:

### Import from named exports

Import named exports from the file person.js:

Try it Yourself »

### Import from default exports

Import a default export from the file message.js:

Try it Yourself »

Learn more about Modules in:JavaScript Modules.

## JavaScript Reflect

Before Reflect,object operationswere scattered:Using the keywordinUsing the keyworddeleteUsing methods likeObject.definePropertyUsing language mechanisms like[[Get]]and[[Set]]Reflect brings all these into cleanReflect methods.Reflect methods unifies everythingReflect methods has predictable behaviorReflect methods works perfectly with ProxyReflect.has()Example// Create an Objectconst person = {name: "John", lastname: "Doe"};let answer = Reflect.has(person, "name");Try it Yourself »Same as using theinoperator:let answer = "name" in person;Try it Yourself »Learn More...JavaScript Reflect TutorialJavaScript ProxyExample// Create an Objectconst user = { name: "Jan", age: 40 };//Create a Proxyconst proxy = new Proxy(user, {get(target, property) {log("Getting: " + property);return target[property];},set(target, property, value) {log("Setting: " + property);return target[property];}});proxy.name = "John";let text = proxy.name;Try it Yourself »Learn More...JavaScript Proxy TutorialNew Math MethodsES6 added the following methods to the Math object:Math.trunc()Math.sign()Math.cbrt()Math.log2()Math.log10()The Math.trunc() MethodMath.trunc(x)returns the integer part of x:ExampleMath.trunc(4.9);    // returns 4Math.trunc(4.7);    // returns 4Math.trunc(4.4);    // returns 4Math.trunc(4.2);    // returns 4Math.trunc(-4.2);    // returns -4Try it Yourself »The Math.sign() MethodMath.sign(x)returns -1, 0, or 1 (if x is negative, null or positive):ExampleMath.sign(-4);    // returns -1Math.sign(0);    // returns 0Math.sign(4);    // returns 1Try it Yourself »The Math.cbrt() MethodMath.cbrt(x)returns the cube root of x:ExampleMath.cbrt(8);    // returns 2Math.cbrt(64);    // returns 4Math.cbrt(125);    // returns 5Try it Yourself »The Math.log2() MethodMath.log2(x)returns the base 2 logarithm of x:ExampleMath.log2(2);    // returns 1Try it Yourself »The Math.log10() MethodMath.log10(x)returns the base 10 logarithm of x:ExampleMath.log10(10);    // returns 1Try it Yourself »New Number PropertiesES6 added the following properties to the Number object:EPSILONMIN_SAFE_INTEGERMAX_SAFE_INTEGEREPSILON ExampleThe difference between 1 and the smallest floating-point number greater than 1:let x = Number.EPSILON;Try it Yourself »MIN_SAFE_INTEGER ExampleMinimum integer value that can be precisely represented:let x = Number.MIN_SAFE_INTEGER;Try it Yourself »MAX_SAFE_INTEGER ExampleMaximum integer value that can be precisely represented:let x = Number.MAX_SAFE_INTEGER;Try it Yourself »The Number.isInteger() MethodTheNumber.isInteger()method returnstrueif the argument is an integer.ExampleNumber.isInteger(10);        // returns trueNumber.isInteger(10.5);      // returns falseTry it Yourself »The Number.isSafeInteger() MethodA safe integer is an integer that can be exactly represented as a double precision number.TheNumber.isSafeInteger()method returnstrueif the argument is a safe integer.ExampleNumber.isSafeInteger(10);    // returns trueNumber.isSafeInteger(12345678901234567890);  // returns falseTry it Yourself »Safe integers are all integers from -(253- 1) to +(253- 1).This is safe: 9007199254740991. This is not safe: 9007199254740992.New Global MethodsES6 added 2 new global number methods:isFinite()isNaN()The isFinite() MethodThe globalisFinite()method returnsfalseif the argument isInfinityorNaN.Otherwise it returnstrue:ExampleisFinite(10/0);       // returns falseisFinite(10/1);       // returns trueTry it Yourself »The isNaN() MethodThe globalisNaN()method returnstrueif the argument isNaN. Otherwise it returnsfalse:ExampleisNaN("Hello");       // returns trueTry it Yourself »JavaScript Object.assign()TheObject.assign()method copies properties from
one or more source objects to a target object.Example// Create Target Objectconst person1 = {firstName: "John",lastName: "Doe",age: 50,eyeColor: "blue"};// Create Source Objectconst person2 = {firstName: "Anne",lastName: "Smith"};// Assign Source to TargetObject.assign(person1, person2);Try it Yourself »RegExp u ModifierExampleslet text = "Hello 😄";let pattern = /\p{Emoji}/u;let result = pattern.test(text);Try it Yourself »let text = "Hello 😄";let pattern = /\p{Emoji}/;let result = pattern.test(text);Try it Yourself »DescriptionTheu(unicode) flag enables full Unicode support in the regular expression.By default, JavaScript and regex treats 4-byte Unicode characters
(like emojis or less common symbols) as two separate 2-byte "surrogate" code units.Theuflag treats the pattern as a sequence of Unicode code points, which is important for correctly
handling characters outside the Basic Multilingual Plane (BMP).RegExp y ModifierExampleslet text = "abc def ghi";let pattern = /\w+/y;// Start match from position 4pattern.lastIndex = 4;let result = text.match(pattern);Try it Yourself »let text = "abc def ghi";let pattern = /\w+/;// Start match from position 4pattern.lastIndex = 4;let result = text.match(pattern);Try it Yourself »DescriptionThey(Sticky) flag performs a "sticky" search that matches only from the lastIndex
property of the RegExp object.Theyflag  ensures that subsequent matches start immediately
after the previous one, without skipping characters.❮ PreviousNext ❯★+1Sign in to track progress

- Using the keywordin
- Using the keyworddelete
- Using methods likeObject.defineProperty
- Using language mechanisms like[[Get]]and[[Set]]

```
Object.defineProperty
```

Reflect brings all these into cleanReflect methods.

- Reflect methods unifies everything
- Reflect methods has predictable behavior
- Reflect methods works perfectly with Proxy

## Reflect.has()

### Example

Same as using theinoperator:

## Learn More...

JavaScript Reflect Tutorial

## JavaScript Proxy

### Example

## Learn More...

JavaScript Proxy Tutorial

## New Math Methods

ES6 added the following methods to the Math object:

- Math.trunc()
- Math.sign()
- Math.cbrt()
- Math.log2()
- Math.log10()

## The Math.trunc() Method

Math.trunc(x)returns the integer part of x:

### Example

## The Math.sign() Method

Math.sign(x)returns -1, 0, or 1 (if x is negative, null or positive):

### Example

## The Math.cbrt() Method

Math.cbrt(x)returns the cube root of x:

### Example

## The Math.log2() Method

Math.log2(x)returns the base 2 logarithm of x:

### Example

## The Math.log10() Method

Math.log10(x)returns the base 10 logarithm of x:

### Example

## New Number Properties

ES6 added the following properties to the Number object:

- EPSILON
- MIN_SAFE_INTEGER
- MAX_SAFE_INTEGER

### EPSILON Example

The difference between 1 and the smallest floating-point number greater than 1:

### MIN_SAFE_INTEGER Example

Minimum integer value that can be precisely represented:

### MAX_SAFE_INTEGER Example

Maximum integer value that can be precisely represented:

## The Number.isInteger() Method

TheNumber.isInteger()method returnstrueif the argument is an integer.

### Example

## The Number.isSafeInteger() Method

A safe integer is an integer that can be exactly represented as a double precision number.

TheNumber.isSafeInteger()method returnstrueif the argument is a safe integer.

```
Number.isSafeInteger()
```

### Example

Safe integers are all integers from -(253- 1) to +(253- 1).This is safe: 9007199254740991. This is not safe: 9007199254740992.

## New Global Methods

ES6 added 2 new global number methods:

- isFinite()
- isNaN()

## The isFinite() Method

The globalisFinite()method returnsfalseif the argument isInfinityorNaN.

Otherwise it returnstrue:

### Example

## The isNaN() Method

The globalisNaN()method returnstrueif the argument isNaN. Otherwise it returnsfalse:

### Example

## JavaScript Object.assign()

TheObject.assign()method copies properties from
one or more source objects to a target object.

### Example

## RegExp u Modifier

### Examples

## Description

Theu(unicode) flag enables full Unicode support in the regular expression.

By default, JavaScript and regex treats 4-byte Unicode characters
(like emojis or less common symbols) as two separate 2-byte "surrogate" code units.

Theuflag treats the pattern as a sequence of Unicode code points, which is important for correctly
handling characters outside the Basic Multilingual Plane (BMP).

## RegExp y Modifier

### Examples

## Description

They(Sticky) flag performs a "sticky" search that matches only from the lastIndex
property of the RegExp object.

Theyflag  ensures that subsequent matches start immediately
after the previous one, without skipping characters.

#### COLOR PICKER

REMOVE ADS

## Contact Sales

If you want to use W3Schools services as an educational institution, team or enterprise, send us an e-mail:sales@w3schools.com

## Report Error

If you want to report an error, or if you want to make a suggestion, send us an e-mail:help@w3schools.com

##### Top Tutorials

##### Top References

##### Top Examples

##### Get Certified


---


## Source: https://www.w3schools.com/academy/index.php
# W3Schools Academy - Train Your Team with the World's Largest Web Developer Site

# W3SchoolsAcademy

The complete platform to train your team, manage learning, and track progress, all powered by the world's most trusted web development content.

Classroom Dashboard

Web Development 101

### Want a personalized demo?

Get custom pricing for your organization and see Academy in action.

Trusted by teams worldwide

## Built for Organizations That Train

Whether you're upskilling a team or teaching a classroom, Academy gives you the tools to manage learning at any scale.

### Schools & Universities

Integrate W3Schools content into your curriculum with ready-made courses, auto-graded exams, and progress tracking.

- ✓Classroom management
- ✓Assignment tracking
- ✓Student certificates

### Businesses & Teams

Train employees in web development, data skills, and programming. Track progress, assign learning paths, and measure ROI.

- ✓Team dashboards
- ✓Progress reports
- ✓Custom learning paths

### Bootcamps & Training

Accelerate your bootcamp with structured content, hands-on coding challenges, and certifications that validate skills.

- ✓Ready-to-use curriculum
- ✓Coding challenges
- ✓Bulk licensing

## Set Up a Semester in Seconds

Pick a subject, and your learning path is ready. Modules, quizzes, and a final exam, all built in.

This is a sample preview. The actual paths are fully customizable in Academy.

Step 1: Choose a subject

Step 2: Set duration

Your learning path

Basic structure, tags, and your first web page

Headings, paragraphs, links, images, and attributes

Organizing data and collecting user input

Semantic elements, accessibility, and page structure

Audio, video, iframes, and HTML5 APIs

Build a complete multi-page website from scratch

40 questions, 60 min. Passing score: 75%. Earns an official W3Schools certificate.

From $49.99/seat annually (only $4.17/month). No long-term commitment required.

## Everything You Need

Powerful features to manage learning at any scale.

### Admin Dashboard

One central place to manage users, track progress, and generate reports.

### Custom Learning Paths

Create paths for different roles, like frontend, backend, data science, and more.

### Real-Time Analytics

Track completion rates, time spent, and identify who needs support.

### Certifications

Official W3Schools certificates your team can add to LinkedIn.

### Coding Challenges

Hands-on exercises with auto-grading for instant feedback.

### Ad-Free Learning

Distraction-free environment for focused learning.

## Results You Can Measure

Demonstrate training ROI to leadership with data that matters, not just completion rates.

#### Team Performance Dashboard

87%

↑ 12% vs last month

4.2h

↓ 18% faster

156

This quarter

94%

Pass rate

3 learners need attention

Haven't logged in for 7+ days

### Show leadership exactly what training delivers

Stop guessing if training works. Track real progress and demonstrate value with metrics that matter to your organization.

Completion & Engagement Tracking

See who's finishing courses, who's stuck, and where they're spending time.

Skill Assessments & Scores

Measure actual knowledge retention, not just course views.

Early Warning Alerts

Get notified when learners fall behind so you can intervene early.

Exportable Reports

Generate reports for leadership, compliance, or HR records.

## How It Works

Get your team learning in three simple steps.

### Invite Your Team

Add team members easily by email. No limits on users.

### Assign Learning

Choose from 45+ technologies. Create custom learning paths for different roles.

### Track Progress

See who's completing courses, earning certificates, and where they need help.

Set up takes minutes, not days.

## Train the Trainer

For instructors who want to feel more confident in their teaching, we offer optional bootcamps to get ready to teach students or teams. Hands-on experience with the technologies they'll be teaching, so they can answer questions, debug problems, and guide learners with real expertise.

Build Real Confidence

Instructors learn by doing, not just reading

Live Instructor Support

Get answers from experienced developers

Industry Certification

Credential to validate their expertise

Flexible Scheduling

Part-time, evenings, so it fits around teaching

Bootcamps for Instructors

Web Dev • SQL • Python • DevOps

Questions?Get in touch

## W3Schools Spaces

Your students don't just read about code, they write it. Spaces is a browser-based code editor where learners can practice, build projects, and host real websites. No installs, no setup, no IT tickets.

Browser-Based Editor

Works on any device, nothing to install

Free Hosting

Students can share their work with a link

kAI Coding Tutor

AI help for debugging and learning

Ready-Made Templates

Portfolio, blog, web shop, and more

1<h1>My First Website</h1>

2<p>Built with Spaces!</p>

3<buttononclick="go()">

4Click Me

5</button>

username.w3spaces.com

Live and hosted, free SSL included

## 45+ Technologies Included

Access the complete W3Schools learning library.

## Simple Pricing

Start today. Everything you need in one platform.

### Self-Service

For small teams getting started

(Only $4.17/month)

Minimum 10 seats. Billed annually.

- check_circle45+ courses
- check_circleProgress tracking
- check_circleCertifications included
- check_circleAd-free learning
- check_circleUp to 3 teachers

### Schools & Organizations

For schools, districts, and larger teams

Based on your team size and requirements.

- check_circleEverything in Self-Service
- check_circleSSO integration on request
- check_circleCustom learning paths
- check_circleSet number of teachers
- check_circleDedicated support

## Not sure yet? Start with a free trial.

We know you need to see it work before committing. Request a free trial and explore Academy with your team. No credit card required, no pressure.

14-Day Free Trial

Explore everything Academy offers

## What Our Customers Say

#### Nesta Paul Katende

CEO, Otic Foundation

"We chose W3Schools Academy because of its proven ability to deliver high-quality education. With clear, concise, and interactive tutorials, W3Schools makes learning accessible to everyone."

#### Brian Moran

Co-Founder, Boolean Girl

"Boolean Girl was looking for a single platform to teach Python and Web development. We already used W3Schools as a reference, so it made sense to use the development environment too."

#### Gavin Taylor

Head of Education, LearnTech

"W3Schools classroom solution allows students to complete courses, and our tutors to monitor progress, set goals and provide support. We recommend this tool with W3Schools courses."

25+

Years of Experience

### Built on 25 Years of Teaching the Web

W3Schools is the world's most visited web development site. Since 1998, over 100 million learners have trusted our content to learn HTML, CSS, JavaScript, Python, SQL, and more.

With Academy, your team learns from the same trusted source developers have relied on for over two decades.

## Frequently Asked Questions

Everything you need to know before getting started.

You can be up and running in minutes. There's no software to install, everything runs in the browser. Just create your account, invite your team by email, and start assigning courses. Most teams are fully set up within a day.

Absolutely. Many organizations start with a small pilot team to test the platform, then expand once they see results. Our self-service plan starts at just 10 seats, and you can add more users anytime without changing plans.

Self-service plans are billed annually with a minimum of 10 seats. For large customers, we offer flexible terms based on your needs. Contact us to discuss options that work for your organization.

Yes. W3Schools takes data privacy seriously. We comply with GDPR for European users and FERPA for educational institutions in the US. Your data is encrypted, never sold to third parties, and you can request deletion at any time.

Yes. Admins and instructors can view detailed progress for each learner, including courses completed, time spent, quiz scores, and certificates earned. You can also identify learners who may need extra support with our attention alerts.

No. Academy is fully cloud-based with no installation required. For large customers who want SSO integration, we provide documentation and support to work with your IT team, but it's optional, not required.

If you decide to cancel, you can export your data (progress reports, completion records) before your subscription ends. After cancellation, your data is retained for 30 days in case you change your mind, then securely deleted.

School and organization plans include SSO integration with providers like Google, Github and Facebook. We support LTI integration with learning management systems. API access is available for custom integrations.

Still have questions?Contact our team

## Ready to Train Your Team?

Get a personalized demo and discover how W3Schools Academy can help your organization build technical skills.

Join our

FREE Webinar

Get an inside look at W3Schools Academy.


---


## Source: https://www.w3schools.com/spaces/index.php
# Create a Website | Website Builder | W3Schools.com | W3Schools Spaces

# Create aWebsite

Code websites directly in the browser withW3Schools Spaces. Practice, build, and host - all in one place.

No credit card required.

Explorer

1<!DOCTYPE html>

2<body>

3<divid="score">Score: 0</div>

4<divid="game">

5<divid="timer">10</div>

6<divid="star">⭐</div>

7</div>

8<scriptsrc="app.js"></script>

9</body>

1#game{

2width:280px;height:160px;

3position:relative;

4}

5#timer{

6position:absolute;

7top:8px;right:8px;

8font-weight:bold;

9}

10#star{position:absolute;cursor:pointer; }

1letx=50,y=50,dx=3,dy=2;

2letscore=0,time=10;

3

4constcountdown=setInterval(() => {

5time--;

6if(time<=0)endGame();

7},1000);

8

9star.onclick= () =>score++;

10setInterval(move,30);

2M+

Spaces Created

70M+

Monthly Visitors

25+

Years Teaching Code

## Built for Everyone

Whether you're just starting or building your portfolio, Spaces grows with you.

### Beginners

No setup, no confusion. Just open your browser and start coding. Perfect for your first website.

- checkZero installation required
- checkBeginner-friendly templates
- checkkAI helps when you're stuck

### Students & Hobbyists

Practice what you learn in tutorials. Build real projects and create a portfolio that gets noticed.

- checkHost projects
- checkPractice any language
- checkShare with a live link

### Teachers & Schools

Give your students a coding environment that works instantly. No IT headaches.

- checkWorks on any device
- checkTeam management
- checkIntegrates with W3Schools tutorials

Trusted by developers at companies worldwide

## Learn → Practice → Build

The only browser IDE connected to the world's largest web developer learning platform.

### Learn from Tutorials

Free tutorials for HTML, CSS, JavaScript, Python, and more. Trusted by millions.

### Practice in Spaces

Apply what you learn immediately. No context switching between learning and coding.

### Build Real Projects

Create portfolio-worthy websites. Host and share them with the world.

## Simple Pricing

Start a smaller plan and upgrade if you need more.

## Choose your Plan

By subscribing to a plan you support the W3Schools mission to makelearning available to everyone - no matter their background.

Are you a teacher?Check out W3Schools Academy

## MeetkAI

Your AI coding tutor, built into Spaces

Learn to code more effectively with kAI. Get instant help debugging, improving code structure, understanding concepts, or even generating complete websites from your description.

- check_circleDebug your code and explain errors
- check_circleImprove code structure and best practices
- check_circleGenerate websites from descriptions

Hi! I'm kAI, W3Schools AI Tutor. Ask me any coding question!

I can check your code for errors, explain concepts clearly, and help you build complete websites.

## Powerful Code Editor

Front-end, back-end, or full-stack - everything you need in one place.

### Cloud-Based

No installation. Access from anywhere, any device.

### Terminal & Log

Debug and troubleshoot your code in real-time.

### File Navigator

All your files in one place. Easy to manage.

### Database

Built-in database. View and manage your data.

### Package Manager

Install frameworks and libraries in one click.

### Analytics

Track visitors and understand your traffic.

### Custom Domains

Connect your own domain or use ours free.

### SSL Included

Free SSL certificate. Your site is secure.

## Practice Any Language

Master web development with these technologies.

## Start with Templates

Build powerful websites in just a few clicks.

### Portfolio

### Blog

### Webshop

### View All Templates

## How It Works

From idea to live website in minutes.

### Sign Up

Create your W3Schools account in seconds.

### Choose a Template

Or start from scratch with a blank project.

### Edit Your Code

Write code directly in your browser.

### Share with the World

Your site is live instantly.

## What Developers Say

Join millions who learned to code with W3Schools.

"Finally a browser IDE that's actually simple. Spaces just works - open it and start coding."

Marcus T.

Learning Web Development

"kAI is like having a patient teacher. It explains my errors without making me feel stupid. Perfect for beginners like me."

Sarah K.

Computer Science Student

"I teach coding to 30 students. Spaces means no more 'it doesn't work on my laptop' excuses. Everyone has the same environment."

James R.

High School Teacher

Join them. Start building today.

## You're Never Alone

Learning to code can be hard. We make it easier with support at every step.

### kAI Assistant

Get instant help debugging, understanding concepts, or generating code.

### Help Center

Searchable knowledge base with guides, tutorials, and FAQs.

### Discord Community

Connect with other learners. Ask questions. Share your projects.

#### W3Schools Community

12,000+ members online

## Spaces in Your Classroom

Give your students a professional coding environment without the IT headaches. No installations, no configuration - just learning.

#### Project-Based Learning

Students build real websites and apps, not just run exercises.

#### Secure & Safe

Sandboxed environment. Students can't break anything or access harmful content.

#### Privacy Compliant

GDPR compliant. No tracking of student data for advertising.

#### Teacher Dashboard

Manage students, track progress, and create custom learning paths.

Mrs. Coleman

Computer Science Teacher, Georgia State, US

"Before Spaces, I spent half of every class helping students install software. Now they just open their browser and code. It's transformed how I teach."

50%

Less setup time

0

IT tickets

100%

Browser-based

## Frequently Asked Questions

Basic Spaces include HTML, CSS, and JavaScript for frontend development. Full-Stack Spaces add backend languages like Python, PHP, Node.js, React, Vue, and Django.

Yes! Plus users can connect their own custom domain or transfer an existing one. Trial users get a w3schools.com subdomain.

Your access will remain active for the duration of your paid period. After that, your space will be frozen until you unlock it again.

Yes! Contactsales@w3schools.comfor team and school pricing.

## Ready to Build?

Create your first website in minutes. No credit card required.

Cancel anytime.

## Contact Sales

If you want to use W3Schools services as an educational institution, team or enterprise, send us an e-mail:sales@w3schools.com

## Report Error

If you want to report an error, or if you want to make a suggestion, send us an e-mail:help@w3schools.com

##### Top Tutorials

##### Top References

##### Top Examples

##### Get Certified


---


## Source: https://www.w3schools.com/practice/index.php
# W3Schools Practice Coding Problems

## Practice

# Practice Coding Problems

Improve your skills by solving real coding problems.

Write code, submit, and get instant feedback.

109practice problems per language ·12languages

## Sum of Primes

Find the sum of all prime numbers up to N using a sieve.

### 6 days left

```
n = int(input())

# Use the Sieve of Eratosthenes to find and sum all primes up to n

```

### Subscribe to Weekly Practice Problem

Get the latest coding practice problem delivered to your inbox every week.

## Select a Language

### Python

General-purpose, beginner-friendly language.

### Java

Object-oriented, widely used in enterprise.

### C

Low-level systems programming language.

### C++

Powerful language for performance-critical apps.

### C#

Modern language for .NET and game development.

### PHP

Server-side scripting for web development.

### Kotlin

Modern language for Android and JVM.

### JavaScript

The language of the web. Runs in Node.js.

### TypeScript

Typed JavaScript for larger applications.

### Swift

Apple's language for iOS and macOS apps.

### Rust

Safe, fast systems programming language.

### R

Statistical computing and data analysis.

## How It Works

Each challenge gives you aproblem descriptionandstarter codein an online editor.

Your program reads input and prints the correct output. When you submit, your code is tested againstmultiple hidden test caseswith different inputs.

Your score is the percentage of tests passed. Pass all tests to earn full XP. Partial credit is given for partially correct solutions.

#### COLOR PICKER

REMOVE ADS

## Contact Sales

If you want to use W3Schools services as an educational institution, team or enterprise, send us an e-mail:sales@w3schools.com

## Report Error

If you want to report an error, or if you want to make a suggestion, send us an e-mail:help@w3schools.com

##### Top Tutorials

##### Top References

##### Top Examples

##### Get Certified

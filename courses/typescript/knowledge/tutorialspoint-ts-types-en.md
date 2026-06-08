# Tutorialspoint Ts Types

Source: https://www.tutorialspoint.com/typescript/typescript_types.htm

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
TypeScript - Types
Previous
Quiz
Next
The Type System represents the different types of values supported by the language. The Type System checks the validity of the supplied values, before they are stored or manipulated by the program. This ensures that the code behaves as expected. The Type System further allows for richer code hinting and automated documentation too.
TypeScript provides data types as a part of its optional Type System. The data type classification is as given below −
The Any type
data type is the super type of all types in TypeScript. It denotes a dynamic type. Using the
type is equivalent to opting out of type checking for a variable.
Built-in types
The following table illustrates all the built-in types in TypeScript −
Data type
Keyword
Description
Number
number
Double precision 64-bit floating point values. It can be used to represent both, integers and fractions.
String
string
Represents a sequence of Unicode characters
Boolean
boolean
Represents logical values, true and false
Void
void
Used on function return types to represent non-returning functions
Null
null
Represents an intentional absence of an object value.
Undefined
undefined
Denotes value given to all uninitialized variables
Symbol
symbol
A unique and immutable primitive introduced in ES2015.
Object
object
Represents instances of user-defined classes, arrays, functions, etc.
Never
never
Represents values that never occur.
There is no integer type in TypeScript and JavaScript.
Now, lets understand each built-in data type in detail.
Number
In TypeScript, the number data type can store the integer, floating point, binary, decimal, hexadecimal, etc. numbers. However, all integers are represented as floating points in TypeScript.
Example
In the code below, the
marks
both variables are of number type. The age variable contains the integer value and the marks variable contains the floating point value.
// Integer number
let age: number = 30;
// Float number
let marks: number = 30.5;
String
The string data type is used to store the text value.
You can define a string using three ways:
Using the single quote
Using the double quotes
Using the backticks
The backticks are used to create multiline or template strings.
Example
In the code below, the
first_name
string is created using the single quote, and the
last_name
string is created using the double quotes. The
full_name
string is created using the backticks, which uses the template literals to create a string.
let first_name: string = 'John';
let last_name: string = "Doe";
let full_name: string = `${first_name} ${last_name}`;
Boolean
In TypeScript, Boolean data type allows you to represent logical entities. It stores the either
true
false
value. The boolean variables are mainly used with conditional statements like if-else or switch to execute a flow based on some logical value.
Example
In the code below, the
isReady
is a variable of boolean type, which contains the
true
value.
let isReady: boolean = true;
Symbol
symbol
is a primitive data type, which is mostly used to create unique values. It allows developers to create unique object keys that wont collide with any other keys.
Example
Here, we have used the
Symbol()
constructor which returns the new unique key. We have used the
UNIQUE_KEY
as a key of the
object.
// Define a symbol
const UNIQUE_KEY = Symbol(); 
// Use the symbol as a property key in an object
let obj = {
[UNIQUE_KEY]: "SecretValue"
Null
The null type in TypeScript represents the intentional absence of any object value. It is one of the primitive types and is typically used to indicate that a variable intentionally points to no object.
Example
In the code below, the
empty
variable contains the null value.
let empty: null = null;
Undefined
The undefined data type represents the absence of value. When a variable is declared but is not initialized, it contains the undefined value.
Example
In the code below, the
undef
variable contains the undefined value.
let undef: undefined;
Null and undefined  Are they the same?
null
and the
undefined
datatypes are often a source of confusion. The null and undefined cannot be used to reference the data type of a variable. They can only be assigned as values to a variable.
However,
null and undefined are not the same
. A variable initialized with undefined means that the variable has no value or object assigned to it while null means that the variable has been set to an object whose value is undefined.
Object
The object is a non-primitive data type, which can contain any value that is not a number, string, boolean, symbol, null, or undefined. You can create an object using either object literal or
Object()
constructor.
Example
In the code below, we have created the object using the object literal. The type of the
person
variable is an object. We have added the key-value pair between the curly braces (object literal).
let person: object = {name: "Bob"};
Void
The void type is used in the return type of functions that do not return a value. It signifies that there is no type at all.
Example
Here, we have used the
void
data type with function to not return any value from the function.
function log(): void {
console.log("log");
User-defined Types
User-defined types include Enumerations (enums), classes, interfaces, arrays, and tuple.  These are discussed in detail in the later chapters.
Array
The array data type is a collection of the same elements. It stores the elements, which you can access or update using the array index that starts from 0.
The array of any data type can be defined as
data_type[]
Array<data_type>
, where
<data_type>
can be any primitive or non-primitive data type.
Example
In the code below, we have defined the array of numbers which contains only 3 elements. The index of 1 is 0, the index of 2 is 1, and the index of 3 is 2.
let numbers: number[] = [1, 2, 3];
Tuple
Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same. This adds a level of safety when dealing with arrays that need to have a specific structure.
Example
In the code below, the
tuple
variable can have an array of length 2 as a value. The first element of the tuple is of string type, and the second element of the tuple is of number type.
let tuple: [string, number] = ["hello", 10];
console.log(tuple); // Output: ["hello", 10]
Enum
An enumeration is a collection of related values that can be numeric or string values.
enum
makes it easy to handle sets of related constants in a more readable way.
Example
In the code below, the
Color
enum contains the different colors. We can access the color using the enum name which is
Color
followed by a dot and color name value.
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
console.log(c); // Output: 1
Print Page
Previous
Quiz
Next
Advertisements

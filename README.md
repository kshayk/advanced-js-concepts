# Advanced JavaScript

In this tutorial we will look at some less-known JavaScript concepts and syntaxes as well as advanced concepts that are very useful and helpful to know.

## Nullish Coalescing

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/nullishCoalescing.js)

Let's look at this piece of code:

```javascript
function calculatePrice(price, taxes, description) {
  const total = price * (1 + taxes);
  console.log(`${description} With Tax: $${total}`);
}

calculatePrice(100, 0.7, "Book");
```

In this simple example, we have some calculation of a price with tax and then we log the results.

Let's say we won't always have a value for the tax we the ```calculatePrice``` function is called. Like this for example:

```javascript
calculatePrice(100, undefined, "Book");
```

and maybe even the description is also undefined:

```javascript
calculatePrice(100, undefined, undefined);
```

One way to handle this is to use the ```||``` operator, which will have a default value if the taxes or description value is undefined:

```javascript
function calculatePrice(price, taxes, description) {
    taxes = taxes || .05;
    description = description || "Default Item";
    const total = price * (1 + taxes);
    console.log(`${description} With Tax: $${total}`);
}
```

The issue with this approach, is that when we handle numbers and we pass 0 as the tax parameter, the ```||``` operation
will count the 0 as false and will return instead a tax of 0.05 even though this is not what we actually want.

For this reason, we can use the ```??```, also called the "nullish coalescing" operator to handle this situation:

```javascript
function calculatePrice(price, taxes, description) {
    taxes = taxes ?? .05;
    const total = price * (1 + taxes);
    console.log(`${description} With Tax: $${total}`);
}
```

Now if we run our code:

```javascript
calculatePrice(100, 0, "Book");
```

This will result in ```100``` as the price instead of ```105```.

Basically the ```??``` operator will return the value of the first parameter if it is not null or undefined, otherwise it will return the value of the second parameter.



## Styling console.log

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/nullishCoalescing.js)


We all know the ```console.log``` function, but we can also use it to style the output that prints to the log.

To style the output, we can use the ```%c``` syntax before the output string we want to style and then as a second parameter,
we can pass a string with the CSS style we want to apply to the output, just like how we write a CSS syntax in a CSS file:

```javascript
console.log(`%c${description} With Tax: $${total}`, 'font-weight: bold; color: red');
```

This will result in the whole output to have the style applied to it because the ```%c``` syntax is applied before the entire sentence.

We can also put another ```%c``` somewhere in the sentence and apply a styling to that part of the output by using another parameter:

```javascript
console.log(`%c${description} With Tax:%c $${total}`, 'font-weight: bold', 'color: green');
```

This will disregard the styling in the first ```%c``` and apply the styling to the second ```%c``` part of the output, based on the corresponding parameter.


## Optional Chaining

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/optionalChaining.js)


Let's say we have this piece of code:

```javascript
class Person {
    constructor(name, address, hobbies) {
        this.name = name;
        this.address = address;
        this.hobbies = hobbies;
    }

    print() {
        console.log(this);
    }
}

function printPersonStreet(person) {
    console.log(person.address.street);
}

const Shay = new Person(
    "Shay",
    {
        street: "123 main st",
        city: "boston",
    },
    ["programming", "reading", "writing"]
)

Shay.print();

printPersonStreet(Shay);
```

When running this code we get the following output:

```bash
Person {
  name: 'kyle',
  address: { street: '123 main st', city: 'boston' },
  hobbies: [ 'programming', 'reading', 'writing' ]
}
123 main st
```

But what happens if the address is set to undefined:

```javascript
const Shay = new Person(
    "kyle",
    undefined,
    ["programming", "reading", "writing"]
)
```

Now if we try to run it we will get the following error:

```bash
TypeError: Cannot read properties of undefined (reading 'street')
  at printPersonStreet (E:\my projects\advanced-js\optionalChaining.js:14:32)
  at Object.<anonymous> (E:\my projects\advanced-js\optionalChaining.js:25:1)
```

Since the ```address``` property is undefined and the ```printPersonStreet``` function assumes that the address is always an object and always includes a ```street``` property,
we get this error that it can not read the ```street``` property of an undefined value.

Same goes for passing ```undefined``` to the ```printPersonStreet``` function:

```javascript
printPersonStreet(undefined);
```

One way to combat that is to use the ```&&``` operator to check each individual property before printing it:

```javascript
function printPersonStreet(person) {
    console.log(person && person.address && person.address.street);
}
```

The above code will work, but as we can see this leaves a messy and unnecessary long code.

Instead of writing the code like that, JS offers us a syntax called "optional chaining". This syntax will allow us to check
each property inside the chaining process of the object and if one of those properties do not exist, it will return ```underfined``` but will not crash the application:

```javascript
function printPersonStreet(person) {
    console.log(person?.address?.street);
}
```

This will also work on functions. For example, if we are not sure if a certain class contains a specific function, we can use this 
"optional chaining" to make sure it exists before running it:

```javascript
Shay.printName?.();
```

Since the class ```Shay``` does not include the ```printName``` function, the function will not run.

Same goes for arrays. We can check whether an array exists and only if it does, we return the specific index we require:

```javascript
console.log(Shay.cars?.[1]);
```

Since the ```cars``` array property does not exist in the ```Shay``` class, it will return undefined. If the ```cars```
array existed, it would have returned the index 1 of this array.


## Object Shorthand

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/objectShorthand.js)

Let's say we have this piece of code:

```javascript
const name = 'Shay';
const favoriteFood = "Pizza";

const Shay = {
    name: name,
    favoriteFood: favoriteFood
}

console.log(Shay);
```

We are building an object with data that is already in a variable. The variable names have the same name as the key names
in the object.

As we can see, we set each key with the same name as the key and the value: ```name: name``` or ```favoriteFood: favoriteFood```.
Javascript allows us to avoid this redundant code and instead just specify the value once:

```javascript
const name = 'Shay';
const favoriteFood = "Pizza";

const Shay = {
    name,
    favoriteFood
}
```

Note that this should only be used if you want the object's key name to be the same as the variable name. 

## Script Tag Defer/Async

[Script link](https://github.com/kshayk/advanced-js-concepts/blob/main/scriptDefer.js)
| [HTML link](https://github.com/kshayk/advanced-js-concepts/blob/main/scriptTagDefer.html)

Let's assume we have this HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="scriptDefer.js"></script>
</head>
<body>
    <button>Hi</button>
</body>
</html>
```

And the ```scriptDefer.js``` file attached to it inside the ```<head>``` tag:

```javascript
const button = document.querySelector('button');
button.style.backgroundColor = 'green';
```

The problem here is that the script is supposed to update the button's background color to green,
but if you are familiar with HTML, you know that if the script tag is in the ```<head>```,
The code that supposes to be applied on the page is not applied because the script is loaded before the HTML is loaded, 
making the HTML elements retain their default properties.

One way to solve this was to put the script tags inside the ```<body>``` tags, after all the HTML code.
This would have worked but the JS scripts really shouldn't have been part of the HTML code.

As of recently, JS offered a solution for this, this solution simply requires us to put a ```defer``` attribute to the script
tag. This will tell the tag that it should only load after the HTML page is fully loaded:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="scriptDefer.js" defer></script>
</head>
<body>
    <button>Hi</button>
</body>
</html>
```

Now, the button will have the styling that the JS script has applied to it in ```scriptDefer.js```.


## Block Statement

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/blockStatement.js)

As we know, JS variables are scoped, meaning that a variable that was declared in a function will only be available inside 
that function, unless the function returns it.

Also, a variable that is declared in the root scope will be available both inside a function and outside it.

Here in this example we can see how a scoped variable will act:

```javascript
const a = 1

function main() {
    const a = 2;
    console.log(`In main ${a}`);
}

main(); // prints 2
console.log(`In global ${a}`); // prints 1
```

the ```a``` variable inside the function is changed to 2, but after the function call, we can see that the ```a``` in the 
root scope is still 1. That's because the function declared the ```a``` variable inside its own scope only.

But besides functions or objects, we can actually declare a scope manually, and we can do that by putting any statement 
in curly braces ```{}``` and this is called a "block statement":

```javascript
const a = 1

function main() {
    const a = 2;
    console.log(`In main ${a}`);
}

{
    const a = 4;
    console.log(`In block statement ${a}`); // prints 4
}

main(); // prints 2
console.log(`In global ${a}`); // prints 1
```

With this syntax, the block statement will execute first, since it doesn't require anything to call it, it's basically a plain
JS syntax that's been put inside the curly braces, and we are able to see that it does print 4 but does not affect any
other scopes.

One usage example is in switch cases. With switch cases, each case is not an actual scope. Meaning that if we declare a const 
in one case, and we try to re-declare that same const in the second case, it will result in an error saying that the variable
was already declared in the first case:

```javascript
switch (a) {
    case 1:
        const result = a * 2;
        console.log(result);
        break;
    case 2:
        const result = a / 2;
        console.log(result);
        break;
    case 3:
        const result = a + 2;
        console.log(result);
        break;
}
```

Trying to run this will result in an error.

So to avoid that, we can apply the block statement syntax into each of the cases, which will prevent from JS to fail over
the re-declaration of the const:

```javascript
switch (a) {
    case 1: {
        const result = a * 2;
        console.log(result);
        break;
    }
    case 2: {
        const result = a / 2;
        console.log(result);
        break;
    }
    case 3: {
        const result = a + 2;
        console.log(result);
        break;
    }
}
```


## The "In" Keyword

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/inKeyword.js)

the ```in``` keyword allows us to check, using an if statement, whether a property exists on an object.

This could also be done with this syntax:

```javascript
if (person.name) {
    console.log("Has truthy name value");
}
```

but the problem with this syntax is that it would also return false if ```person.name``` existed but was equal to 0 or an empty string.

The ```in``` keyword's only purpose is to check whether an object's property exists, and it doesn't care what the value 
of that property is:

```javascript
if ("name" in person) {
    console.log("Has name property");
}
```

Of course if we would run the delete statement:

```javascript
delete person.name;

if ("name" in person) {
    console.log("Has name property");
}
```

The if statement will not get accessed because the property has been deleted.


## Tagged Template Literals

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/taggedTemplateLiterals.js)

A template literal is basically the  "``" (back ticks) syntax where we are able to write some string but also add some dynamic values using the ```{}``` symbol. For example:

```javascript
const firstName = "shay";
const hobby = "weight lifting";

console.log(`My name is ${firstName} and i love ${hobby}`);
```

A tagged template literal is a unique syntax that is used in functions, which basically means that when we call a function
in JS, we can pass the template literal not as a function parameter but right after the function name. For example, instead of
logging the template literal, as shown in the previous example, now we will use the tagged template literal using a function:

```javascript
function custom() {
    return "hi";
}

const firstName = "shay";
const hobby = "weight lifting";

console.log(custom`My name is ${firstName} and i love ${hobby}`);
```

In this case the ```console.log``` will output "hi" instead of the string in the template literal.
Why is that? that's because the template literal is passed on to the function and not actually used as a string inside the
```console.log```. The function currently doesn't use this template literal and just returns "hi", which then outputs with the
```console.log```.

So how do we use the template literals in the function? The template literal is sent to the function not as a regular parameter,
but it is actually split into several parameters, when it is passed to a parameter as tagged template literal instead of a regular
parameter.

The first parameter is the template literal string, only that this string is split into an array of strings that do not 
include the dynamic values such as the ```${firstName}``` and ```${hobby}```. The string is split before and after any dynamic
value, so if we were to print the value of this first parameter (let's call it ```strings```) like this:

```javascript
function custom(strings) {
    console.log(strings);
    return "hi";
}
```

We would get the following strings array as output:

```bash
[ 'My name is ', ' and i love ', '' ]
```

After the ```strings``` parameter, we will have access to each of the dynamic values in that template literal and each 
of those values will get its own parameter in the function, so we can access them like so:

```javascript
function custom(strings, name, hobby) {
    console.log(name);
    console.log(hobby);
    return "hi";
}
```

And this will output in the console:

```bash
shay
weight lifting
```

Sometimes we might not know how many dynamic values will be inside the template literal. For that case Javascript allows 
us to use the spread operator (```...```) in the second parameter, making all the dynamic values sit together inside an array:

```javascript
function custom(strings, ...values) {
    console.log(values);
    return "hi";
}
```

This will output:

```bash
[ 'shay', 'weight lifting' ]
```

This lets us modify the template literal string in the ```custom``` function, For example, adding a ```<strong>``` tag 
for each dynamic value:

```javascript
function custom(strings, ...values) {
    return values.reduce((finalString, value, index) => {
        return `${finalString}<strong>${value}</strong>${strings[index+1]}`
    }, strings[0]);
}
```


## Generator Functions

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/generatorFunctions.js)

We are all aware of a standard JS function syntax that might return some value at the end:

```javascript
function myFunc() {
    const myVal = "value";
    
    return myVal;
}
```

The generator functions syntax is a bit different from the standard syntax. 

To create a generator function we need to use this syntax instead:

```javascript
function* generatorFunction() {
    console.log("before 1");
    yield 1;
    console.log("after 1");
    console.log("before 2");
    yield 2;
    console.log("after 2");
    console.log("before 3");
    yield 3;
    console.log("after 3");
}
```

Basically by using the ```*``` keyword along with the ```function``` keyword will tell JS that this is a generator function.

The generator function works a bit differently than normal functions. As you can see from the example above, this function
has no return statement, but instead uses ```yield```.

The way this function works is every time it is called, it will go through the function logic until it reaches a ```yield``` statement.
When the function reached a ```yield```, it will stop the function run and will memorize where it stopped. It will then return
an object that indicates the ```yield``` value (which is on the right on the ```yield``` statement) with an indication if
it reached the line of the function.

Calling the function is also not the standard way of calling a function. We must first initialize the generator function by calling it regularly:

```javascript
const generator = generatorFunction();
```

And then, to start actually calling and receiving values back from the function, we must call the ```next()``` method, like so:

```javascript
console.log(generator.next())
```

By calling the ```next()``` method above and log it to the console, we get the following output:

```bash
before 1
{ value: 1, done: false }
```

Basically, it went through the function line by line, executing everything until it reaches the first ```yield```. 
When the first ```yield``` is reached, the function will return the object that indicates the state of the function, as mentioned above:

```javascript
{ value: 1, done: false }
```

Now if we run it again with ```next()```, we will get the following results:

```bash
after 1
before 2
{ value: 2, done: false }
```

Because the function is aware of its last state, it will start running from the point after the first ```yield``` and will 
now stop at the second ```yield``` which its value is 2. So we get back the object, but now the ```value``` key is 2, corresponding to 
the ```yield``` value.

On the fourth ```next()``` call, it already passed the third and last ```yield```, but it still has some ```console.log()``` code
to run, so it will run it from after the last ```yield```, it will log the ```after 3``` text and then return the following value:

```javascript
{ value: undefined, done: true }
```

The reason the ```value``` key is now ```undefined``` is because at the last run, there was no ```yield``` keyword, so the
value was reset back to ```undefined``` and also the ```done``` key is now set to ```true``` because it reached the last code line
in that function.

A good usage for a generator function can be for generating IDs:

```javascript
function* idGenerator() {
    let id = 1;

    while (true) {
        yield id;
        id++
    }
}
```

This simple example is basically incrementing the ID by one each time the ```next()``` function is called. Since it's an infinite
```while``` loop, we can use as many ```next()``` as we would like to and it will never return a ```done: true```.


## Dynamically imported modules

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/dynamicModuleImport.js)

Let's say we have a simple function that gets exported as a module:

```javascript
export default function printModule() {
    console.log("this is a module");
}
```

Or in node.js (CommonJS):

```javascript
module.exports = function printModule() {
    console.log("this is a module");
}
```

Which then gets imported and called in another file:

```javascript
import printModule from "./dynamicModuleImport";

console.log("in main file");

printModule();
```

This is all standard syntax, where we have a module and we import it at the top of the file that needs to use that module.

But what if we only need that module imported when a certain case is met, and not all the time? For that, JS allows us to
import modules dynamically in certain areas in the code. This way we will not need to import that module file always, just
when it is absolutely needed.

You may think that this syntax may work:

```javascript
if (true) {
    import printModule from "./module";
    printModule();
}
```

But this will actually break the application, since the ```import * from *``` syntax can only be used at the root level of a file.

Instead, JS lets us use an ```improt()``` function which will return a promise with the entire module that was exported,
hence, we can treat is as a promise and chain a ```then()``` method to the ```import()``` method. An example for that:

```javascript
if (true) {
    import("./module.js").then(({default: printModule}) => {
        printModule();
    })
}
console.log("in main file");
```

As we can see, we use the ```import()``` function, giving it the path to the module file as a parameter (this must include the entire path including the ```.js``` extension).
We then use the ```then()``` method since importing a module is asynchronous and returns a promise. Inside that ```then()```
method, the callback function gets the module as a parameter, but in our case we destructured that module object to only use the
default function, and we gave that default function an alias of the function name which is ```printModule```.
Inside the callback function we can now call that function, which in return will print the text.

One thing to note is that since importing the module that way is asynchronous, if we use callback functions instead of ```async/await```,
the code will continue running in this file, meaning that the result that will get printed is:

```bash
in main file
this is a module
```

because the ```console.log("in main file");``` runs before the import promise has finished.

A "real life" usage for this can be if we have a very big module and we only want to import a single function from it when
a there is a click in the HTML page:

```javascript
document.addEventListener('click', () => {
    import("./module.js").then(({default: printModule}) => {
        printModule();
    })
});

console.log("in main file");
```

We can also use the ```async/await``` approach to import the module:

```javascript
document.addEventListener('click', async () => {
    const { default: printModule} = await import("./module.js");
    printModule();
});

console.log("in main file");
```

This will make sure the execution of ```printModule()``` happens first and only then, it will run the ```console.log("in main file");```


## Loop Labels

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/loopLabels.js)

Let's consider this code:

```javascript
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
        console.log(`i = ${i}, j = ${j}`);
    }
}
```

In this example, we can see that we have a nested loop inside another loop, and for each of the outer loop iteration,
it will go over the entire inner loop, resulting in the following output:

```bash
i = 0, j = 0
i = 0, j = 1
i = 0, j = 2
i = 1, j = 0
i = 1, j = 1
i = 1, j = 2
i = 2, j = 0
i = 2, j = 1
i = 2, j = 2
i = 3, j = 0
i = 3, j = 1
i = 3, j = 2
```

let's say we want to check, if ```i``` is equal to 1, we do not want to execute the inner loop. Beside checking it in the
outer loop (let's assume we can't for this example), we can do the following:

```javascript
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1) {
            continue;
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}
```

But the problem with this, is that although it will not execute any of the code in the inner loop except the ```continue```,
it will still need to enter this inner loop and check if ```i``` is 1 again.

One approach to solve this is by using labels. Labels are basically a way to tag each loop in some sort of variable which
we can use like this:

```javascript
outerLoop: for (let i = 0; i < 4; i++) {
    innerLoop: for (let j = 0; j < 3; j++) {
        if (i === 1) {
            continue outerLoop;
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}
```

As we can see from this piece of code, the way of labeling each loop is by declaring a variable name before the loop is declared,
and add ```:``` to it to declare that the variable ```outerLoop``` for example is our outer loop.

We can then use this label along with the ```continue``` keyword in order to tell JS that we want to cut the process not only for the
inner function, but also the outer function, making it jump to the next value which is ```i = 2```.

This can also work with the ```break``` keyword if we want to stop the run completely for a certain loop.

Beside loops, block scopes can also have labels, so for example if we have this code:

```javascript
myScope: {
    console.log('before break');
    break myScope;
    console.log('after break');
}
```

The scope will run until it reaches the ```break``` statement and will exit the execution for that scope, so we end up with this output:

```bash
before break
```

Note that a simple ```break``` statement will not work inside a scope as a standalone, it must use a label in order for it
to actually exit the scope code.


## Object.freeze

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/objectFreeze.js)

Let's assume we have this code:

```javascript
const person = {
    name: 'shay',
    age: 29,
    favoriteFood: "pizza"
}

console.log(person);
person.name = "john";
console.log(person);
```

As we can probably tell, by setting a different value to the ```person.name``` property of the ```person``` object, we are
able to change this value and the second ```console.log``` would output the updated object. (although this is ```const```, the value
of the ```const``` is not the object, but the reference to that object in the memory. So by changing the object properties,
we are still not changing the memory address of that object that is set on the const, and therefore it is a legal operation).

But sometimes we want the object that was set to keep all of its original values without the option to later change those values
in the code. 

To do that we can simply declare the ```person``` object with the ```Object.freeze()``` method:

```javascript
const person = Object.freeze({
    name: 'shay',
    age: 29,
    favoriteFood: "pizza"
});

console.log(person);
person.name = "john";
console.log(person);
```

And now, even though we allegedly changed the ```name``` property, the output will actually still be:

```bash
{ name: 'shay', age: 29, favoriteFood: 'pizza' }
{ name: 'shay', age: 29, favoriteFood: 'pizza' }
```

One thing to note is that the ```name``` property assignment will still be a legal operation, even though it does not affect
the object in any way.

If we do want to the code to break when assigning a new value to a property of a frozen object, we can use the ```"use string"```
keyword at the start of the file:

```javascript
"use strict";

const person = Object.freeze({
    name: 'shay',
    age: 29,
    favoriteFood: "pizza"
});

console.log(person);
person.name = "john";
console.log(person);
```

And now when we try to run this, we will end up with the following error:

```bash
TypeError: Cannot assign to read only property 'name' of object '#<Object>'
    at Object.<anonymous> (E:\my projects\advanced-js\objectFreeze.js:10:13)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47
```

When using ```Object.freeze()``` it will disable the option to change all the immediate properties of that object, but if we
have a nested object like so:

```javascript
const person = Object.freeze({
    name: 'shay',
    age: 29,
    favoriteFood: "pizza",
    address: {
        street: 123
    }
});

console.log(person);
person.name = "john";
person.address.street = 6587;
console.log(person);
```

It will actually let us change that nested object's properties, so the output will show different results:

```bash
{
  name: 'shay',
  age: 29,
  favoriteFood: 'pizza',
  address: { street: 123 }
}
{
  name: 'shay',
  age: 29,
  favoriteFood: 'pizza',
  address: { street: 6587 }
}
```

So if we do want to also freeze the nested object, we will need to call ```Object.freeze()``` on the nested object as well:

```javascript
const person = Object.freeze({
    name: 'shay',
    age: 29,
    favoriteFood: "pizza",
    address: Object.freeze({
        street: 123
    })
});
```

The ```Object.freeze``` also works on arrays, so if we add an array of hobbies to the initial object:

```javascript
const person = Object.freeze({
    name: 'shay',
    age: 29,
    favoriteFood: "pizza",
    address: Object.freeze({
        street: 123
    }),
    hobbies: Object.freeze(['eating', 'sleeping'])
});
```

By using the ```Object.freeze``` on that array, it will prevent us from later mutate this array by doing stuff like 
a ```push()``` function to this array. Note that when freezing an array and trying to use ```push()``` on it, the code will
actually break on run-time even without the ```"use strict"``` usage.


## Object.freeze

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/map.js)


Let's assume we have the following code:

```javascript
const CURRENCY_MAP = {
    "United States": "USD",
    India: "Rupee"
}

const currency = CURRENCY_MAP["United States"];

console.log(currency);
```

In this code, we are mapping currencies based on the name of the country.
Technically, this code works and we can use this to pull data on a specific key. But it becomes an issue
if we want to loop through it, it becomes un-intuitive and messy.

To solve this, we can use the ```new Map()``` instead of imperatively declaring the map like above.

To create the same map we did above, but instead using the ```Map``` class, we can write:

```javascript
const CURRENCY_MAP = new Map([
    ["United States", "USD"],
    ["India", "Rupee"]
]);

console.log(CURRENCY_MAP);
```

The ```Map``` constructor can get a 2 dimensional array that will hold the currency values. Each currency array will have the
first key as the name of the region, and the second key will have the currency name.

So when we ```console.log``` this map, we will get the following output:

```bash
Map(2) { 'United States' => 'USD', 'India' => 'Rupee' }
``` 

So basically the ```Map``` class converted each of the currency arrays to be a key->value pair where the key is the first
index and the value is the second index.

We can also use the ```Map``` method called ```set``` in order to add key->value pairs into it:

```javascript
const CURRENCY_MAP = new Map();

CURRENCY_MAP.set("United States", "USD");
CURRENCY_MAP.set("India", "Rupee");
```

Both approaches will have the same result, but ```set``` lets us set values dynamically, because sometimes when we declare
the ```Map``` we don't yet know what all the key->value pairs will be.

Another thing we can do with ```set``` is we can make an entire object be the key in the key->value pair, for example:

```javascript
CURRENCY_MAP.set({name: "United States"}, "USD");

console.log(CURRENCY_MAP);
```

When outputting it to the console, we get the following:

```bash
Map(1) { { name: 'United States' } => 'USD' }
```

We can also declare that object as a variable and only then set it as the key:

```javascript
const usa = {name: "United States"}
CURRENCY_MAP.set(usa, "USD");
```

Beside the ```set``` method, we also have a ```get``` method. This method will fetch a value from the map, based on the key
that is sent to the ```get``` function as a parameter.

Since we saw that the key can be an object as well, we can pass the same object to the ```get``` function and this will return
the value for that key:

```javascript
const usa = {name: "United States"}
CURRENCY_MAP.set(usa, "USD");

console.log(CURRENCY_MAP.get(usa));
```

This will output the value which is ```USD```.

With ```Map``` we can also simply use the ```forEach``` function on the ```CURRENCY_MAP``` variable, and this will fetch 
the key->value pairs in a form of a regular array:

```javascript
CURRENCY_MAP.forEach((value, key) => {
    console.log(key, value);
})
```

Which will output:

```bash
{ name: 'United States' } USD
```


## Array set

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/arraySet.js)

Let's assume we have this array:

```javascript
const uniqueNumbers = [1, 234, 234, 45];
```

As indicated by the variable name, this array should have unique numbers. But in this case we have two numbers that are 
identical.

JS gives an option to use a class named ```Set```. This class gets an array in its constructor and makes sure there are no
duplicated items in the array. If an array is given and it has duplicated items, it will remove one of the duplicated items:

```javascript
const uniqueNumbers = [1, 234, 234, 45];

const set = new Set(uniqueNumbers);

console.log(set);
```

When we log the output, this is what the ```Set``` returns:

```bash
Set(3) { 1, 234, 45 }
```

the ```Set``` has several useful functions, for example:

```javascript
set.has(1);
```

Will check if there is a value "1" inside the set. Since the array that we passed to the ```Set``` includes "1", it will 
return true.

We can also use:

```javascript
set.delete(1);
```

Which will remove the value "1" from the set.


## Binary Math

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/binaryMath.js)

Let's assume we have this code:

```javascript
console.log(0.1 + 0.2);
```

Intuitively we might think that the result will be: ```0.3```, but instead the output will actually be: 
```0.30000000000000004```.

The reason it returns this value, is because when we deal with decimal numbers, the computer translates those numbers to
binary, and when it does so, the decimal numbers are actually translated to an infinite number. That's the reason why when 
we do ```.33333333 + .66666666``` we won't actually get "1" as a result, but instead something very close to "1".

This is important to remember especially if we use ```if``` statements on decimal numbers. We must take into consideration
that when we do ```if(x === .35)``` we might get a false statement because ```x``` actually equaled to ```.350000005```.

So one solution is to write the ```if``` statement as ```if(x >= .35005 && x <= .36000)```.

## Debugging tips

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/debugging.js)

Let's assume we have some code that takes a while to run:

```javascript
console.log('before');
for (let i = 0; i < 1000000000; i++) {

}
console.log('after');
```

The ```after``` output will print a few moments after the ```before``` output.

But if we want to tell how much time did it take for it to run, we can use 2 ```console``` functions which are called ```time()``` 
and ```timeEnd()```. The ```time()``` function we put before the code runs and ```timeEnd()``` will be called after the code
ran.

Both ```time()``` and ```timeEnd()``` will need a parameter which will be the "label" of time check. This will allow JS know
that we track a certain time between one label to another.

So in our case we can do:

```javascript
console.time('Timer');
for (let i = 0; i < 1000000000; i++) {

}
console.timeEnd('Timer');
```

And instead of printing ```Timer``` to the console twice, it will only print it once after the run time reached the ```timeEnd()```
function, and it will also indicate how much time did it take the code to run between the ```time()``` and ```timeEnd()``` functions:

```bash
Timer: 804.997ms
```

_________________

Let's assume we have this code: 

```javascript
const x = 2;
if (x !== 1) console.log("X is not 1");
```

Instead of just printing a log to the console, we can print it as and error:

```javascript
if (x !== 1) console.error("X is not 1");
```

Or also a warning:

```javascript
if (x !== 1) console.warn("X is not 1");
```

But we can also use a console function called ```assert```, that will accept a condition as the first parameter, 
and if that condition is false, it will print whatever we put in the second parameter:

```javascript
const x = 2;
console.assert(x === 1, "X did not equal to 1");
```

Since ```x``` is not 1, this will output the following:

```bash
Assertion failed: X did not equal to 1
```

_____

Let's assume we have the following code:

```javascript
const people = [
    {name: "Shay", age: 29},
    {name: "Yossi", age: 14},
    {name: "Avrum", age: 87},
];

console.log(people);
```

This will print the following:

```bash
[
  { name: 'Shay', age: 29 },
  { name: 'Yossi', age: 14 },
  { name: 'Avrum', age: 87 }
]
```

But sometimes outputting this way can show the data in a pretty unorganized way inside the console. Instead we can use the
```table()``` console function:

```javascript
console.table(people);
```

This will output the data in a much nicer way:

```bash
┌─────────┬─────────┬─────┐
│ (index) │  name   │ age │
├─────────┼─────────┼─────┤
│    0    │ 'Shay'  │ 29  │
│    1    │ 'Yossi' │ 14  │
│    2    │ 'Avrum' │ 87  │
└─────────┴─────────┴─────┘
```

____

One more debugging trick is to use the ```debuger``` keyword. Whenever this keyword is used, when running the JS code, it
will stop the run on the line where the ```debugger``` keyword is in.

This allows us to check the variables' value in real time and will also allow us to go line-by-line in the browser which will
let us review how the code runs when running the script and will visualize each variable and its current value.


## Closures

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/closures.js)

Let's assume we have this piece of code:

```javascript
const myName = "shay";

function printName() {
    console.log(myName)
}

printName();
```

As we can see from the code, the function prints the ```myName``` variable, even though the variable is not inside the scope
of the function. 

This in JS, is what's called a closure. The fact that a function can access variables outside its scope is not something
that a lot of programming languages allowed, but it is allowed in JS and, again, it's called a closure.

In general, in JS, every scope in the code will have access to any code that is outside its scope. The code example above
is two scopes, one is the root scope where we set the ```myName``` variable and the second scope is the code inside the
```printName``` function.

If we run this code:

```javascript
let myName = "shay";

function printName() {
    console.log(myName)
}

myName = "Yossi";

printName();
```

The ```printName()``` function will print ```Yossi```, because even if the variable was ```shay``` when the function was declared,
When the function is called, it will actually look for the current value of the ```myName``` variable, even if the function was
already declared before changing ```myName``` to ```Yossi```.

Usually when closures are referred to by people they actually talk about functions inside other functions,
like this syntax:

```javascript
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log("Outer variable: ", outerVariable);
        console.log("Inner variable: ", innerVariable);
    }
}

const newFunction = outerFunction("outside");

newFunction("inside");
```

As we can see, we have an ```outerFunction()``` which gets a parameter that returns an ```innerFunction()``` that also
gets a parameter.

After the function declaration, we first call the ```outerFunction()```, which returns a reference for the ```innerFunction()```
which we then call with: ```newFunction("inside");```.

When running this piece of code we get the following output:

```bash
Outer variable:  outside
Inner variable:  inside
```

When we think about it, this might look strange that the inner function was able to both output the inner variable but also
the outer variable. Logically, what should have happened is that the outer variable will be undefined when we call the inner 
function since it's allegedly no longer part of the outer function but a stand-alone function that gets a parameter.

But since JS allows closures, this is not the case. Since the inner function is part of the outer function scope, it will always 
keep track of the variables inside the outer function even if the outer function code has already completed executing long ago.

With this logic, if the outer function also includes variables inside it, the inner function will have access to those
variables at all time:

```javascript
function outerFunction(outerVariable) {
    const outerConst = 'im an outer variable';
    return function innerFunction(innerVariable) {
        console.log("Outer variable: ", outerVariable);
        console.log("Inner variable: ", innerVariable);
        console.log("Outer const: ", outerConst);
    }
}
```

When calling the inner function we would see:

```bash
Outer variable:  outside
Inner variable:  inside
Outer const:  im an outer variable
```


## Reference VS Value

[Script Link](https://github.com/kshayk/advanced-js-concepts/blob/main/referenceVsValue.js)

In JS, some data types are actually saved (passed) inside a variable not as their actual value, but as a reference to their location
in the memory.

Integers and strings are passed by value:

```javascript
// passed by value:
let a = 10;
let b = "hello";
let c = true;
```

Meaning that the variable itself actually holds the value of those data types. So basically and primitive data type will
be saved as a values to the variable.

If we do the following:

```javascript
let a = 10;

let d = a;
d = d+1;
```

Although we are referencing ```a``` as the value of ```d```, what we pass to ```d``` is actually the value of ```a``` and
not a reference of ```a```.

This means that if we change ```d``` later on in the code, the variable ```a``` will not be change because those are two
separate values for two separate variables.

Furthermore, if we run this code:

```javascript
let a = 10;
let d = a;

a = a +3;

console.log(d);
```

Even though we are referencing the ```a``` value inside the ```d``` variable, after ```d``` has been already set, changing
the ```a``` variable will not affect the ```d``` value in any way, because it has its own value at this point.

Now, if we declare the ```e``` variable with an array as the value:

```javascript
let e = [1, 2];
```

The value that will be stored in the ```e``` variable is actually a reference to the array in the memory. So it will look
something like that: ```<0x01>```

If we now declare an ```f``` variable that is referencing the ```e``` variable:

```javascript
let e = [1, 2];

let f = e;
```

If we then decide to update the ```e``` array:

```javascript
e.push(4);
```

When outputting the ```f``` variable, we can see that it was also changed:

```javascript
console.log(f);
```

Will output: ```[ 1, 2, 4 ]```

This is because the value inside ```f``` is actually the same memory reference to the array as ```e``` variable has, and 
unless ```f``` is set to be something else, when changing the array both with ```e.push()``` or ```f.push()```, both ```e```
and ```f``` will return the same updated array, because they are both connected to the same memory address and this is something
that can not be changed, unless one of then variables are set to something else completely.

If we decide to assign a difference array to ```e```:

```javascript
let e = [1, 2];

let f = e;

e = [5,6];

console.log(f);
```

We might think that outputting ```f``` will result in ```[5,6]``` because its value was set earlier as ```e``` but now ```e``` was changed. But actually,
since the address reference itself was saved on ```f```, if we then assign a completely new array to ```e```, it will create a new memory
address (```<0x02>```) since it is a new array, and assign it to ```e```, resulting in ```f``` still holding the address value of the original ```e``` address
which is ```<0x01>```.

Data types that are passed by reference is also something to take into consideration when checking equality between
two variables:

```javascript
let g = [4,5,6];
let h = g;

console.log(`g === h ${g === h}`);
console.log(`g == h ${g == h}`);
```

In this scenario the output will be:

```bash
g === h true
g == h true
```

Because ```g``` and ```h``` both share the same value, the memory address of they array.

On the contrary, if we have this piece of code:

```javascript
let i = [1,2];
let j = [1,2];

console.log(`i === j ${i === j}`);
console.log(`i == j ${i == j}`);
```

We will get this output:

```bash
i === j false
i == j false
```

The reason ```i``` and ```j``` are not equal, is because the value that is stored in ```i``` is one memory address reference, 
while the value that is stored in ```j``` is a different memory address reference, since they are both declaring brand-new arrays.

Beside arrays, objects and classes are also passed by reference when assigned to a variable, so all the logic explained above 
is also applicable for objects and classes.
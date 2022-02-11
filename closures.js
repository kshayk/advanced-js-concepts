let myName = "shay";

function printName() {
    console.log(myName)
}

myName = "Yossi";

printName();


function outerFunction(outerVariable) {
    const outerConst = 'im an outer variable';
    return function innerFunction(innerVariable) {
        console.log("Outer variable: ", outerVariable);
        console.log("Inner variable: ", innerVariable);
        console.log("Outer const: ", outerConst);
    }
}

const newFunction = outerFunction("outside");

newFunction("inside");
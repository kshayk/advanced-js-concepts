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
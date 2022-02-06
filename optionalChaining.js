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
    console.log(person?.address?.street);
}

const Shay = new Person(
    "kyle",
    undefined,
    ["programming", "reading", "writing"]
)

Shay.print();

// This method does not exist
Shay.printName?.();

// The cars array does not exist
console.log(Shay.cars?.[1]);

// printPersonStreet(Shay);
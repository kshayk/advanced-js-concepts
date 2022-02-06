const person = {
    name: "shay",
    age: 29
}

if (person.name) {
    console.log("Has truthy name value");
}

if ("name" in person) {
    console.log("Has name property");
}
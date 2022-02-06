const person = Object.freeze({
    name: 'shay',
    age: 29,
    favoriteFood: "pizza",
    address: Object.freeze({
        street: 123
    }),
    hobbies: Object.freeze(['eating', 'sleeping'])
});

console.log(person);
person.name = "john";
person.address.street = 6587;
person.hobbies.push('coding');
console.log(person);
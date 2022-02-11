console.time('Timer');
for (let i = 0; i < 1000000000; i++) {

}
console.timeEnd('Timer');

const x = 2;
console.assert(x === 1, "X did not equal to 1");

const people = [
    {name: "Shay", age: 29},
    {name: "Yossi", age: 14},
    {name: "Avrum", age: 87},
];

console.table(people);
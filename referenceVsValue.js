// pass by value:
let a = 10;
let b = "hello";
let c = true;

let d = a;

a = a +3;


let e = [1, 2];

let f = e;

e = [5,6];

console.log(f);

let g = [4,5,6]; // 0x01
let h = g; // 0x01

// equals true
console.log(`g === h ${g === h}`);
console.log(`g == h ${g == h}`);

let i = [1,2]; // 0x01
let j = [1,2]; // 0x02

// equals false
console.log(`i === j ${i === j}`);
console.log(`i == j ${i == j}`);
function custom(strings, ...values) {
    return values.reduce((finalString, value, index) => {
        return `${finalString}<strong>${value}</strong>${strings[index+1]}`
    }, strings[0]);
}

const firstName = "shay";
const hobby = "weight lifting";

console.log(custom`My name is ${firstName} and i love ${hobby}`);
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

const generator = generatorFunction();
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())

function* idGenerator() {
    let id = 1;

    while (true) {
        yield id;
        id++
    }
}

const idGeneratorFunc = idGenerator();
console.log(idGeneratorFunc.next());
console.log(idGeneratorFunc.next());
console.log(idGeneratorFunc.next());
console.log(idGeneratorFunc.next());
console.log(idGeneratorFunc.next());
console.log(idGeneratorFunc.next());
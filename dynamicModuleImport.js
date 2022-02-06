if (true) {
    import("./module.js").then(({default: printModule}) => {
        printModule();
    })
}
console.log("in main file");


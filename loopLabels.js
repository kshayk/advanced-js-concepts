outerLoop: for (let i = 0; i < 4; i++) {
    innerLoop: for (let j = 0; j < 3; j++) {
        if (i === 1) {
            continue outerLoop;
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}

myScope: {
    console.log('before break');
    break myScope;
    console.log('after break');
}
const CURRENCY_MAP = new Map();

const usa = {name: "United States"}
CURRENCY_MAP.set(usa, "USD");

CURRENCY_MAP.forEach((value, key) => {
    console.log(key, value);
})


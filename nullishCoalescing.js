function calculatePrice(price, taxes, description) {
    taxes = taxes ?? .05;
    const total = price * (1 + taxes);
    console.log(`%c${description} With Tax:%c $${total}`, 'font-weight: bold', 'color: green');
}

calculatePrice(100, 0.7, "Book");
calculatePrice(100, 0, "Book");
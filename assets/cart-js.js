// Function to display the current date and time
function displayDateTime() {
    const now = new Date();
    const time = document.querySelector(".datetime");
    time.innerHTML = ` ${now.toLocaleString()}`;
}

displayDateTime();

// Update date and time every second
setInterval(displayDateTime, 1000);
let cart = [];

// Function to save the cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        return cart;
    }
}

// Render the cart items to the DOM
function renderCart() {
    const cart = loadCart();
    const cartTableBody = document.querySelector('.table1 tbody');

    // Clear existing cart items
    cartTableBody.innerHTML = '';

    if (cart.length === 0) {
        // If the cart is empty, clear the totals and shipping info
        document.querySelector('.table2 tr:nth-child(1) td:nth-child(2)').innerText = `$0.00`;
        document.querySelector('.table2 tr:nth-child(2) td:nth-child(2)').innerText = `$0.00`;
        document.querySelector('.table2 tr:nth-child(3) td:nth-child(2)').innerText = `$0.00`;
        return;
    }

    // Render cart items
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="table-image"><img src="${item.image}" class="cartimage" alt="Image${index + 1}"></td>
            <td class="Item-name">${item.productname}</td>
            <td class="price">${item.price}</td>
            <td class="quantity">
            <button type="button" class="button-decrement" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button type="button" class="button-increment" data-index="${index}">+</button>
            </td>
            <td class="remove"><button type="button" class="buttonremove" data-index="${index}">Remove</button></td>
            <td class="total-value">${(item.price.replace('$', '') * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
        updateTotals(cart)
    }
    );
    // Add event listeners to the increment buttons
    const incrementButtons = document.querySelectorAll('.button-increment');
    incrementButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            incrementQuantity(index);
        });
    });

    // Add event listeners to the decrement buttons
    const decrementButtons = document.querySelectorAll('.button-decrement');
    decrementButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            decrementQuantity(index);
        });
    });
    // Add event listeners to the remove buttons
    const removeButtons = document.querySelectorAll('.buttonremove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromCart(index);
        });
    });


}

// Increment the quantity of an item in the cart
function incrementQuantity(index) {
    const cart = loadCart();
    cart[index].quantity++;
    saveCart(cart);
    renderCart();
}

// Decrement the quantity of an item in the cart
function decrementQuantity(index) {
    const cart = loadCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart(cart);
        renderCart();
    }
}

// Remove an item from the cart
function removeFromCart(index) {
    let cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// Update the totals (subtotal, shipping, grand total)
function updateTotals(cart) {
    const subtotal = cart.reduce((acc, item) => acc + (item.price.replace('$', '') * item.quantity), 0);
    const shipping = 15.00; // Assuming a fixed shipping cost
    const grandTotal = subtotal + shipping;

    document.querySelector('.table2 tr:nth-child(1) td:nth-child(2)').innerText = `$${subtotal.toFixed(2)}`;
    document.querySelector('.table2 tr:nth-child(2) td:nth-child(2)').innerText = `$${shipping.toFixed(2)}`;
    document.querySelector('.table2 tr:nth-child(3) td:nth-child(2)').innerText = `$${grandTotal.toFixed(2)}`;
}

// Initialize cart rendering on page load
document.addEventListener('DOMContentLoaded', renderCart);




// Function to display the current date and time
function displayDateTime() {
    const now = new Date();
    const time = document.querySelector(".datetime");
    time.innerHTML = `<strong>Current Date and time: </strong> ${now.toLocaleString()}`;
}

displayDateTime();

// Update date and time every second
setInterval(displayDateTime, 1000);


// Define the products
const products = [
    { id: 1, productname: 'Yoga Book', price: '40.00', image: "./resources/latproduct-1.jpg",quantity: 1 },
    { id: 2, productname: 'Cushion', price: '65.00', image: "./resources/latproduct-2.jpg" ,quantity: 1},
    { id: 3, productname: 'Yoga Mat', price:'39.00', image: "./resources/latproduct-3.jpg",quantity: 1 },
    { id: 4, productname: 'Amethyst Ring', price: '190.00', image: "./resources/la.jpg" ,quantity: 1},
    { id: 5, productname: 'Sage Stick', price: '70.00', image: "./resources/featprod.jpeg",quantity: 1 },
    { id: 6, productname: 'Water bottle', price: '50.00', image: "./resources/la6.jpg",quantity: 1 }
];

let cart = [];

// Function to render products to the DOM
function renderProducts() {
    const productCards = document.querySelectorAll('.product-card1, .product-card2, .product-card3');
    productCards.forEach((card, index) => {
        const product = products[index];
        if (product) {
            card.querySelector('.product-name').innerHTML = product.productname;
            card.querySelector('.product-price').innerHTML = '$' +product.price;
            card.querySelector('.product-image').setAttribute('src', product.image);
            const addCartButton = card.querySelector('.buttoncart');
            addCartButton.setAttribute('data-id', product.id);
            addCartButton.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        }
    });
}


//Call function to render values to webpage
renderProducts();

// Update the cart count
function updateCartCount(cart){
    const cartCountElement = document.getElementById('cart-count');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (itemCount > 0) {
        cartCountElement.textContent = itemCount;
        cartCountElement.style.display = 'block';
    } else {
        cartCountElement.style.display = 'none';
    }
}

// Function to save the cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount(cart);
        return cart;
    }
}

// Function to update the cart quantity
function updateCart(cart) {
    let itemMap = new Map();
    let existingItem = null;

    // Process each item in the cart
    cart.forEach(item => {
        if (itemMap.has(item.id)) {
            // If the item ID is already in the map, increment the quantity
            existingItem = itemMap.get(item.id);
            existingItem.quantity += 1;
            itemMap.set(item.id, existingItem);
        } else {
            // If the item ID is not in the map, add it
            itemMap.set(item.id, { ...item });
        }
    });

    // Convert the map back to an array
     cart = Array.from(itemMap.values());
    saveCart(cart);
    console.log(cart);

}


// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    saveCart(cart);
    updateCartCount(cart);
    updateCart(cart);
    //alert("Product added!");  
}


// Initialize cart rendering on page load
document.addEventListener('DOMContentLoaded', loadCart);
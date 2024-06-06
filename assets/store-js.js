// Function to display the current date and time
function displayDateTime() {
    const now = new Date();
    const time = document.querySelector(".datetime");
    time.innerHTML = ` ${now.toLocaleString()}`;
}

displayDateTime();

// Update date and time every second
setInterval(displayDateTime, 1000);


// Define the products
const products = [
    { id: 1, productname: 'Yoga Book', price: '$40.00', image: "./resources/latproduct-1.jpg",quantity: 1 },
    { id: 2, productname: 'Cushion', price: '$65.00', image: "./resources/latproduct-2.jpg" ,quantity: 1},
    { id: 3, productname: 'Yoga Mat', price:' $39.00', image: "./resources/latproduct-3.jpg",quantity: 1 },
    { id: 4, productname: 'Product 4', price: '$20.00', image: "./resources/latproduct-3.jpg" ,quantity: 1},
    { id: 5, productname: 'Product 5', price: '$70.00', image: "./resources/latproduct-3.jpg",quantity: 1 },
    { id: 6, productname: 'Product 6', price: '$20.00', image: "./resources/latproduct-3.jpg",quantity: 1 }
];

let cart = [];

// Function to render products to the DOM
function renderProducts() {
    const productCards = document.querySelectorAll('.product-card1, .product-card2, .product-card3');
    productCards.forEach((card, index) => {
        const product = products[index];
        if (product) {
            card.querySelector('.product-name').innerHTML = product.productname;
            card.querySelector('.product-price').innerHTML = product.price;
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

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    console.log(cart);
    cart.push(product);
    console.log(cart);
    saveCart();
    alert("Product added!,Click 'Cart' tab to see your cart");
}


// Initialize cart rendering on page load
document.addEventListener('DOMContentLoaded', loadCart);
// Initialize empty cart
let cart = [];

// DOM Elements
const productGrid = document.querySelector('.grid-cols-1');
const serviceGrid = document.querySelector('.grid-cols-1.md\\:grid-cols-2');
const cartCount = document.querySelector('.fa-shopping-cart + span');

// Sample product data (will be replaced with admin portal integration)
const sampleProducts = [
    {
        id: 1,
        name: "Premium Phone Case",
        category: "Cases",
        price: 24.99,
        image: "case.jpg"
    },
    {
        id: 2,
        name: "Fast Charger",
        category: "Chargers",
        price: 19.99,
        image: "charger.jpg"
    },
    {
        id: 3,
        name: "Tempered Glass",
        category: "Screen Protectors",
        price: 12.99,
        image: "protector.jpg"
    }
];

// Sample service data
const sampleServices = [
    {
        id: 1,
        name: "Screen Replacement",
        description: "Professional screen replacement with warranty",
        price: 59.99,
        duration: "1 hour"
    },
    {
        id: 2,
        name: "Battery Replacement",
        description: "Genuine battery replacement",
        price: 39.99,
        duration: "45 mins"
    }
];

// Render products
function renderProducts() {
    productGrid.innerHTML = sampleProducts.map(product => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="bg-gray-100 h-48 flex items-center justify-center">
                <i class="fas fa-mobile-alt text-4xl text-gray-400"></i>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-2">${product.category}</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-gray-800">$${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id}, 'product')" 
                            class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render services
function renderServices() {
    serviceGrid.innerHTML = sampleServices.map(service => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="bg-gray-100 h-48 flex items-center justify-center">
                <i class="fas fa-tools text-4xl text-gray-400"></i>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-1">${service.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${service.description}</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-gray-800">$${service.price.toFixed(2)}</span>
                    <button onclick="bookService(${service.id})" 
                            class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addToCart(id, type) {
    const item = type === 'product' 
        ? sampleProducts.find(p => p.id === id)
        : sampleServices.find(s => s.id === id);
    
    cart.push({...item, type});
    updateCartCount();
    alert(`${item.name} added to cart!`);
}

// Book service function
function bookService(id) {
    const service = sampleServices.find(s => s.id === id);
    alert(`Booking initiated for ${service.name}. Redirecting to booking page...`);
    // In full implementation would redirect to booking form
}

// Update cart count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderServices();
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
});

// Save cart to localStorage before page unload
window.addEventListener('beforeunload', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
});
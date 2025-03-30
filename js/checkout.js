// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsEl = document.getElementById('order-items');
    const emptyCartMsg = '<p class="text-gray-500 py-4">Your cart is empty</p>';
    
    // Display cart items or empty message
    if (cart.length === 0) {
        orderItemsEl.innerHTML = emptyCartMsg;
        return;
    }

    // Calculate and display order summary
    let subtotal = 0;
    orderItemsEl.innerHTML = cart.map(item => {
        subtotal += item.price;
        return `
            <div class="flex justify-between py-3 border-b">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `;
    }).join('');

    // Update totals
    const shipping = 5.00;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.querySelector('[data-subtotal]').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('[data-shipping]').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('[data-tax]').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('[data-total]').textContent = `$${total.toFixed(2)}`;

    // Handle form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button during processing
        const submitBtn = paymentForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i> Processing Payment...
        `;

        // Simulate payment processing (2 second delay)
        setTimeout(() => {
            // On success:
            // 1. Clear cart
            localStorage.removeItem('cart');
            // 2. Show success message
            alert('Payment successful! Thank you for your purchase.');
            // 3. Redirect to home
            window.location.href = 'index.html';
        }, 2000);
    });

    // Form validation
    paymentForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('border-red-500');
                input.classList.add('border-green-500');
            } else {
                input.classList.remove('border-green-500');
                input.classList.add('border-red-500');
            }
        });
    });
});

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
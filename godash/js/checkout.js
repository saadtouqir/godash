async function loadOrderSummary() {
    const summaryList = document.getElementById("summary-items-list");
    const summaryTotal = document.getElementById("summary-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        window.location.href = 'products.html';
        return;
    }

    try {
        const itemCounts = {};
        cart.forEach(id => {
            itemCounts[id] = (itemCounts[id] || 0) + 1;
        });

        const uniqueIds = Object.keys(itemCounts);
        const productPromises = uniqueIds.map(id => 
            fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
        );

        const products = await Promise.all(productPromises);
        
        let subtotal = 0;
        summaryList.innerHTML = "";

        products.forEach(product => {
            const qty = itemCounts[product.id];
            const itemTotal = product.price * qty;
            subtotal += itemTotal;

            const row = document.createElement("div");
            row.classList.add("item-row");
            row.innerHTML = `
                <span>${product.title} (x${qty})</span>
                <span>$${itemTotal.toFixed(2)}</span>
            `;
            summaryList.appendChild(row);
        });

        summaryTotal.textContent = `$${subtotal.toFixed(2)}`;
        
        // Save subtotal for next steps (delivery cost calculation)
        localStorage.setItem("orderSubtotal", subtotal.toFixed(2));

    } catch (error) {
        console.error("Error loading summary:", error);
    }
}

// FORM VALIDATION
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const message = document.getElementById('checkout-message');

    // Basic Validation
    if (cardNumber.length < 16) {
        showMessage("Invalid card number. Must be 16 digits.", false);
        return;
    }

    if (!expiry.includes('/')) {
        showMessage("Invalid expiry date format (MM/YY).", false);
        return;
    }

    if (cvv.length < 3) {
        showMessage("Invalid CVV.", false);
        return;
    }

    // If valid, save data and redirect
    const checkoutData = { fullName, email, address };
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

    showMessage("Details verified! Redirecting to delivery scheduling...", true);
    
    setTimeout(() => {
        window.location.href = 'delivery.html';
    }, 1500);
});

function showMessage(msg, isSuccess) {
    const message = document.getElementById('checkout-message');
    message.textContent = (isSuccess ? "✅ " : "❌ ") + msg;
    message.className = isSuccess ? "response-success" : "response-error";
    message.classList.remove('hidden');
}

// Pre-fill if user is logged in
window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('full-name').value = user.username;
        document.getElementById('email').value = user.email;
    }
    loadOrderSummary();
};
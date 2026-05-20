async function loadCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("cart-subtotal");
    const totalElement = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="font-size: 18px; color: #666;">Your cart is empty.</p>
                <a href="products.html" class="shop-btn" style="display: inline-block; margin-top: 20px;">Start Shopping</a>
            </div>
        `;
        subtotalElement.textContent = "$0.00";
        totalElement.textContent = "$0.00";
        checkoutBtn.disabled = true;
        return;
    }

    cartItemsContainer.innerHTML = "<p>Loading your items...</p>";

    try {
        // Group items by ID and count quantities
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
        cartItemsContainer.innerHTML = "";

        products.forEach(product => {
            const qty = itemCounts[product.id];
            const itemTotal = product.price * qty;
            subtotal += itemTotal;

            const itemRow = document.createElement("div");
            itemRow.classList.add("cart-item");
            itemRow.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <div class="item-details">
                    <h4>${product.title}</h4>
                    <p>$${product.price}</p>
                    <button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn" onclick="updateQty(${product.id}, -1)">-</button>
                    <span>${qty}</span>
                    <button class="qty-btn" onclick="updateQty(${product.id}, 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemRow);
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
        checkoutBtn.disabled = false;

        checkoutBtn.onclick = () => {
            window.location.href = 'checkout.html';
        };

    } catch (error) {
        console.error("Error loading cart:", error);
        cartItemsContainer.innerHTML = "<p>Error loading cart. Please try again.</p>";
    }
}

function updateQty(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (change > 0) {
        cart.push(productId);
    } else {
        const index = cart.indexOf(productId);
        if (index > -1) {
            cart.splice(index, 1);
        }
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount(); // from app.js
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(id => id !== productId);
    
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount(); // from app.js
}

document.addEventListener("DOMContentLoaded", loadCart);
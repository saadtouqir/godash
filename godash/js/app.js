// This file contains the JavaScript code for handling the shopping cart functionality on the GoDash frontend. 
// It includes functions to add products to the cart, update the cart count, 
// and store the cart data in localStorage. 
// The cart data is persisted across page reloads, allowing users to maintain 
// their shopping cart state as they navigate the site.
function addToCart(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Item added to cart");
}

function updateAuthLink() {
    const authLink = document.getElementById('auth-nav-link');
    const user = JSON.parse(localStorage.getItem('user'));

    if (authLink) {
        if (user) {
            authLink.textContent = `Logout (${user.username})`;
            authLink.href = "#";
            authLink.onclick = () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            };
        } else {
            authLink.textContent = "Login";
            authLink.href = "auth.html";
            authLink.onclick = null;
        }
    }
}

function updateCartCount() {
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

updateCartCount();
updateAuthLink();

// NEWSLETTER LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;

            // Simulated response
            newsletterMessage.style.color = "#10b981"; // Success green
            newsletterMessage.textContent = `✅ Success! ${email} has been subscribed.`;
            
            newsletterForm.reset();
            
            setTimeout(() => {
                newsletterMessage.textContent = "";
            }, 5000);
        });
    }
});
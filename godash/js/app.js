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

function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    document.getElementById("cart-count")
        .textContent = cart.length;
}

updateCartCount();
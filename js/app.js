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
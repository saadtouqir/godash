
const API_URL = "https://dummyjson.com/products";

const productsContainer =
    document.getElementById("products-container");

const searchInput =
    document.getElementById("search-input");

let allProducts = [];

async function fetchProducts() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        allProducts = data.products;

        displayProducts(allProducts);

    } catch (error) {

        console.error("Error fetching products:", error);

        productsContainer.innerHTML =
            "<p>Failed to load products.</p>";
    }
}

function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.slice(0, 8).forEach(product => {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
        
            <img 
                src="${product.thumbnail}" 
                alt="${product.title}"
                loading="lazy"
            >

            <div class="product-info">

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

        productsContainer.appendChild(card);

    });
}

searchInput.addEventListener("input", () => {

    const value =
        searchInput.value.toLowerCase();

    const filteredProducts =
        allProducts.filter(product =>
            product.title
            .toLowerCase()
            .includes(value)
        );

    displayProducts(filteredProducts);
});

fetchProducts();

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
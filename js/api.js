const API_URL = "https://dummyjson.com/products";

const productsContainer =
    document.getElementById("products-container");

const searchInput =
    document.getElementById("search-input");

const categoryTitle = 
    document.getElementById("category-title");

let allProducts = [];

async function fetchProducts() {

    try {
        // Check if we are on the products page and if a category is selected
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        let fetchUrl = API_URL;
        if (category) {
            fetchUrl = `${API_URL}/category/${category}`;
            if (categoryTitle) {
                categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
            }
        }

        const response = await fetch(fetchUrl);
        const data = await response.json();
        allProducts = data.products;

        // On homepage, we only show 8. On products page, we show all.
        const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
        displayProducts(allProducts, isHomePage ? 8 : allProducts.length);

    } catch (error) {
        console.error("Error fetching products:", error);
        if (productsContainer) {
            productsContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        }
    }
}

function displayProducts(products, limit = null) {
    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (products.length === 0) {
        productsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    const productsToDisplay = limit ? products.slice(0, limit) : products;

    productsToDisplay.forEach(product => {

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

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(value)
        );
        displayProducts(filteredProducts);
    });
}

fetchProducts();
// This file contains the JavaScript code for fetching and displaying products from the DummyJSON API. 
// It includes functions to fetch products, display them on the page, and handle search functionality. 
// The code also checks for category filters in the URL and updates the displayed products accordingly.
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
        const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname.includes("index");
        displayProducts(allProducts, isHomePage ? 8 : allProducts.length);

        if (isHomePage) {
            renderBestSellers(allProducts);
            renderTrendingDeal(allProducts);
        }

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
            <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                <img 
                    src="${product.thumbnail}" 
                    alt="${product.title}"
                    loading="lazy"
                >
            </a>
            <div class="product-info">
                <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                    <h3>${product.title}</h3>
                </a>
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

function renderBestSellers(products) {
    const container = document.getElementById("best-sellers-container");
    if (!container) return;

    // Sort by rating and take top 4
    const sorted = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
    
    container.innerHTML = "";
    sorted.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
            </a>
            <div class="product-info">
                <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                    <h3>${product.title}</h3>
                </a>
                <p>⭐ ${product.rating}</p>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderTrendingDeal(products) {
    const container = document.getElementById("trending-container");
    if (!container) return;

    // Find product with highest discount
    const bestDeal = [...products].sort((a, b) => b.discountPercentage - a.discountPercentage)[0];

    if (bestDeal) {
        container.innerHTML = `
            <div class="deal-banner" style="background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bestDeal.thumbnail}'); background-size: cover; background-position: center; cursor: pointer;" onclick="window.location.href='product.html?id=${bestDeal.id}'">
                <div style="padding: 60px;">
                    <span style="background: #ef4444; color: white; padding: 5px 15px; border-radius: 50px; font-weight: bold; font-size: 14px;">HOT DEAL</span>
                    <h3 style="font-size: 36px; margin: 15px 0;">Save ${Math.round(bestDeal.discountPercentage)}% on ${bestDeal.title}</h3>
                    <p style="font-size: 20px; margin-bottom: 25px;">Limited time offer for our NSW customers.</p>
                    <button class="shop-btn" style="border: none;">Grab it Now</button>
                </div>
            </div>
        `;
    }
}

async function fetchRecentlyViewed() {
    const rawIds = localStorage.getItem("recentlyViewed");
    const recentlyViewedIds = JSON.parse(rawIds) || [];
    
    console.log("HOMEPAGE: Checking Recently Viewed...");
    console.log("Found in LocalStorage:", rawIds);

    const container = document.getElementById("recently-viewed-container");
    const section = document.getElementById("recently-viewed-section");

    if (!container || !section) {
        console.error("CRITICAL: Recently Viewed HTML elements missing from index.html!");
        return;
    }

    if (recentlyViewedIds.length === 0) {
        console.log("INFO: Recently Viewed is empty. Visit a product detail page first.");
        section.style.display = "none";
        return;
    }

    // Show the section since there are items
    section.style.display = "block";
    container.innerHTML = "<p>Loading recently viewed items...</p>";

    try {
        const products = [];
        
        for (const id of recentlyViewedIds) {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    products.push(data);
                }
            } catch (err) {
                console.warn(`Could not fetch product ${id}:`, err);
            }
        }

        if (products.length === 0) {
            section.style.display = "none";
            return;
        }
        
        container.innerHTML = "";
        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                    <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
                </a>
                <div class="product-info">
                    <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                        <h3>${product.title}</h3>
                    </a>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
            container.appendChild(card);
        });
        console.log("SUCCESS: Recently Viewed rendered successfully.");

    } catch (error) {
        console.error("FATAL: Error in fetchRecentlyViewed main loop:", error);
        section.style.display = "none";
    }
}

// Initialize Homepage Features
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("recently-viewed-container")) {
        console.log("DEBUG: Recently Viewed container found, starting fetch...");
        fetchRecentlyViewed();
    }
    fetchProducts();
});
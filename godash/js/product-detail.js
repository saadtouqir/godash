async function fetchProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const container = document.getElementById("product-detail");

    if (!productId) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }

    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();

        container.innerHTML = `
            <div class="product-image-large">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>

            <div class="product-info-detailed">
                <span class="product-category">${product.category}</span>
                <h2>${product.title}</h2>
                <p class="product-rating">★ ${product.rating} / 5.0</p>
                <p class="product-price">$${product.price}</p>
                <p class="product-description">${product.description}</p>
                
                <button class="add-to-cart-big" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

                <div style="margin-top: 20px; font-size: 14px; color: #666;">
                    <p><strong>Brand:</strong> ${product.brand}</p>
                    <p><strong>Stock:</strong> ${product.stock} units available</p>
                </div>
            </div>
        `;

        document.title = `${product.title} | GoDash`;

        // Add to recently viewed
        addToRecentlyViewed(product.id);

    } catch (error) {
        console.error("Error fetching product details:", error);
        container.innerHTML = "<p>Error loading product details. Please try again.</p>";
    }
}


function addToRecentlyViewed(productId) {
    if (!productId) return;

    // Convert ID to string for consistent storage
    const idString = productId.toString();
    
    let recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // Filter out existing and convert all to strings for comparison
    recentlyViewed = recentlyViewed.map(id => id.toString()).filter(id => id !== idString);

    // Add to the beginning
    recentlyViewed.unshift(idString);

    // Keep only the last 5 items
    recentlyViewed = recentlyViewed.slice(0, 5);

    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    console.log("SUCCESS: Added to Recently Viewed storage:", idString);
    console.log("Current Storage State:", recentlyViewed);
}

fetchProductDetail();
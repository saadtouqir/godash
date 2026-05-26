/* =============================================
   bestsellers.js — GoDash Best Sellers Page
   Fetches from DummyJSON API
   ============================================= */

const API_BASE = "https://dummyjson.com/products";
const PAGE_SIZE = 12;

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let activeCategory = "all";
let activeSort = "rating";

// ── Category → DummyJSON category slug mapping ──
const CATEGORY_MAP = {
  beauty:      "beauty",
  fragrances:  "fragrances",
  furniture:   "furniture",
  groceries:   "groceries",
  electronics: "laptops",   // closest electronics category in DummyJSON
};

// ── Fetch ──────────────────────────────────────
async function fetchProducts(category = "all") {
  showLoading(true);

  try {
    let url;
    if (category === "all") {
      // grab a good mix — fetch 100 products across multiple popular categories
      const cats = Object.values(CATEGORY_MAP);
      const fetches = cats.map(c =>
        fetch(`${API_BASE}/category/${c}?limit=30`).then(r => r.json())
      );
      const results = await Promise.all(fetches);
      allProducts = results.flatMap(r => r.products);
    } else {
      const slug = CATEGORY_MAP[category] || category;
      const res = await fetch(`${API_BASE}/category/${slug}?limit=50`);
      const data = await res.json();
      allProducts = data.products;
    }

    // Best sellers = rating >= 4.5, sorted by rating desc by default
    allProducts = allProducts.filter(p => p.rating >= 4.0);

    // Update stat counter
    document.getElementById("total-products").textContent = allProducts.length + "+";

    applySort();
  } catch (err) {
    console.error("Failed to fetch products:", err);
    showError();
  } finally {
    showLoading(false);
  }
}

// ── Sort ───────────────────────────────────────
function applySort() {
  filteredProducts = [...allProducts];

  switch (activeSort) {
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
      break;
  }

  currentPage = 1;
  renderGrid(true);
}

// ── Render ─────────────────────────────────────
function renderGrid(reset = false) {
  const grid = document.getElementById("bs-grid");
  if (reset) grid.innerHTML = "";

  const start = (currentPage - 1) * PAGE_SIZE;
  const end   = start + PAGE_SIZE;
  const slice = filteredProducts.slice(start, end);

  slice.forEach((product, idx) => {
    const globalIdx = start + idx;
    const card = createCard(product, globalIdx + 1);
    grid.appendChild(card);
  });

  // Load More button
  const loadBtn = document.getElementById("load-more-btn");
  const totalShown = currentPage * PAGE_SIZE;
  if (totalShown >= filteredProducts.length) {
    loadBtn.disabled = true;
    loadBtn.textContent = "All products loaded";
  } else {
    loadBtn.disabled = false;
    loadBtn.textContent = "Load More";
  }
}

// ── Card Builder ───────────────────────────────
function createCard(product, rank) {
  const card = document.createElement("div");
  card.className = "bs-card";

  // rank badge color
  let rankClass = "";
  if (rank === 1) rankClass = "gold";
  else if (rank === 2) rankClass = "silver";
  else if (rank === 3) rankClass = "bronze";

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const stars = generateStars(product.rating);
  const reviewCount = product.reviews ? product.reviews.length : Math.floor(Math.random() * 500 + 50);

  card.innerHTML = `
    <div class="bs-card-img-wrap">
      <span class="bs-rank-badge ${rankClass}">#${rank} Best Seller</span>
      <img 
        src="${product.thumbnail}" 
        alt="${product.title}"
        loading="lazy"
        onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'"
      />
    </div>
    <div class="bs-card-body">
      <div class="bs-card-category">${product.category}</div>
      <h3 class="bs-card-title">${product.title}</h3>
      <div class="bs-card-rating">
        <span class="bs-stars">${stars}</span>
        <span class="bs-rating-val">${product.rating.toFixed(1)}</span>
        <span class="bs-rating-count">(${reviewCount})</span>
      </div>
      <div class="bs-card-price-row">
        <span class="bs-price">$${product.price.toFixed(2)}</span>
        <span class="bs-price-original">$${originalPrice}</span>
        <span class="bs-discount-tag">-${Math.round(product.discountPercentage)}%</span>
      </div>
      <button class="bs-add-btn" data-id="${product.id}" onclick="addToCart(this, ${product.id}, '${escapeStr(product.title)}', ${product.price}, '${product.thumbnail}')">
        Add to Cart
      </button>
    </div>
  `;

  return card;
}

// ── Helpers ────────────────────────────────────
function generateStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

function escapeStr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function showLoading(show) {
  document.getElementById("bs-loading").style.display = show ? "block" : "none";
}

function showError() {
  const grid = document.getElementById("bs-grid");
  grid.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:60px;color:#6b7280;">
      <p style="font-size:2rem">😕</p>
      <p>Failed to load products. Please try again.</p>
      <button onclick="init()" style="margin-top:16px;padding:10px 24px;background:#2563eb;color:#fff;border:none;border-radius:8px;cursor:pointer;">Retry</button>
    </div>
  `;
}

// ── Add to Cart ────────────────────────────────
function addToCart(btn, id, title, price, thumbnail) {
  // Read existing cart
  let cart = JSON.parse(localStorage.getItem("godash-cart") || "[]");
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, title, price, thumbnail, qty: 1 });
  }
  localStorage.setItem("godash-cart", JSON.stringify(cart));

  // Update nav count
  updateCartCount();

  // Button feedback
  btn.textContent = "✓ Added!";
  btn.classList.add("added");
  setTimeout(() => {
    btn.textContent = "Add to Cart";
    btn.classList.remove("added");
  }, 1800);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("godash-cart") || "[]");
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = total;
}

// ── Event Listeners ────────────────────────────
function bindEvents() {
  // Category filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      fetchProducts(activeCategory);
    });
  });

  // Sort select
  document.getElementById("sort-select").addEventListener("change", e => {
    activeSort = e.target.value;
    applySort();
  });

  // Load more
  document.getElementById("load-more-btn").addEventListener("click", () => {
    currentPage++;
    renderGrid(false);
  });
}

// ── Init ───────────────────────────────────────
function init() {
  updateCartCount();
  bindEvents();
  fetchProducts("all");
}

document.addEventListener("DOMContentLoaded", init);
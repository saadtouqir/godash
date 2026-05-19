# GoDash Ecommerce Website — Complete Development Guide

## Project Overview

GoDash is a modern ecommerce website built for customers in NSW, Australia.

Main problem solved:
- Customers can choose their preferred delivery time.
- Customers can instantly view delivery costs.
- Customers can track their order progress with a live timer.

The project uses:
- HTML5
- CSS3
- JavaScript (ES6)
- DummyJSON API
- LocalStorage
- MongoDB Atlas (optional advanced feature)

---

# Phase 1 — Project Setup

---

## Step 1 — Create Project Folder Structure

Create the following structure inside VS Code.

```plaintext
godash/
│
├── index.html
├── products.html
├── product.html
├── cart.html
├── checkout.html
├── delivery.html
├── tracking.html
├── best-sellers.html
├── trending.html
├── wishlist.html
├── refund.html
├── feedback.html
├── about.html
├── contact.html
├── faq.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   ├── cart.css
│   ├── forms.css
│
├── js/
│   ├── app.js
│   ├── api.js
│   ├── cart.js
│   ├── checkout.js
│   ├── delivery.js
│   ├── tracking.js
│   ├── validation.js
│   ├── darkmode.js
│   └── feedback.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
│
└── data/
    └── fallback-products.json
```

---

## Step 2 — Initialize GitHub Repository

Open terminal:

```bash
git init
```

Create `.gitignore`

```plaintext
node_modules
.DS_Store
```

---

## Step 3 — Install VS Code Extensions

Recommended:
- Live Server
- Prettier
- ES7 JavaScript Snippets
- HTML CSS Support

---

# Phase 2 — Homepage Development

---

## Step 4 — Build Homepage Structure

Create:
- Header
- Navigation bar
- Hero section
- Featured products
- Trending section
- Newsletter
- Footer

Use semantic HTML:

```html
<header>
<nav>
<main>
<section>
<footer>
```

---

## Step 5 — Build Navigation Bar

Include:
- Home
- Products dropdown
- Best Sellers
- Trending Deals
- Claim Refund
- About Us
- Contact Us
- Cart

---

## Step 6 — Create Product Categories Dropdown

Required categories:
- Electronics
- Clothing
- Watches
- Perfumes
- Automotive
- Pet Supplies
- Sports

---

## Step 7 — Create Hero Section

Include:
- Main heading
- Short description
- Shop now button

Example:

```html
<h2>Fast Shopping with Smart Delivery Scheduling</h2>
```

---

# Phase 3 — API Integration

---

## Step 8 — Connect DummyJSON API

API:
https://dummyjson.com/products

Fetch products:

```javascript
async function fetchProducts() {

    const response =
        await fetch("https://dummyjson.com/products");

    const data =
        await response.json();

    console.log(data.products);
}
```

---

## Step 9 — Display Products Dynamically

For each product:
- Image
- Name
- Price
- Rating
- Add to Cart button

---

## Step 10 — Add Search Filtering

Create live search filtering:

```javascript
searchInput.addEventListener("input", () => {

});
```

---

## Step 11 — Add Error Handling

If API fails:
- Show fallback products
- Show error message

Create:
`data/fallback-products.json`

---

# Phase 4 — Product System

---

## Step 12 — Create Products Page

Features:
- Product grid
- Category filtering
- Search bar
- Loading spinner

---

## Step 13 — Create Product Detail Page

Include:
- Product image
- Price
- Description
- Rating
- Add to Cart button
- Recommended products

---

## Step 14 — Recently Viewed Products

Store product IDs in LocalStorage.

---

# Phase 5 — Cart System

---

## Step 15 — Create Cart Page

Features:
- Product list
- Quantity controls
- Remove item button
- Cart subtotal

---

## Step 16 — Add LocalStorage Cart Logic

Save cart:

```javascript
localStorage.setItem("cart", JSON.stringify(cart));
```

Load cart:

```javascript
JSON.parse(localStorage.getItem("cart"));
```

---

## Step 17 — Add Toast Notifications

Examples:
- Item added
- Item removed

---

# Phase 6 — Wishlist System

---

## Step 18 — Create Wishlist Page

Features:
- Save for later
- Remove wishlist item
- Move item to cart

Store in LocalStorage.

---

# Phase 7 — Checkout System

---

## Step 19 — Create Checkout Page

Required fields:
- Full Name
- Email
- Address
- Card Number
- Expiry Date
- CVV

---

## Step 20 — Add Form Validation

Validate:
- Empty fields
- Email format
- Card length
- CVV

Example:

```javascript
function validateEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}
```

---

# Phase 8 — Delivery Scheduling System

---

## Step 21 — Create Delivery Page

This is the UNIQUE FEATURE.

Include:
- Delivery date picker
- Delivery time slots
- Delivery type
- Delivery cost

---

## Step 22 — Add Calendar Input

```html
<input type="date">
```

---

## Step 23 — Add Delivery Time Slots

Example:
- 9 AM – 12 PM
- 12 PM – 3 PM
- 3 PM – 6 PM
- 6 PM – 9 PM

---

## Step 24 — Add Live Delivery Cost

Example:
- Standard = $5
- Express = $15

---

## Step 25 — Store Delivery Information

Save:
- Delivery date
- Delivery time
- Delivery type

Use LocalStorage.

---

# Phase 9 — Order Tracking System

---

## Step 26 — Create Tracking Page

Tracking stages:
1. Order Received
2. Packed
3. Out for Delivery
4. Delivered

---

## Step 27 — Create Progress Tracker UI

Use:
- Progress bar
- Active step indicators

---

## Step 28 — Add Countdown Timer

Example:
- 3 hours remaining

Use `setInterval()`.

---

# Phase 10 — Accessibility

---

## Step 29 — Add Accessibility Features

Required:
- Alt text
- ARIA labels
- Keyboard navigation
- Color contrast

Example:

```html
<button aria-label="Add to cart">
```

---

## Step 30 — Add Focus Styles

```css
button:focus {
    outline: 2px solid blue;
}
```

---

# Phase 11 — SEO Optimization

---

## Step 31 — Add Meta Tags

Every page:

```html
<meta name="description" content="GoDash ecommerce website">
```

---

## Step 32 — Proper Heading Structure

Use:
- One `<h1>`
- Multiple `<h2>`

---

## Step 33 — Use Semantic HTML

Required:
- header
- nav
- main
- section
- article
- footer

---

# Phase 12 — Core Web Vitals Optimization

---

## Step 34 — Optimize Images

Use:
- WebP format
- Compressed images

---

## Step 35 — Add Lazy Loading

```html
<img loading="lazy">
```

---

## Step 36 — Reduce Large JavaScript Files

Split JS:
- api.js
- cart.js
- checkout.js

---

## Step 37 — Responsive Design

Use:
- Flexbox
- CSS Grid
- Media queries

---

# Phase 13 — Additional Pages

---

## Step 38 — Create About Us Page

Include:
- Team members
- Mission statement
- Project goals

---

## Step 39 — Create Contact Us Page

Include:
- Contact form
- FAQ section
- Email support

---

## Step 40 — Create Feedback Page

Features:
- Name
- Email
- Rating
- Suggestions

---

## Step 41 — Create Refund Page

Include:
- Refund request form
- Refund policy

---

## Step 42 — Create FAQ Page

Common questions:
- Delivery
- Refund
- Payments
- Tracking

---

# Phase 14 — UI/UX Improvements

---

## Step 43 — Add Dark Mode

Use:
- Toggle button
- LocalStorage

---

## Step 44 — Add Hover Animations

Example:

```css
.product-card:hover {
    transform: translateY(-5px);
}
```

---

## Step 45 — Add Loading Spinner

Show while products load.

---

## Step 46 — Add Skeleton Loaders

Display placeholders before content loads.

---

# Phase 15 — Testing

---

## Step 47 — Browser Testing

Test:
- Chrome
- Safari
- Edge

---

## Step 48 — Mobile Testing

Test:
- iPhone
- Android
- Tablet

---

## Step 49 — Accessibility Testing

Use:
- Keyboard navigation
- Lighthouse accessibility audit

---

## Step 50 — Lighthouse Optimization

Target:
- Performance 90+
- Accessibility 90+
- SEO 90+

---

# Phase 16 — Final Submission

---

## Step 51 — Clean Code

Checklist:
- Remove unused code
- Remove console logs
- Proper indentation
- Add comments

---

## Step 52 — Push to GitHub

```bash
git add .
git commit -m "Final Project"
git push
```

---

## Step 53 — Prepare Presentation

Explain:
- Problem statement
- Features
- API integration
- Cart system
- Delivery scheduler
- Order tracker
- Accessibility
- SEO

---

# Recommended Development Order

1. Homepage
2. Products page
3. Product details
4. Cart
5. Checkout
6. Delivery scheduling
7. Tracking system
8. Additional pages
9. Accessibility
10. SEO
11. Testing
12. Final optimization

---

# Important Tips

## Keep Code Humanized

Avoid:
- Overengineering
- Complex frameworks
- Massive single JS files

Use:
- Clear variable names
- Simple logic
- Separate files

---

## Most Important Features

Your strongest features are:
- Delivery scheduling
- Live delivery pricing
- Order tracking timer

Focus heavily on these during presentation.

---

# Final Submission Checklist

## Must Have

- Responsive design
- API integration
- Cart system
- Validation
- Accessibility
- SEO
- Delivery scheduling
- Order tracking
- LocalStorage
- Mobile support

---

# Recommended Lighthouse Targets

| Category | Target |
|---|---|
| Performance | 90+ |
| Accessibility | 90+ |
| SEO | 90+ |
| Best Practices | 90+ |

---

# Recommended APIs

Products:
https://dummyjson.com/products

Search:
https://dummyjson.com/products/search?q=watch

Categories:
https://dummyjson.com/products/categories

---

# Recommended Submission Structure

## GitHub Repository

Include:
- README.md
- Screenshots
- Folder structure
- Installation guide

---

# README Sections

1. Project Overview
2. Features
3. Technologies Used
4. Installation
5. Usage
6. Screenshots
7. Team Members
8. References

---

# Final Goal

Build a modern ecommerce website that:
- Looks professional
- Works smoothly
- Solves real customer problems
- Demonstrates frontend development skills
- Passes university marking criteria
- Is easy to explain during presentation
const trendingdealsProductsContainer =
document.getElementById(
  "trendingdeals-products-container"
);

const trendingdealsCategoryButtons =
document.querySelectorAll(
  ".trendingdeals-btn"
);

const trendingdealsSortSelect =
document.getElementById(
  "trendingdeals-sort-select"
);

let trendingdealsProducts = [];

let trendingdealsFilteredProducts = [];

/* =========================
   FETCH PRODUCTS
========================= */

async function trendingdealsFetchProducts(){

  try{

    const trendingdealsResponse =
    await fetch(
      "https://dummyjson.com/products?limit=20"
    );

    const trendingdealsData =
    await trendingdealsResponse.json();

    trendingdealsProducts =
    trendingdealsData.products;

    trendingdealsFilteredProducts =
    [...trendingdealsProducts];

    trendingdealsDisplayProducts(
      trendingdealsFilteredProducts
    );

  }

  catch(error){

    console.log(
      "Error Fetching Products:",
      error
    );

  }

}

trendingdealsFetchProducts();

/* =========================
   DISPLAY PRODUCTS
========================= */

function trendingdealsDisplayProducts(products){

  trendingdealsProductsContainer.innerHTML =
  "";

  products.forEach((product) => {

    const trendingdealsOldPrice = (

      product.price /

      (
        1 -
        product.discountPercentage / 100
      )

    ).toFixed(2);

    const trendingdealsCard =
    document.createElement("div");

    trendingdealsCard.classList.add(
      "trendingdeals-card"
    );

    trendingdealsCard.innerHTML = `

      <div class="trendingdeals-image">

        <span class="trendingdeals-tag">

          ${Math.round(
            product.discountPercentage
          )}% OFF

        </span>

        <img
          src="${product.thumbnail}"
          alt="${product.title}"
        >

      </div>

      <div class="trendingdeals-content">

        <span class="trendingdeals-category">

          ${product.category}

        </span>

        <h3>

          ${product.title}

        </h3>

        <div class="trendingdeals-rating">

          ⭐ ${product.rating}

        </div>

        <div class="trendingdeals-price">

          <span class="trendingdeals-new-price">

            $${product.price}

          </span>

          <span class="trendingdeals-old-price">

            $${trendingdealsOldPrice}

          </span>

        </div>

        <button class="trendingdeals-cart-btn">

          Add To Cart

        </button>

      </div>

    `;

    trendingdealsProductsContainer
    .appendChild(trendingdealsCard);

  });

}

/* =========================
   CATEGORY FILTER
========================= */

trendingdealsCategoryButtons
.forEach((button) => {

  button.addEventListener("click", () => {

    trendingdealsCategoryButtons
    .forEach((btn) => {

      btn.classList.remove(
        "trendingdeals-active"
      );

    });

    button.classList.add(
      "trendingdeals-active"
    );

    const trendingdealsCategory =
    button.dataset.category;

    if(
      trendingdealsCategory === "all"
    ){

      trendingdealsFilteredProducts =
      [...trendingdealsProducts];

    }

    else{

      trendingdealsFilteredProducts =
      trendingdealsProducts.filter(
        (product) => {

          return (
            product.category ===
            trendingdealsCategory
          );

        }
      );

    }

    trendingdealsSortProducts();

  });

});

/* =========================
   SORT PRODUCTS
========================= */

trendingdealsSortSelect
.addEventListener("change", () => {

  trendingdealsSortProducts();

});

function trendingdealsSortProducts(){

  const trendingdealsSortValue =
  trendingdealsSortSelect.value;

  if(
    trendingdealsSortValue ===
    "discount"
  ){

    trendingdealsFilteredProducts.sort(
      (a,b) => {

        return (
          b.discountPercentage -
          a.discountPercentage
        );

      }
    );

  }

  else if(
    trendingdealsSortValue ===
    "price-low"
  ){

    trendingdealsFilteredProducts.sort(
      (a,b) => {

        return a.price - b.price;

      }
    );

  }

  else if(
    trendingdealsSortValue ===
    "price-high"
  ){

    trendingdealsFilteredProducts.sort(
      (a,b) => {

        return b.price - a.price;

      }
    );

  }

  trendingdealsDisplayProducts(
    trendingdealsFilteredProducts
  );

}

/* =========================
   DARK MODE
========================= */

const trendingdealsDarkModeButton =
document.getElementById(
  "trendingdeals-darkmode-btn"
);

trendingdealsDarkModeButton
.addEventListener("click", () => {

  document.body.classList.toggle(
    "trendingdeals-darkmode"
  );

});
const vendorCards = document.querySelectorAll(".vendor-card");
const vendorProductsArea = document.getElementById("vendor-products-area");
const selectedVendorTitle = document.getElementById("selected-vendor-title");
const selectedVendorNote = document.getElementById("selected-vendor-note");
const vendorProductGrid = document.getElementById("vendor-product-grid");

const API = "http://127.0.0.1:8000";

vendorCards.forEach((card) => {
  card.addEventListener("click", () => {
    const vendor = card.dataset.vendor;
    showVendorProducts(vendor);
  });
});

async function showVendorProducts(vendor) {
  vendorProductGrid.innerHTML = "<p>Loading products...</p>";
  vendorProductsArea.classList.add("active");
  vendorProductsArea.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const response = await fetch(`${API}/products/vendor/${encodeURIComponent(vendor)}`);
    const vendorProducts = await response.json();

    selectedVendorTitle.textContent = `${vendor} Products`;
    selectedVendorNote.textContent =
      "You can only order from one vendor at a time. To switch vendors, please clear your cart first.";

    vendorProductGrid.innerHTML = "";

    if (vendorProducts.length === 0) {
      vendorProductGrid.innerHTML = "<p>No products found for this vendor.</p>";
      return;
    }

    vendorProducts.forEach((product) => {
      const startingPrice = getStartingPrice(product);

      const card = document.createElement("a");
      card.href = `product.html?id=${product.id}`;
      card.className = "shop-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="shop-card-content">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <span class="starting-price">From ${formatNaira(startingPrice)}</span>
        </div>
      `;

      vendorProductGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Failed to load products:", error);
    vendorProductGrid.innerHTML = "<p>Could not load products. Make sure the API is running.</p>";
  }
}

function getStartingPrice(product) {
  const sizePrices = product.sizes?.map((size) => Number(size.price)) || [];
  const extraPrices = product.extras?.map((extra) => Number(extra.price)) || [];

  const lowestSize = sizePrices.length > 0 ? Math.min(...sizePrices) : 0;
  const lowestExtra = extraPrices.length > 0 ? Math.min(...extraPrices) : 0;

  return lowestSize + lowestExtra;
}

function formatNaira(amount) {
  return "₦" + Math.round(Number(amount || 0)).toLocaleString();
}
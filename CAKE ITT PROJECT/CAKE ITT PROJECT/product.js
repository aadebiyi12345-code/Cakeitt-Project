const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const API = "http://127.0.0.1:8000";

const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");

const flavourBox = document.getElementById("flavour-box");
const flavourSelect = document.getElementById("flavour");

const sizeBox = document.getElementById("size-box");
const sizeSelect = document.getElementById("size");

const extraBox = document.getElementById("extra-box");
const extraSelect = document.getElementById("extra");

const messageBox = document.getElementById("message-box");
const cakeMessage = document.getElementById("cake-message");

const quantityInput = document.getElementById("quantity");
const productForm = document.getElementById("product-options-form");

let product = null;

async function loadProduct() {
  try {
    const response = await fetch(`${API}/products/${productId}`);
    const data = await response.json();

    if (!data || data.message === "Product not found") {
      showNotFound();
      return;
    }

    product = data;
    renderProduct();

  } catch (error) {
    console.error("Failed to load product:", error);
    showNotFound();
  }
}

function showNotFound() {
  document.querySelector(".product-detail-container").innerHTML = `
    <div class="product-not-found">
      <h1>Product Not Found</h1>
      <p>This product does not exist or may have been removed.</p>
      <a href="shop.html" class="hero-button">Back to Shop</a>
    </div>
  `;
}

function renderProduct() {
  document.title = `${product.name} | Cake Itt`;

  productImage.src = product.image;
  productImage.alt = product.name;
  productName.textContent = product.name;
  productDescription.textContent = product.description;

  loadTextOptions(product.flavours, flavourSelect, flavourBox);
  loadPricedOptions(product.sizes, sizeSelect, sizeBox);
  loadPricedOptions(product.extras, extraSelect, extraBox);

  if (!product.allowMessage) {
    messageBox.style.display = "none";
  }

  const priceDisplay = document.createElement("p");
  priceDisplay.className = "product-price-display";
  productForm.insertBefore(priceDisplay, productForm.querySelector(".product-add-btn"));

  updatePrice();

  sizeSelect.addEventListener("change", updatePrice);
  extraSelect.addEventListener("change", updatePrice);
  quantityInput.addEventListener("input", updatePrice);

  productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sizePrice = getSelectedPrice(sizeSelect);
    const extraPrice = getSelectedPrice(extraSelect);
    const quantity = Number(quantityInput.value) || 1;

    const unitPrice = sizePrice + extraPrice;
    const totalPrice = unitPrice * quantity;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingVendor = cart.length > 0 ? cart[0].vendor : null;

    if (existingVendor && existingVendor !== product.vendor) {
      const warningMessage = `You already have items from ${existingVendor}. Please clear your cart before ordering from ${product.vendor}.`;

      if (typeof showToast === "function") {
        showToast(warningMessage);
      } else {
        alert(warningMessage);
      }

      return;
    }

    const selectedProduct = {
      id: product.id,
      name: product.name,
      vendor: product.vendor,
      image: product.image,
      flavour: flavourBox.style.display === "none" ? "None" : flavourSelect.value,
      size: sizeBox.style.display === "none" ? "None" : sizeSelect.options[sizeSelect.selectedIndex].dataset.name,
      extra: extraBox.style.display === "none" ? "None" : extraSelect.options[extraSelect.selectedIndex].dataset.name,
      message: product.allowMessage ? cakeMessage.value : "",
      quantity: quantity,
      unitPrice: unitPrice,
      totalPrice: totalPrice
    };

    cart.push(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof updateCartCount === "function") {
      updateCartCount();
    }

    if (typeof renderCart === "function") {
      renderCart();
    }

    const cartPanel = document.getElementById("cart-panel");
    if (cartPanel) {
      cartPanel.classList.add("active");
    }

    const addButton = document.querySelector(".product-add-btn");
    addButton.textContent = "Added to Cart ✓";

    setTimeout(() => {
      addButton.textContent = "Add to Cart";
    }, 1500);
  });

  function updatePrice() {
    const sizePrice = getSelectedPrice(sizeSelect);
    const extraPrice = getSelectedPrice(extraSelect);
    const quantity = Number(quantityInput.value) || 1;

    const unitPrice = sizePrice + extraPrice;
    const totalPrice = unitPrice * quantity;

    priceDisplay.innerHTML = `
      <strong>Vendor:</strong> ${product.vendor}<br>
      <strong>Price:</strong> ${formatNaira(unitPrice)} each<br>
      <strong>Total:</strong> ${formatNaira(totalPrice)}
    `;
  }
}

loadProduct();

function loadTextOptions(options, selectElement, boxElement) {
  if (!options || options.length === 0) {
    boxElement.style.display = "none";
    return;
  }

  selectElement.innerHTML = "";

  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });
}

function loadPricedOptions(options, selectElement, boxElement) {
  if (!options || options.length === 0) {
    boxElement.style.display = "none";
    return;
  }

  selectElement.innerHTML = "";

  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option.price;
    optionElement.dataset.name = option.name;
    optionElement.textContent =
      option.price > 0
        ? `${option.name} - ${formatNaira(option.price)}`
        : option.name;

    selectElement.appendChild(optionElement);
  });
}

function getSelectedPrice(selectElement) {
  if (!selectElement || selectElement.parentElement.style.display === "none") {
    return 0;
  }

  return Number(selectElement.value) || 0;
}

function formatNaira(amount) {
  return "₦" + Math.round(Number(amount || 0)).toLocaleString();
}
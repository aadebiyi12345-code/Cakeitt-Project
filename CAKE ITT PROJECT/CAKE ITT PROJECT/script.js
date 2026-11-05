const cartToggle = document.getElementById("cart-toggle");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");
const clearCart = document.getElementById("clear-cart");
const checkout = document.getElementById("checkout");
const cartItemsList = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");

const VAT_RATE = 0.0243;
const BASE_DELIVERY_FEE = 1000;
const DELIVERY_INCREMENT = 500;
const DELIVERY_INCREMENT_THRESHOLD = 100000;

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function formatNaira(amount) {
  return "₦" + Math.round(Number(amount || 0)).toLocaleString();
}

function calculateDeliveryFee(subtotal) {
  const increments = Math.floor(subtotal / DELIVERY_INCREMENT_THRESHOLD);
  return BASE_DELIVERY_FEE + (increments * DELIVERY_INCREMENT);
}

function calculateCartTotals(cart) {
  const subtotal = cart.reduce((sum, item) => {
    return sum + Number(item.totalPrice || item.price || 0);
  }, 0);

  const vatAmount = subtotal * VAT_RATE;
  const deliveryFee = calculateDeliveryFee(subtotal);
  const finalTotal = subtotal + vatAmount + deliveryFee;

  return {
    subtotal,
    vatAmount,
    deliveryFee,
    finalTotal
  };
}

function updateCartCount() {
  const cart = getCart();

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + Number(item.quantity || 1);
  }, 0);

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }
}

function renderCart() {
  const cart = getCart();

  if (!cartItemsList) return;

  cartItemsList.innerHTML = "";

 if (cart.length === 0) {
  cartItemsList.innerHTML = `
    <li class="empty-cart-state">
      <strong>Your cart is empty.</strong><br>
      <span>Let’s add some sweet treats to your cart 😋</span>
    </li>
  `;
  updateCartCount();
  return;
}

  cart.forEach((item, index) => {
    const itemTotal = Number(item.totalPrice || item.price || 0);

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.name}</strong><br>
      <small>
  ${item.vendor ? `Vendor: ${item.vendor}<br>` : ""}
  ${item.flavour && item.flavour !== "None" ? `Flavour: ${item.flavour}<br>` : ""}
  ${item.size && item.size !== "None" ? `Size: ${item.size}<br>` : ""}
  ${item.extra && item.extra !== "None" ? `Option: ${item.extra}<br>` : ""}
  ${item.message ? `Message: ${item.message}<br>` : ""}
  Quantity: ${item.quantity || 1}<br>
  Price: ${formatNaira(itemTotal)}
</small>
      </div>

      <button class="remove-cart-item" data-index="${index}">Remove</button>
    `;

    cartItemsList.appendChild(li);
  });

  const totals = calculateCartTotals(cart);

  const totalLine = document.createElement("li");
  totalLine.className = "cart-total";
  totalLine.innerHTML = `
    <div>
      <strong>Subtotal:</strong> ${formatNaira(totals.subtotal)}<br>
      <strong>VAT (2.43%):</strong> ${formatNaira(totals.vatAmount)}<br>
      <strong>Delivery Fee:</strong> ${formatNaira(totals.deliveryFee)}<br>
      <strong>Total:</strong> ${formatNaira(totals.finalTotal)}
    </div>
  `;
  cartItemsList.appendChild(totalLine);

  const noteLine = document.createElement("li");
noteLine.className = "cart-note";
noteLine.innerHTML = "You can review your order before payment.";
cartItemsList.appendChild(noteLine);

  document.querySelectorAll(".remove-cart-item").forEach((button) => {
    button.addEventListener("click", function () {
      const index = Number(this.dataset.index);
      const cart = getCart();

      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
      updateCartCount();
    });
  });

  updateCartCount();
}

cartToggle?.addEventListener("click", (e) => {
  e.preventDefault();
  cartPanel?.classList.toggle("active");
  renderCart();
});

closeCart?.addEventListener("click", () => {
  cartPanel?.classList.remove("active");
});

clearCart?.addEventListener("click", (e) => {
  e.preventDefault();

  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cart");
    renderCart();
    updateCartCount();
  }
});

checkout?.addEventListener("click", () => {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    window.location.href = "order-summary.html";
  }
});

// Close cart when clicking outside
document.addEventListener("click", function (event) {
  if (!cartPanel || !cartToggle) return;

  if (
    cartPanel.classList.contains("active") &&
    !cartPanel.contains(event.target) &&
    !cartToggle.contains(event.target)
  ) {
    cartPanel.classList.remove("active");
  }
});

// Initial cart load
updateCartCount();
renderCart();

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4200);
}

const toastMessage = sessionStorage.getItem("toastMessage");

if (toastMessage) {
  showToast(toastMessage);
  sessionStorage.removeItem("toastMessage");
}

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Smoothly scroll to top on refresh/load for landing and shop pages
window.addEventListener("load", () => {
  if (window.location.hash) return;

  const page = window.location.pathname.split("/").pop();

  const shouldScrollToTop =
    page === "" ||
    page === "index.html" ||
    page === "shop.html";

  if (shouldScrollToTop) {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 300);
  }
});
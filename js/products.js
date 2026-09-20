/* ---------- PRODUCT DATA ---------- */
const products = [];
const categories = ["IC", "Processor", "Sensor", "Power"];
let id = 1;

categories.forEach(cat => {
  for (let i = 1; i <= 12; i++) {
    products.push({
      id: id++,
      name: `${cat} Product ${i}`,
      price: 1000 + i * 100,
      image: "images/default-products.png", // SAFE IMAGE
      category: cat
    });
  }
});

/* ---------- CATEGORY CLICK ---------- */
document.querySelectorAll(".category").forEach(card => {
  card.addEventListener("click", () => {
    const type = card.dataset.type;
    showProducts(type);
  });
});

/* ---------- SHOW PRODUCTS ---------- */
function showProducts(type) {
  const grid = document.getElementById("productGrid");
  const title = document.getElementById("categoryTitle");

  title.textContent = type + " Products";
  grid.innerHTML = "";

  products.filter(p => p.category === type).forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="btn">Add to Cart</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      addToCart(p);
    });

    grid.appendChild(div);
  });
}

/* ---------- ADD TO CART ---------- */
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "cart.html";
}

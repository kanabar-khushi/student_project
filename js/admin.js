// ======================
// ADMIN AUTH
// ======================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// LOGIN
function adminLogin() {
  const u = document.getElementById("adminUsername").value;
  const p = document.getElementById("adminPassword").value;

  if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    alert("Invalid Admin Credentials");
  }
}

// CHECK ADMIN ACCESS
function checkAdmin() {
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
  }
}

// LOGOUT
function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

// ======================
// LOAD ALL DATA
// ======================

function loadAllAdminData() {
  loadAdminProducts();
  loadRegisteredUsers();
  loadLoginHistory();
  loadOrders();
}

// ======================
// PRODUCT CRUD
// ======================

let editIndex = null;

function loadAdminProducts() {
  const grid = document.getElementById("adminProductGrid");
  const products = JSON.parse(localStorage.getItem("products")) || [];
  grid.innerHTML = "";

  products.forEach((p, i) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="editProduct(${i})">Edit</button>
        <button onclick="deleteProduct(${i})">Delete</button>
      </div>
    `;
  });
}

function addProduct() {
  const name = pName.value.trim();
  const price = pPrice.value.trim();
  const image = pImage.value.trim();

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (editIndex !== null) {
    products[editIndex] = { name, price, image };
    editIndex = null;
  } else {
    products.push({ name, price, image });
  }

  localStorage.setItem("products", JSON.stringify(products));
  clearProductForm();
  loadAdminProducts();
}

function editProduct(index) {
  const products = JSON.parse(localStorage.getItem("products"));
  const p = products[index];

  pName.value = p.name;
  pPrice.value = p.price;
  pImage.value = p.image;

  editIndex = index;
}

function deleteProduct(index) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  let products = JSON.parse(localStorage.getItem("products"));
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadAdminProducts();
}

function clearProductForm() {
  pName.value = "";
  pPrice.value = "";
  pImage.value = "";
}

// ======================
// REGISTERED USERS
// ======================

function loadRegisteredUsers() {
  const table = document.getElementById("usersTable");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  table.innerHTML = `
    <tr>
      <th>Username</th>
      <th>Email</th>
      <th>Contact</th>
    </tr>
  `;

  users
    .filter(u => u.role !== "admin")
    .forEach(u => {
      table.innerHTML += `
        <tr>
          <td>${u.username}</td>
          <td>${u.email}</td>
          <td>${u.contact}</td>
        </tr>
      `;
    });
}

// ======================
// LOGIN HISTORY
// ======================

function loadLoginHistory() {
  const table = document.getElementById("loginTable");
  const history = JSON.parse(localStorage.getItem("loginHistory")) || [];

  table.innerHTML = `
    <tr>
      <th>Username</th>
      <th>Login Time</th>
    </tr>
  `;

  history.forEach(h => {
    table.innerHTML += `
      <tr>
        <td>${h.user}</td>
        <td>${h.time}</td>
      </tr>
    `;
  });
}

// ======================
// ORDERS / PURCHASES
// ======================

function loadOrders() {
  const table = document.getElementById("ordersTable");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  table.innerHTML = `
    <tr>
      <th>Username</th>
      <th>Product</th>
      <th>Price</th>
      <th>Date</th>
    </tr>
  `;

  orders.forEach(o => {
    table.innerHTML += `
      <tr>
        <td>${o.username}</td>
        <td>${o.productName}</td>
        <td>₹${o.price}</td>
        <td>${o.date}</td>
      </tr>
    `;
  });
}

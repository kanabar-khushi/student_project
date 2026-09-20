let editId = null;

// ================= AUTH =================
function adminLogin(){
  if(adminUsername.value==="admin" && adminPassword.value==="admin@123"){
    localStorage.setItem("adminLoggedIn","true");
    location.href="admin.html";
  } else alert("Invalid Admin");
}

function checkAdmin(){
  if(localStorage.getItem("adminLoggedIn")!=="true"){
    location.href="admin-login.html";
  }
}
function adminLogout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

// ================= LOAD ALL =================
function loadAll(){
  loadProducts();
  loadUsers();
  loadLogins();
  loadOrders();
}

// ================= PRODUCTS =================
function addProduct(){
  let products=JSON.parse(localStorage.getItem("products"))||[];
  if(!pName.value||!pPrice.value) return alert("Fill fields");

  if(editId){
    let p=products.find(x=>x.id===editId);
    p.name=pName.value;
    p.price=pPrice.value;
    p.image=pImage.value;
    p.description=pDesc.value;
    editId=null;
  } else {
    products.push({
      id:Date.now(),
      name:pName.value,
      price:pPrice.value,
      image:pImage.value,
      description:pDesc.value
    });
  }
  localStorage.setItem("products",JSON.stringify(products));
  clearForm(); loadProducts();
}

function loadProducts(){
  let products=JSON.parse(localStorage.getItem("products"))||[];
  productTable.innerHTML="<tr><th>Name</th><th>Price</th><th>Action</th></tr>";
  products.forEach(p=>{
    productTable.innerHTML+=`
    <tr>
      <td>${p.name}</td>
      <td>₹${p.price}</td>
      <td>
       <button onclick="editProduct(${p.id})">Edit</button>
      <button onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>`;
  });
}

function editProduct(id){
  let p=JSON.parse(localStorage.getItem("products")).find(x=>x.id===id);
  pName.value=p.name;
  pPrice.value=p.price;
  pImage.value=p.image;
  pDesc.value=p.description;
  editId=id;
}

function deleteProduct(id){
  if(!confirm("Delete product?")) return;
  let products=JSON.parse(localStorage.getItem("products")).filter(p=>p.id!==id);
  localStorage.setItem("products",JSON.stringify(products));
  loadProducts();
}

function clearForm(){
  pName.value=pPrice.value=pImage.value=pDesc.value="";
}

// ================= USERS =================
function loadUsers(){
  let users=JSON.parse(localStorage.getItem("users"))||[];
  usersTable.innerHTML="<tr><th>Username</th><th>Email</th><th>Contact</th></tr>";
  users.forEach(u=>{
    usersTable.innerHTML+=`
    <tr>
      <td>${u.username}</td>
      <td>${u.email}</td>
      <td>${u.contact}</td>
    </tr>`;
  });
}

// ================= LOGIN HISTORY =================
function loadLogins(){
  let logins=JSON.parse(localStorage.getItem("loginHistory"))||[];
  loginTable.innerHTML="<tr><th>User</th><th>Time</th></tr>";
  logins.forEach(l=>{
    loginTable.innerHTML+=`
    <tr><td>${l.user}</td><td>${l.time}</td></tr>`;
  });
}

// ================= ORDERS =================
function loadOrders(){
  let orders=JSON.parse(localStorage.getItem("orders"))||[];
  orderTable.innerHTML="<tr><th>User</th><th>Product</th><th>Price</th><th>Date</th></tr>";
  orders.forEach(o=>{
    orderTable.innerHTML+=`
    <tr>
      <td>${o.user}</td>
      <td>${o.product}</td>
      <td>₹${o.price}</td>
      <td>${o.date}</td>
    </tr>`;
  });
}

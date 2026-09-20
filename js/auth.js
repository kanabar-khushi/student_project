// =========================
// AUTH.JS (FINAL – CLIENT + ADMIN SUPPORT)
// =========================

// ---------- REGISTER USER ----------
function registerUser() {
  const username = regUsername.value.trim();
  const password = regPassword.value;
  const email = regEmail.value.trim();
  const contact = regContact.value.trim();

  if (!username || !password || !email || !contact) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.username === username)) {
    alert("Username already exists");
    return;
  }

  users.push({
    username,
    password,
    email,
    contact,
    role: "client"
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! Please login.");
  window.location.href = "login.html";
}

// ---------- LOGIN USER ----------
function loginUser() {
  const username = loginUsername.value;
  const password = loginPassword.value;

  if (!username || !password) {
    alert("Enter both username and password");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("Invalid username or password");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  // ✅ FIXED LOGIN HISTORY
  let loginHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];
  loginHistory.push({
    username: user.username,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("loginHistory", JSON.stringify(loginHistory));

  alert("Login successful!");
  window.location.href = user.role === "admin"
    ? "admin/admin.html"
    : "index.html";
}

// ---------- SHOW PROFILE (CLIENT) ----------
function showProfile() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== "client") return;

  document.querySelectorAll(".login-link").forEach(el => el.style.display = "none");

  if (profileMenu) profileMenu.style.display = "block";
  if (welcomeUser) welcomeUser.innerText = "Welcome, " + user.username;
}

// ---------- LOGOUT ----------
function logout(isAdmin = false) {
  localStorage.removeItem("loggedInUser");
  if (isAdmin) {
    window.location.href = "../admin-login.html"; // ✅ FIXED
  } else {
    window.location.href = "login.html";
  }
}

// ---------- ADMIN PAGE PROTECTION ----------
function checkAdmin() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== "admin") {
    alert("Access denied");
    window.location.href = "../login.html";
  }
}

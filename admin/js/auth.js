// =========================
// AUTH.JS (FINAL)
// =========================

// REGISTER CLIENT
function registerUser() {
  const username = regUsername.value.trim();
  const password = regPassword.value;
  const email = regEmail.value.trim();
  const contact = regContact.value.trim();

  if (!username || !password || !email || !contact) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.username === username)) {
    alert("Username already exists");
    return;
  }

  users.push({ username, password, email, contact, role: "client" });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful");
  window.location.href = "login.html";
}

// CLIENT LOGIN
function loginUser() {
  const username = loginUsername.value;
  const password = loginPassword.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  // STORE LOGIN HISTORY
  let history = JSON.parse(localStorage.getItem("loginHistory")) || [];
  history.push({
    username: user.username,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("loginHistory", JSON.stringify(history));

  window.location.href = "index.html";
}

// ADMIN LOGIN
function adminLogin() {
  const u = adminUsername.value;
  const p = adminPassword.value;

  if (u === "admin" && p === "admin123") {
    localStorage.setItem("loggedInUser", JSON.stringify({
      username: "admin",
      role: "admin"
    }));
    window.location.href = "admin.html";
  } else {
    alert("Invalid admin credentials");
  }
}

// LOGOUT
function logout(isAdmin = false) {
  localStorage.removeItem("loggedInUser");
  window.location.href = isAdmin ? "admin-login.html" : "login.html";
}

// PROTECT ADMIN PAGE
function checkAdmin() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== "admin") {
    window.location.href = "admin-login.html";
  }
}

function placeOrder() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please login first!");
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  cartItems.forEach(item => {
    orders.push({
      username: user.username,        // ✅ FIXED
      productName: item.name,         // ✅ FIXED
      price: item.price,
      date: new Date().toLocaleString()
    });
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Thanks for your purchase!");
  localStorage.removeItem("cart");   // clear cart
  window.location.href = "products.html";
}

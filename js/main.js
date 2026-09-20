const grid = document.getElementById("productGrid");

products.forEach(product => {
  grid.innerHTML += `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">${product.price}</div>
        <button>View Details</button>
      </div>
    </div>
  `;
});

// js/products.js

let allProducts = [];

function displayProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="category">${product.category}</p>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://darling-backend.onrender.com/api/products')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      displayProducts(allProducts);
      setupFilters();
    });

});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}

function setupFilters() {
  const filterContainer = document.createElement('div');
  filterContainer.className = 'filter-container';
  filterContainer.innerHTML = `
    <label for="category-filter">Category:</label>
    <select id="category-filter">
      <option value="all">All</option>
      <option value="Shirts">Shirts</option>
      <option value="Shoes">Shoes</option>
      <option value="Bags">Bags</option>
      <option value="Dresses">Dresses</option>
      <option value="Jackets">Jackets</option>
    </select>

    <label for="sort-filter">Sort by Price:</label>
    <select id="sort-filter">
      <option value="default">Default</option>
      <option value="low">Low to High</option>
      <option value="high">High to Low</option>
    </select>
  `;

  const main = document.querySelector('main');
  main.insertBefore(filterContainer, document.getElementById('product-list'));

  document.getElementById('category-filter').addEventListener('change', applyFilters);
  document.getElementById('sort-filter').addEventListener('change', applyFilters);
}

function applyFilters() {
  const category = document.getElementById('category-filter').value;
  const sort = document.getElementById('sort-filter').value;

  let filtered = [...allProducts];

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}


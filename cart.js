// js/cart.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('../data/products.json')
    .then(res => res.json())
    .then(data => displayCart(data));

  function displayCart(products) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      totalDisplay.textContent = '';
      return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        total += product.price;
        cartHTML += `
          <div class="cart-item">
            <img src="${product.image}" alt="${product.name}" />
            <div>
              <h3>${product.name}</h3>
              <p>$${product.price.toFixed(2)}</p>
            </div>
          </div>
        `;
      }
    });

    cartItemsContainer.innerHTML = cartHTML;
    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
  }
});

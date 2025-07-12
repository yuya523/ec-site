fetch('/ec-site/data/products.json') // リポジトリ名に応じて調整
  .then(response => response.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const container = document.getElementById('cart-items');
    let total = 0;

    Object.keys(cart).forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        const quantity = cart[id];
        const subtotal = product.price * quantity;
        total += subtotal;

        const item = document.createElement('div');
        item.innerHTML = `
          <p>${product.name} × ${quantity}：¥${subtotal.toLocaleString()}</p>
        `;
        container.appendChild(item);
      }
    });

    const totalElem = document.createElement('p');
    totalElem.innerHTML = `<strong>合計：¥${total.toLocaleString()}</strong>`;
    container.appendChild(totalElem);
  });

document.getElementById('checkout-btn').addEventListener('click', () => {
  // GA4購入イベントをここに追加してもOK
  localStorage.removeItem('cart');
  window.location.href = 'thankyou.html';
});

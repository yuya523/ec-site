fetch('/ec-site/data/products.json') // リポジトリ名に応じて調整
  .then(response => response.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const container = document.getElementById('cart-items');
    let total = 0;

    Object.keys(cart).forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        const quantity = cart[productId];
        const price = product.price;
        totalValue += price * quantity;

        const item = document.createElement('div');
        item.innerHTML = `
          <p>${product.name} × ${quantity}：¥${totalValue.toLocaleString()}</p>
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
    window.location.href = 'thankspage.html';
});
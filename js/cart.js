document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartList = document.getElementById('cart-list');
  const totalPriceEl = document.getElementById('total-price');
  const purchaseBtn = document.getElementById('purchase-btn');

  fetch('/ec-site/data/products.json')
    .then(res => res.json())
    .then(products => {
      let totalValue = 0;

      Object.keys(cart).forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          const quantity = cart[productId];
          const price = product.price;
          const subtotal = price * quantity;
          totalValue += subtotal;

          // カート内商品をHTMLに表示
          const li = document.createElement('li');
          li.textContent = `${product.name} - ${quantity}個 - ${price}円 × ${quantity} = ${subtotal}円`;
          cartList.appendChild(li);
        }
      });

      totalPriceEl.textContent = `合計金額：${totalValue.toLocaleString()}円`;
    });

  purchaseBtn.addEventListener('click', () => {
    // thankspage.html に遷移（GA4イベント送信はそちらで処理）
    window.location.href = 'thankspage.html';
  });
});

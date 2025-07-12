// 商品一覧の読み込み
fetch('/ec-site/data/products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('product-list');

    products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'product-item';

      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2>${product.name}</h2>
        <p>¥${product.price.toLocaleString()}</p>
        <p>${product.description}</p>
        <button data-id="${product.id}">カートに入れる</button>
      `;

      container.appendChild(item);
    });
  })
  .catch(error => console.error('商品データの読み込みエラー:', error));

// ▼ カートに入れる処理（fetchの外）
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
    const productId = e.target.dataset.id;
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('カートに追加しました');

    // ▼ GA4イベント送信（オプション）
    if (window.gtag) {
      gtag('event', 'add_to_cart', {
        items: [{ item_id: productId }]
      });
    }
  }
});
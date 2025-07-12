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

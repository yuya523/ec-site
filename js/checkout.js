document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    // 簡単なバリデーション
    if (!name || !email) {
      alert('お名前とメールアドレスは必須です。');
      return;
    }

    // localStorageに保存（thankspageで使う用）
    localStorage.setItem('customer', JSON.stringify({
      name,
      email,
      address
    }));

    // サンクスページに遷移
    window.location.href = 'thankspage.html';
  });
});

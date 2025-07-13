// UUIDを生成
function generateUUID() {
  return crypto.randomUUID();
}

document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const customer = {
    user_id: generateUUID(),
    name: document.getElementById('lastname').value + ' ' + document.getElementById('firstname').value,
    email: document.getElementById('email').value,
    tel: document.getElementById('tel').value,
    zipcode: document.getElementById('zipcode').value,
    pref: document.getElementById('pref').value,
    address1: document.getElementById('address1').value,
    address2: document.getElementById('address2').value,
    delivery_date: document.getElementById('delivery_date')?.value || '',
    note: document.getElementById('note')?.value || ''
  };
    // 簡易バリデーション
    if (!lastname || !firstname || !email || !tel || !zipcode || !pref || !address1) {
      alert('※ 必須項目が未入力です。');
      return;
    }


    // 保存（thankspage.htmlなどで利用）
    localStorage.setItem('customer', JSON.stringify(customer));
    // サンクスページへ遷移
    window.location.href = 'thankspage.html';
});

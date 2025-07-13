// UUIDを生成する関数（v4相当、簡易実装）
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // フォーム値を取得
    const lastName = document.getElementById('last-name').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const zipcode = document.getElementById('zipcode').value.trim();
    const pref = document.getElementById('pref').value.trim();
    const address1 = document.getElementById('address1').value.trim();
    const address2 = document.getElementById('address2').value.trim();
    const deliveryDate = document.getElementById('delivery-date').value;
    const note = document.getElementById('note').value.trim();

    // 簡易バリデーション
    if (!lastName || !firstName || !email || !tel || !zipcode || !pref || !address1) {
      alert('※ 必須項目が未入力です。');
      return;
    }

    // UUID形式のuser_idを生成
    const userId = generateUUID();

    // 顧客情報を作成（user_id含む）
    const customer = {
      user_id: userId,
      name: `${lastName} ${firstName}`,
      email,
      tel,
      address: `${zipcode} ${pref} ${address1} ${address2}`,
      delivery_date: deliveryDate || null,
      note: note || null
    };

    // 保存（thankspage.htmlなどで利用）
    localStorage.setItem('customer', JSON.stringify(customer));

    // サンクスページへ遷移
    window.location.href = 'thankspage.html';
  });
});

// --- script.js ---

const SHEET_URL = "/.netlify/functions/reviews"; // Proxy-Endpoint

// loadReviews() & reviewForm.submit() funktionieren jetzt öffentlich


// --- Währungsumschaltung ---
const currencyRates = { USD:1, CHF:1.12, EUR:0.95 };
const currencySelect = document.getElementById('currencySwitch');

function updatePrices() {
  const selected = currencySelect.value;
  document.querySelectorAll('.price').forEach(p => {
    const usd = parseFloat(p.dataset.usd);
    let symbol = '$';
    let price = usd * currencyRates[selected];
    if (selected === 'CHF') symbol = 'CHF';
    if (selected === 'EUR') symbol = '€';
    p.textContent = `${symbol}${price.toFixed(2)}`;
  });
}
currencySelect.addEventListener('change', updatePrices);
updatePrices();

// --- Reviews laden ---
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

function loadReviews() {
  fetch(`${SHEET_URL}?action=get`)
    .then(res => res.json())
    .then(data => {
      if(data.status === 'success') {
        reviewsList.innerHTML = '';
        data.reviews.reverse().forEach(r => {
          const div = document.createElement('div');
          div.className = 'review-item';
          div.textContent = `${r.name} - ${'⭐'.repeat(r.rating)}\n${r.comment}`;
          reviewsList.appendChild(div);
        });
      }
    });
}
loadReviews();

// --- Review absenden ---
reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(reviewForm);
  const params = new URLSearchParams();
  params.append('action','add');
  params.append('name', formData.get('name'));
  params.append('rating', formData.get('rating'));
  params.append('comment', formData.get('comment'));

  fetch(`${SHEET_URL}?${params.toString()}`)
    .then(res => res.json())
    .then(data => {
      const msg = document.createElement('div');
      msg.className = data.status === 'success' ? 'review-success' : 'review-error';
      msg.textContent = data.message;
      reviewForm.appendChild(msg);
      if(data.status === 'success') {
        loadReviews();
        reviewForm.reset();
      }
      setTimeout(()=>msg.remove(),3000);
    })
    .catch(err => {
      const msg = document.createElement('div');
      msg.className = 'review-error';
      msg.textContent = 'Fehler beim Senden. Bitte später erneut versuchen.';
      reviewForm.appendChild(msg);
      setTimeout(()=>msg.remove(),3000);
    });
});

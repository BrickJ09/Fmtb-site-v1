// --- script.js ---

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyYn4Sx2-QSpFxa89H2e3DfHvS0sI55GzCIqlUmagbxeBembHx1wm-Ngg9dZ0n4F6LVsA/exec';

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
// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

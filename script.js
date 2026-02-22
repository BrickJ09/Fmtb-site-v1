// script.js — FingerMTB
// Alle Elemente werden erst gesucht bevor sie verwendet werden
// → kein Crash mehr auf Seiten ohne Slider, ohne Menü usw.

// ── Popup ──────────────────────────────────────────────
function closePopup() {
  const popup = document.getElementById('popup');
  if (popup) popup.style.display = 'none';
}

// Popup automatisch öffnen (nur auf index)
const popup = document.getElementById('popup');
if (popup) popup.style.display = 'flex';

// ── Mobile Menü ────────────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const mainNav    = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
}

// ── Währungsswitch ─────────────────────────────────────
// Funktioniert auf allen Seiten die .price Elemente haben
const currencySwitch = document.getElementById('currencySwitch');

if (currencySwitch) {
  currencySwitch.addEventListener('change', function () {
    const sel = this.value;
    document.querySelectorAll('.price[data-usd]').forEach(el => {
      const usd = parseFloat(el.dataset.usd);
      const chf = parseFloat(el.dataset.chf) || usd;
      const eur = parseFloat(el.dataset.eur) || usd;
      if (sel === 'CHF') el.textContent = `CHF ${chf.toFixed(2)}`;
      else if (sel === 'EUR') el.textContent = `€${eur.toFixed(2)}`;
      else el.textContent = `$${usd.toFixed(2)}`;
    });
  });
}

// ── Bildslider ─────────────────────────────────────────
// Nur initialisieren wenn ein Slider auf der Seite ist
const sliderEl = document.querySelector('.slider');

if (sliderEl) {
  const slides  = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let current = 0;

  function showSlide(idx) {
    if (!slides.length) return;
    slides[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(current + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(current - 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showSlide(current + 1);
    if (e.key === 'ArrowLeft')  showSlide(current - 1);
  });
}
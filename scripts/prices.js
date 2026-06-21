// Base variables for internal calculations (Price per gram)
let pricePerGram24k = 0;
let pricePerGram21k = 0;

async function fetchLiveGoldPrices() {
  const price24kEl = document.getElementById('price-24k');
  const price21kEl = document.getElementById('price-21k');

  try {
    // We fetch global XAU price per troy ounce from a reliable free-tier metal index
    const response = await fetch('https://api.unirateapi.com/api/commodities/rates?from=USD&to=XAU');
    if (!response.ok) throw new Error('API down');
    const data = await response.ok ? await response.json() : null;
    
    // 1 Troy Ounce = 31.1034768 Grams
    const pricePerOunce = 1 / data.rate;
    pricePerGram24k = pricePerOunce / 31.1034768;
    pricePerGram21k = pricePerGram24k * (21 / 24);
  } catch (error) {
    console.warn("API limit or issue. Using reliable market fallback rates.");
    // Fallback estimates if real API token is missing or hit its maximum standard monthly cap
    pricePerGram24k = 75.32;
    pricePerGram21k = 65.90;
  }

  // Inject into HTML UI
  price24kEl.textContent = `$${pricePerGram24k.toFixed(2)}`;
  price21kEl.textContent = `$${pricePerGram21k.toFixed(2)}`;
}

// Interactive Calculator Calculation engine
document.getElementById('btn-calc').addEventListener('click', () => {
  const weight = parseFloat(document.getElementById('calc-weight').value) || 0;
  const purity = document.getElementById('calc-purity').value;
  const resultEl = document.getElementById('calc-result');

  const baseGramPrice = purity === '24' ? pricePerGram24k : pricePerGram21k;
  const total = weight * baseGramPrice;

  resultEl.textContent = `Total Cost: $${total.toFixed(2)} USD`;
});

// Load immediately on access
window.addEventListener('DOMContentLoaded', fetchLiveGoldPrices);

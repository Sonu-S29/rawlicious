/**
 * RAW LICIOUS - Main Application Logic
 * Consolidated & Optimized Version
 */

// --- Global Constants ---
const GAS_URL = "https://script.google.com/macros/s/AKfycbyIQy_Tp5P2VpeqxR1tmuJWBsQjlZ-Ft6pawTY0PSQiP2sJIG3ArFh5JFk7ylhG70F7PA/exec";
const GEOAPIFY_KEY = "878e68b0f04843068819dc298ceafa10";
const SHOP_LAT = 19.0998399;
const SHOP_LON = 72.8461177;

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ1Dx2nioun9Tc4ZDYA2Aqp78PpWF7W2IcnUJo69hJU03sjg7SL4d3VXAeuNOOAuefU7nH5uRJrzzR86x9gxg1_x8snnXwxHiUEyLVJEMkcK1eTs7Lsi9tyi3KtYPOvQmmCDhkSMJEHoEMHutSfv0nZkMBpyaE2Rx6cekYri6StFaxxfmvjqyQ5BfUw94pFFoFUL0NPqHoihK1bZGTimUSUCQZq76yPTGp0nZi_foWYMkQ12jbEfYfe6wqWt-kUuLCt8dy3UzECoQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCurBPrsAmP_eV18JcH3qh-GLaR3VyHWCbp3eL9PGwQqntmiZnq2xYXASpo1XUqTyX2jw96a7U9cr9cVLmD5ukc_EApsydhU3Fgik-LVDVKAvN4SSgFHwnmysIdP1vLqYi5r0uQxYWJuRi3jrvekq9mRw6pSOj9lBV50nSHJMLa2z3pgLZZSG-oPrfIueoMyCMw6RMsPsYmPRLsf8zv57AwM9EhagAJEIRRhNnFL1ZcYdNeKVsujX1gWk-L3lTkPx37ODLrRiyLHUU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAobpnH3b6PUXz5mWsM34R9bGZJQVDT3nu5NpoInZTu6iQZmIA4RcVeJJA6Vi88CZnnzSBOlHh_0fU3zzmENZACOcY6owwbXDtmeHEPnt_hI0c2GWD6h43yXNVM8UmoTn5oZ06Y9YJZ0ZY_eSygnS7mJEfodLh3O3wlRACV6uaEZvjlQA6zJHcvAqsmyWppPPIdite0WnHD3VwQjrV4TJhJ1M9HfB-rOw5ComzftzLGxwba-fhnfHjw_JHieCknJtQWgywJaGxKBic",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuANoiNKa7FeJmkznUJ1qTSO7YUFG8kbqrQ3mmRunqsimViAflcTJ_SfW4Sp4uzr_u2qSNMFof9oudKLhltbcBLQOKO03GigD_ae2yDk_FtLbVXTtsJ62pQyi_vjNduCjcTui1kE-5Y1qnIeDRpGDVSbe31NIHbDwfQzvAIKmUvaiVVtTe0JTaHR0OAZm1D2Kk6NlRRgb-PGt52GDm1IgI_3NXVjzLxGMIlk2uYvkO8hRlj24P15QM1ugX8kpvTd1rIDUMexIRm_lwA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDdEFsfCguvGZzksPyFWzlB4vk6kAWe69DCyIUfXF29yNN83-UC23834QrXaKFzAZf-CQkbKH6oUYNUByGDHS2-kLi6Ts3gaiMsiZWoLPXrjrHyiMHV22mq8rgfL2-LRk4zhR1WVndRXUXQC1JKRkZDhXTBK9zWd4FPNUk85K-Q6JHzeIj4E7LyhLe2MrzZsZUhpsz2pRqIwzssoZaKCyLcPhqnowDbhOyMrm_m--Sjtau3ImB7hLDcS2UnqrfJr1TtVAxcGQfGtZ8"
];

// --- Cart Manager Engine ---
const CartManager = {
  getCart: () => JSON.parse(localStorage.getItem('rawlicious_cart') || '[]'),
  saveCart: (cart) => {
    localStorage.setItem('rawlicious_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    CartManager.updateBadges();
    CartManager.updateMenuButtons();
  },
  addItem: (id, name, image, price, size, desc, availablePrices, sweetener = 'Honey') => {
    const cart = CartManager.getCart();
    const uniqueId = `${id}-${size}-${sweetener}`;
    const existingIndex = cart.findIndex(item => item.uniqueId === uniqueId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ id, uniqueId, name, image, price, size, desc, quantity: 1, availablePrices, sweetener });
    }
    CartManager.saveCart(cart);
  },
  updateQuantity: (uniqueId, delta) => {
    let cart = CartManager.getCart();
    const index = cart.findIndex(item => item.uniqueId === uniqueId);
    if (index > -1) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
      CartManager.saveCart(cart);
    }
  },
  removeItem: (uniqueId) => {
    let cart = CartManager.getCart();
    cart = cart.filter(item => item.uniqueId !== uniqueId);
    CartManager.saveCart(cart);
  },
  getSubtotal: () => CartManager.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0),
  getTotalQuantity: () => CartManager.getCart().reduce((sum, item) => sum + item.quantity, 0),
  updateBadges: () => {
    const total = CartManager.getTotalQuantity();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent = total;
      b.style.display = total > 0 ? 'flex' : 'none';
    });
  },
  updateMenuButtons: () => {
    const cart = CartManager.getCart();
    document.querySelectorAll('[data-item-id]').forEach(btn => {
      const id = btn.getAttribute('data-item-id');
      const size = btn.getAttribute('data-size') || 'Standard';
      const card = btn.closest('.glass-card') || btn.closest('.menu-item-card');
      const sweetener = card ? (card.querySelector('.sweetener-select')?.value || 'Honey') : 'Honey';
      const isAdded = cart.some(item => item.id === id && item.size === size && item.sweetener === sweetener);
      
      if (isAdded) {
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span> Added';
        btn.classList.add('btn-added-state');
        if (btn.classList.contains('btn-primary')) {
           btn.style.backgroundColor = 'var(--primary)';
           btn.style.color = '#000';
        }
      } else {
        btn.innerHTML = btn.classList.contains('add-btn') && !btn.classList.contains('marquee-add-btn') 
           ? '<span class="material-symbols-outlined">add_shopping_cart</span>' 
           : '<span class="material-symbols-outlined" style="font-size: 18px;">add_shopping_cart</span> Add';
        btn.classList.remove('btn-added-state');
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }
    });
  }
};

// --- Helper Functions ---
window.addToCart = function(id, name, image, price, desc, btnElement, availablePricesStr, size = 'Standard') {
  let availablePrices = null;
  if (availablePricesStr) {
    try { availablePrices = JSON.parse(decodeURIComponent(availablePricesStr)); } catch(e){}
  }
  const card = btnElement.closest('.glass-card') || btnElement.closest('.menu-item-card');
  const sweetener = card ? (card.querySelector('.sweetener-select')?.value || 'Honey') : 'Honey';
  CartManager.addItem(id, name, image, price, size, desc, availablePrices, sweetener);
};

window.changeSize = function(btnElement, size, price) {
  const container = btnElement.closest('.glass-card') || btnElement.closest('.menu-item-content');
  container.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  const priceDisplay = container.querySelector('.dynamic-price') || container.querySelector('.marquee-price-tag');
  if (priceDisplay) priceDisplay.textContent = '₹' + price;
  const addBtn = container.querySelector('.add-btn');
  if (addBtn) {
    addBtn.dataset.size = size;
    addBtn.dataset.price = price;
  }
  CartManager.updateMenuButtons();
};

window.updateCartItemSize = function(uniqueId, newSize) {
  const cart = CartManager.getCart();
  const index = cart.findIndex(i => i.uniqueId === uniqueId);
  if (index > -1) {
    const item = cart[index];
    const newPrice = item.availablePrices[newSize];
    const sw = item.sweetener || 'Honey';
    const newUniqueId = `${item.id}-${newSize}-${sw}`;
    
    const existingIndex = cart.findIndex(i => i.uniqueId === newUniqueId);
    if (existingIndex > -1 && existingIndex !== index) {
      cart[existingIndex].quantity += item.quantity;
      cart.splice(index, 1);
    } else {
      item.size = newSize;
      item.price = newPrice;
      item.uniqueId = newUniqueId;
      item.sweetener = sw;
    }
    CartManager.saveCart(cart);
  }
};

window.updateCartItemSweetener = function(uniqueId, newSweetener) {
  const cart = CartManager.getCart();
  const index = cart.findIndex(i => i.uniqueId === uniqueId);
  if (index > -1) {
    const item = cart[index];
    const newUniqueId = `${item.id}-${item.size}-${newSweetener}`;
    
    const existingIndex = cart.findIndex(i => i.uniqueId === newUniqueId);
    if (existingIndex > -1 && existingIndex !== index) {
      cart[existingIndex].quantity += item.quantity;
      cart.splice(index, 1);
    } else {
      item.sweetener = newSweetener;
      item.uniqueId = newUniqueId;
    }
    CartManager.saveCart(cart);
  }
};

window.toggleHealthInfo = function(btnElement, itemName) {
  document.querySelectorAll('.health-popup').forEach(p => p.remove());
  const seed = itemName.length + itemName.charCodeAt(0);
  const calories = 80 + (seed % 150);
  const rect = btnElement.getBoundingClientRect();
  const popup = document.createElement('div');
  popup.className = 'health-popup';
  popup.style.cssText = `position: absolute; top: ${rect.bottom + window.scrollY + 8}px; left: ${Math.min(rect.left + window.scrollX, document.documentElement.scrollWidth - 230)}px; background: rgba(10, 24, 14, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(205, 255, 96, 0.3); border-radius: 16px; padding: 16px; width: 220px; z-index: 100000; box-shadow: 0 10px 40px rgba(0,0,0,0.6); color: #fff; font-size: 0.75rem; pointer-events: none;`;
  popup.innerHTML = `<h4 style="color: var(--primary); font-weight: 900; margin-bottom: 8px;"><span class="material-symbols-outlined" style="font-size: 16px;">spa</span> Vitality Profile</h4><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Calories</span><span style="font-weight: 800;">${calories} kcal</span></div><p style="opacity: 0.8;">Boosts immunity, naturally detoxifying, and supports gut health.</p>`;
  document.body.appendChild(popup);
  setTimeout(() => {
    const close = () => { popup.remove(); document.removeEventListener('click', close); };
    document.addEventListener('click', close);
  }, 10);
};

// --- Page Rendering ---
function renderCartPage() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  const updateUI = () => {
    const cart = CartManager.getCart();
    if (cart.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 64px 24px;"><span class="material-symbols-outlined" style="font-size: 64px; opacity: 0.2;">shopping_basket</span><p>Your greenhouse is empty.</p></div>`;
      return;
    }
    container.innerHTML = cart.map((item, idx) => `
      <div class="glass-card flex items-center gap-6" style="padding: 16px; z-index: ${999 - idx};">
        <div style="width: 80px; height: 80px; border-radius: 12px; overflow: hidden; flex-shrink: 0;"><img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;"></div>
        <div style="flex-grow: 1;">
          <div class="flex justify-between items-center" style="margin-bottom: 8px;"><h3>${item.name}</h3><span style="color: var(--primary); font-weight: 800;">₹${item.price}</span></div>
          <div style="display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
            <details style="font-size: 0.75rem; position: relative;">
              <summary style="cursor: pointer; color: var(--primary); background: rgba(205,255,96,0.05); padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(205,255,96,0.15);">${item.size} ▼</summary>
              <div style="position: absolute; background: #0A180E; border: 1px solid rgba(205,255,96,0.2); border-radius: 8px; z-index: 100; width: 100px; top: 100%; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); overflow: hidden;">
                ${Object.keys(item.availablePrices || {}).map(s => `<div onclick="window.updateCartItemSize('${item.uniqueId}', '${s}')" style="padding: 8px 12px; cursor: pointer; color: ${s === item.size ? 'var(--primary)' : '#fff'}; background: ${s === item.size ? 'rgba(205,255,96,0.1)' : 'transparent'};" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='${s === item.size ? 'rgba(205,255,96,0.1)' : 'transparent'}'">${s}</div>`).join('')}
              </div>
            </details>
            <details style="font-size: 0.75rem; position: relative;">
               <summary style="cursor: pointer; color: var(--primary); background: rgba(205,255,96,0.05); padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(205,255,96,0.15);">${item.sweetener || 'Honey'} ▼</summary>
               <div style="position: absolute; background: #0A180E; border: 1px solid rgba(205,255,96,0.2); border-radius: 8px; z-index: 100; width: 100px; top: 100%; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); overflow: hidden;">
                 ${['Honey', 'Jaggery', 'Sugar', 'None'].map(sw => `<div onclick="window.updateCartItemSweetener('${item.uniqueId}', '${sw}')" style="padding: 8px 12px; cursor: pointer; color: ${sw === (item.sweetener||'Honey') ? 'var(--primary)' : '#fff'}; background: ${sw === (item.sweetener||'Honey') ? 'rgba(205,255,96,0.1)' : 'transparent'};" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='${sw === (item.sweetener||'Honey') ? 'rgba(205,255,96,0.1)' : 'transparent'}'">${sw}</div>`).join('')}
               </div>
            </details>
          </div>
          <div class="flex items-center gap-4 mt-2">
            <button onclick="CartManager.updateQuantity('${item.uniqueId}', -1)" style="border: 1px solid #333; padding: 2px 8px;">-</button>
            <span>${item.quantity}</span>
            <button onclick="CartManager.updateQuantity('${item.uniqueId}', 1)" style="border: 1px solid #333; padding: 2px 8px;">+</button>
            <button onclick="CartManager.removeItem('${item.uniqueId}')" style="margin-left: auto; color: var(--error-dim);"><span class="material-symbols-outlined" style="font-size: 18px;">delete</span></button>
          </div>
        </div>
      </div>
    `).join('');
    const sub = CartManager.getSubtotal();
    if (document.getElementById('cartSubtotal')) document.getElementById('cartSubtotal').textContent = `₹${sub.toFixed(2)}`;
    if (document.getElementById('cartTotal')) document.getElementById('cartTotal').textContent = `₹${(sub + 10).toFixed(2)}`;
  };
  window.addEventListener('cartUpdated', updateUI);
  updateUI();
}

function renderCheckoutPage() {
  const list = document.getElementById('checkoutOrderList');
  if (!list) return;
  const updateUI = () => {
    const cart = CartManager.getCart();
    list.innerHTML = cart.map(item => `
      <div class="flex justify-between items-center mb-2">
        <div><h4 style="font-weight: 800; color: #fff;">${item.name}</h4><p style="font-size: 0.7rem; color: var(--on-surface-variant);">${item.size} | ${item.sweetener} x${item.quantity}</p></div>
        <span style="color: var(--primary); font-weight: 800;">₹${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');
    const sub = CartManager.getSubtotal();
    const fee = checkoutData.fee || 0;
    if (document.getElementById('checkoutSubtotal')) document.getElementById('checkoutSubtotal').textContent = `₹${sub.toFixed(2)}`;
    if (document.getElementById('checkoutEcoFee')) document.getElementById('checkoutEcoFee').textContent = `₹${fee.toFixed(2)}`;
    if (document.getElementById('checkoutTotal')) document.getElementById('checkoutTotal').textContent = `₹${(sub + fee).toFixed(2)}`;
  };
  window.addEventListener('cartUpdated', updateUI);
  updateUI();
  
  const btn = document.getElementById('btnConfirmOrder');
  const inputPhone = document.getElementById('inputPhone');
  const distanceText = document.getElementById('distanceText');
  const deliveryFeeText = document.getElementById('deliveryFeeText');

  const getFullAddress = () => {
    const b = document.getElementById('inputBuilding')?.value.trim() || '';
    const s = document.getElementById('inputStreet')?.value.trim() || '';
    const l = document.getElementById('inputLandmark')?.value.trim() || '';
    const p = document.getElementById('inputPincode')?.value.trim() || '';
    // Require all 4 fields to be filled before geocoding
    if (b.length < 2 || s.length < 3 || l.length < 3 || p.length < 6) return null;
    const parts = [b, s, l, p];
    return parts.join(', ') + ', Mumbai, Maharashtra, India';
  };

  const calculateAddressDistance = async () => {
    const addr = getFullAddress();
    if (!addr) {
      if (distanceText) distanceText.innerText = "Fill all 4 address fields to calculate.";
      return;
    }
    if (distanceText) distanceText.innerText = "Verifying & calculating...";
    try {
      const geo = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addr)}&apiKey=${GEOAPIFY_KEY}`).then(r=>r.json());
      if(geo.features && geo.features.length > 0) {
         // Check confidence if available, but primarily trust the Pincode requirement
         const bestMatch = geo.features[0];
         const {lat, lon} = bestMatch.properties;
         const radLat1 = SHOP_LAT * Math.PI / 180;
         const radLat2 = lat * Math.PI / 180;
         const radTheta = (lon - SHOP_LON) * Math.PI / 180;
         let dot = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
         dot = Math.max(-1, Math.min(1, dot)); // Prevent floating point NaN
         const dist = Math.acos(dot) * 6371;
         
         checkoutData.distance = dist.toFixed(2);
         checkoutData.fee = dist > 1 ? Math.round((dist-1)*12) : 0;
         if (distanceText) distanceText.innerHTML = `<span style="color: #34d399;">✓ Verified</span> - Distance: ${checkoutData.distance} km`;
         if (deliveryFeeText) deliveryFeeText.innerText = `Fee: ₹${checkoutData.fee}`;
         updateUI();
      } else {
         if (distanceText) distanceText.innerText = "Address not found. Please refine.";
      }
    } catch(e) {
      if (distanceText) distanceText.innerText = "Error calculating distance.";
    }
  };

  ['inputBuilding', 'inputStreet', 'inputLandmark', 'inputPincode'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', calculateAddressDistance);
  });

  if (inputPhone) {
    inputPhone.addEventListener('blur', async () => {
      const m = inputPhone.value.replace(/\D/g, '');
      if (m.length < 10) return;
      try {
        const res = await fetch(`${GAS_URL}?mobile=${m}`);
        const data = await res.json();
        if (data.addresses && data.addresses.length > 0) {
          const parts = data.addresses[0].split(', ');
          if (document.getElementById('inputBuilding')) document.getElementById('inputBuilding').value = parts[0] || '';
          if (document.getElementById('inputStreet')) document.getElementById('inputStreet').value = parts[1] || '';
          if (document.getElementById('inputLandmark')) document.getElementById('inputLandmark').value = parts[2] || '';
          if (document.getElementById('inputPincode')) document.getElementById('inputPincode').value = parts[3] || '';
          calculateAddressDistance();
        }
        checkoutData.points = data.points || 0;
      } catch(e) {}
    });
  }

  if (btn) {
    btn.onclick = async (e) => {
      e.preventDefault();
      if (inputPhone && document.getElementById('inputBuilding')) {
          checkoutData.mobile = inputPhone.value;
          checkoutData.selectedAddress = getFullAddress();
          if(!checkoutData.mobile) return alert('Enter phone number');
          if(!checkoutData.selectedAddress) return alert('Please completely fill all 4 address fields (Building, Street, Landmark, Pincode).');
          finalSubmit();
      } else {
          startSmartCheckout();
      }
    };
  }
}

// --- Lifecycle ---
document.addEventListener('DOMContentLoaded', () => {
  CartManager.updateBadges();
  renderCartPage();
  renderCheckoutPage();

  const homeWrapper = document.getElementById('homeCategoriesWrapper');
  if (homeWrapper && typeof menuData !== 'undefined') {
    const cats = [
      { id: 'coldPress', name: 'Cold Press Juices', desc: 'Raw, fresh elixirs.', img: images[0] },
      { id: 'fruitJuices', name: 'Fruit Juices', desc: '100% pure fruit.', img: images[1] },
      { id: 'fruitMilkshake', name: 'Fruit Milkshakes', desc: 'Creamy blends.', img: images[2] },
      { id: 'dryFruitsMilkshake', name: 'Dry Fruit Milkshakes', desc: 'Rich protein.', img: images[3] },
      { id: 'boxes', name: 'Subscription Boxes', desc: 'Daily wellness.', img: images[4] }
    ];
    homeWrapper.innerHTML = cats.map((cat, idx) => {
      const items = (menuData[cat.id] || []).slice(0, 5);
      
      // Loop 3 times to create a scrolling marquee effect
      let marqueeHTML = '';
      for (let loop = 0; loop < 3; loop++) {
        marqueeHTML += items.map((item, i) => {
          const prices = item.prices || { 'Standard': item.price || 0 };
          const sizes = Object.keys(prices);
          const encoded = encodeURIComponent(JSON.stringify(prices));
          return `
            <div class="glass-card marquee-product-card" style="padding: 10px; width: 140px; flex-shrink: 0; display: flex; flex-direction: column;">
              <div style="position: relative; aspect-ratio: 1/1; border-radius: 8px; overflow: hidden;">
                <img src="${images[(i+idx)%5]}" style="width: 100%; height: 100%; object-fit: cover;">
                <button onclick="window.toggleHealthInfo(this, '${item.name}')" style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.6); border-radius: 50%; width: 24px; height: 24px; border: 1px solid rgba(255,255,255,0.2);"><span class="material-symbols-outlined" style="font-size: 14px; color: var(--primary);">spa</span></button>
                <div class="marquee-price-tag" style="position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.8); padding: 2px 6px; border-radius: 99px; font-size: 0.65rem; font-weight: 800; color: var(--primary);">₹${prices[sizes[0]]}</div>
              </div>
              <h4 style="font-size: 0.8rem; font-weight: 800; margin: 8px 0 6px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h4>
              <div class="size-selector" style="margin-bottom: 6px;">
                 ${sizes.map((s, si) => `<button class="size-btn ${si===0?'active':''}" style="font-size: 0.6rem; padding: 4px 6px;" onclick="window.changeSize(this, '${s}', ${prices[s]})">${s}</button>`).join('')}
              </div>
              <div class="custom-dropdown-container" style="position: relative; width: 100%; margin-bottom: 12px;">
                <input type="hidden" class="sweetener-select" value="Honey">
                <details class="custom-details-dropdown" style="width: 100%; font-size: 0.75rem;">
                  <summary style="cursor: pointer; color: #fff; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 6px 8px; display: flex; justify-content: space-between; align-items: center; list-style: none;">
                    <span class="selected-text">🍯 Honey</span> <span style="font-size: 0.6rem;">▼</span>
                  </summary>
                  <div style="position: absolute; background: #0A180E; border: 1px solid rgba(205,255,96,0.2); border-radius: 8px; z-index: 100; width: 100%; top: 100%; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); overflow: hidden;">
                    ${[{v:'Honey',l:'🍯 Honey'},{v:'Jaggery',l:'🌴 Jaggery'},{v:'Sugar',l:'🍬 Sugar'},{v:'None',l:'🍃 None'}].map(o => `
                      <div onclick="
                        const c = this.closest('.custom-dropdown-container');
                        c.querySelector('.sweetener-select').value = '${o.v}';
                        c.querySelector('.selected-text').innerText = '${o.l}';
                        this.closest('details').removeAttribute('open');
                        CartManager.updateMenuButtons();
                      " style="padding: 8px 12px; cursor: pointer; color: #fff;" onmouseover="this.style.background='rgba(205,255,96,0.1)'; this.style.color='var(--primary)'" onmouseout="this.style.background='transparent'; this.style.color='#fff'">${o.l}</div>
                    `).join('')}
                  </div>
                </details>
              </div>
              <button class="marquee-add-btn add-btn btn-primary" data-item-id="${item.id}" data-size="${sizes[0]}" data-price="${prices[sizes[0]]}" style="width: 100%; padding: 6px; border-radius: 6px; font-size: 0.7rem; margin-top: auto;" onclick="window.addToCart('${item.id}', '${item.name}', '${images[(i+idx)%5]}', this.dataset.price, '', this, '${encoded}', this.dataset.size)">Add</button>
            </div>
          `;
        }).join('');
      }

      return `
        <div class="category-row-wrapper" style="margin-bottom: 32px; width: 100%; display: flex; align-items: stretch;">
          <a href="menu.html?category=${cat.id}" class="glass-card category-side-card" style="text-decoration: none; flex-shrink: 0; width: 100px; padding: 10px; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; height: auto;">
            <div style="width: 100%; aspect-ratio: 3/4; overflow: hidden; border-radius: 8px; margin-bottom: 8px;"><img src="${cat.img}" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <h3 style="font-weight: 800; font-size: 0.8rem; line-height: 1.2;">${cat.name}</h3>
            <p style="font-size: 0.65rem; opacity: 0.7; margin-top: 4px;">${cat.desc}</p>
          </a>
          <div class="marquee-container no-scrollbar" style="display: flex; gap: 12px; overflow-x: auto; padding: 12px; flex-grow: 1; scroll-behavior: auto; scroll-snap-type: none;">
             ${marqueeHTML}
          </div>
        </div>
      `;
    }).join('');

    // Restore the smooth auto-scrolling effect
    setTimeout(() => {
      document.querySelectorAll('.marquee-container').forEach(container => {
        let isDown = false;
        container.addEventListener('mouseenter', () => isDown = true);
        container.addEventListener('mouseleave', () => isDown = false);
        container.addEventListener('focusin', () => isDown = true);
        container.addEventListener('focusout', () => isDown = false);
        container.addEventListener('touchstart', () => isDown = true, {passive: true});
        container.addEventListener('touchend', () => isDown = false);

        setInterval(() => {
          if (!isDown) {
            container.scrollLeft += 1;
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
              container.scrollLeft = 0;
            }
          }
        }, 30);
      });
    }, 500);
  }

  const menuGrid = document.getElementById('menuGrid');
  const catNav = document.getElementById('categoryNav');
  if (menuGrid && catNav && typeof menuData !== 'undefined') {
    const cats = [ { id: 'coldPress', label: 'Cold Press' }, { id: 'fruitJuices', label: 'Fruits' }, { id: 'fruitMilkshake', label: 'Milkshakes' }, { id: 'dryFruitsMilkshake', label: 'Dry Fruits' }, { id: 'boxes', label: 'Boxes' } ];
    let active = new URLSearchParams(window.location.search).get('category') || 'coldPress';
    const render = () => {
      catNav.innerHTML = cats.map(c => `<button class="category-btn ${c.id===active?'active':''}" onclick="location.search='?category=${c.id}'">${c.label}</button>`).join('');
      menuGrid.innerHTML = (menuData[active] || []).map((item, idx) => {
        const prices = item.prices || { 'Standard': item.price || 0 };
        const sizes = Object.keys(prices);
        const encoded = encodeURIComponent(JSON.stringify(prices));
        return `
          <div class="menu-item-card glass-card">
            <div style="position: relative; aspect-ratio: 4/5; overflow: hidden; border-radius: 12px;">
              <img src="${images[idx % 5]}" style="width: 100%; height: 100%; object-fit: cover;">
              <button onclick="window.toggleHealthInfo(this, '${item.name}')" style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.5); border-radius: 50%; width: 30px; height: 30px;"><span class="material-symbols-outlined">spa</span></button>
            </div>
            <div class="menu-item-content" style="padding: 16px;">
              <h3 style="font-weight: 800; font-size: 1.1rem;">${item.name}</h3>
              <div class="size-selector" style="margin: 12px 0;">
                ${sizes.map((s, si) => `<button class="size-btn ${si===0?'active':''}" onclick="window.changeSize(this, '${s}', ${prices[s]})">${s}</button>`).join('')}
              </div>
              <div class="custom-dropdown-container" style="position: relative; width: 100%; margin-bottom: 16px;">
                <input type="hidden" class="sweetener-select" value="Honey">
                <details class="custom-details-dropdown" style="width: 100%; font-size: 0.8rem;">
                  <summary style="cursor: pointer; color: #fff; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; list-style: none;">
                    <span class="selected-text">🍯 Honey</span> <span style="font-size: 0.6rem;">▼</span>
                  </summary>
                  <div style="position: absolute; background: #0A180E; border: 1px solid rgba(205,255,96,0.2); border-radius: 8px; z-index: 100; width: 100%; top: 100%; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); overflow: hidden;">
                    ${[{v:'Honey',l:'🍯 Honey'},{v:'Jaggery',l:'🌴 Jaggery'},{v:'Sugar',l:'🍬 Sugar'},{v:'None',l:'🍃 None'}].map(o => `
                      <div onclick="
                        const c = this.closest('.custom-dropdown-container');
                        c.querySelector('.sweetener-select').value = '${o.v}';
                        c.querySelector('.selected-text').innerText = '${o.l}';
                        this.closest('details').removeAttribute('open');
                        CartManager.updateMenuButtons();
                      " style="padding: 10px 12px; cursor: pointer; color: #fff;" onmouseover="this.style.background='rgba(205,255,96,0.1)'; this.style.color='var(--primary)'" onmouseout="this.style.background='transparent'; this.style.color='#fff'">${o.l}</div>
                    `).join('')}
                  </div>
                </details>
              </div>
              <div class="flex justify-between items-center mt-auto">
                <span class="dynamic-price" style="font-size: 1.2rem; font-weight: 900; color: var(--primary);">₹${prices[sizes[0]]}</span>
                <button class="add-btn btn-primary" data-item-id="${item.id}" data-size="${sizes[0]}" data-price="${prices[sizes[0]]}" style="border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;" onclick="window.addToCart('${item.id}', '${item.name}', '${images[idx % 5]}', this.dataset.price, '', this, '${encoded}', this.dataset.size)">
                  <span class="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
      CartManager.updateMenuButtons();
    };
    render();
  }
  CartManager.updateMenuButtons();
});

// --- Checkout Modal Logic ---
let checkoutData = { mobile: '', selectedAddress: '', addresses: [], points: 0, distance: 0, fee: 0, sweetener: 'Honey' };
async function startSmartCheckout() {
  const modal = document.createElement('div');
  modal.id = 'checkoutModal';
  modal.className = 'modal-overlay active';
  modal.innerHTML = `<div class="checkout-modal-card" style="padding: 24px; position: relative;"><button onclick="this.closest('.modal-overlay').remove()" style="position: absolute; right: 20px; top: 20px;">X</button><div id="checkoutContent"><h2>Enter Mobile Number</h2><input type="tel" id="mobileIn" class="checkout-input" placeholder="10-digit mobile"><button onclick="handleStep1()" class="btn-primary" style="width: 100%; padding: 12px; margin-top: 16px;">Next</button></div></div>`;
  document.body.appendChild(modal);
}
async function handleStep1() {
  const m = document.getElementById('mobileIn').value;
  if (m.length < 10) return;
  checkoutData.mobile = m;
  const res = await fetch(`${GAS_URL}?mobile=${m}`);
  const data = await res.json();
  checkoutData.addresses = data.addresses || [];
  checkoutData.points = data.points || 0;
  document.getElementById('checkoutContent').innerHTML = `<h2>Address & Sweetener</h2><p>Points: ${checkoutData.points}</p>
    <div class="custom-dropdown-container" style="position: relative; width: 100%; margin-bottom: 24px;">
      <input type="hidden" id="swIn" value="Honey">
      <details class="custom-details-dropdown" style="width: 100%; font-size: 1rem;">
        <summary class="checkout-input" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none;">
          <span class="selected-text">🍯 Honey</span> <span style="font-size: 0.8rem;">▼</span>
        </summary>
        <div style="position: absolute; background: #0A180E; border: 1px solid rgba(205,255,96,0.2); border-radius: 8px; z-index: 100; width: 100%; top: 100%; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); overflow: hidden;">
          ${[{v:'Honey',l:'🍯 Honey'},{v:'Jaggery',l:'🌴 Jaggery'},{v:'Sugar',l:'🍬 Sugar'},{v:'None',l:'🍃 None'}].map(o => `
            <div onclick="
              const c = this.closest('.custom-dropdown-container');
              c.querySelector('#swIn').value = '${o.v}';
              c.querySelector('.selected-text').innerText = '${o.l}';
              this.closest('details').removeAttribute('open');
            " style="padding: 12px 16px; cursor: pointer; color: #fff;" onmouseover="this.style.background='rgba(205,255,96,0.1)'; this.style.color='var(--primary)'" onmouseout="this.style.background='transparent'; this.style.color='#fff'">${o.l}</div>
          `).join('')}
        </div>
      </details>
    </div>
    <div id="addrList">${checkoutData.addresses.map(a => `<div class="address-option-card" onclick="checkoutData.selectedAddress='${a}'; handleStep2()">${a}</div>`).join('')}</div><input id="newAddr" placeholder="New address" class="checkout-input mt-4"><button onclick="checkoutData.selectedAddress=document.getElementById('newAddr').value; handleStep2()" class="btn-primary mt-2 w-full">Use New Address</button>`;
}
async function handleStep2() {
  checkoutData.sweetener = document.getElementById('swIn').value;
  document.getElementById('checkoutContent').innerHTML = `<p>Calculating distance...</p>`;
  const geo = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(checkoutData.selectedAddress)}&apiKey=${GEOAPIFY_KEY}`).then(r=>r.json());
  const {lat, lon} = geo.features[0].properties;
  const dist = (Math.acos(Math.sin(SHOP_LAT*Math.PI/180)*Math.sin(lat*Math.PI/180) + Math.cos(SHOP_LAT*Math.PI/180)*Math.cos(lat*Math.PI/180)*Math.cos((lon-SHOP_LON)*Math.PI/180)) * 6371);
  checkoutData.distance = dist.toFixed(2);
  checkoutData.fee = dist > 1 ? Math.round((dist-1)*12) : 0;
  const sub = CartManager.getSubtotal();
  document.getElementById('checkoutContent').innerHTML = `<h2>Final Review</h2><p>Distance: ${checkoutData.distance} km</p><p>Fee: ₹${checkoutData.fee}</p><p>Total: ₹${(sub + 10 + checkoutData.fee).toFixed(2)}</p><button onclick="finalSubmit()" class="btn-primary w-full p-4 mt-4" style="background: #25D366;">Confirm & WhatsApp</button>`;
}
async function finalSubmit() {
  const cart = CartManager.getCart();
  const sub = CartManager.getSubtotal();
  const payload = { mobile: checkoutData.mobile, address: checkoutData.selectedAddress, orderDetails: cart.map(i=>`${i.name} x${i.quantity}`).join(','), total: (sub+10+checkoutData.fee).toFixed(2), sweetener: checkoutData.sweetener, distance: checkoutData.distance };
  await fetch(GAS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
  let msg = `*RAW LICIOUS ORDER*%0A*Customer:* ${checkoutData.mobile}%0A*Sweetener:* ${checkoutData.sweetener}%0A*Items:* ${payload.orderDetails}%0A*Total:* ₹${payload.total}`;
  window.location.href = `https://wa.me/918591791347?text=${msg}`;
}

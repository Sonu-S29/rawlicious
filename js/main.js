// Cart State Management Engine
const CartManager = {
  getCart: function() {
    return JSON.parse(localStorage.getItem('rawlicious_cart') || '[]');
  },
  saveCart: function(cart) {
    localStorage.setItem('rawlicious_cart', JSON.stringify(cart));
    this.updateBadges();
    this.updateMenuButtons();
    
    // Dispatch custom event so pages can optionally render on cart updates
    window.dispatchEvent(new Event('cartUpdated'));
  },
  addItem: function(id, name, image, price, size = 'Standard', desc = '', availablePrices = null) {
    const cart = this.getCart();
    const uniqueId = `${id}-${size}`;
    const existingIndex = cart.findIndex(i => i.uniqueId === uniqueId);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ uniqueId, id, name, image, price, size, desc, quantity: 1, availablePrices });
    }
    this.saveCart(cart);
  },
  removeItem: function(uniqueId) {
    let cart = this.getCart();
    cart = cart.filter(i => i.uniqueId !== uniqueId);
    this.saveCart(cart);
  },
  updateQuantity: function(uniqueId, delta) {
    const cart = this.getCart();
    const item = cart.find(i => i.uniqueId === uniqueId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(uniqueId);
        return;
      }
      this.saveCart(cart);
    }
  },
  getTotalQuantity: function() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },
  getSubtotal: function() {
    return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  updateBadges: function() {
    const count = this.getTotalQuantity();
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      
      // Pulse animation trigger
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => badge.style.transform = 'scale(1)', 200);
    });
  },
  updateMenuButtons: function() {
    const cart = this.getCart();
    
    document.querySelectorAll('.add-btn').forEach(btn => {
      const isAdded = cart.some(i => i.id === btn.dataset.itemId && i.size === btn.dataset.size);
      if (isAdded) {
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 20px;">check_circle</span>';
        btn.style.color = 'var(--surface-dim)';
        btn.style.backgroundColor = 'var(--primary)';
        btn.classList.add('btn-added-state');
      } else {
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 20px;">add_shopping_cart</span>';
        btn.style.color = 'var(--primary)';
        btn.style.backgroundColor = 'var(--surface-container-highest)';
        btn.classList.remove('btn-added-state');
      }
    });

    document.querySelectorAll('.marquee-add-btn').forEach(btn => {
      const isAdded = cart.some(i => i.id === btn.dataset.itemId);
      if (isAdded) {
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span> Added';
        btn.style.backgroundColor = 'var(--primary)';
        btn.style.color = '#000';
      } else {
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 18px;">add_shopping_cart</span> Add';
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }
    });
  }
};

window.addToCart = function(id, name, image, price, desc, btnElement, availablePricesStr, size = 'Standard') {
  let availablePrices = null;
  if (availablePricesStr) {
    try { availablePrices = JSON.parse(decodeURIComponent(availablePricesStr)); } catch(e){}
  }
  CartManager.addItem(id, name, image, price, size, desc, availablePrices);
  CartManager.updateMenuButtons();
};

window.changeSize = function(btnElement, size, price) {
  const container = btnElement.closest('.menu-item-content');
  container.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  container.querySelector('.dynamic-price').textContent = '₹' + price;
  
  const addBtn = container.querySelector('.add-btn');
  addBtn.dataset.size = size;
  addBtn.dataset.price = price;
  
  CartManager.updateMenuButtons();
};

window.updateCartItemSize = function(uniqueId, newSize) {
  const cart = CartManager.getCart();
  const index = cart.findIndex(i => i.uniqueId === uniqueId);
  if (index > -1) {
    const item = cart[index];
    const newPrice = item.availablePrices[newSize];
    const newUniqueId = `${item.id}-${newSize}`;
    
    const existingIndex = cart.findIndex(i => i.uniqueId === newUniqueId);
    if (existingIndex > -1 && existingIndex !== index) {
      cart[existingIndex].quantity += item.quantity;
      cart.splice(index, 1);
    } else {
      item.size = newSize;
      item.price = newPrice;
      item.uniqueId = newUniqueId;
    }
    CartManager.saveCart(cart);
  }
};

window.toggleHealthInfo = function(btnElement, itemName) {
  let existingId = btnElement.dataset.popupId;
  if (existingId) {
    const existing = document.getElementById(existingId);
    if (existing) {
      existing.remove();
      delete btnElement.dataset.popupId;
      return;
    }
  }
  
  // Close any stray open popups across the site
  document.querySelectorAll('.health-popup').forEach(p => {
    p.remove();
  });

  const seed = itemName.length + itemName.charCodeAt(0);
  const calories = 80 + (seed % 150);
  const vitamins = ['Vitamin A', 'Vitamin C', 'Vitamin K', 'B-Complex', 'Antioxidants', 'Iron', 'Potassium', 'Calcium', 'Folate', 'Magnesium'];
  const vit1 = vitamins[seed % vitamins.length];
  const vit2 = vitamins[(seed + 3) % vitamins.length];

  const popupId = 'health-popup-' + Math.random().toString(36).substr(2, 9);
  btnElement.dataset.popupId = popupId;

  const rect = btnElement.getBoundingClientRect();
  let leftPos = rect.left + window.scrollX;
  if (leftPos + 240 > document.documentElement.scrollWidth) {
    leftPos = document.documentElement.scrollWidth - 250;
  }

  const popup = document.createElement('div');
  popup.id = popupId;
  popup.className = 'health-popup';
  popup.style.cssText = `
    position: absolute;
    top: ${rect.bottom + window.scrollY + 8}px;
    left: ${leftPos}px;
    background: rgba(10, 24, 14, 0.95);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(205, 255, 96, 0.3);
    border-radius: 16px;
    padding: 16px;
    width: 220px;
    z-index: 99999; /* Supreme global layer */
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    color: var(--on-surface);
    font-size: 0.75rem;
    pointer-events: none;
  `;
  popup.innerHTML = `
    <h4 style="color: var(--primary); font-weight: 900; font-size: 0.875rem; margin-bottom: 8px; display: flex; align-items: center; gap: 4px;">
      <span class="material-symbols-outlined" style="font-size: 16px;">spa</span> Vitality Profile
    </h4>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 8px;">
      <span style="color: var(--on-surface-variant);">Calories</span>
      <span style="font-weight: 800; color: #fff;">${calories} kcal</span>
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 8px;">
      <span style="color: var(--on-surface-variant);">Rich In</span>
      <span style="font-weight: 800; color: #fff; text-align: right;">${vit1}, ${vit2}</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <span style="color: var(--on-surface-variant);">Core Benefits</span>
      <span style="font-weight: 800; color: #e5f9e6; line-height: 1.4;">Boosts immunity, naturally detoxifying, supports vital long-term gut health.</span>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  setTimeout(() => {
    const closeListener = (e) => {
      if (!popup.contains(e.target) && e.target !== btnElement) {
        popup.remove();
        delete btnElement.dataset.popupId;
        document.removeEventListener('click', closeListener);
      }
    };
    document.addEventListener('click', closeListener);
  }, 10);
};



function renderCartPage() {
  const cartItemsContainer = document.getElementById('cartItems');
  if (!cartItemsContainer) return;
  
  function updateUI() {
    const cart = CartManager.getCart();
    
    const cartTitleCount = document.getElementById('cartTitleCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartTitleCount) cartTitleCount.textContent = `${CartManager.getTotalQuantity()} Freshly picked items ready for harvest.`;
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 64px 24px;">
          <span class="material-symbols-outlined" style="font-size: 64px; color: var(--on-surface-variant); margin-bottom: 16px;">production_quantity_limits</span>
          <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px;">Your Greenhouse is Empty</h3>
          <p style="color: var(--on-surface-variant); margin-bottom: 24px;">Add some nutritious elixirs to get started.</p>
          <a href="menu.html" class="btn-primary" style="padding: 12px 24px; font-size: 1rem;">Browse Menu</a>
        </div>
      `;
      if (cartSubtotal) cartSubtotal.textContent = '₹0.00';
      if (cartTotal) cartTotal.textContent = '₹0.00';
      return;
    }
    
    let html = '';
    cart.forEach((item, index) => {
      html += `
        <div class="glass-card flex items-center gap-6" style="padding: 16px; position: relative; z-index: ${999 - index};">
          <div style="width: 96px; height: 128px; border-radius: 12px; overflow: hidden; flex-shrink: 0;">
            <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="flex-grow: 1;">
            <div class="flex justify-between items-center" style="margin-bottom: 4px;">
              <h3 style="font-size: 1.25rem; font-weight: 800;">${item.name}</h3>
              <span style="color: var(--primary); font-weight: 800; font-size: 1.125rem;">₹${item.price}</span>
            </div>
            <p style="color: var(--on-surface-variant); font-size: 0.875rem; margin-bottom: 16px;">${item.desc || ''}</p>
            ${
              (item.availablePrices && Object.keys(item.availablePrices).length > 1) 
                ? `<details class="custom-details-dropdown" style="position: relative; margin-bottom: 16px; width: fit-content; font-size: 0.875rem; font-weight: 800; z-index: 10;">
                     <summary style="background: rgba(205,255,96,0.05); color: var(--primary); border: 1px solid rgba(205,255,96,0.3); border-radius: 12px; padding: 6px 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; backdrop-filter: blur(8px);">
                       ${item.size} <span class="material-symbols-outlined" style="font-size: 18px; pointer-events: none;">keyboard_arrow_down</span>
                     </summary>
                     <div style="position: absolute; top: calc(100% + 6px); left: 0; background: rgba(10,24,14,0.95); backdrop-filter: blur(24px); border: 1px solid rgba(205,255,96,0.15); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; min-width: 130px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                       ${Object.keys(item.availablePrices).map(s => `
                         <div onclick="window.updateCartItemSize('${item.uniqueId}', '${s}')" style="padding: 12px 18px; color: ${s === item.size ? 'var(--primary)' : 'var(--on-surface)'}; background: ${s === item.size ? 'rgba(205,255,96,0.1)' : 'transparent'}; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='${s === item.size ? 'rgba(205,255,96,0.1)' : 'transparent'}'">
                           ${s}
                         </div>
                       `).join('')}
                     </div>
                   </details>`
                : `<div style="font-size: 0.75rem; font-weight: 800; color: var(--on-surface-variant); margin-bottom: 16px;">${item.size}</div>`
            }
            
            <div class="flex justify-between items-center bg-surface-low p-2 rounded-full w-fit" style="border: 1px solid rgba(255,255,255,0.05);">
              <button onclick="CartManager.updateQuantity('${item.uniqueId}', -1)" style="width: 32px; height: 32px; color: var(--primary); display: flex; align-items: center; justify-content: center; border-radius: 50%;"><span class="material-symbols-outlined" style="font-size: 18px;">remove</span></button>
              <span style="padding: 0 16px; font-weight: 800;">${item.quantity}</span>
              <button onclick="CartManager.updateQuantity('${item.uniqueId}', +1)" style="width: 32px; height: 32px; color: var(--primary); display: flex; align-items: center; justify-content: center; border-radius: 50%;"><span class="material-symbols-outlined" style="font-size: 18px;">add</span></button>
              <span style="width: 16px;"></span>
              <button onclick="CartManager.removeItem('${item.uniqueId}')" style="padding: 0px 8px; color: var(--error-dim); display: flex; align-items: center; border-left: 1px solid rgba(255,255,255,0.1);"><span class="material-symbols-outlined" style="font-size: 18px;">delete</span></button>
            </div>
          </div>
        </div>
      `;
    });
    cartItemsContainer.innerHTML = html;
    
    const subtotal = CartManager.getSubtotal();
    const ecoFee = 10.00;
    
    if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `₹${(subtotal + ecoFee).toFixed(2)}`;
  }

  window.addEventListener('cartUpdated', updateUI);
  updateUI();
}

function renderCheckoutPage() {
  const checkoutOrderList = document.getElementById('checkoutOrderList');
  if (!checkoutOrderList) return;
  
  function updateUI() {
    const cart = CartManager.getCart();
    
    let html = '';
    cart.forEach(item => {
      html += `
        <div class="flex justify-between items-start">
          <div>
            <h4 style="font-weight: 800; font-size: 1.125rem;">${item.name}</h4>
            <p style="font-size: 0.75rem; color: var(--on-surface-variant); margin-top: 4px;">${item.size} <span style="color: var(--primary); margin-left: 4px;">x ${item.quantity}</span></p>
          </div>
          <span style="color: var(--primary); font-weight: 800;">₹${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `;
    });
    
    if (cart.length === 0) {
      setTimeout(() => window.location.href = 'menu.html', 2000);
      html = '<p>Your cart is empty. Redirecting to menu...</p>';
    }
    
    checkoutOrderList.innerHTML = html;
    
    const subtotal = CartManager.getSubtotal();
    const ecoFee = 10.00;
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `₹${(subtotal + ecoFee).toFixed(2)}`;
  }
  
  window.addEventListener('cartUpdated', updateUI);
  updateUI();
  
  const btnConfirmOrder = document.getElementById('btnConfirmOrder');
  if (btnConfirmOrder) {
    btnConfirmOrder.addEventListener('click', (e) => {
      e.preventDefault();
      const cart = CartManager.getCart();
      if (cart.length === 0) {
         alert("Your cart is empty!");
         return;
      }
      
      const name = document.getElementById('inputName').value;
      const phone = document.getElementById('inputPhone').value;
      const address = document.getElementById('inputAddress').value;
      
      if (!name || !phone || !address) {
        alert("Please fill in all delivery details.");
        return;
      }
      
      let msg = `*RAW LICIOUS ORDER*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Address:* ${address}%0A%0A*Items:*%0A`;
      cart.forEach(item => {
        msg += `- ${item.name} (${item.size}) x ${item.quantity} [₹${item.price * item.quantity}]%0A`;
      });
      
      const subtotal = CartManager.getSubtotal();
      msg += `%0A*Subtotal:* ₹${subtotal.toFixed(2)}%0A*Eco-Fee:* ₹10.00%0A*Total:* ₹${(subtotal + 10).toFixed(2)}`;
      
      const whatsappNumber = "918591791347";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${msg}`;
      
      CartManager.saveCart([]);
      window.location.href = whatsappUrl;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  CartManager.updateBadges();
  renderCartPage();
  renderCheckoutPage();
  // Navigation Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- Home Page Categories Logic ---
  const homeCategoriesWrapper = document.getElementById('homeCategoriesWrapper');
  if (homeCategoriesWrapper && typeof menuData !== 'undefined') {
    const categoriesInfo = [
      { id: 'coldPress', name: 'Cold Press Juices', desc: 'Cold-pressed elixirs harvested from organic soils.', tags: '<span class="material-symbols-outlined" style="font-size: 14px;">water_drop</span> 6 Items', tag2: '<span class="material-symbols-outlined" style="font-size: 14px;">spa</span> Pure Raw', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmxQSFgdCAjVwxC_-Lt7O5rZeIWesr0iJE0hSG3anvGD0psGPXu_CJhfgNvIL3RBX8jj6ec6hr5ANCumfcxNFdyTvvtZbIUAWE9S0ggNc4A87PHbLwr0YU4Z7ZBc9gih1yfrMS5CkqAZXJ0DWjmo9Y2LNPbSmfLxCC4R7fx9H7HurkN8shmKHY_zNfRC8g8nRKt0AxSNHjJAwEgERc4-jbKDd4oYHNbVNpVqF3Hi5nQnAQ7IgyDE9AP93CEldWZjw_83O3QL04W7k" },
      { id: 'fruitJuices', name: 'Fruit Juices', desc: 'Naturally sweet and 100% pure fruit juices.', tags: '<span class="material-symbols-outlined" style="font-size: 14px;">blender</span> 16 Items', tag2: '<span class="material-symbols-outlined" style="font-size: 14px;">bolt</span> Refresh', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvKvDWJHrP0CFU5IEgWuBEbfUzuSgb0fRiwA9GUtV4vjQAaPXUKOO-vIWbqtZwxeuEGM-fFGwHHCLYQr5N7b45itRjTJro6NGHldVuSFlPCGlZkWbXTNYhNK_-YA8ro8pPHBaJSDpeF5BTAmrYyB4jsmO-4L2WSeuJ1M3cuVqTNGj5fI95kNyDR8i0gKOEWYqMGiXV7BPibFE-kAVZKW8fh4vI8dmvUSY2AF7Q8jR8y2aLCDtUKJbV4SllH0vJE8SU0mkgchLS1xo" },
      { id: 'fruitMilkshake', name: 'Fruit Milkshakes', desc: 'Thick, creamy blends of fresh fruits and pure milk.', tags: '<span class="material-symbols-outlined" style="font-size: 14px;">icecream</span> 16 Items', tag2: '<span class="material-symbols-outlined" style="font-size: 14px;">favorite</span> Creamy', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkvJP9zqtZrjKiRte1h_vRcmODDj_ss6TH7rVOFaGZZNN8XXJ94Xho_9Ch_ztiNIkojSdf1kk8rPZPsR-Ko9iCfNbox6904JrWpzFXlXePR1G3brcQqzcI981l4AhiRM-UK-exCJHdOUGVpQ1E9c5kMGDhYGI9UIhIAZRoWK4-bDSaNKELkD_buAUkXvXNkhWgqI-R7bY7PfMv-pTsGaCcJXu3aQy5qeKvxzb8gvs3kFiTm4ZJ6_NpU8lJwjKvqJh2XT-scxRH-sk" },
      { id: 'dryFruitsMilkshake', name: 'Dry Fruit Milkshakes', desc: 'Rich shakes packed with nuts and dried fruits.', tags: '<span class="material-symbols-outlined" style="font-size: 14px;">energy_savings_leaf</span> 14 Items', tag2: '<span class="material-symbols-outlined" style="font-size: 14px;">fitness_center</span> Protein', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ1Dx2nioun9Tc4ZDYA2Aqp78PpWF7W2IcnUJo69hJU03sjg7SL4d3VXAeuNOOAuefU7nH5uRJrzzR86x9gxg1_x8snnXwxHiUEyLVJEMkcK1eTs7Lsi9tyi3KtYPOvQmmCDhkSMJEHoEMHutSfv0nZkMBpyaE2Rx6cekYri6StFaxxfmvjqyQ5BfUw94pFFoFUL0NPqHoihK1bZGTimUSUCQZq76yPTGp0nZi_foWYMkQ12jbEfYfe6wqWt-kUuLCt8dy3UzECoQ" },
      { id: 'boxes', name: 'Subscription Boxes', desc: 'Daily wellness packs delivered to your doorstep.', tags: '<span class="material-symbols-outlined" style="font-size: 14px;">outbox</span> 2 Plans', tag2: '<span class="material-symbols-outlined" style="font-size: 14px;">local_shipping</span> Free Delivery', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdEFsfCguvGZzksPyFWzlB4vk6kAWe69DCyIUfXF29yNN83-UC23834QrXaKFzAZf-CQkbKH6oUYNUByGDHS2-kLi6Ts3gaiMsiZWoLPXrjrHyiMHV22mq8rgfL2-LRk4zhR1WVndRXUXQC1JKRkZDhXTBK9zWd4FPNUk85K-Q6JHzeIj4E7LyhLe2MrzZsZUhpsz2pRqIwzssoZaKCyLcPhqnowDbhOyMrm_m--Sjtau3ImB7hLDcS2UnqrfJr1TtVAxcGQfGtZ8" }
    ];

    const allImgs = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ1Dx2nioun9Tc4ZDYA2Aqp78PpWF7W2IcnUJo69hJU03sjg7SL4d3VXAeuNOOAuefU7nH5uRJrzzR86x9gxg1_x8snnXwxHiUEyLVJEMkcK1eTs7Lsi9tyi3KtYPOvQmmCDhkSMJEHoEMHutSfv0nZkMBpyaE2Rx6cekYri6StFaxxfmvjqyQ5BfUw94pFFoFUL0NPqHoihK1bZGTimUSUCQZq76yPTGp0nZi_foWYMkQ12jbEfYfe6wqWt-kUuLCt8dy3UzECoQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCurBPrsAmP_eV18JcH3qh-GLaR3VyHWCbp3eL9PGwQqntmiZnq2xYXASpo1XUqTyX2jw96a7U9cr9cVLmD5ukc_EApsydhU3Fgik-LVDVKAvN4SSgFHwnmysIdP1vLqYi5r0uQxYWJuRi3jrvekq9mRw6pSOj9lBV50nSHJMLa2z3pgLZZSG-oPrfIueoMyCMw6RMsPsYmPRLsf8zv57AwM9EhagAJEIRRhNnFL1ZcYdNeKVsujX1gWk-L3lTkPx37ODLrRiyLHUU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAobpnH3b6PUXz5mWsM34R9bGZJQVDT3nu5NpoInZTu6iQZmIA4RcVeJJA6Vi88CZnnzSBOlHh_0fU3zzmENZACOcY6owwbXDtmeHEPnt_hI0c2GWD6h43yXNVM8UmoTn5oZ06Y9YJZ0ZY_eSygnS7mJEfodLh3O3wlRACV6uaEZvjlQA6zJHcvAqsmyWppPPIdite0WnHD3VwQjrV4TJhJ1M9HfB-rOw5ComzftzLGxwba-fhnfHjw_JHieCknJtQWgywJaGxKBic",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANoiNKa7FeJmkznUJ1qTSO7YUFG8kbqrQ3mmRunqsimViAflcTJ_SfW4Sp4uzr_u2qSNMFof9oudKLhltbcBLQOKO03GigD_ae2yDk_FtLbVXTtsJ62pQyi_vjNduCjcTui1kE-5Y1qnIeDRpGDVSbe31NIHbDwfQzvAIKmUvaiVVtTe0JTaHR0OAZm1D2Kk6NlRRgb-PGt52GDm1IgI_3NXVjzLxGMIlk2uYvkO8hRlj24P15QM1ugX8kpvTd1rIDUMexIRm_lwA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdEFsfCguvGZzksPyFWzlB4vk6kAWe69DCyIUfXF29yNN83-UC23834QrXaKFzAZf-CQkbKH6oUYNUByGDHS2-kLi6Ts3gaiMsiZWoLPXrjrHyiMHV22mq8rgfL2-LRk4zhR1WVndRXUXQC1JKRkZDhXTBK9zWd4FPNUk85K-Q6JHzeIj4E7LyhLe2MrzZsZUhpsz2pRqIwzssoZaKCyLcPhqnowDbhOyMrm_m--Sjtau3ImB7hLDcS2UnqrfJr1TtVAxcGQfGtZ8"
    ];

    let html = '';
    categoriesInfo.forEach((cat, index) => {
      const items = menuData[cat.id] || [];
      const displayItems = items.slice(0, 5); // 4 to 5 options

      let marqueeHTML = '';
      for (let i = 0; i < 3; i++) {
        displayItems.forEach((item, itemIndex) => {
          const imgSrc = allImgs[(itemIndex + index) % 5];
          const rawPrice = item.price || (item.prices ? Object.values(item.prices)[0] : 0);
          
          marqueeHTML += `
            <div class="glass-card marquee-product-card" style="transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="position: relative; width: 100%; border-radius: 12px; overflow: hidden; margin-bottom: 12px;">
                  <img src="${imgSrc}" class="marquee-product-img" style="transition: transform 0.5s;">
                  <button onclick="event.preventDefault(); window.toggleHealthInfo(this, '${item.name.replace(/'/g, "\\'")}')" style="position: absolute; top: 8px; left: 8px; width: 28px; height: 28px; border-radius: 50%; background: rgba(3,17,7,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); color: var(--primary); display: flex; align-items: center; justify-content: center; z-index: 5; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='var(--primary)'; this.style.color='#000'" onmouseout="this.style.background='rgba(3,17,7,0.7)'; this.style.color='var(--primary)'">
                    <span class="material-symbols-outlined" style="font-size: 16px;">spa</span>
                  </button>
                  <div style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 4px 8px; border-radius: 999px; font-size: 0.75rem; font-weight: 800; color: #fff;">
                    ₹${rawPrice}
                  </div>
                </div>
                <h4 class="marquee-product-title" style="font-weight: 800; color: #fff; line-height: 1.3; margin-bottom: 6px;">${item.name}</h4>
                ${item.description ? `<p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; line-height: 1.4; height: 2.8em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${item.description}</p>` : '<div style="height: 2.8em;"></div>'}
              </div>
              <div style="margin-top: 16px;">
                <button class="marquee-add-btn btn-primary" data-item-id="${item.id}" style="width: 100%; padding: 10px; border-radius: 12px; display: flex; justify-content: center; gap: 8px; font-size: 0.875rem; transition: all 0.3s;" onclick="event.preventDefault(); event.stopPropagation(); window.addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}', '${imgSrc}', ${rawPrice}, '${(item.description || '').substring(0, 30).replace(/'/g, "\\'")}', this, '');">
                  <span class="material-symbols-outlined" style="font-size: 18px;">add_shopping_cart</span> Add
                </button>
              </div>
            </div>
          `;
        });
      }

      html += `
        <div class="category-row-wrapper shadow-lg" style="margin-bottom: 64px; width: 100%;">
          
          <!-- Category Card -->
          <a href="menu.html?category=${cat.id}" class="glass-card category-side-card group" style="text-decoration: none;">
            <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(205,255,96,0.1), transparent); z-index: 0;"></div>
            <div style="position: absolute; right: -20px; top: -20px; width: 150px; height: 150px; background-image: url('${cat.img}'); background-size: cover; background-position: center; opacity: 0.1; border-radius: 50%; filter: blur(12px);" class="group-hover-scale"></div>
            
            <div class="category-img-container">
               <img src="${cat.img}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            
            <div class="category-content">
              <h3 class="category-title">${cat.name}</h3>
              <p class="category-desc">${cat.desc}</p>
              
              <div class="category-tags">
                <span class="flex items-center gap-2" style="font-size: 0.875rem; color: var(--on-surface);">
                  ${cat.tags}
                </span>
                <span class="flex items-center gap-2" style="font-size: 0.875rem; color: var(--on-surface);">
                  ${cat.tag2}
                </span>
              </div>
              
              <div class="category-btn group-hover-scale">
                Explore All <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
              </div>
            </div>
          </a>
          
          <!-- Marquee Container -->
          <div class="marquee-container no-scrollbar category-marquee-wrapper flex items-center">
             <div class="marquee-content">
               ${marqueeHTML}
             </div>
          </div>
        </div>
      `;
    });

    homeCategoriesWrapper.innerHTML = html;
    
    // Auto-Scroll Logic for Home Marquees
    document.querySelectorAll('.category-marquee-wrapper').forEach((wrapper, i) => {
      setInterval(() => {
        const card = wrapper.querySelector('.marquee-product-card');
        if (!card) return;
        const cardWidth = card.offsetWidth + parseFloat(window.getComputedStyle(card).marginRight || 0);
        
        if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 20) {
           wrapper.style.scrollBehavior = 'auto';
           wrapper.scrollLeft = 0;
           wrapper.style.scrollBehavior = 'smooth';
        } else {
           wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 3000 + (i * 600));
    });
  }

  // --- Menu Page Logic ---
  const categoryNav = document.getElementById('categoryNav');
  const menuGrid = document.getElementById('menuGrid');

  if (categoryNav && menuGrid && typeof menuData !== 'undefined') {
    const categories = [
      { id: 'coldPress', label: 'Cold Press Juices' },
      { id: 'fruitJuices', label: 'Fruit Juices' },
      { id: 'fruitMilkshake', label: 'Fruit Milkshakes' },
      { id: 'dryFruitsMilkshake', label: 'Dry Fruit Milkshakes' },
      { id: 'boxes', label: 'Subscription Boxes' },
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    
    let activeCategory = 'coldPress';
    if (catParam && categories.some(c => c.id === catParam)) {
      activeCategory = catParam;
    }

    const images = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ1Dx2nioun9Tc4ZDYA2Aqp78PpWF7W2IcnUJo69hJU03sjg7SL4d3VXAeuNOOAuefU7nH5uRJrzzR86x9gxg1_x8snnXwxHiUEyLVJEMkcK1eTs7Lsi9tyi3KtYPOvQmmCDhkSMJEHoEMHutSfv0nZkMBpyaE2Rx6cekYri6StFaxxfmvjqyQ5BfUw94pFFoFUL0NPqHoihK1bZGTimUSUCQZq76yPTGp0nZi_foWYMkQ12jbEfYfe6wqWt-kUuLCt8dy3UzECoQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCurBPrsAmP_eV18JcH3qh-GLaR3VyHWCbp3eL9PGwQqntmiZnq2xYXASpo1XUqTyX2jw96a7U9cr9cVLmD5ukc_EApsydhU3Fgik-LVDVKAvN4SSgFHwnmysIdP1vLqYi5r0uQxYWJuRi3jrvekq9mRw6pSOj9lBV50nSHJMLa2z3pgLZZSG-oPrfIueoMyCMw6RMsPsYmPRLsf8zv57AwM9EhagAJEIRRhNnFL1ZcYdNeKVsujX1gWk-L3lTkPx37ODLrRiyLHUU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAobpnH3b6PUXz5mWsM34R9bGZJQVDT3nu5NpoInZTu6iQZmIA4RcVeJJA6Vi88CZnnzSBOlHh_0fU3zzmENZACOcY6owwbXDtmeHEPnt_hI0c2GWD6h43yXNVM8UmoTn5oZ06Y9YJZ0ZY_eSygnS7mJEfodLh3O3wlRACV6uaEZvjlQA6zJHcvAqsmyWppPPIdite0WnHD3VwQjrV4TJhJ1M9HfB-rOw5ComzftzLGxwba-fhnfHjw_JHieCknJtQWgywJaGxKBic",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANoiNKa7FeJmkznUJ1qTSO7YUFG8kbqrQ3mmRunqsimViAflcTJ_SfW4Sp4uzr_u2qSNMFof9oudKLhltbcBLQOKO03GigD_ae2yDk_FtLbVXTtsJ62pQyi_vjNduCjcTui1kE-5Y1qnIeDRpGDVSbe31NIHbDwfQzvAIKmUvaiVVtTe0JTaHR0OAZm1D2Kk6NlRRgb-PGt52GDm1IgI_3NXVjzLxGMIlk2uYvkO8hRlj24P15QM1ugX8kpvTd1rIDUMexIRm_lwA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdEFsfCguvGZzksPyFWzlB4vk6kAWe69DCyIUfXF29yNN83-UC23834QrXaKFzAZf-CQkbKH6oUYNUByGDHS2-kLi6Ts3gaiMsiZWoLPXrjrHyiMHV22mq8rgfL2-LRk4zhR1WVndRXUXQC1JKRkZDhXTBK9zWd4FPNUk85K-Q6JHzeIj4E7LyhLe2MrzZsZUhpsz2pRqIwzssoZaKCyLcPhqnowDbhOyMrm_m--Sjtau3ImB7hLDcS2UnqrfJr1TtVAxcGQfGtZ8"
    ];

    function renderCategories() {
      categoryNav.innerHTML = '';
      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-btn ${cat.id === activeCategory ? 'active' : ''}`;
        btn.textContent = cat.label;
        btn.addEventListener('click', () => {
          activeCategory = cat.id;
          renderCategories();
          renderMenuItems();
        });
        categoryNav.appendChild(btn);
      });
    }

    function renderMenuItems() {
      menuGrid.innerHTML = '';
      const items = menuData[activeCategory] || [];
      
      items.forEach((item, index) => {
        const imgIndex = index % 5;
        const imgSrc = images[imgIndex];

        let prices = {};
        if (item.subscription) {
          prices = {
            'One Time': item.price,
            'Subscribe': item.subscription
          };
        } else {
          prices = item.prices || {};
        }
        
        const sizes = Object.keys(prices);
        let sizeSelectorHTML = '';
        
        if (sizes.length > 0) {
          sizeSelectorHTML = '<div class="size-selector">';
          sizes.forEach((size, i) => {
             sizeSelectorHTML += `<button class="size-btn ${i === 0 ? 'active' : ''}" onclick="window.changeSize(this, '${size}', ${prices[size]})">${size}</button>`;
          });
          sizeSelectorHTML += '</div>';
        }

        const basePrice = sizes.length > 0 ? prices[sizes[0]] : item.price || 0;
        const defaultSize = sizes.length > 0 ? sizes[0] : (item.subscription ? 'One Time' : 'Standard');
        
        const isBox = item.subscription ? true : false;
        const itemId = isBox ? `${item.id}_box` : item.id;
        
        const encodedPrices = encodeURIComponent(JSON.stringify(prices));

        const itemHTML = `
          <div class="menu-item-card glass-card">
            <div class="menu-item-img-wrap" style="position: relative;">
              <img src="${imgSrc}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
              <button onclick="event.preventDefault(); window.toggleHealthInfo(this, '${item.name.replace(/'/g, "\\'")}')" style="position: absolute; top: 12px; left: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(3,17,7,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); color: var(--primary); display: flex; align-items: center; justify-content: center; z-index: 5; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='var(--primary)'; this.style.color='#000'" onmouseout="this.style.background='rgba(3,17,7,0.7)'; this.style.color='var(--primary)'">
                <span class="material-symbols-outlined" style="font-size: 18px;">spa</span>
              </button>
            </div>
            <div class="menu-item-content flex flex-col items-stretch flex-1" style="min-width: 0;">
              <h3 class="menu-item-title" style="font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h3>
              ${item.description ? `<p class="menu-item-desc" style="color: var(--on-surface-variant); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.description}</p>` : ''}
              
              ${sizeSelectorHTML}
              
              <div class="menu-item-price-row" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                <span class="dynamic-price" style="font-size: 1.25rem; font-weight: 900; color: var(--secondary);">₹${basePrice}</span>
                <button class="add-btn" data-item-id="${itemId}" data-size="${defaultSize}" data-price="${basePrice}" style="padding: 10px; background: var(--surface-container-highest); border-radius: 50%; color: var(--primary); display: flex; transition: all 0.3s; align-items: center; justify-content: center;" onclick="window.addToCart('${itemId}', '${item.name.replace(/'/g, "\\'")}', '${imgSrc}', parseInt(this.dataset.price), '${(item.description || '').substring(0,30).replace(/'/g, "\\'")}', this, '${encodedPrices}', this.dataset.size);">
                  <span class="material-symbols-outlined" style="font-size: 20px;">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        `;
        menuGrid.insertAdjacentHTML('beforeend', itemHTML);
      });
    }

    renderCategories();
    renderMenuItems();
  }
  
  CartManager.updateMenuButtons();
});

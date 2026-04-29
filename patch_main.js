const fs = require('fs');
let mainJs = fs.readFileSync('js/main.js', 'utf8');

// 1. Replace the marquee loop in Home page
const homeOld = `      // Loop 3 times to create a scrolling marquee effect
      let marqueeHTML = '';
      for (let loop = 0; loop < 3; loop++) {
        marqueeHTML += items.map((item, i) => {
          const prices = item.prices || { 'Standard': item.price || 0 };
          const sizes = Object.keys(prices);
          const encoded = encodeURIComponent(JSON.stringify(prices));
          return \`
            <div class="glass-card marquee-product-card" style="padding: 10px; width: 140px; flex-shrink: 0; display: flex; flex-direction: column;">
              <div style="position: relative; aspect-ratio: 1/1; border-radius: 8px; overflow: hidden;">
                <img src="\${images[(i+idx)%5]}" style="width: 100%; height: 100%; object-fit: cover;">
                <button onclick="window.toggleHealthInfo(this, '\${item.name}')" style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2);"><span class="material-symbols-outlined" style="font-size: 13px; color: var(--primary); font-variation-settings: 'wght' 300;">spa</span></button>
                <div class="marquee-price-tag" style="position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.8); padding: 2px 6px; border-radius: 99px; font-size: 0.65rem; font-weight: 800; color: var(--primary);">₹\${prices[sizes[0]]}</div>
              </div>
              <h4 style="font-size: 0.8rem; font-weight: 800; margin: 8px 0 6px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${item.name}</h4>
              <div class="size-selector" style="margin-bottom: 6px;">
                 \${sizes.map((s, si) => \`<button class="size-btn \${si===0?'active':''}" style="font-size: 0.6rem; padding: 4px 6px;" onclick="window.changeSize(this, '\${s}', \${prices[s]})">\${s}</button>\`).join('')}
              </div>
              <div class="custom-dropdown-container" style="position: relative; width: 100%; margin-bottom: 12px;">
                <input type="hidden" class="sweetener-select" value="Honey">
                <details class="custom-details-dropdown" style="width: 100%; font-size: 0.75rem;">
                  <summary style="cursor: pointer; color: #fff; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 6px 8px; display: flex; justify-content: space-between; align-items: center; list-style: none;">
                    <span class="selected-text">🍯 Honey</span> <span style="font-size: 0.6rem;">▼</span>
                  </summary>
                  <div style="position: absolute; background: #0A180E; border: 1px solid rgba(205,255,96,0.2); border-radius: 8px; z-index: 100; width: 100%; top: 100%; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); overflow: hidden;">
                    \${[{v:'Honey',l:'🍯 Honey'},{v:'Jaggery',l:'🌴 Jaggery'},{v:'Sugar',l:'🍬 Sugar'},{v:'None',l:'🍃 None'}].map(o => \`
                      <div onclick="
                        const c = this.closest('.custom-dropdown-container');
                        c.querySelector('.sweetener-select').value = '\${o.v}';
                        c.querySelector('.selected-text').innerText = '\${o.l}';
                        this.closest('details').removeAttribute('open');
                        CartManager.updateMenuButtons();
                      " style="padding: 8px 12px; cursor: pointer; color: #fff;" onmouseover="this.style.background='rgba(205,255,96,0.1)'; this.style.color='var(--primary)'" onmouseout="this.style.background='transparent'; this.style.color='#fff'">\${o.l}</div>
                    \`).join('')}
                  </div>
                </details>
              </div>
              <button class="marquee-add-btn add-btn btn-primary" data-item-id="\${item.id}" data-size="\${sizes[0]}" data-price="\${prices[sizes[0]]}" style="width: 100%; padding: 6px; border-radius: 6px; font-size: 0.7rem; margin-top: auto;" onclick="window.addToCart('\${item.id}', '\${item.name}', '\${images[(i+idx)%5]}', this.dataset.price, '', this, '\${encoded}', this.dataset.size)">Add</button>
            </div>
          \`;
        }).join('');
      }`;

const homeNew = `      const gridHTML = items.map((item, i) => {
        const prices = item.prices || { 'Standard': item.price || 0 };
        const sizes = Object.keys(prices);
        const encoded = encodeURIComponent(JSON.stringify(prices));
        return \`
          <div class="product-grid-card">
            <div style="position: relative; aspect-ratio: 1/1; border-radius: 12px; overflow: hidden; margin-bottom: 12px;">
              <img src="\${images[(i + idx) % 5]}" style="width: 100%; height: 100%; object-fit: cover;">
              <button onclick="window.toggleHealthInfo(this, '\${item.name}')" style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2);"><span class="material-symbols-outlined" style="font-size: 13px; color: var(--primary); font-variation-settings: 'wght' 300;">spa</span></button>
            </div>
            <h4 style="font-size: 0.85rem; font-weight: 800; margin-bottom: 4px; line-height: 1.2; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">\${item.name}</h4>
            <div class="flex justify-between items-center mt-auto pt-2">
              <span style="font-size: 0.9rem; font-weight: 900; color: var(--primary);">₹\${prices[sizes[0]]}</span>
              <button class="btn-primary" style="padding: 6px 12px; border-radius: 999px; font-size: 0.7rem; font-weight: 800;" onclick="window.openCustomizationSheet('\${item.id}', '\${item.name.replace(/'/g,"\\\\'")}', '\${images[(i+idx)%5]}', '\${encoded}', '\${sizes[0]}')">Add</button>
            </div>
          </div>
        \`;
      }).join('');`;

// Replace marquee inner HTML logic
mainJs = mainJs.replace(homeOld, homeNew);

// 2. Replace the marquee wrapper HTML
mainJs = mainJs.replace(
  \`<div class="category-marquee-wrapper">\`, 
  \`<div class="product-grid-2col">\`
);
mainJs = mainJs.replace(
  \`<div class="marquee-content" style="gap: 0; padding-bottom: 12px;">\`, 
  \`\`);
mainJs = mainJs.replace(
  \`\${marqueeHTML}\n          </div>\n        </div>\n      </div>\`,
  \`\${gridHTML}\n        </div>\n      </div>\`
);

// 3. Replace Menu Page layout
const menuOld = `            <div class="menu-item-content" style="padding: 16px;">
              <h3 style="font-weight: 800; font-size: 1.1rem;">\${item.name}</h3>
              <div class="size-selector" style="margin: 12px 0;">
                \${sizes.map((s, si) => \`<button class="size-btn \${si === 0 ? 'active' : ''}" onclick="window.changeSize(this, '\${s}', \${prices[s]})">\${s}</button>\`).join('')}
              </div>
              <div class="custom-dropdown-container" style="position: relative; width: 100%; margin-bottom: 16px;">
                <input type="hidden" class="sweetener-select" value="Honey">
                <details class="custom-details-dropdown" style="width: 100%; font-size: 0.8rem;">
                  <summary style="cursor: pointer; color: #fff; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; list-style: none;">
                    <span class="selected-text">🍯 Honey</span> <span style="font-size: 0.6rem;">▼</span>
                  </summary>
                  <div style="position: absolute; background: #0A180E; border: 1px solid rgba(205,255,96,0.2); border-radius: 8px; z-index: 100; width: 100%; top: 100%; margin-top: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); overflow: hidden;">
                    \${[{ v: 'Honey', l: '🍯 Honey' }, { v: 'Jaggery', l: '🌴 Jaggery' }, { v: 'Sugar', l: '🍬 Sugar' }, { v: 'None', l: '🍃 None' }].map(o => \`
                      <div onclick="
                        const c = this.closest('.custom-dropdown-container');
                        c.querySelector('.sweetener-select').value = '\${o.v}';
                        c.querySelector('.selected-text').innerText = '\${o.l}';
                        this.closest('details').removeAttribute('open');
                        CartManager.updateMenuButtons();
                      " style="padding: 10px 12px; cursor: pointer; color: #fff;" onmouseover="this.style.background='rgba(205,255,96,0.1)'; this.style.color='var(--primary)'" onmouseout="this.style.background='transparent'; this.style.color='#fff'">\${o.l}</div>
                    \`).join('')}
                  </div>
                </details>
              </div>
              <div class="flex justify-between items-center mt-auto">
                <span class="dynamic-price" style="font-size: 1.2rem; font-weight: 900; color: var(--primary);">₹\${prices[sizes[0]]}</span>
                <button class="add-btn btn-primary" data-item-id="\${item.id}" data-size="\${sizes[0]}" data-price="\${prices[sizes[0]]}" style="padding: 0; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;" onclick="window.addToCart('\${item.id}', '\${item.name}', '\${images[idx % 5]}', this.dataset.price, '', this, '\${encoded}', this.dataset.size)">
                  <span class="material-symbols-outlined" style="font-size: 20px; font-variation-settings: 'wght' 300;">add_shopping_cart</span>
                </button>
              </div>
            </div>`;

const menuNew = `            <div class="menu-item-content" style="padding: 16px;">
              <h3 style="font-weight: 800; font-size: 1.1rem; margin-bottom: 8px;">\${item.name}</h3>
              <p style="font-size: 0.8rem; color: var(--on-surface-variant); margin-bottom: 16px; line-height: 1.4;">Freshly cold-pressed and rich in essential nutrients.</p>
              <div class="flex justify-between items-center mt-auto">
                <span class="dynamic-price" style="font-size: 1.2rem; font-weight: 900; color: var(--primary);">₹\${prices[sizes[0]]}</span>
                <button class="btn-primary" style="padding: 8px 20px; border-radius: 999px; font-size: 0.85rem;" onclick="window.openCustomizationSheet('\${item.id}', '\${item.name.replace(/'/g,"\\\\'")}', '\${images[idx % 5]}', '\${encoded}', '\${sizes[0]}')">Customize</button>
              </div>
            </div>`;

mainJs = mainJs.replace(menuOld, menuNew);

// 4. Inject Bottom Sheet JS functions
const bottomSheetJS = `
// --- Bottom Sheet Customization Flow ---
window.sheetState = {
  itemId: '', itemName: '', itemImage: '', encodedPrices: '',
  sizes: [], prices: {}, currentSize: '', currentSweetener: 'Honey', currentQuantity: 1
};

window.openCustomizationSheet = function(itemId, itemName, itemImage, encodedPricesStr, defaultSize) {
  const prices = JSON.parse(decodeURIComponent(encodedPricesStr));
  const sizes = Object.keys(prices);
  
  window.sheetState = {
    itemId, itemName, itemImage, encodedPrices: encodedPricesStr,
    sizes, prices, currentSize: defaultSize || sizes[0], currentSweetener: 'Honey', currentQuantity: 1
  };
  
  window.renderBottomSheet();
  
  let sheet = document.getElementById('customBottomSheet');
  if(!sheet) {
    document.body.insertAdjacentHTML('beforeend', \`<div id="customBottomSheet" class="bottom-sheet-overlay" onclick="if(event.target===this) window.closeCustomizationSheet()"></div>\`);
    sheet = document.getElementById('customBottomSheet');
  }
  
  setTimeout(() => { sheet.classList.add('show'); }, 10);
};

window.closeCustomizationSheet = function() {
  const sheet = document.getElementById('customBottomSheet');
  if(sheet) sheet.classList.remove('show');
};

window.updateSheetSize = function(size) {
  window.sheetState.currentSize = size;
  window.renderBottomSheet();
};

window.updateSheetSweetener = function(sw) {
  window.sheetState.currentSweetener = sw;
  window.renderBottomSheet();
};

window.updateSheetQuantity = function(delta) {
  window.sheetState.currentQuantity += delta;
  if(window.sheetState.currentQuantity < 1) window.sheetState.currentQuantity = 1;
  window.renderBottomSheet();
};

window.confirmSheetAdd = function() {
  const s = window.sheetState;
  for(let i=0; i<s.currentQuantity; i++) {
    window.addToCart(s.itemId, s.itemName, s.itemImage, s.prices[s.currentSize], '', null, s.encodedPrices, s.currentSize, s.currentSweetener);
  }
  window.closeCustomizationSheet();
};

window.renderBottomSheet = function() {
  const s = window.sheetState;
  const sheet = document.getElementById('customBottomSheet');
  if(!sheet) return;
  
  sheet.innerHTML = \`
    <div class="bottom-sheet-content" style="padding-bottom: env(safe-area-inset-bottom, 20px);">
      <div class="sheet-drag-handle"></div>
      <div class="sheet-scroll-area">
        <div class="flex items-center gap-4 mb-6">
          <img src="\${s.itemImage}" style="width: 80px; height: 80px; border-radius: 16px; object-fit: cover;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 4px; line-height: 1.2;">\${s.itemName}</h3>
            <p style="color: var(--primary); font-weight: 900; font-size: 1.1rem;">₹\${s.prices[s.currentSize]}</p>
          </div>
          <button onclick="window.closeCustomizationSheet()" style="margin-left: auto; width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><span class="material-symbols-outlined" style="font-size: 18px;">close</span></button>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 0.875rem; font-weight: 700; margin-bottom: 12px; color: var(--on-surface-variant);">Select Size</h4>
          <div class="flex gap-2">
             \${s.sizes.map(size => \`
               <button class="segment-btn \${size===s.currentSize?'active':''}" onclick="window.updateSheetSize('\${size}')" style="flex: 1; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 0.9rem;">\${size}</button>
             \`).join('')}
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 0.875rem; font-weight: 700; margin-bottom: 12px; color: var(--on-surface-variant);">Sweetener (Optional)</h4>
          <div class="flex flex-wrap gap-2">
             \${[{v:'Honey',l:'🍯 Honey'}, {v:'Jaggery',l:'🌴 Jaggery'}, {v:'Sugar',l:'🍬 Sugar'}, {v:'None',l:'🍃 None'}].map(o => \`
               <button class="chip-btn \${o.v===s.currentSweetener?'active':''}" onclick="window.updateSheetSweetener('\${o.v}')" style="padding: 10px 16px; border-radius: 99px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.85rem; font-weight: 600;">\${o.l}</button>
             \`).join('')}
          </div>
        </div>

        <div class="flex justify-between items-center" style="margin-bottom: 24px;">
          <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--on-surface-variant);">Quantity</h4>
          <div class="flex items-center gap-4" style="background: rgba(255,255,255,0.05); padding: 4px; border-radius: 99px;">
            <button onclick="window.updateSheetQuantity(-1)" style="width: 36px; height: 36px; border-radius: 50%; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined" style="font-size: 18px;">remove</span></button>
            <span style="font-weight: 800; font-size: 1.1rem; width: 24px; text-align: center;">\${s.currentQuantity}</span>
            <button onclick="window.updateSheetQuantity(1)" style="width: 36px; height: 36px; border-radius: 50%; background: var(--primary); color: #000; display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined" style="font-size: 18px;">add</span></button>
          </div>
        </div>
      </div>
      
      <div class="sheet-bottom-sticky">
        <button onclick="window.confirmSheetAdd()" class="btn-primary" style="width: 100%; padding: 16px; font-size: 1.1rem; border-radius: 999px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 24px rgba(205,255,96,0.2);">
          <span>Add to Cart</span>
          <span>₹\${(s.prices[s.currentSize] * s.currentQuantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  \`;
};
`;

mainJs = mainJs + '\n' + bottomSheetJS;

fs.writeFileSync('js/main.js', mainJs);
console.log('Patch complete.');

import { useState } from 'react';

export default function MenuItem({ item, imageSrc }) {
  const sizes = Object.keys(item.prices || {});
  const hasSizes = sizes.length > 0;
  const [selectedSize, setSelectedSize] = useState(hasSizes ? sizes[sizes.length - 1] : null); // Default to largest or only size
  
  const price = hasSizes ? item.prices[selectedSize] : item.price;
  
  return (
    <div className="glass-card rounded-xl overflow-hidden group flex flex-col h-full">
      <div className="h-56 overflow-hidden relative">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          src={imageSrc || "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ1Dx2nioun9Tc4ZDYA2Aqp78PpWF7W2IcnUJo69hJU03sjg7SL4d3VXAeuNOOAuefU7nH5uRJrzzR86x9gxg1_x8snnXwxHiUEyLVJEMkcK1eTs7Lsi9tyi3KtYPOvQmmCDhkSMJEHoEMHutSfv0nZkMBpyaE2Rx6cekYri6StFaxxfmvjqyQ5BfUw94pFFoFUL0NPqHoihK1bZGTimUSUCQZq76yPTGp0nZi_foWYMkQ12jbEfYfe6wqWt-kUuLCt8dy3UzECoQ"}
          alt={item.name} 
        />
        {item.subscription && (
          <div className="absolute top-4 right-4 bg-primary/90 text-surface-dim px-3 py-1 rounded-full border border-primary/30">
            <span className="text-[10px] font-bold uppercase tracking-widest">Subscription Available</span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-headline font-bold text-on-surface mb-1">{item.name}</h3>
        {item.description && (
          <p className="text-on-surface-variant text-xs mb-4 leading-relaxed">{item.description}</p>
        )}
        
        <div className="mt-auto">
          {hasSizes && sizes.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {sizes.map(size => {
                const isSelected = selectedSize === size;
                const shortSize = size.replace(' ML', '');
                return (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                    }`}
                    title={size}
                  >
                    {shortSize}
                  </button>
                )
              })}
            </div>
          )}
          
          {(hasSizes && sizes.length === 1) && (
            <div className="text-xs text-on-surface-variant font-bold mb-4 uppercase tracking-widest">{sizes[0]}</div>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-black text-secondary">₹{price}</span>
            {item.subscription && (
              <span className="text-xs text-primary font-bold">₹{item.subscription} / month</span>
            )}
          </div>
          
          <button className="w-full bg-primary hover:bg-primary-dim text-surface-dim font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">shopping_basket</span>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

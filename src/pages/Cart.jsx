import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <main className="pt-24 px-6 max-w-4xl mx-auto pb-32">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-3">Your Greenhouse</h2>
        <p className="text-on-surface-variant font-medium text-lg">3 Freshly picked items ready for harvest.</p>
      </div>

      <div className="space-y-6">
        {/* Item 1 */}
        <div className="glass-card p-4 rounded-xl flex items-center gap-6 group">
          <div className="w-24 h-32 rounded-lg overflow-hidden bg-surface-container-highest flex-shrink-0">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJnATKVp8IZnY-wF3OTc7Ldv921sfbBBYdMR3GixbwZQvkbXzlfweQjDcZHx31d95Ndl_OZqe3LbC_0f02VwkHcTfs7d1hcHDktIuvafiqfnzNfn4_wA7tU_aJ2AiBoKLmXuh2R2eIRG-9Yhfwnme5QEQx5XzFcgnEfM1MKFR7Fwi0zajZWLPbLWSNkY0XNtjFatJIMuWa8fpFKv48EUvdrrySoy0QcofPq6b07jGeh0xyp4ywn4RsTluLB-bCj5Qxkliqo0mNBd0" alt="Juice" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xl font-bold text-on-surface">Emerald Glow</h3>
              <span className="text-primary font-bold text-lg">₹80</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 hidden sm:block">Kale, Cucumber, Green Apple, Ginger</p>
            <div className="text-xs font-bold text-on-surface-variant mb-4">350 ML</div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center bg-surface-container-lowest/50 rounded-full p-1 border border-outline-variant/20">
                <button className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-full transition-colors active:scale-90">
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <span className="px-4 font-bold text-on-surface">1</span>
                <button className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-full transition-colors active:scale-90">
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
              <button className="text-error-dim hover:text-error transition-colors p-2">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="glass-card p-4 rounded-xl flex items-center gap-6 group">
          <div className="w-24 h-32 rounded-lg overflow-hidden bg-surface-container-highest flex-shrink-0">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWMebH4RjEW1qU3F6j9OqNXqKUvpJA9ElUsxRN4Z3CK617wAZ22mkJ300-M7fIlFpEDwaq_-aU-zIAWkUyTpkYVN0V-4Iz9i-eUBZAJ30mq01MHOhc1rkCYv0hqcjQrN__Mr9JUFDQF_ofN794AuRoUokK0dHXwVjuQ-K4HsMirQE6TOacafOzQg58SwD5H4pM4LD2MRZwi2jBBJfGiGV_-OyktMQcUqNPTo4T1T47f_Y6YYfCjx0c12gZD_jpFjUhzi_EF7TqMjo" alt="Juice" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xl font-bold text-on-surface">Golden Hour</h3>
              <span className="text-primary font-bold text-lg">₹198</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-4 hidden sm:block">Carrot, Orange, Turmeric, Lemon</p>
            <div className="text-xs font-bold text-on-surface-variant mb-4">350 ML</div>

            <div className="flex items-center justify-between">
              <div className="flex items-center bg-surface-container-lowest/50 rounded-full p-1 border border-outline-variant/20">
                <button className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-full transition-colors active:scale-90">
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <span className="px-4 font-bold text-on-surface">2</span>
                <button className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container-high rounded-full transition-colors active:scale-90">
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
              <button className="text-error-dim hover:text-error transition-colors p-2">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-xl flex flex-col justify-between border-primary/20">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">Eco-Packaging</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">All our juices are delivered in compostable glass bottles. Return them on your next order for 10% credit.</p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(205,255,96,0.3)] text-surface-dim">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <span className="text-sm font-bold text-on-surface">Carbon Neutral Delivery</span>
          </div>
        </div>

        <div className="bg-surface-container-high p-8 rounded-xl space-y-4">
          <div className="flex justify-between text-on-surface-variant">
            <span>Subtotal</span>
            <span className="font-medium text-on-surface">₹278.00</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Eco-Fee</span>
            <span className="font-medium text-on-surface">₹10.00</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Delivery</span>
            <span className="font-medium text-secondary">FREE</span>
          </div>
          
          <div className="pt-6 mt-4 border-t border-outline-variant/30 flex justify-between items-end">
            <span className="text-lg font-bold">Total</span>
            <div className="text-right">
              <span className="block text-4xl font-black text-primary tracking-tighter">₹288.00</span>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Tax Included</span>
            </div>
          </div>
        </div>
      </div>

      <Link to="/checkout" className="w-full mt-8 bg-primary text-surface-dim py-5 rounded-xl text-lg font-extrabold tracking-tight hover:shadow-[0_0_30px_rgba(205,255,96,0.4)] transition-all active:scale-95 flex items-center justify-center gap-3">
        Proceed to Checkout
        <span className="material-symbols-outlined">arrow_forward</span>
      </Link>
    </main>
  );
}

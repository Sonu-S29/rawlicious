import { Link } from 'react-router-dom';

export default function Checkout() {
  return (
    <main className="max-w-6xl mx-auto pt-24 px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32">
      <div className="lg:col-span-7 space-y-8">
        <section>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-on-surface">
            Freshness <span className="text-primary italic">incoming.</span>
          </h2>
          <p className="text-on-surface-variant text-lg">Where should we deliver your dose of vitality?</p>
        </section>

        <form className="space-y-6">
          <div className="glass-card p-8 rounded-xl space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              Delivery Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-2">Full Name</label>
                <input 
                  className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface" 
                  type="text" 
                  placeholder="Rahul Shah" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-2">Phone Number</label>
                <input 
                  className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface" 
                  type="tel" 
                  placeholder="+91 8591791347" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-2">Delivery Address</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl pl-5 pr-14 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface" 
                  type="text" 
                  placeholder="Street, Area, Landmark" 
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary">map</span>
              </div>
            </div>

            {/* Distance indicator visual */}
            <div className="flex items-center gap-4 bg-tertiary-container/10 border border-tertiary/20 p-5 rounded-2xl mt-4">
              <div className="w-12 h-12 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined">speed</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-tertiary">Distance: 4.2km</span>
                  <span className="text-xs uppercase tracking-tighter font-bold text-tertiary">Express</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <section className="relative overflow-hidden glass-card rounded-xl p-8 border-primary/30">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 blur-[80px]"></div>
          <div className="relative flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">WhatsApp Order</h2>
              <p className="text-on-surface-variant text-sm max-w-sm">Send your order list directly to our kitchen via WhatsApp for instant confirmation and payment links.</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-emerald-400 text-3xl">chat</span>
            </div>
          </div>
        </section>
      </div>

      {/* Summary Sidebar */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 space-y-6">
          <div className="glass-card rounded-xl p-8 border-t-4 border-t-primary">
            <h3 className="text-2xl font-extrabold mb-8">Order Summary</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">Emerald Glow</h4>
                  <p className="text-xs text-on-surface-variant mt-1">350 ML</p>
                </div>
                <span className="text-primary font-bold">₹80</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">Golden Hour</h4>
                  <p className="text-xs text-on-surface-variant mt-1">350 ML <span className="text-primary ml-1">x 2</span></p>
                </div>
                <span className="text-primary font-bold">₹198</span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹278.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Eco-Fee</span>
                <span>₹10.00</span>
              </div>
              <div className="flex justify-between text-2xl font-extrabold pt-4 text-on-surface border-t border-white/5">
                <span>Total</span>
                <span className="text-primary">₹288.00</span>
              </div>
            </div>

            <button className="w-full mt-10 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-5 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-[0_10px_40px_rgba(16,185,129,0.2)]">
              <span className="material-symbols-outlined text-xl">send</span>
              Confirm via WhatsApp
            </button>
            <p className="text-center text-xs text-on-surface-variant mt-6 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">lock</span> Secure Link
            </p>
          </div>

          <div className="h-40 rounded-xl overflow-hidden glass-card relative group cursor-pointer border border-white/5">
            <img className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXZk7BfmuSJMMXjO5bjqfHe467V-CKiyJ1pT2HyjA-wd8jHcn4PP5RYp11DGpkuJIboqE-ft_7tq37CQwyCfkA9l9KvMipsp8V2I63nj_4dDIM_brWLCgDAlq8aDNWOUPUadZeB2kt31cLbYw8b5VVGDjoyfpWs69IAf8HLwiAgbLpgZcvj2i1vFcjzA9viB9W12K5UR6e9wpZTFeRHDHyk_6esCzciRWgqdubS6vCMpoZA-77RhgFJlTemPIIYNche7X1_Z096B8" alt="Map View" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-sm font-bold text-on-surface">Store Pick Up Available</span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">arrow_outward</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

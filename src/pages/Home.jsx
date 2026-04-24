import { Link } from 'react-router-dom';
import { menuData } from '../data/menuData';

export default function Home() {
  return (
    <main className="pt-16 pb-32">
      <section className="relative min-h-[751px] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Background Jungle Leaves" 
            className="w-full h-full object-cover opacity-40 scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4PtAEqCgIpo91F-H0EdvwLvcpbmhTbrIxkvO1bKDQijZ1e44qX3ukO3zL3wv0ZMHALedBe2yoGtMSGfOrOZGt54F232ewpZRVAmhNDj2nkoHy3gOGaCxt_SPYOOv5wBGsCnNvXCaG0ZJroH3_RqMTMU3dD9NUqkv6vlP8y7_6HFX8GsppLRq8Y8Z6HxLXA49_SpqSovQiSL1vJIoCVZO5W09BlE1GNzLIiX5HQ2FlkgVcHQlFPJtkSZQ35xUR9tBMt2ybuJUJGng" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/60 to-surface"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6">
            Pressed to Perfection
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-on-surface mb-8 leading-[1.1] md:leading-[0.9]">
            100% Pure <br />
            <span className="bg-gradient-to-r from-primary via-secondary-fixed to-primary text-transparent bg-clip-text text-glow">Freshness</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
            Cold-pressed elixirs harvested from organic soils. No additives, no compromises. Just the raw power of nature in every drop.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/menu" className="w-full sm:w-auto px-10 py-5 bg-primary text-surface-dim rounded-xl font-extrabold text-lg hover:shadow-[0_0_30px_rgba(205,255,96,0.3)] transition-all active:scale-95">
              Shop All Juices
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 glass-panel text-on-surface rounded-xl font-bold text-lg hover:bg-surface-container-high transition-all border border-white/5">
              Our Process
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-4">Daily Harvest</h2>
              <p className="text-on-surface-variant">Vibrant blends bottled at peak nutrition.</p>
            </div>
            <Link to="/menu" className="text-primary font-bold flex items-center gap-2 group hidden md:flex">
              Explore Full Menu
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="juice-pulse group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden glass-panel mb-6 p-1">
                <img alt="Green Juice" className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmxQSFgdCAjVwxC_-Lt7O5rZeIWesr0iJE0hSG3anvGD0psGPXu_CJhfgNvIL3RBX8jj6ec6hr5ANCumfcxNFdyTvvtZbIUAWE9S0ggNc4A87PHbLwr0YU4Z7ZBc9gih1yfrMS5CkqAZXJ0DWjmo9Y2LNPbSmfLxCC4R7fx9H7HurkN8shmKHY_zNfRC8g8nRKt0AxSNHjJAwEgERc4-jbKDd4oYHNbVNpVqF3Hi5nQnAQ7IgyDE9AP93CEldWZjw_83O3QL04W7k" />
                <div className="absolute top-4 right-4 bg-primary text-surface-dim px-3 py-1 rounded-full text-xs font-black">NEW</div>
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Emerald Glow</h3>
              <p className="text-on-surface-variant text-sm mb-4">Kale, Cucumber, Green Apple, Ginger</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-secondary">₹85</span>
                <Link to="/cart" className="p-3 bg-surface-container-highest rounded-full text-primary hover:bg-primary hover:text-surface-dim transition-colors">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </Link>
              </div>
            </div>

            <div className="juice-pulse group" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden glass-panel mb-6 p-1">
                <img alt="Orange Juice" className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvKvDWJHrP0CFU5IEgWuBEbfUzuSgb0fRiwA9GUtV4vjQAaPXUKOO-vIWbqtZwxeuEGM-fFGwHHCLYQr5N7b45itRjTJro6NGHldVuSFlPCGlZkWbXTNYhNK_-YA8ro8pPHBaJSDpeF5BTAmrYyB4jsmO-4L2WSeuJ1M3cuVqTNGj5fI95kNyDR8i0gKOEWYqMGiXV7BPibFE-kAVZKW8fh4vI8dmvUSY2AF7Q8jR8y2aLCDtUKJbV4SllH0vJE8SU0mkgchLS1xo" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Solar Flare</h3>
              <p className="text-on-surface-variant text-sm mb-4">Carrot, Turmeric, Lemon, Cayenne</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-secondary">₹79</span>
                <Link to="/cart" className="p-3 bg-surface-container-highest rounded-full text-primary hover:bg-primary hover:text-surface-dim transition-colors">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </Link>
              </div>
            </div>

            <div className="juice-pulse group" style={{ animationDelay: '0.4s' }}>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden glass-panel mb-6 p-1">
                <img alt="Beet Juice" className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkvJP9zqtZrjKiRte1h_vRcmODDj_ss6TH7rVOFaGZZNN8XXJ94Xho_9Ch_ztiNIkojSdf1kk8rPZPsR-Ko9iCfNbox6904JrWpzFXlXePR1G3brcQqzcI981l4AhiRM-UK-exCJHdOUGVpQ1E9c5kMGDhYGI9UIhIAZRoWK4-bDSaNKELkD_buAUkXvXNkhWgqI-R7bY7PfMv-pTsGaCcJXu3aQy5qeKvxzb8gvs3kFiTm4ZJ6_NpU8lJwjKvqJh2XT-scxRH-sk" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Ruby Root</h3>
              <p className="text-on-surface-variant text-sm mb-4">Beetroot, Pomegranate, Red Apple</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-secondary">₹92</span>
                <Link to="/cart" className="p-3 bg-surface-container-highest rounded-full text-primary hover:bg-primary hover:text-surface-dim transition-colors">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden glass-panel group min-h-[300px]">
              <img alt="Market Ingredients" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4KcjOHxNhC3cAtHdWvz_Fu7odHSCb90NnZ2YkY2CcJImVplhKpWL-ZFndG80V0P1WgOAa35XBska4uKq8Lt7WgWlv-zTOsgZ7LbaEKxEfhYQB_tLtSVh7zUv7MHzcJqHt2UhH3YKFrOYYS2n_3hlzok9FgLcd8wBAkD2ZVMOowyDPsItLYW5moJZUlaJp4h5ikBUfRKcjiyPfGgMMH64qUAULtWZi8J4DzT55cg-y6Ucz835zXHGUidRG8F16KNiyvixh1BjrZVA" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent border border-white/10 rounded-xl"></div>
              <div className="relative h-full flex flex-col justify-end p-10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">eco</span>
                <h3 className="text-4xl font-black mb-4">Fresh Ingredients</h3>
                <p className="text-on-surface-variant max-w-xs">Sourced directly from vertical farms and local organic growers. Picked at dawn, pressed by noon.</p>
              </div>
            </div>

            <div className="md:col-span-2 relative rounded-xl overflow-hidden glass-panel p-10 flex flex-col justify-center">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 shrink-0 rounded-full bg-secondary-container/30 flex items-center justify-center border border-secondary/20">
                  <span className="material-symbols-outlined text-secondary text-3xl">do_not_disturb_on</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">No Sugar Added</h3>
                  <p className="text-on-surface-variant text-sm">Pure fruit fructose only. No artificial sweeteners, ever.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 relative rounded-xl overflow-hidden bg-primary/10 border border-primary/20 p-10 flex flex-col justify-center">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 shrink-0 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                  <span className="material-symbols-outlined text-primary text-3xl">electric_bolt</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">Fast Delivery</h3>
                  <p className="text-on-surface-variant text-sm">Chilled logistics ensure your juice arrives cold and fresh within 1 hour.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="px-6 py-20 pb-12">
        <div className="max-w-4xl mx-auto glass-panel rounded-xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px]"></div>
          <h2 className="text-4xl font-bold mb-6">Join the Vitality Club</h2>
          <p className="text-on-surface-variant mb-10">Get 15% off your first subscription and weekly tips on raw nutrition.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
            <input className="flex-grow bg-surface-container-highest border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary text-on-surface outline-none" placeholder="Your email address" type="email" />
            <button className="bg-primary text-surface-dim px-8 py-4 rounded-xl font-bold whitespace-nowrap active:scale-95 transition-transform hover:bg-primary-dim">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

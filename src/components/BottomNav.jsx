import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-surface-container/80 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)] rounded-t-[3rem] border-t border-white/5">
      <Link to="/" className={`flex flex-col items-center justify-center py-2 px-6 transition-all duration-300 ${path === '/' ? 'bg-primary text-surface-dim rounded-full scale-110 shadow-[0_0_20px_rgba(205,255,96,0.3)]' : 'text-on-surface-variant hover:text-primary active:scale-90'}`}>
        <span className="material-symbols-outlined mb-1">home_max</span>
        <span className="text-[11px] font-semibold uppercase tracking-widest">Home</span>
      </Link>
      <Link to="/menu" className={`flex flex-col items-center justify-center py-2 px-6 transition-all duration-300 ${path === '/menu' ? 'bg-primary text-surface-dim rounded-full scale-110 shadow-[0_0_20px_rgba(205,255,96,0.3)]' : 'text-on-surface-variant hover:text-primary active:scale-90'}`}>
        <span className="material-symbols-outlined mb-1">local_drink</span>
        <span className="text-[11px] font-semibold uppercase tracking-widest">Menu</span>
      </Link>
      <Link to="/cart" className={`flex flex-col items-center justify-center py-2 px-6 transition-all duration-300 ${path === '/cart' || path === '/checkout' ? 'bg-primary text-surface-dim rounded-full scale-110 shadow-[0_0_20px_rgba(205,255,96,0.3)]' : 'text-on-surface-variant hover:text-primary active:scale-90'}`}>
        <span className="material-symbols-outlined mb-1">shopping_basket</span>
        <span className="text-[11px] font-semibold uppercase tracking-widest">Cart</span>
      </Link>
    </nav>
  );
}

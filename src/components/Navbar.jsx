import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(3,17,7,0.1)] border-b border-white/5">
      <Link to="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">location_on</span>
        <h1 className="text-xl font-black text-primary tracking-tighter">Raw Licious</h1>
      </Link>
      
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-primary font-bold tracking-tight">Home</Link>
          <Link to="/menu" className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors px-3 py-1 rounded-full">Menu</Link>
          <Link to="/cart" className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors px-3 py-1 rounded-full">Cart</Link>
        </nav>
        
        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-sm text-primary">person</span>
        </div>
      </div>
    </header>
  );
}

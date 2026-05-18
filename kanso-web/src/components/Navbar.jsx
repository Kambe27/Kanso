import { LogOut } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout }) {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-light tracking-widest text-stone-900 uppercase">Kanso</h1>
        {isAuthenticated && (
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-medium tracking-wider text-stone-400 hover:text-stone-900 transition-colors uppercase"
          >
            <span>Logout</span>
            <LogOut size={16} />
          </button>
        )}
      </div>
    </header>
  );
}
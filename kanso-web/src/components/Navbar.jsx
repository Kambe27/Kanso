import { LogOut } from 'lucide-react';

export default function Navbar({ isAuthenticated, onLogout }) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-widest text-white uppercase">
          Kanso<span className="text-orange-500">.</span>
        </h1>
        {isAuthenticated && (
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-400 hover:text-orange-500 transition-colors uppercase"
          >
            <span>Logout</span>
            <LogOut size={16} />
          </button>
        )}
      </div>
    </header>
  );
}
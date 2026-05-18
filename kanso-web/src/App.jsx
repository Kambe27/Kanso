import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';

export default function App() {
  const client = useApolloClient();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    client.resetStore();
  };

  return (
    <div className="min-h-screen text-white font-sans antialiased bg-[url('https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-black/80 backdrop-blur-sm transition-all duration-500">
        
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <main className="max-w-2xl mx-auto px-4 py-12 relative z-10">
          {!isAuthenticated ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <TodoList />
          )}
        </main>
        
      </div>
    </div>
  );
}
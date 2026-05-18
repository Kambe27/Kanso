import { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function LoginForm({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const { data } = await login({
        variables: { email, password },
      });
      
      localStorage.setItem('token', data.login.token);
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      setLoginError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <div className="bg-zinc-950 p-8 rounded-2xl shadow-[0_8px_30px_rgb(249,115,22,0.1)] border border-zinc-800">
        
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white tracking-wide mb-2">
            {isLogin ? 'Welcome Back' : 'Join Kanso'}
          </h2>
          <p className="text-sm text-zinc-400">
            {isLogin 
              ? 'Enter your details to access your tasks.' 
              : 'Create an account to simplify your life.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none"
                placeholder="Email address"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                <Lock size={18} strokeWidth={1.5} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none"
                placeholder="Password"
              />
            </div>
          </div>

          {loginError && (
            <p className="text-red-500 text-sm text-center font-medium">{loginError}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full group relative flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgb(249,115,22,0.4)] hover:shadow-[0_0_25px_rgb(249,115,22,0.6)]"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-zinc-400 hover:text-orange-500 transition-colors"
          >
            {isLogin 
              ? "Don't have an account? Register here." 
              : "Already have an account? Sign in."}
          </button>
        </div>
        
      </div>
    </div>
  );
}
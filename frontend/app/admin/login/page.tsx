'use client';

import { useState } from 'react';
import useAdminAuth from '@/hooks/useAdminAuth';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const { login, loading, error } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-pink-100/50 border border-pink-100 w-full max-w-md relative overflow-hidden"
      >
        {/* Dekorasi Glow di dalam Card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-[40px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-2xl shadow-lg shadow-pink-200 flex items-center justify-center mx-auto mb-5 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-bold text-3xl drop-shadow-sm">🔒</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2 font-medium">Please sign in to access the admin panel.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-bold text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border-2 border-pink-100 focus:border-pink-300 focus:bg-white outline-none rounded-xl text-slate-700 font-medium transition-all"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border-2 border-pink-100 focus:border-pink-300 focus:bg-white outline-none rounded-xl text-slate-700 font-medium transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-6 py-4 mt-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:shadow-pink-200 disabled:hover:translate-y-0 transition-all duration-300"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

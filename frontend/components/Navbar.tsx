'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-pink-100 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-xl shadow-lg shadow-pink-200 flex items-center justify-center">
            <span className="text-white font-bold text-lg drop-shadow-sm">📸</span>
          </div>
          <span className="text-slate-800 font-extrabold tracking-tight hidden sm:inline">Photobooth<span className="text-pink-500">Studio</span></span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-slate-600 font-medium hover:text-pink-500 transition-colors">
            Home
          </Link>
          <Link href="/events" className="text-slate-600 font-medium hover:text-pink-500 transition-colors">
            Events
          </Link>
          <Link href="/admin/login">
            <motion.button
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full text-white font-semibold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

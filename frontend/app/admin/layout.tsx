'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Jika sedang di halaman login, sembunyikan sidebar tapi tetap pertahankan background
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 text-slate-800">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 text-slate-800">
      <aside className="w-64 bg-white border-r border-pink-100 shadow-sm min-h-screen p-6 relative z-10">
        <Link href="/admin" className="text-2xl font-extrabold block mb-8 text-slate-800 tracking-tight">Admin<span className="text-pink-500">Panel</span></Link>
        <nav className="flex flex-col gap-3">
          <Link href="/admin" className="text-slate-700 font-semibold hover:text-pink-500 hover:bg-pink-50 transition-colors px-4 py-3 rounded-xl bg-pink-50/50">Dashboard</Link>
          <Link href="/admin/login" className="text-slate-600 font-medium hover:text-pink-500 hover:bg-pink-50 transition-colors px-4 py-3 rounded-xl">Login</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

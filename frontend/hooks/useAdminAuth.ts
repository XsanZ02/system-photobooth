'use client';

import { useState } from 'react';
import adminApi from '@/lib/adminApi';
import { useRouter } from 'next/navigation';

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.login(email, password);
      const { token, admin } = res.data || res;
      if (token) {
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify(admin || {}));
        router.push('/admin');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  const getAdmin = () => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('admin_user');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  return { login, logout, getToken, getAdmin, loading, error };
};

export default useAdminAuth;

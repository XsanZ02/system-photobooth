'use client';

import { useEffect } from 'react';

export type ToastMessage = { id: string; text: string; type?: 'success' | 'error' | 'info' };

export default function Toast({ message, onClose }: { message: ToastMessage; onClose: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(message.id), 4000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  const bg = message.type === 'success' ? 'bg-green-500' : message.type === 'error' ? 'bg-rose-500' : 'bg-slate-800';

  return (
    <div className={`px-4 py-3 rounded-xl shadow-lg shadow-pink-100/50 ${bg} text-white font-semibold`}>{message.text}</div>
  );
}

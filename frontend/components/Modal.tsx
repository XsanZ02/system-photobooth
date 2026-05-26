'use client';

type Props = {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({ title, message, confirmLabel = 'Yes', cancelLabel = 'Cancel', onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-md border border-pink-100">
        {title && <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>}
        {message && <p className="text-slate-500 mb-6 font-medium">{message}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">{cancelLabel}</button>
          <button onClick={onConfirm} className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-md transition-colors">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

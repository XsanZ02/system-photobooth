'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import adminApi from '@/lib/adminApi';
import useAdminAuth from '@/hooks/useAdminAuth';
import Modal from '@/components/Modal';
import Toast, { ToastMessage } from '@/components/Toast';

type EventItem = {
  id: string;
  title: string;
  slug: string;
};

type PhotoItem = {
  id: string;
  url: string;
  thumbnail?: string;
};

export default function AdminPage() {
  const router = useRouter();
  const { getToken, logout, getAdmin } = useAdminAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTargetId, setModalTargetId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastCounter = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const slugRegex = /^[a-z0-9-]+$/i;

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const res = await adminApi.getEvents(token);
        setEvents(res.data || res);
      } catch (err) {
        console.error(err);
        addToast('Failed to load events', 'error');
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const addToast = (text: string, type: ToastMessage['type'] = 'info') => {
    toastCounter.current += 1;
    const t: ToastMessage = { id: `toast-${toastCounter.current}`, text, type };
    setToasts((s) => [t, ...s]);
  };
  const removeToast = (id: string) => setToasts((s) => s.filter((t) => t.id !== id));

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return router.push('/admin/login');

    if (!title.trim()) return addToast('Title is required', 'error');
    if (!slug.trim() || !slugRegex.test(slug)) return addToast('Slug is required and must be alphanumeric/hyphens', 'error');

    try {
      const admin = getAdmin();
      const adminId = admin?.id || (admin && admin['id']) || '';
      await adminApi.createEvent({ title: title.trim(), slug: slug.trim(), adminId }, token);
      setTitle('');
      setSlug('');
      const res = await adminApi.getEvents(token);
      setEvents(res.data || res);
      addToast('Event created', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to create event', 'error');
    }
  };

  const startEdit = (ev: EventItem) => {
    setEditingId(ev.id);
    setEditTitle(ev.title || '');
    setEditSlug(ev.slug || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditSlug('');
  };

  const saveEdit = async (id: string) => {
    const token = getToken();
    if (!token) return router.push('/admin/login');

    if (!editTitle.trim()) return addToast('Title is required', 'error');
    if (!editSlug.trim() || !slugRegex.test(editSlug)) return addToast('Slug is required and must be alphanumeric/hyphens', 'error');

    try {
      await adminApi.updateEvent(id, { title: editTitle.trim(), slug: editSlug.trim() }, token);
      const res = await adminApi.getEvents(token);
      setEvents(res.data || res);
      cancelEdit();
      addToast('Event updated', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to update event', 'error');
    }
  };

  const handleDelete = (id: string) => {
    setModalTargetId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!modalTargetId) return setModalOpen(false);
    const token = getToken();
    if (!token) return router.push('/admin/login');
    try {
      await adminApi.deleteEvent(modalTargetId, token);
      const res = await adminApi.getEvents(token);
      setEvents(res.data || res);
      addToast('Event deleted', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete event', 'error');
    } finally {
      setModalOpen(false);
      setModalTargetId(null);
    }
  };

  // Photo upload state
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      const token = getToken();
      if (!token || !selectedEventId) return;
      try {
        const res = await adminApi.getPhotosByEvent(selectedEventId, token);
        setPhotos(res.data || res);
      } catch (err) {
        console.error(err);
        addToast('Failed to load photos', 'error');
      }
    };

    loadPhotos();
  }, [selectedEventId]);

  const handleUpload = async () => {
    if (!file) return addToast('Select a file first', 'error');
    if (!selectedEventId) return addToast('Select an event', 'error');
    const token = getToken();
    if (!token) return router.push('/admin/login');
    try {
      setUploading(true);
      await adminApi.uploadPhoto(file as File, selectedEventId, token);
      addToast('Photo uploaded', 'success');
      // refresh photos listing for the selected event
      const pRes = await adminApi.getPhotosByEvent(selectedEventId, token);
      setPhotos(pRes.data || pRes);
      setFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error(err);
      addToast('Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (f: File | null) => {
    setFile(f);
    if (f) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    const token = getToken();
    if (!token) return router.push('/admin/login');
    try {
      await adminApi.deletePhoto(photoId, token);
      setPhotos((s) => s.filter((p) => p.id !== photoId));
      addToast('Photo deleted', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete photo', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800">Dashboard</h1>
        <div>
          <button onClick={() => router.push('/')} className="mr-4 px-6 py-2.5 border-2 border-pink-200 text-pink-500 font-bold rounded-full hover:bg-pink-50 hover:border-pink-300 transition-all">View Site</button>
          <button onClick={() => { logout(); }} className="px-6 py-2.5 bg-rose-100 text-rose-600 font-bold rounded-full hover:bg-rose-200 transition-all">Logout</button>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Create Event</h2>
        <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 bg-white border-2 border-pink-100 focus:border-pink-300 outline-none rounded-xl text-slate-700 transition-all" />
            {!title.trim() && <div className="text-rose-500 text-sm mt-1.5 font-medium ml-1">Required</div>}
          </div>
          <div>
            <input placeholder="Slug (a-z0-9-)" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-3 bg-white border-2 border-pink-100 focus:border-pink-300 outline-none rounded-xl text-slate-700 transition-all" />
            {slug && !slugRegex.test(slug) && <div className="text-rose-500 text-sm mt-1.5 font-medium ml-1">Invalid slug</div>}
          </div>
          <div>
            <button disabled={!title.trim() || !slugRegex.test(slug)} className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-pink-200 disabled:opacity-50 disabled:hover:shadow-none transition-all">Create</button>
          </div>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Upload Photo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">Event</label>
            <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)} className="w-full p-3 bg-white border-2 border-pink-100 focus:border-pink-300 outline-none rounded-xl text-slate-700 transition-all">
              <option value="">Select event</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5 ml-1">File</label>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} className="w-full p-2 bg-white border-2 border-pink-100 rounded-xl text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 transition-all cursor-pointer" />
            {previewUrl && (
              <img src={previewUrl} alt="preview" className="mt-3 w-32 h-32 object-cover rounded-xl shadow-sm border border-pink-100" />
            )}
          </div>
          <div className="self-end">
            <button onClick={handleUpload} disabled={uploading || !file || !selectedEventId} className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-pink-200 disabled:opacity-50 transition-all">{uploading ? 'Uploading...' : 'Upload Photo'}</button>
          </div>
        </div>
      </section>

      {/* Photo gallery for selected event */}
      {selectedEventId && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Photos</h2>
          {photos.length === 0 && !uploading ? (
            <div className="text-slate-500 bg-white border border-pink-100 rounded-xl p-8 text-center shadow-sm">No photos for this event yet.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photos.map((p: PhotoItem) => (
                <div key={p.id} className="relative bg-pink-50 border border-pink-100 rounded-2xl overflow-hidden shadow-sm group">
                  <img src={p.thumbnail || p.url} alt="photo" className="w-full h-40 object-cover" />
                  <button onClick={() => handleDeletePhoto(p.id)} className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-rose-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-rose-50 hover:scale-105 opacity-0 group-hover:opacity-100 transition-all">Delete</button>
                </div>
              ))}
              
              {/* Skeleton Loading saat sedang mengunggah foto */}
              {uploading && (
                <div className="relative bg-pink-50/70 border-2 border-dashed border-pink-200 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center h-40 animate-pulse">
                  <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-12">Manage Events</h2>
        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="h-24 bg-pink-100 rounded-2xl w-full"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((ev: EventItem) => (
              <div key={ev.id} className="p-6 bg-white border border-pink-100 rounded-3xl shadow-lg shadow-pink-100/40 hover:shadow-xl hover:shadow-pink-100/60 transition-all">
                {editingId === ev.id ? (
                  <div className="grid gap-2">
                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="p-2.5 bg-white border-2 border-pink-100 rounded-xl outline-none focus:border-pink-300 text-slate-700 font-medium" />
                    <input value={editSlug} onChange={(e) => setEditSlug(e.target.value)} className="p-2.5 bg-white border-2 border-pink-100 rounded-xl outline-none focus:border-pink-300 text-slate-500 text-sm" />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(ev.id)} className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl hover:bg-green-200 transition-colors">Save</button>
                      <button onClick={cancelEdit} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-xl text-slate-800 mb-1">{ev.title}</div>
                      <div className="text-pink-500 font-medium text-sm mb-2">/{ev.slug}</div>
                      <div className="text-slate-400 text-xs bg-slate-50 inline-block px-2 py-1 rounded-md border border-slate-100">ID: {ev.id}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(ev)} className="px-4 py-2 bg-amber-100 text-amber-700 font-bold rounded-xl hover:bg-amber-200 transition-colors">Edit</button>
                      <button onClick={() => handleDelete(ev.id)} className="px-4 py-2 bg-rose-100 text-rose-600 font-bold rounded-xl hover:bg-rose-200 transition-colors">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {modalOpen && (
        <Modal title="Confirm delete" message="Are you sure you want to delete this event?" onConfirm={confirmDelete} onCancel={() => setModalOpen(false)} confirmLabel="Delete" cancelLabel="Cancel" />
      )}

      <div className="fixed right-4 bottom-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} onClick={() => removeToast(t.id)}>
            <Toast message={t} onClose={removeToast} />
          </div>
        ))}
      </div>
    </div>
  );
}

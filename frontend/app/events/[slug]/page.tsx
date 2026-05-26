'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useEvents, usePhotos } from '@/hooks/useApi';
import { Navbar } from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventGalleryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { fetchEventBySlug, loading: eventLoading } = useEvents();
  const { fetchPhotosByEvent, photos, loading: photosLoading } = usePhotos();
  
  const [event, setEvent] = useState<{ id: string; title: string; description?: string } | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ id: string; url: string } | null>(null);

  useEffect(() => {
    if (slug) {
      fetchEventBySlug(slug).then((res) => {
        if (res) {
          setEvent(res);
          fetchPhotosByEvent(res.id);
        }
      });
    }
  }, [slug, fetchEventBySlug, fetchPhotosByEvent]);

  if (eventLoading || !event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-pink-50 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-pink-500 font-bold tracking-wide">Memuat Galeri...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Bagian Header Event */}
        <div className="relative pt-24 pb-12 px-4 overflow-hidden bg-gradient-to-b from-pink-50 to-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 -translate-y-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto text-center relative z-10 max-w-3xl">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-4 drop-shadow-sm"
            >
              {event.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-500 mb-8 font-medium"
            >
              {event.description || 'Welcome to our beautiful event gallery. Download and share your memories!'}
            </motion.p>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg shadow-pink-100 border border-pink-100 text-pink-500 font-bold"
            >
              <span className="text-2xl">📸</span> 
              {photos.length} Photos Available
            </motion.div>
          </div>
        </div>

        {/* Grid Galeri */}
        <div className="container mx-auto px-4 py-12">
          {photosLoading ? (
             <div className="text-center text-slate-400 font-medium">Loading photos...</div>
          ) : photos.length === 0 ? (
            <div className="text-center py-24 bg-pink-50/50 rounded-3xl border border-pink-100 max-w-2xl mx-auto shadow-inner">
              <span className="text-6xl mb-4 block animate-bounce">😢</span>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">Belum ada foto</h3>
              <p className="text-slate-500">Foto untuk event ini sedang disiapkan atau belum diunggah.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {photos.map((photo: { id: string; url: string }, i: number) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 4) * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-2xl bg-pink-50 shadow-sm border border-pink-100 hover:shadow-2xl hover:shadow-pink-200/60 transition-all duration-500"
                >
                  {/* Render foto asli atau placeholder warna gradient saat foto kosong */}
                  <div className="w-full h-full bg-gradient-to-tr from-pink-200 to-rose-100 absolute inset-0 -z-10" />
                  
                  <img
                    src={photo.url}
                    alt={`Photo from ${event.title}`}
                    className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                    <a 
                      href={photo.url} 
                      download={`photobooth-${photo.id}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-6 py-2.5 bg-white/95 backdrop-blur-sm text-pink-600 font-bold rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 hover:bg-pink-50 hover:scale-105 shadow-xl"
                    >
                      Download ⬇️
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal Preview Photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-xl p-4 sm:p-8"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-xl backdrop-blur-md transition-colors z-50"
            >
              ✕
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center max-w-5xl w-full"
            >
              <img
                src={selectedPhoto.url}
                alt="Preview fullscreen"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl shadow-black/50"
              />
              <div className="mt-8 flex justify-center w-full">
                <a href={selectedPhoto.url} download={`photobooth-${selectedPhoto.id}.jpg`} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-lg rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-1 transition-all flex items-center gap-2">
                  <span>Download High-Res</span> <span>⬇️</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
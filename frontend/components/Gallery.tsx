'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Photo {
  id: string;
  url: string;
  thumbnail?: string;
  createdAt: string;
}

interface GalleryProps {
  photos: Photo[];
  isLoading?: boolean;
}

export const Gallery = ({ photos, isLoading = false }: GalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-800 rounded-lg aspect-square animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">No photos yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group cursor-pointer relative overflow-hidden rounded-lg aspect-square bg-slate-800"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.thumbnail || photo.url}
              alt="Gallery photo"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white">🔍</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[80vh]"
          >
            <Image
              src={selectedPhoto.url}
              alt="Full photo"
              width={1200}
              height={800}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center text-white transition"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

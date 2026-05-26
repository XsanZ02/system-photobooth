'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface EventCardProps {
  id: string;
  slug: string;
  title: string;
  description?: string;
  cover?: string;
  photoCount?: number;
}

export const EventCard = ({ id, slug, title, description, cover, photoCount = 0 }: EventCardProps) => {
  return (
    <Link href={`/events/${slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group cursor-pointer bg-white rounded-2xl p-3 border border-pink-50 shadow-xl shadow-pink-100/50 hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300"
      >
        <div className="relative overflow-hidden rounded-xl bg-pink-50 aspect-square mb-4">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-50 flex items-center justify-center">
              <span className="text-4xl">📸</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-semibold">View Gallery</span>
          </div>
        </div>

        <h3 className="text-slate-800 font-bold text-lg mb-2 group-hover:text-pink-500 transition-colors px-1">
          {title}
        </h3>

        {description && (
          <p className="text-slate-500 text-sm mb-3 line-clamp-2 px-1">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between text-slate-400 font-medium text-sm px-1 pb-1">
          <span>📷 {photoCount} photos</span>
        </div>
      </motion.div>
    </Link>
  );
};

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEvents } from '@/hooks/useApi';
import { Navbar } from '@/components/Navbar';
import { EventCard } from '@/components/EventCard';

export default function Home() {
  const { events, loading, fetchAllEvents } = useEvents();

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  const featuredEvents = events.slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
          {/* Dekorasi Background Mengambang */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-32 left-[10%] w-32 h-40 bg-white p-2 rounded-xl shadow-2xl shadow-pink-200/50 border border-pink-100 rotate-[-12deg] hidden md:block"
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-32 right-[10%] w-40 h-48 bg-white p-2 rounded-xl shadow-2xl shadow-pink-200/50 border border-pink-100 rotate-[15deg] hidden md:block"
            >
              <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-300 rounded-lg" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-40 right-[20%] w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 left-[25%] w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
              Photobooth Studio System
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 font-medium">
              Realtime photo gallery and event management
            </p>
            <p className="text-lg text-slate-500 mb-12">
              Scan QR, view photos instantly, download memories from your favorite events
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full font-bold text-white shadow-xl shadow-pink-200 hover:shadow-pink-300 transition-all"
                >
                  Browse Events
                </motion.button>
              </Link>
              <a href="#features">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-pink-200 rounded-full font-bold text-pink-500 hover:bg-pink-50 hover:border-pink-300 transition-all"
                >
                  Learn More
                </motion.button>
              </a>
            </div>
          </motion.div>
        </section>

        {/* Featured Events Section */}
        {!loading && featuredEvents.length > 0 && (
          <section className="py-20 bg-white/60 backdrop-blur-sm border-y border-pink-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
                  Featured Events
                </h2>
                <p className="text-slate-500 mb-12 text-lg">
                  Check out our latest events and galleries
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <EventCard
                        id={event.id}
                        slug={event.slug}
                        title={event.title}
                        description={event.description}
                        cover={event.cover}
                        photoCount={event.photos?.length || 0}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link href="/events">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-white border-2 border-pink-200 rounded-full font-bold text-pink-500 shadow-md shadow-pink-100 hover:bg-pink-50 transition-all"
                    >
                      View All Events
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: '📸',
                  title: 'Instant Sharing',
                  description: 'View and share photos instantly after events',
                },
                {
                  icon: '🎯',
                  title: 'QR Code Access',
                  description: 'Scan QR codes to access event galleries',
                },
                {
                  icon: '⬇️',
                  title: 'Easy Download',
                  description: 'Download individual or batch photos',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-white border border-pink-100 shadow-xl shadow-pink-100/50 text-center hover:shadow-2xl hover:shadow-pink-200/60 transition-all duration-300 group"
                >
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-pink-100 bg-white/50 py-12 mt-10">
          <div className="container mx-auto px-4 text-center text-slate-500 font-medium">
            <p>
              &copy; 2024 Photobooth Studio System. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

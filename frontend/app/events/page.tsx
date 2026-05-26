'use client';

import { useState, useEffect } from 'react';
import { useEvents } from '@/hooks/useApi';
import { Navbar } from '@/components/Navbar';
import { EventCard } from '@/components/EventCard';

export default function EventsPage() {
  const { events, loading, fetchAllEvents } = useEvents();

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              Events
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Browse all available photo galleries
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-pink-100 rounded-2xl aspect-square mb-4" />
                  <div className="bg-pink-100 h-4 rounded-full w-3/4 mb-3" />
                  <div className="bg-pink-100 h-4 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  slug={event.slug}
                  title={event.title}
                  description={event.description}
                  cover={event.cover}
                  photoCount={event.photos?.length || 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg font-medium">No events available yet</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';

export const useEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.events.getAll();
      setEvents(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEventBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.events.getBySlug(slug);
      return response.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    events,
    loading,
    error,
    fetchAllEvents,
    fetchEventBySlug,
  };
};

export const usePhotos = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotosByEvent = useCallback(async (eventId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.photos.getByEvent(eventId);
      setPhotos(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    photos,
    loading,
    error,
    fetchPhotosByEvent,
  };
};

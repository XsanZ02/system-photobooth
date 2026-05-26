import prisma from '../lib/prisma';
import { ApiError } from '../utils/errorHandler';

export const eventService = {
  // Get all events
  async getAllEvents() {
    return await prisma.event.findMany({
      include: {
        photos: {
          select: {
            id: true,
            thumbnail: true,
          },
          take: 4, // Get first 4 photos for preview
        },
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  // Get event by slug
  async getEventBySlug(slug: string) {
    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        photos: {
          orderBy: { createdAt: 'desc' },
        },
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!event) {
      throw new ApiError(404, 'Event not found');
    }

    return event;
  },

  // Get event by ID
  async getEventById(id: string) {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        photos: true,
        admin: true,
      },
    });

    if (!event) {
      throw new ApiError(404, 'Event not found');
    }

    return event;
  },

  // Create event
  async createEvent(data: any) {
    // Check if slug exists
    const existingEvent = await prisma.event.findUnique({
      where: { slug: data.slug },
    });

    if (existingEvent) {
      throw new ApiError(400, 'Event slug already exists');
    }

    return await prisma.event.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        cover: data.cover,
        theme: typeof data.theme === 'object' ? JSON.stringify(data.theme) : data.theme || null,
        adminId: data.adminId,
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  // Update event
  async updateEvent(id: string, data: any) {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new ApiError(404, 'Event not found');
    }

    return await prisma.event.update({
      where: { id },
      data: {
        title: data.title || event.title,
        description: data.description || event.description,
        cover: data.cover || event.cover,
        theme: typeof data.theme === 'object' ? JSON.stringify(data.theme) : data.theme || event.theme,
        status: data.status || event.status,
      },
      include: {
        admin: true,
      },
    });
  },

  // Delete event
  async deleteEvent(id: string) {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new ApiError(404, 'Event not found');
    }

    return await prisma.event.delete({
      where: { id },
    });
  },

  // Get photos by event
  async getPhotosByEvent(eventId: string) {
    return await prisma.photo.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
    });
  },
};

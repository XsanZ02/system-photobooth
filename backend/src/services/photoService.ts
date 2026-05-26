import prisma from '../lib/prisma';
import { ApiError } from '../utils/errorHandler';
import { uploadService } from './uploadService';

export const photoService = {
  // Get all photos
  async getAllPhotos(eventId?: string) {
    const where = eventId ? { eventId } : {};
    return await prisma.photo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  },

  // Get photos by event
  async getPhotosByEvent(eventId: string) {
    return await prisma.photo.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
    });
  },

  // Create photo
  async createPhoto(data: any) {
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event) {
      throw new ApiError(404, 'Event not found');
    }

    return await prisma.photo.create({
      data: {
        url: data.url,
        thumbnail: data.thumbnail,
        publicId: data.publicId,
        eventId: data.eventId,
      },
    });
  },

  // Delete photo
  async deletePhoto(id: string) {
    const photo = await prisma.photo.findUnique({
      where: { id },
    });

    if (!photo) {
      throw new ApiError(404, 'Photo not found');
    }

    // If photo has a Cloudinary publicId, attempt to delete it
    if (photo.publicId) {
      try {
        await uploadService.deleteImage(photo.publicId);
      } catch (err) {
        console.warn('Failed to delete image from Cloudinary', err);
      }
    }

    return await prisma.photo.delete({
      where: { id },
    });
  },

  // Get photo by ID
  async getPhotoById(id: string) {
    const photo = await prisma.photo.findUnique({
      where: { id },
      include: {
        event: true,
      },
    });

    if (!photo) {
      throw new ApiError(404, 'Photo not found');
    }

    return photo;
  },

  // Delete all photos by event
  async deletePhotosByEvent(eventId: string) {
    return await prisma.photo.deleteMany({
      where: { eventId },
    });
  },
};

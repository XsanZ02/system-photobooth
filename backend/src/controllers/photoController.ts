import { Request, Response } from 'express';
import { photoService } from '../services/photoService';
import { uploadService } from '../services/uploadService';
import { asyncHandler, ApiError } from '../utils/errorHandler';
import fs from 'fs';
import path from 'path';

export const photoController = {
  // Get photos by event
  getPhotosByEvent: asyncHandler(async (req: Request, res: Response) => {
    const rawEventId = req.params.eventId;
    const eventId = Array.isArray(rawEventId) ? rawEventId[0] : rawEventId;
    const photos = await photoService.getPhotosByEvent(eventId as string);
    res.json({
      success: true,
      data: photos,
    });
  }),

  // Get photo by ID
  getPhotoById: asyncHandler(async (req: Request, res: Response) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    const photo = await photoService.getPhotoById(id as string);
    res.json({
      success: true,
      data: photo,
    });
  }),

  // Upload photo (will be enhanced with multer + cloudinary)
  uploadPhoto: asyncHandler(async (req: Request, res: Response) => {
    // Support both JSON body (url) and multipart upload (file)
    const { url: bodyUrl, thumbnail: bodyThumbnail, publicId: bodyPublicId, eventId: bodyEventId } = req.body as any;
    let finalUrl = bodyUrl;
    let finalEventId = bodyEventId;
    let finalThumbnail = bodyThumbnail;
    let finalPublicId = bodyPublicId;

    const file = (req as any).file;
    if (file) {
      try {
        // If multer saved file to disk, upload to Cloudinary
        const uploadResult = await uploadService.uploadImage(file);
        finalUrl = uploadResult.url;
        finalThumbnail = uploadResult.thumbnail;
        finalPublicId = uploadResult.publicId;
      } finally {
        // ALWAYS attempt to remove local file if present, regardless of upload success
        try {
          const localPath = file.path || path.join(__dirname, '..', '..', 'uploads', file.filename || '');
          if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
        } catch (err) {
          console.warn('Could not remove local upload file', err);
        }
      }
    }

    if (!finalUrl || !bodyEventId) {
      throw new ApiError(400, 'URL and EventID are required');
    }

    const photo = await photoService.createPhoto({
      url: finalUrl,
      thumbnail: finalThumbnail,
      publicId: finalPublicId,
      eventId: bodyEventId,
    });

    res.status(201).json({
      success: true,
      data: photo,
      message: 'Photo uploaded successfully',
    });
  }),

  // Delete photo
  deletePhoto: asyncHandler(async (req: Request, res: Response) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    await photoService.deletePhoto(id as string);
    res.json({
      success: true,
      message: 'Photo deleted successfully',
    });
  }),
};

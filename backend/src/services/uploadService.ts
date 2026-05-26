import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadService = {
  // Upload image to Cloudinary
  async uploadImage(file: any, folder: string = 'photobooth-events') {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder,
        resource_type: 'auto',
      });

      return {
        publicId: result.public_id,
        url: result.secure_url,
        thumbnail: cloudinary.url(result.public_id, {
          width: 300,
          height: 300,
          crop: 'fill',
          quality: 'auto',
        }),
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  },

  // Delete image from Cloudinary
  async deleteImage(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      throw error;
    }
  },

  // Generate optimized URL
  generateOptimizedUrl(publicId: string, options = {}) {
    return cloudinary.url(publicId, {
      quality: 'auto',
      fetch_format: 'auto',
      ...options,
    });
  },
};

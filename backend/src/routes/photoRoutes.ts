import { Router } from 'express';
import { photoController } from '../controllers/photoController';
import multer from 'multer';
import path from 'path';
import requireAuth from '../middleware/authMiddleware';

// Configure multer storage to backend/uploads
const storage = multer.diskStorage({
	destination: function (_req, _file, cb) {
		cb(null, path.join(__dirname, '..', '..', 'uploads'));
	},
	filename: function (_req, file, cb) {
		const unique = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
		cb(null, unique);
	},
});
const upload = multer({ storage });

const router = Router();

// Get photos by event
router.get('/event/:eventId', photoController.getPhotosByEvent);

// Get photo by ID
router.get('/:id', photoController.getPhotoById);

// Upload photo (TODO: add multer middleware for file upload)
// Upload photo (accept multipart/form-data with `file` and `eventId`)
router.post('/upload', requireAuth, upload.single('file'), photoController.uploadPhoto);

// Delete photo
router.delete('/:id', requireAuth, photoController.deletePhoto);

export default router;

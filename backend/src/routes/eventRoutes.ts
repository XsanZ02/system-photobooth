import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import requireAuth from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/slug/:slug', eventController.getEventBySlug);
router.get('/:id', eventController.getEventById);

// Admin routes - protected by JWT
router.post('/', requireAuth, eventController.createEvent);
router.put('/:id', requireAuth, eventController.updateEvent);
router.delete('/:id', requireAuth, eventController.deleteEvent);

export default router;

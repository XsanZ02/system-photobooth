import { Router } from 'express';

const router = Router();

// API Routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'API routes' });
});

export default router;

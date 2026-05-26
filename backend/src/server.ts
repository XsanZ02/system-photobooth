import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';
import photoRoutes from './routes/photoRoutes';
import authRoutes from './routes/authRoutes';
import path from 'path';
import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/auth', authRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV}`);
  console.log(`✓ API: http://localhost:${PORT}/api`);
});

// Tangkap error yang tidak ter-handle (misal: database gagal konek)
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});

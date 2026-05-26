import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { asyncHandler } from '../utils/errorHandler';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });
    const result = await authService.registerAdmin({ email, password, name });
    res.status(201).json({ success: true, data: { admin: result.admin, token: result.token } });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });
    const result = await authService.login(email, password);
    res.json({ success: true, data: { admin: result.admin, token: result.token } });
  }),
};

export default authController;

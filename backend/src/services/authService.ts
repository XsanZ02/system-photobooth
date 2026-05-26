import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const authService = {
  async registerAdmin(data: { email: string; password: string; name?: string }) {
    const existing = await prisma.admin.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Admin already exists');

    const hashed = await bcrypt.hash(data.password, 10);
    const admin = await prisma.admin.create({ data: { email: data.email, password: hashed, name: data.name } });
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '7d' });
    return { admin, token };
  },

  async login(email: string, password: string) {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) throw new Error('Invalid credentials');

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '7d' });
    return { admin, token };
  },

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
  },
};

export default authService;

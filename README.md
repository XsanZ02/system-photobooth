# 📸 Photobooth Studio System v2

Realtime photo gallery and event management system untuk photobooth studio.

## 🏗️ Project Structure

```
photobooth-system/
├── frontend/          # Next.js + TailwindCSS + Framer Motion
├── backend/           # Express.js + Prisma + PostgreSQL
├── uploader-app/      # Python folder monitor
├── docs/              # Documentation
├── .gitignore         # Git ignore rules
└── .env.example       # Environment template
```

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

### Backend
```bash
cd backend
npm install
# Configure .env.local
npm run dev
# API runs on http://localhost:5000
```

### Uploader App
```bash
cd uploader-app
pip install -r requirements.txt
# Configure .env
python main.py
```

## 📋 Environment Setup

Copy `.env.example` to `.env.local` in each directory:

```bash
# Root level
cp .env.example .env

# Frontend
cp .env.example frontend/.env.local

# Backend
cp .env.example backend/.env.local
```

Then update values with your actual credentials:
- Database URL
- Cloudinary credentials
- JWT secret
- API URLs

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS, Framer Motion
- **Backend**: Express.js, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Real-time**: Socket.io
- **Storage**: Cloudinary
- **Uploader**: Python with Watchdog

## 📚 Documentation

- [Frontend Setup](./frontend/README.md)
- [Backend Setup](./backend/README.md)
- [Uploader App](./uploader-app/README.md)

## ✅ Development Checklist

See the full project checklist in the initial requirements document. Key phases:

- Phase 1: ✅ Repository Setup
- Phase 2: 🔄 Frontend Development
- Phase 3: 🔄 Backend API
- Phase 4: Cloud Storage Integration
- Phase 5: Realtime System
- Phase 6: Auto Uploader
- Phase 7-12: Advanced Features

## 🎯 Next Steps

1. Configure database (PostgreSQL)
2. Setup Cloudinary account
3. Implement database schema with Prisma
4. Build core API endpoints
5. Create frontend UI components
6. Integrate Socket.io for realtime updates

---

**Made with ❤️ for photobooth studios**

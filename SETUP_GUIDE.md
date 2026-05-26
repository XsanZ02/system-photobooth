# Phase 3 - Backend API Development Complete ✅

## Quick Start Guide

### 1. Install PostgreSQL
```bash
# Download from https://www.postgresql.org/download/
# Create database: photobooth_db
```

### 2. Backend Setup

```bash
cd backend

# Configure environment
cp .env.local .env.local  # Edit with your database URL

# Setup database schema
npm run prisma:migrate

# Start development server
npm run dev
```

**Backend runs on:** http://localhost:5000/api

### 3. Frontend Setup

```bash
cd frontend

# Configure environment
cat .env.local  # Already set to http://localhost:5000/api

# Start development server
npm run dev
```

**Frontend runs on:** http://localhost:3000

---

## API Endpoints (Backend)

### Health Check
```
GET http://localhost:5000/health
```

### Events
- `GET /api/events` - List all events
- `GET /api/events/slug/:slug` - Get event by slug
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Photos
- `GET /api/photos/event/:eventId` - Get photos by event
- `GET /api/photos/:id` - Get photo by ID
- `POST /api/photos/upload` - Upload photo
- `DELETE /api/photos/:id` - Delete photo

---

## Frontend Pages

- `/` - Home with featured events
- `/events` - Events list
- `/events/:slug` - Event detail with gallery

---

## Test with cURL

### Create Event
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Wedding 2024",
    "slug": "wedding-2024",
    "description": "Beautiful wedding gallery",
    "adminId": "admin-123"
  }'
```

### Get All Events
```bash
curl http://localhost:5000/api/events
```

---

## File Structure

```
backend/
├── src/
│   ├── server.ts           # Main server
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── utils/              # Utilities
│   ├── lib/                # Prisma client
│   ├── socket/             # Socket.io handlers
│   └── prisma/             # DB schema
├── package.json
├── tsconfig.json
└── .env.local

frontend/
├── app/                    # Next.js app
│   ├── page.tsx           # Home
│   ├── events/
│   │   ├── page.tsx       # Events list
│   │   └── [slug]/page.tsx # Event detail
│   ├── layout.tsx         # Root layout
│   └── globals.css
├── components/            # React components
│   ├── Navbar.tsx
│   ├── EventCard.tsx
│   └── Gallery.tsx
├── hooks/                 # Custom hooks
│   └── useApi.ts
├── lib/                   # Utilities
│   └── api.ts
├── package.json
└── tsconfig.json
```

---

## Next Steps (Phase 4+)

- [ ] JWT Authentication
- [ ] Admin Panel
- [ ] File Upload with Multer
- [ ] Cloudinary Integration
- [ ] Socket.io Realtime Gallery
- [ ] QR Code Generation
- [ ] Python Uploader App
- [ ] Deployment

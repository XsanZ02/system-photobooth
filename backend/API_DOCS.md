# Photobooth Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Health Check
```
GET /health
```

Response:
```json
{
  "status": "OK",
  "message": "Backend is running"
}
```

---

## Events Endpoints

### Get All Events
```
GET /api/events
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "event-id",
      "slug": "event-slug",
      "title": "Event Title",
      "description": "Event Description",
      "cover": "image-url",
      "theme": {},
      "status": "active",
      "photos": [],
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Event by Slug
```
GET /api/events/slug/:slug
```

**Params:**
- `slug` - Event slug

Response: Single event object

### Get Event by ID
```
GET /api/events/:id
```

**Params:**
- `id` - Event ID

Response: Single event object

### Create Event
```
POST /api/events
```

**Body:**
```json
{
  "title": "Event Title",
  "slug": "event-slug",
  "description": "Description",
  "cover": "image-url",
  "theme": {},
  "adminId": "admin-id"
}
```

**Required Fields:** title, slug, adminId

Response: Created event object (201)

### Update Event
```
PUT /api/events/:id
```

**Params:**
- `id` - Event ID

**Body:** (Any fields to update)
```json
{
  "title": "New Title",
  "description": "New Description",
  "status": "active"
}
```

Response: Updated event object

### Delete Event
```
DELETE /api/events/:id
```

**Params:**
- `id` - Event ID

Response:
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

## Photos Endpoints

### Get Photos by Event
```
GET /api/photos/event/:eventId
```

**Params:**
- `eventId` - Event ID

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "photo-id",
      "url": "image-url",
      "thumbnail": "thumbnail-url",
      "publicId": "cloudinary-id",
      "eventId": "event-id",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Photo by ID
```
GET /api/photos/:id
```

**Params:**
- `id` - Photo ID

Response: Single photo object

### Upload Photo
```
POST /api/photos/upload
```

**Body:**
```json
{
  "url": "image-url",
  "thumbnail": "thumbnail-url",
  "publicId": "cloudinary-id",
  "eventId": "event-id"
}
```

**Required Fields:** url, eventId

Response: Created photo object (201)

### Delete Photo
```
DELETE /api/photos/:id
```

**Params:**
- `id` - Photo ID

Response:
```json
{
  "success": true,
  "message": "Photo deleted successfully"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Common HTTP Status Codes:**
- 200 - Success
- 201 - Created
- 400 - Bad Request
- 404 - Not Found
- 500 - Server Error

---

## Next Steps

- [ ] Add JWT authentication
- [ ] Add multer file upload integration
- [ ] Add Cloudinary image optimization
- [ ] Add Socket.io for realtime updates
- [ ] Add admin authentication middleware
- [ ] Add request validation with middleware
- [ ] Add rate limiting

import { Request, Response } from 'express';
import { eventService } from '../services/eventService';
import { asyncHandler, ApiError } from '../utils/errorHandler';

export const eventController = {
  // Get all events
  getAllEvents: asyncHandler(async (req: Request, res: Response) => {
    const events = await eventService.getAllEvents();
    res.json({
      success: true,
      data: events,
    });
  }),

  // Get event by slug
  getEventBySlug: asyncHandler(async (req: Request, res: Response) => {
    const rawSlug = req.params.slug;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
    const event = await eventService.getEventBySlug(slug as string);
    res.json({
      success: true,
      data: event,
    });
  }),

  // Get event by ID
  getEventById: asyncHandler(async (req: Request, res: Response) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    const event = await eventService.getEventById(id as string);
    res.json({
      success: true,
      data: event,
    });
  }),

  // Create event (admin only)
  createEvent: asyncHandler(async (req: Request, res: Response) => {
    const { title, slug, description, cover, theme, adminId } = req.body;

    if (!title || !slug || !adminId) {
      throw new ApiError(400, 'Missing required fields');
    }

    const event = await eventService.createEvent({
      title,
      slug,
      description,
      cover,
      theme,
      adminId,
    });

    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully',
    });
  }),

  // Update event
  updateEvent: asyncHandler(async (req: Request, res: Response) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    const event = await eventService.updateEvent(id as string, req.body);
    res.json({
      success: true,
      data: event,
      message: 'Event updated successfully',
    });
  }),

  // Delete event
  deleteEvent: asyncHandler(async (req: Request, res: Response) => {
    const rawId = req.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    await eventService.deleteEvent(id as string);
    res.json({
      success: true,
      message: 'Event deleted successfully',
    });
  }),
};

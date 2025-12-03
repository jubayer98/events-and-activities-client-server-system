import { Router } from 'express';
import { eventController } from './event.controller';
import { bookingController } from '../booking/booking.controller';
import { authenticate, isAdmin, isHost, optionalAuth } from '../../middlewares/auth.middleware';

const router = Router();

// Host-only routes (must come before dynamic :id routes)
router.get('/my-events', authenticate, isHost, eventController.getMyEvents);
router.post('/', authenticate, isHost, eventController.createEvent);
router.put('/:id', authenticate, isHost, eventController.updateEvent);

// Public routes (with optional auth to filter approved events for non-admins)
router.get('/', optionalAuth, eventController.getAllEvents);
router.get('/:id', optionalAuth, eventController.getEventById);

// Event bookings (admin or host owner)
router.get('/:id/bookings', authenticate, bookingController.getEventBookings);
router.get('/:id/bookings/stats', authenticate, bookingController.getEventBookingStats);
router.get('/:id/participants', authenticate, isHost, bookingController.getEventParticipants);
router.get('/:id/earnings', authenticate, isHost, eventController.getEventEarnings);

// Admin-only routes (approval management)
router.patch('/:id/approval', authenticate, isAdmin, eventController.updateApprovalStatus);

// Delete event (admin or host owner)
router.delete('/:id', authenticate, eventController.deleteEvent);

export const eventRoutes = router;

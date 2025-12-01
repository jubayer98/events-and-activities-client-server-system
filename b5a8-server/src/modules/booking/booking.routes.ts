import { Router } from 'express';
import { bookingController } from './booking.controller';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';

const router = Router();

// Specific routes must come before dynamic :id routes
router.get('/my-bookings', authenticate, bookingController.getMyBookings);
router.post('/process-expired', authenticate, isAdmin, bookingController.processExpiredBookings);

// User routes (authenticated users with 'user' role)
router.post('/', authenticate, bookingController.bookEvent);
router.get('/:id', authenticate, bookingController.getBookingById);
router.delete('/:id', authenticate, bookingController.cancelBooking);

export const bookingRoutes = router;

import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { bookingService } from './booking.service';

/**
 * Booking Controller
 * Handles HTTP requests for bookings
 */
class BookingController {
    // Book an event
    bookEvent = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const { eventId } = req.body;

        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: 'Event ID is required',
            });
        }

        const booking = await bookingService.bookEvent(userId!, eventId);

        // Populate event to check fee status
        const populatedBooking = await booking.populate('event');
        const event = populatedBooking.event as any;
        
        const message = event.feeStatus === 'free' 
            ? 'Event booked successfully.'
            : 'Event booked successfully. Please complete payment within 30 minutes.';

        return res.status(201).json({
            success: true,
            message,
            data: { booking: populatedBooking },
        });
    });

    // Cancel booking
    cancelBooking = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const { id } = req.params;

        await bookingService.cancelBooking(id, userId);

        return res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
        });
    });

    // Get user's bookings
    getMyBookings = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const { active } = req.query;

        const bookings = await bookingService.getUserBookings(
            userId!,
            active === 'true'
        );

        return res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: { bookings, count: bookings.length },
        });
    });

    // Get user's payment history
    getPaymentHistory = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;

        const paymentHistory = await bookingService.getUserPaymentHistory(userId!);

        return res.status(200).json({
            success: true,
            message: 'Payment history retrieved successfully',
            data: { 
                payments: paymentHistory, 
                count: paymentHistory.length,
                totalPaid: paymentHistory.reduce((sum, p) => sum + p.amount, 0)
            },
        });
    });

    // Get single booking by ID
    getBookingById = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const userRole = req.user?.role;
        const { id } = req.params;

        // Admin can see any booking, users can only see their own
        const booking = await bookingService.getBookingById(
            id,
            userRole === 'admin' ? undefined : userId
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Booking retrieved successfully',
            data: { booking },
        });
    });

    // Get all bookings for an event (admin or host owner only)
    getEventBookings = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req.user?.id;
        const userRole = req.user?.role;

        // TODO: Verify host owns the event if not admin
        // For now, allow admin and host to view

        const bookings = await bookingService.getEventBookings(id);

        return res.status(200).json({
            success: true,
            message: 'Event bookings retrieved successfully',
            data: { bookings, count: bookings.length },
        });
    });

    // Get booking statistics for an event
    getEventBookingStats = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        const stats = await bookingService.getEventBookingStats(id);

        return res.status(200).json({
            success: true,
            message: 'Booking statistics retrieved successfully',
            data: { stats },
        });
    });

    // Get detailed participant information for an event (host owner only)
    getEventParticipants = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const hostId = req.user?.id;

        const participantData = await bookingService.getEventParticipants(id, hostId!);

        return res.status(200).json({
            success: true,
            message: 'Event participants retrieved successfully',
            data: participantData,
        });
    });

    // Process expired bookings (can be called manually or by cron)
    processExpiredBookings = catchAsync(async (req: Request, res: Response) => {
        const cancelledCount = await bookingService.processExpiredBookings();

        return res.status(200).json({
            success: true,
            message: `Processed ${cancelledCount} expired bookings`,
            data: { cancelledCount },
        });
    });
}

export const bookingController = new BookingController();

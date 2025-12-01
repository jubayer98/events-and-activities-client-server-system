import { Booking, IBooking } from '../../models/Booking';
import { Event } from '../../models/Event';
import { User } from '../../models/User';

/**
 * Booking Service
 * Handles all booking business logic
 */
class BookingService {
    // Book an event
    async bookEvent(userId: string, eventId: string): Promise<IBooking> {
        // Verify user exists and has 'user' role
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.role !== 'user') {
            throw new Error('Only users with user role can book events');
        }

        // Verify event exists and is approved
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        if (!event.approvalStatus) {
            throw new Error('Cannot book an event that is not approved');
        }

        if (event.status !== 'Open') {
            throw new Error(`Cannot book event with status: ${event.status}`);
        }

        // Check if user already has an active booking for this event
        const existingBooking = await Booking.findOne({
            user: userId,
            event: eventId,
            bookingStatus: true,
        });

        if (existingBooking) {
            throw new Error('You have already booked this event');
        }

        // Check if event has reached maximum participants
        const activeBookingsCount = await Booking.countDocuments({
            event: eventId,
            bookingStatus: true,
        });

        if (activeBookingsCount >= event.requiredParticipant.max) {
            throw new Error('Event has reached maximum participants');
        }

        // Determine payment confirmation based on fee status
        const paymentConfirmation = event.feeStatus === 'free';
        
        // Set booking expiry to 30 minutes from now (only for paid events)
        const bookingExpiry = event.feeStatus === 'paid' 
            ? new Date(Date.now() + 30 * 60 * 1000)
            : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year for free events

        // Create booking
        const booking = await Booking.create({
            user: userId,
            event: eventId,
            bookingStatus: true,
            paymentConfirmation,
            bookingExpiry,
        });

        // Increment current participants count
        event.currentParticipants = (event.currentParticipants || 0) + 1;

        // Update event status if it reaches maximum participants
        if (event.currentParticipants >= event.requiredParticipant.max) {
            event.status = 'Full';
        }
        
        await event.save();

        return booking;
    }

    // Cancel booking (by user or system expiry)
    async cancelBooking(bookingId: string, userId?: string): Promise<void> {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // If userId provided, verify ownership
        if (userId && booking.user.toString() !== userId) {
            throw new Error('You can only cancel your own bookings');
        }

        if (!booking.bookingStatus) {
            throw new Error('Booking is already cancelled');
        }

        // Update booking status
        booking.bookingStatus = false;
        await booking.save();

        // Decrement current participants count and update event status
        const event = await Event.findById(booking.event);
        if (event) {
            event.currentParticipants = Math.max(0, (event.currentParticipants || 0) - 1);
            
            // Update event status if it's no longer full
            if (event.status === 'Full' && event.currentParticipants < event.requiredParticipant.max) {
                event.status = 'Open';
            }
            
            await event.save();
        }
    }

    // Process expired bookings (to be called by cron job or scheduler)
    async processExpiredBookings(): Promise<number> {
        const expiredBookings = await Booking.find({
            bookingStatus: true,
            paymentConfirmation: false,
            bookingExpiry: { $lte: new Date() },
        });

        let cancelledCount = 0;

        for (const booking of expiredBookings) {
            try {
                await this.cancelBooking(booking._id.toString());
                cancelledCount++;
            } catch (error) {
                console.error(`Failed to cancel expired booking ${booking._id}:`, error);
            }
        }

        return cancelledCount;
    }

    // Get user's bookings
    async getUserBookings(userId: string, activeOnly: boolean = false): Promise<IBooking[]> {
        const query: any = { user: userId };
        
        if (activeOnly) {
            query.bookingStatus = true;
        }

        return await Booking.find(query)
            .populate('event')
            .sort({ createdAt: -1 });
    }

    // Get single booking by ID
    async getBookingById(bookingId: string, userId?: string): Promise<IBooking | null> {
        const booking = await Booking.findById(bookingId)
            .populate('event')
            .populate('user', 'firstName lastName email');

        if (!booking) {
            return null;
        }

        // If userId provided, verify ownership (unless it's admin checking)
        if (userId && booking.user._id.toString() !== userId) {
            throw new Error('Access denied');
        }

        return booking;
    }

    // Get all bookings for an event (admin or host only)
    async getEventBookings(eventId: string): Promise<IBooking[]> {
        return await Booking.find({ event: eventId, bookingStatus: true })
            .populate('user', 'firstName lastName email fullName profileImage bio gender location interests')
            .sort({ createdAt: -1 });
    }

    // Get booking statistics for an event
    async getEventBookingStats(eventId: string): Promise<{
        totalBookings: number;
        activeBookings: number;
        confirmedPayments: number;
        pendingPayments: number;
    }> {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        const totalBookings = await Booking.countDocuments({ event: eventId });
        const activeBookings = await Booking.countDocuments({ 
            event: eventId, 
            bookingStatus: true 
        });
        const confirmedPayments = await Booking.countDocuments({ 
            event: eventId, 
            bookingStatus: true,
            paymentConfirmation: true 
        });
        const pendingPayments = await Booking.countDocuments({ 
            event: eventId, 
            bookingStatus: true,
            paymentConfirmation: false 
        });

        return {
            totalBookings,
            activeBookings,
            confirmedPayments,
            pendingPayments,
        };
    }

    // Get detailed participant information for an event (host owner only)
    async getEventParticipants(eventId: string, hostId: string): Promise<{
        eventDetails: {
            name: string;
            date: Date;
            currentParticipants: number;
            maxParticipants: number;
        };
        stats: {
            totalParticipants: number;
            paidParticipants: number;
            unpaidParticipants: number;
        };
        participants: Array<{
            bookingId: string;
            user: {
                fullName: string;
                email: string;
                profileImage?: string;
                bio?: string;
                gender: string;
                location?: string;
                interests?: string[];
            };
            paymentConfirmation: boolean;
            bookingDate: Date;
        }>;
    }> {
        // Verify event exists and user is the host
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        if (event.host.toString() !== hostId) {
            throw new Error('You can only view participants for your own events');
        }

        // Get all active bookings with full user details
        const bookings = await Booking.find({ 
            event: eventId, 
            bookingStatus: true 
        })
            .populate('user', 'firstName lastName email fullName profileImage bio gender location interests')
            .sort({ createdAt: -1 });

        // Calculate statistics
        const totalParticipants = bookings.length;
        const paidParticipants = bookings.filter(b => b.paymentConfirmation).length;
        const unpaidParticipants = totalParticipants - paidParticipants;

        // Format participant data
        const participants = bookings.map(booking => {
            const user = booking.user as any;
            return {
                bookingId: booking._id.toString(),
                user: {
                    fullName: user.fullName || `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    profileImage: user.profileImage,
                    bio: user.bio,
                    gender: user.gender,
                    location: user.location,
                    interests: user.interests,
                },
                paymentConfirmation: booking.paymentConfirmation,
                bookingDate: booking.createdAt,
            };
        });

        return {
            eventDetails: {
                name: event.name,
                date: event.date,
                currentParticipants: event.currentParticipants || 0,
                maxParticipants: event.requiredParticipant.max,
            },
            stats: {
                totalParticipants,
                paidParticipants,
                unpaidParticipants,
            },
            participants,
        };
    }
}

export const bookingService = new BookingService();

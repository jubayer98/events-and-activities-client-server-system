import { Event, IEvent } from '../../models/Event';
import { User } from '../../models/User';
import { Booking } from '../../models/Booking';

/**
 * Event Service
 * Handles all event business logic
 */
class EventService {
    // Create a new event (host only)
    async createEvent(
        hostId: string,
        eventData: {
            name: string;
            type: 'Cultural' | 'Travel' | 'Sports' | 'Business' | 'Conference' | 'Workshop' | 'Family' | 'Exhibition' | 'Training' | 'Tour' | 'Food';
            date: Date;
            time: string;
            location: string;
            requiredParticipant: {
                min: number;
                max: number;
            };
            description?: string;
            image?: string;
            feeStatus: 'free' | 'paid';
            joiningFee?: number;
            status?: 'Open' | 'Full' | 'Cancelled' | 'Completed';
        }
    ): Promise<IEvent> {
        // Verify user is a host
        const user = await User.findById(hostId);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.role !== 'host') {
            throw new Error('Only users with host role can create events');
        }

        // Validate fee status and joining fee
        if (eventData.feeStatus === 'paid' && (!eventData.joiningFee || eventData.joiningFee <= 0)) {
            throw new Error('Joining fee must be greater than 0 for paid events');
        }

        if (eventData.feeStatus === 'free') {
            eventData.joiningFee = 0;
        }

        // Create event with approvalStatus false by default
        const event = await Event.create({
            ...eventData,
            host: hostId,
            approvalStatus: false,
        });

        return event;
    }

    // Update event (host only - own events)
    async updateEvent(
        hostId: string,
        eventId: string,
        updateData: {
            name?: string;
            type?: 'Cultural' | 'Travel' | 'Sports' | 'Business' | 'Conference' | 'Workshop' | 'Family' | 'Exhibition' | 'Training' | 'Tour' | 'Food';
            date?: Date;
            time?: string;
            location?: string;
            requiredParticipant?: {
                min?: number;
                max?: number;
            };
            description?: string;
            image?: string;
            feeStatus?: 'free' | 'paid';
            joiningFee?: number;
            status?: 'Open' | 'Full' | 'Cancelled' | 'Completed';
        }
    ): Promise<IEvent> {
        // Find event
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        // Verify user is the host of this event
        if (event.host.toString() !== hostId) {
            throw new Error('You can only update your own events');
        }

        // Validate fee status and joining fee if being updated
        if (updateData.feeStatus === 'paid' && updateData.joiningFee !== undefined && updateData.joiningFee <= 0) {
            throw new Error('Joining fee must be greater than 0 for paid events');
        }

        if (updateData.feeStatus === 'free') {
            updateData.joiningFee = 0;
        }

        // Update event
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            throw new Error('Failed to update event');
        }

        return updatedEvent;
    }

    // Get all events
    async getAllEvents(filters?: {
        approvalStatus?: boolean;
        status?: string;
        type?: string;
        feeStatus?: string;
        search?: string;
        sortBy?: string;
    }): Promise<IEvent[]> {
        const query: any = {};

        if (filters?.approvalStatus !== undefined) {
            query.approvalStatus = filters.approvalStatus;
        }

        if (filters?.status) {
            query.status = filters.status;
        }

        if (filters?.type) {
            query.type = filters.type;
        }

        if (filters?.feeStatus) {
            query.feeStatus = filters.feeStatus;
        }

        // Search by name or location (case-insensitive)
        if (filters?.search) {
            query.$or = [
                { name: { $regex: filters.search, $options: 'i' } },
                { location: { $regex: filters.search, $options: 'i' } },
            ];
        }

        // Build sort object
        let sortOption: any = { createdAt: -1 }; // Default sort by newest
        
        if (filters?.sortBy) {
            if (filters.sortBy === 'joiningFee-asc') {
                sortOption = { joiningFee: 1 };
            } else if (filters.sortBy === 'joiningFee-desc') {
                sortOption = { joiningFee: -1 };
            } else if (filters.sortBy === 'date-asc') {
                sortOption = { date: 1 };
            } else if (filters.sortBy === 'date-desc') {
                sortOption = { date: -1 };
            }
        }

        return await Event.find(query)
            .populate('host', 'firstName lastName email')
            .sort(sortOption);
    }

    // Get single event by ID
    async getEventById(eventId: string): Promise<IEvent | null> {
        return await Event.findById(eventId).populate('host', 'firstName lastName email fullName');
    }

    // Get events by host
    async getEventsByHost(hostId: string): Promise<IEvent[]> {
        return await Event.find({ host: hostId }).sort({ createdAt: -1 });
    }

    // Update approval status (admin only)
    async updateApprovalStatus(eventId: string, approvalStatus: boolean): Promise<IEvent> {
        const event = await Event.findByIdAndUpdate(
            eventId,
            { approvalStatus },
            { new: true, runValidators: true }
        ).populate('host', 'firstName lastName email');

        if (!event) {
            throw new Error('Event not found');
        }

        return event;
    }

    // Delete event (admin or host owner)
    async deleteEvent(eventId: string, userId: string, userRole: string): Promise<void> {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        // Admin can delete any event, host can only delete their own
        if (userRole !== 'admin' && event.host.toString() !== userId) {
            throw new Error('You can only delete your own events');
        }

        // Delete all bookings associated with this event
        await Booking.deleteMany({ event: eventId });

        // Delete the event
        await Event.findByIdAndDelete(eventId);
    }
}

export const eventService = new EventService();

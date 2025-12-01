import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { eventService } from './event.service';

/**
 * Event Controller
 * Handles HTTP requests for events
 */
class EventController {
    // Create new event (host only)
    createEvent = catchAsync(async (req: Request, res: Response) => {
        const hostId = req.user?.id;
        const {
            name,
            type,
            date,
            time,
            location,
            requiredParticipant,
            description,
            image,
            feeStatus,
            joiningFee,
            status,
        } = req.body;

        // Validate required fields
        if (!name || !type || !date || !time || !location || !requiredParticipant || !feeStatus) {
            return res.status(400).json({
                success: false,
                message: 'Required fields: name, type, date, time, location, requiredParticipant, feeStatus',
            });
        }

        // Validate requiredParticipant structure
        if (!requiredParticipant.min || !requiredParticipant.max) {
            return res.status(400).json({
                success: false,
                message: 'requiredParticipant must include min and max values',
            });
        }

        // Validate participant min/max
        if (requiredParticipant.min > requiredParticipant.max) {
            return res.status(400).json({
                success: false,
                message: 'Minimum participants cannot be greater than maximum',
            });
        }

        const event = await eventService.createEvent(hostId!, {
            name,
            type,
            date: new Date(date),
            time,
            location,
            requiredParticipant,
            description,
            image,
            feeStatus,
            joiningFee,
            status,
        });

        return res.status(201).json({
            success: true,
            message: 'Event created successfully. Waiting for admin approval.',
            data: { event },
        });
    });

    // Update event (host only - own events)
    updateEvent = catchAsync(async (req: Request, res: Response) => {
        const hostId = req.user?.id;
        const { id } = req.params;
        const updateData = req.body;

        // Validate participant min/max if provided
        if (updateData.requiredParticipant) {
            if (updateData.requiredParticipant.min && updateData.requiredParticipant.max) {
                if (updateData.requiredParticipant.min > updateData.requiredParticipant.max) {
                    return res.status(400).json({
                        success: false,
                        message: 'Minimum participants cannot be greater than maximum',
                    });
                }
            }
        }

        const event = await eventService.updateEvent(hostId!, id, updateData);

        return res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: { event },
        });
    });

    // Get all events
    getAllEvents = catchAsync(async (req: Request, res: Response) => {
        const { approvalStatus, status, type, feeStatus, search, sortBy } = req.query;
        const userRole = req.user?.role;

        const filters: any = {};
        
        // Non-admin users can only see approved events
        if (userRole !== 'admin') {
            filters.approvalStatus = true;
        } else if (approvalStatus !== undefined) {
            // Admin can filter by approvalStatus
            filters.approvalStatus = approvalStatus === 'true';
        }
        
        if (status) {
            filters.status = status;
        }
        if (type) {
            filters.type = type;
        }
        if (feeStatus) {
            filters.feeStatus = feeStatus;
        }
        if (search) {
            filters.search = search;
        }
        if (sortBy) {
            filters.sortBy = sortBy;
        }

        const events = await eventService.getAllEvents(filters);

        return res.status(200).json({
            success: true,
            message: 'Events retrieved successfully',
            data: { events, count: events.length },
        });
    });

    // Get single event by ID
    getEventById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRole = req.user?.role;

        // Unauthenticated users cannot see event details
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required to view event details',
            });
        }

        const event = await eventService.getEventById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        // Non-admin users can only see approved events
        if (userRole !== 'admin' && !event.approvalStatus) {
            return res.status(403).json({
                success: false,
                message: 'This event is not yet approved',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Event retrieved successfully',
            data: { event },
        });
    });

    // Get events by host
    getMyEvents = catchAsync(async (req: Request, res: Response) => {
        const hostId = req.user?.id;

        const events = await eventService.getEventsByHost(hostId!);

        return res.status(200).json({
            success: true,
            message: 'Your events retrieved successfully',
            data: { events, count: events.length },
        });
    });

    // Update approval status (admin only)
    updateApprovalStatus = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { approvalStatus } = req.body;

        if (typeof approvalStatus !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'approvalStatus must be a boolean value',
            });
        }

        const event = await eventService.updateApprovalStatus(id, approvalStatus);

        return res.status(200).json({
            success: true,
            message: `Event ${approvalStatus ? 'approved' : 'disapproved'} successfully`,
            data: { event },
        });
    });

    // Delete event
    deleteEvent = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req.user?.id;
        const userRole = req.user?.role;

        await eventService.deleteEvent(id, userId!, userRole!);

        return res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
        });
    });
}

export const eventController = new EventController();

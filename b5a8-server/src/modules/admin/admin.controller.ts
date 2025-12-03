import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { adminService } from './admin.service';

/**
 * Admin Controller
 * Handles HTTP requests for admin dashboard
 */
class AdminController {
    /**
     * Get admin dashboard statistics
     * GET /api/admin/dashboard/stats
     */
    getDashboardStats = catchAsync(async (req: Request, res: Response) => {
        const { gender, role, eventStatus, feeStatus } = req.query;

        const filters: any = {};
        
        if (gender && ['Male', 'Female', 'Third'].includes(gender as string)) {
            filters.gender = gender;
        }
        
        if (role && ['user', 'host'].includes(role as string)) {
            filters.role = role;
        }
        
        if (eventStatus && ['Open', 'Full', 'Cancelled', 'Completed'].includes(eventStatus as string)) {
            filters.eventStatus = eventStatus;
        }
        
        if (feeStatus && ['free', 'paid'].includes(feeStatus as string)) {
            filters.feeStatus = feeStatus;
        }

        const stats = await adminService.getDashboardStats(
            Object.keys(filters).length > 0 ? filters : undefined
        );

        return res.status(200).json({
            success: true,
            message: 'Dashboard statistics retrieved successfully',
            data: stats,
        });
    });
}

export const adminController = new AdminController();

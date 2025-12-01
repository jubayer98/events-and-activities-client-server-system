import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { userService } from './user.service';

/**
 * User Controller
 * Handles HTTP requests for user management
 */
class UserController {

    // Get all users (admin only)
    getAllUsers = catchAsync(async (req: Request, res: Response) => {
        const users = await userService.getAllUsers();

        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: { users },
        });
    });

    // Get single user by ID (admin only)
    getUserById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: { user },
        });
    });

    // Update user role (admin only)
    updateUserRole = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { role } = req.body;

        if (!role || !['admin', 'user', 'host'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Valid role is required (admin, user, or host)',
            });
        }

        const user = await userService.updateUserRole(id, role);

        return res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            data: { user },
        });
    });

    // Update user status (admin only)
    updateUserStatus = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status } = req.body;

        if (typeof status !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'Status must be a boolean value',
            });
        }

        const user = await userService.updateUserStatus(id, status);

        return res.status(200).json({
            success: true,
            message: 'User status updated successfully',
            data: { user },
        });
    });

    // Delete user (admin only)
    deleteUser = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        await userService.deleteUser(id);

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    });

    // Request role change to host
    requestRoleChange = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;

        const user = await userService.requestRoleChange(userId!);

        return res.status(200).json({
            success: true,
            message: 'Role change request submitted successfully',
            data: { user },
        });
    });

    // Get all role change requests (admin only)
    getRoleChangeRequests = catchAsync(async (req: Request, res: Response) => {
        const requests = await userService.getRoleChangeRequests();

        return res.status(200).json({
            success: true,
            message: 'Role change requests retrieved successfully',
            data: { requests },
        });
    });
}

export const userController = new UserController();

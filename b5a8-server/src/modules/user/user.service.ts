import { User, IUser } from '../../models/User';

/**
 * User Service
 * Handles all user management business logic
 */
class UserService {
    
    // Get all users (admin only)
    async getAllUsers(): Promise<IUser[]> {
        return await User.find({ role: { $ne: 'admin' } }).select('-password');
    }

    // Get single user by ID (admin only)
    async getUserById(userId: string): Promise<IUser | null> {
        return await User.findById(userId).select('-password');
    }

    // Update user role (admin only)
    async updateUserRole(userId: string, role: 'admin' | 'user' | 'host'): Promise<IUser> {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.role = role;
        // Clear role change request if approved
        if (role === 'host') {
            user.roleChangeRequest = null;
        }
        await user.save();

        return user;
    }

    // Update user status (admin only)
    async updateUserStatus(userId: string, status: boolean): Promise<IUser> {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.userStatus = status;
        await user.save();

        return user;
    }

    // Delete user (admin only)
    async deleteUser(userId: string): Promise<void> {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Prevent deleting admin users
        if (user.role === 'admin') {
            throw new Error('Cannot delete admin users');
        }

        await User.findByIdAndDelete(userId);
    }

    // Request role change to host
    async requestRoleChange(userId: string): Promise<IUser> {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.role === 'admin') {
            throw new Error('Admins cannot request role change');
        }

        if (user.role === 'host') {
            throw new Error('You are already a host');
        }

        if (user.roleChangeRequest === 'host') {
            throw new Error('Role change request already pending');
        }

        user.roleChangeRequest = 'host';
        await user.save();

        return user;
    }

    // Get all role change requests (admin only)
    async getRoleChangeRequests(): Promise<IUser[]> {
        return await User.find({ roleChangeRequest: 'host' }).select('-password');
    }
}

export const userService = new UserService();

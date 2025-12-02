import { User, IUser } from '../../models/User';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';

/**
 * Auth Service
 * Handles all authentication business logic
 */
class AuthService {
    async register(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        gender: 'Male' | 'Female' | 'Third';
    }): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user
        const user = await User.create({
            ...userData,
            role: 'user',
        });

        const payload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        // Generate JWT tokens
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return { user, accessToken, refreshToken };
    }

    async login(
        email: string,
        password: string
    ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        // Find user with password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Check if user status is active
        if (!user.userStatus) {
            throw new Error('Your account has been deactivated. Please wait for admin approval.');
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const payload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        // Generate JWT tokens
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return { user, accessToken, refreshToken };
    }

    async getUserById(userId: string): Promise<IUser | null> {
        return await User.findById(userId);
    }

    // Change user password
    async changePassword(
        userId: string,
        currentPassword: string,
        newPassword: string
    ): Promise<void> {
        // Find user with password field
        const user = await User.findById(userId).select('+password');
        if (!user) {
            throw new Error('User not found');
        }

        // Verify current password
        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            throw new Error('Current password is incorrect');
        }

        // Update password
        user.password = newPassword;
        await user.save();
    }

    // Update user profile
    async updateProfile(
        userId: string,
        updateData: {
            firstName?: string;
            lastName?: string;
            email?: string;
            gender?: 'Male' | 'Female' | 'Third';
            profileImage?: string;
            bio?: string;
            interests?: string[];
            location?: string;
        }
    ): Promise<IUser> {
        // Check if email is being updated and if it already exists
        if (updateData.email) {
            const existingUser = await User.findOne({ 
                email: updateData.email,
                _id: { $ne: userId }
            });
            if (existingUser) {
                throw new Error('Email is already in use by another user');
            }
        }

        // Update user profile
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    // Refresh access token
    async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        // Verify refresh token (will throw error if invalid or expired)
        const decoded = verifyRefreshToken(refreshToken);

        // Find user to check if still exists and is active
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if user status is active
        if (!user.userStatus) {
            throw new Error('Your account has been deactivated. Please contact support');
        }

        const payload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        // Generate new tokens
        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}

export const authService = new AuthService();

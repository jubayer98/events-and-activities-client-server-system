import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { authService } from './auth.service';

/**
 * Auth Controller
 * Handles HTTP requests for authentication
 */
class AuthController {
    register = catchAsync(async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, gender } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !gender) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Validate gender
        if (!['Male', 'Female', 'Third'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: 'Gender must be Male, Female, or Third',
            });
        }

        // Register user
        const { user, accessToken, refreshToken } = await authService.register({
            firstName,
            lastName,
            email,
            password,
            gender,
        });

        // Set tokens in cookies
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 70 * 24 * 60 * 60 * 1000, // 70 days
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    });

    // Login user
    login = catchAsync(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        const { user, accessToken, refreshToken } = await authService.login(email, password);

        // Set tokens in cookies
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    });

    // Logout user
    logout = catchAsync(async (req: Request, res: Response) => {
        // Clear cookies
        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
        });

        return res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    });

    // Change user password
    changePassword = catchAsync(async (req: Request, res: Response) => {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user?.id;

        // Validate required fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required',
            });
        }

        // Validate new password length
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters long',
            });
        }

        // Change password
        await authService.changePassword(userId!, currentPassword, newPassword);

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    });

    // Get logged in user profile
    getMe = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;

        const user = await authService.getUserById(userId!);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            data: { user },
        });
    });

    // Update logged in user profile
    updateProfile = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const { firstName, lastName, email, gender, profileImage, bio, interests, location } = req.body;

        // Validate gender if provided
        if (gender && !['Male', 'Female', 'Third'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: 'Gender must be Male, Female, or Third',
            });
        }

        // Validate bio length if provided
        if (bio && bio.length > 500) {
            return res.status(400).json({
                success: false,
                message: 'Bio must not exceed 500 characters',
            });
        }

        // Build update object with only provided fields
        const updateData: any = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;
        if (gender !== undefined) updateData.gender = gender;
        if (profileImage !== undefined) updateData.profileImage = profileImage;
        if (bio !== undefined) updateData.bio = bio;
        if (interests !== undefined) updateData.interests = interests;
        if (location !== undefined) updateData.location = location;

        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields provided for update',
            });
        }

        // Update profile
        const user = await authService.updateProfile(userId!, updateData);

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: { user },
        });
    });

    // Refresh access token
    refreshToken = catchAsync(async (req: Request, res: Response) => {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token not found',
            });
        }

        // Get new tokens
        const { accessToken, refreshToken: newRefreshToken } = await authService.refreshAccessToken(refreshToken);

        // Set new tokens in cookies
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 70 * 24 * 60 * 60 * 1000, // 70 days
        });

        return res.status(200).json({
            success: true,
            message: 'Access token refreshed successfully',
        });
    });
}

export const authController = new AuthController();

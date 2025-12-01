import { User, IUser } from '../../models/User';
import { seedConfig } from '../../config/seed.config';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

/**
 * Admin Service
 * Handles all business logic related to admin operations
 */
class AdminService {
    // Check if any admin user exists
    async hasAdminExists(): Promise<boolean> {
        const count = await User.countDocuments({ role: 'admin' });
        return count > 0;
    }

    // Find admin by email
    async findAdminByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email, role: 'admin' }).select('+password');
    }

    // Create a new admin user
    async createAdmin(adminData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        gender?: 'Male' | 'Female' | 'Third';
    }): Promise<IUser> {
        return await User.create({
            ...adminData,
            gender: adminData.gender || 'Male', // Default to Male if not specified
            role: 'admin',
            userStatus: true,
        });
    }

    // Seed default admin user
    async seedDefaultAdmin(): Promise<{
        created: boolean;
        admin?: IUser;
        token?: string;
        message: string;
    }> {
        const { firstName, lastName, email, password } = seedConfig.admin;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return {
                created: false,
                message: 'Admin environment variables are not fully configured',
            };
        }

        // Check if admin already exists
        const adminExists = await this.hasAdminExists();
        if (adminExists) {
            return {
                created: false,
                message: 'Admin already exists in database',
            };
        }

        // Create default admin
        const admin = await this.createAdmin({
            firstName,
            lastName,
            email,
            password,
        });

        const payload = {
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
        };

        // Generate JWT tokens for the admin
        const token = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return {
            created: true,
            admin,
            token,
            message: 'Default admin created successfully',
        };
    }
}

export const adminService = new AdminService();

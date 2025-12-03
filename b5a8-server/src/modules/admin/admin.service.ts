import { User, IUser } from '../../models/User';
import { Event } from '../../models/Event';
import { Booking } from '../../models/Booking';
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

    /**
     * Get comprehensive admin dashboard statistics
     */
    async getDashboardStats(filters?: {
        gender?: 'Male' | 'Female' | 'Third';
        role?: 'user' | 'host';
        eventStatus?: 'Open' | 'Full' | 'Cancelled' | 'Completed';
        feeStatus?: 'free' | 'paid';
    }): Promise<any> {
        // User Statistics
        const totalApprovedUsers = await User.countDocuments({ 
            userStatus: true,
            role: { $in: ['user', 'host'] }
        });

        const totalPendingUsers = await User.countDocuments({ 
            userStatus: false,
            role: { $in: ['user', 'host'] }
        });

        // User statistics with filters
        let userQuery: any = { role: { $in: ['user', 'host'] } };
        if (filters?.gender) {
            userQuery.gender = filters.gender;
        }
        if (filters?.role) {
            userQuery.role = filters.role;
        }

        const filteredUsers = await User.countDocuments(userQuery);
        const filteredApprovedUsers = await User.countDocuments({ 
            ...userQuery, 
            userStatus: true 
        });
        const filteredPendingUsers = await User.countDocuments({ 
            ...userQuery, 
            userStatus: false 
        });

        // Gender breakdown
        const genderStats = {
            male: await User.countDocuments({ gender: 'Male', role: { $in: ['user', 'host'] } }),
            female: await User.countDocuments({ gender: 'Female', role: { $in: ['user', 'host'] } }),
            third: await User.countDocuments({ gender: 'Third', role: { $in: ['user', 'host'] } }),
        };

        // Role breakdown
        const roleStats = {
            users: await User.countDocuments({ role: 'user' }),
            hosts: await User.countDocuments({ role: 'host' }),
        };

        // Event Statistics
        const totalEvents = await Event.countDocuments();
        const approvedEvents = await Event.countDocuments({ approvalStatus: true });
        const pendingEvents = await Event.countDocuments({ approvalStatus: false });

        // Event status breakdown
        let eventQuery: any = {};
        if (filters?.eventStatus) {
            eventQuery.status = filters.eventStatus;
        }
        if (filters?.feeStatus) {
            eventQuery.feeStatus = filters.feeStatus;
        }

        const filteredEvents = await Event.countDocuments(eventQuery);

        const eventStatusStats = {
            open: await Event.countDocuments({ status: 'Open' }),
            full: await Event.countDocuments({ status: 'Full' }),
            completed: await Event.countDocuments({ status: 'Completed' }),
            cancelled: await Event.countDocuments({ status: 'Cancelled' }),
        };

        const eventFeeStats = {
            free: await Event.countDocuments({ feeStatus: 'free' }),
            paid: await Event.countDocuments({ feeStatus: 'paid' }),
        };

        // Booking Statistics
        const totalBookings = await Booking.countDocuments();
        const activeBookings = await Booking.countDocuments({ bookingStatus: true });
        const cancelledBookings = await Booking.countDocuments({ bookingStatus: false });
        const confirmedPayments = await Booking.countDocuments({ 
            paymentConfirmation: true,
            paymentStatus: 'completed'
        });

        // Revenue Calculation
        const completedPayments = await Booking.find({
            paymentConfirmation: true,
            paymentStatus: 'completed',
            paymentAmount: { $exists: true, $ne: null }
        }).select('paymentAmount');

        const totalRevenue = completedPayments.reduce((sum, booking) => {
            return sum + (booking.paymentAmount || 0);
        }, 0);

        const platformPercentage = 19;
        const platformCommission = (totalRevenue * platformPercentage) / 100;
        const netRevenue = totalRevenue - platformCommission;

        return {
            users: {
                total: totalApprovedUsers + totalPendingUsers,
                approved: totalApprovedUsers,
                pending: totalPendingUsers,
                filtered: filters?.gender || filters?.role ? {
                    total: filteredUsers,
                    approved: filteredApprovedUsers,
                    pending: filteredPendingUsers,
                } : undefined,
                byGender: genderStats,
                byRole: roleStats,
            },
            events: {
                total: totalEvents,
                approved: approvedEvents,
                pending: pendingEvents,
                filtered: filters?.eventStatus || filters?.feeStatus ? filteredEvents : undefined,
                byStatus: eventStatusStats,
                byFeeType: eventFeeStats,
            },
            bookings: {
                total: totalBookings,
                active: activeBookings,
                cancelled: cancelledBookings,
                confirmedPayments,
            },
            revenue: {
                totalRevenue: parseFloat(totalRevenue.toFixed(2)),
                platformCommission: parseFloat(platformCommission.toFixed(2)),
                platformPercentage,
                netRevenue: parseFloat(netRevenue.toFixed(2)),
                completedTransactions: completedPayments.length,
            },
            appliedFilters: filters || null,
        };
    }
}

export const adminService = new AdminService();

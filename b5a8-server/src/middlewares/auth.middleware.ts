import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

// Extend Express Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
            };
        }
    }
}

/**
 * Auth Middleware
 * Verifies JWT token from cookies and attaches user to request
 */
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from cookie
        const token = req.cookies?.accessToken;

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        // Verify token
        const decoded = verifyAccessToken(token);

        // Attach user to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};

/**
 * Admin Middleware
 * Checks if authenticated user has admin role
 */
export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (req.user?.role !== 'admin') {
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required',
        });
        return;
    }
    next();
};

/**
 * Host Middleware
 * Checks if authenticated user has host role
 */
export const isHost = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (req.user?.role !== 'host') {
        res.status(403).json({
            success: false,
            message: 'Access denied. Host privileges required',
        });
        return;
    }
    next();
};

/**
 * Optional Auth Middleware
 * Attaches user to request if token exists, but doesn't require authentication
 */
export const optionalAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from cookie
        const token = req.cookies?.accessToken;

        if (token) {
            // Verify token and attach user if valid
            const decoded = verifyAccessToken(token);
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            };
        }
        // Continue regardless of token presence
        next();
    } catch (error) {
        // If token is invalid, continue without user
        next();
    }
};

import jwt, { SignOptions } from 'jsonwebtoken';

/**
 * JWT Utility Functions
 * Handles JWT token generation and verification
 */

export interface JWTPayload {
    id: string;
    email: string;
    role: string;
}

// Generate JWT access token
export const generateAccessToken = (payload: JWTPayload): string => {
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
        throw new Error('JWT_ACCESS_SECRET is not defined in environment variables');
    }

    return jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE || '7d',
    } as SignOptions);
};

// Verify JWT access token
export const verifyAccessToken = (token: string): JWTPayload => {
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
        throw new Error('JWT_ACCESS_SECRET is not defined in environment variables');
    }

    return jwt.verify(token, secret) as JWTPayload;
};

// Generate JWT refresh token
export const generateRefreshToken = (payload: JWTPayload): string => {
    const secret = process.env.JWT_REFRESH_SECRET;

    if (!secret) {
        throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
    }

    return jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
    } as SignOptions);
};

// Verify JWT refresh token
export const verifyRefreshToken = (token: string): JWTPayload => {
    const secret = process.env.JWT_REFRESH_SECRET;

    if (!secret) {
        throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
    }

    return jwt.verify(token, secret) as JWTPayload;
};

// Decode JWT token without verification
export const decodeToken = (token: string): JWTPayload | null => {
    return jwt.decode(token) as JWTPayload | null;
};

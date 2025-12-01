import { Request, Response, NextFunction } from 'express';

/**
 * Custom Error Class
 */
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Global Error Handler Middleware
 * Catches all errors and returns JSON response
 */
export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Development error response
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err,
            stack: err.stack,
        });
        return;
    }

    // Production error response
    if (err.isOperational) {
        // Operational, trusted error: send message to client
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    } else {
        // Programming or unknown error: don't leak error details
        console.error('ERROR 💥', err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

/**
 * Handle 404 Not Found
 */
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};

/**
 * Handle Mongoose Cast Error
 */
const handleCastError = (err: any): AppError => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

/**
 * Handle Mongoose Duplicate Key Error
 */
const handleDuplicateKeyError = (err: any): AppError => {
    const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new AppError(message, 400);
};

/**
 * Handle Mongoose Validation Error
 */
const handleValidationError = (err: any): AppError => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

/**
 * Handle JWT Error
 */
const handleJWTError = (): AppError => {
    return new AppError('Invalid token. Please log in again', 401);
};

/**
 * Handle JWT Expired Error
 */
const handleJWTExpiredError = (): AppError => {
    return new AppError('Your token has expired. Please log in again', 401);
};

/**
 * Enhanced Global Error Handler with specific error handling
 */
export const enhancedErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') error = handleCastError(err);

    // Mongoose duplicate key
    if (err.code === 11000) error = handleDuplicateKeyError(err);

    // Mongoose validation error
    if (err.name === 'ValidationError') error = handleValidationError(err);

    // JWT errors
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    // Use the global error handler
    globalErrorHandler(error, req, res, next);
};
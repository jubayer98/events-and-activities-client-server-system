import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { reviewService } from './review.service';

/**
 * Review Controller
 * Handles HTTP requests for reviews
 */
class ReviewController {
    // Create a review
    createReview = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const { eventId, rating, comment } = req.body;

        // Validate required fields
        if (!eventId || !rating) {
            return res.status(400).json({
                success: false,
                message: 'Event ID and rating are required',
            });
        }

        // Validate rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5',
            });
        }

        const review = await reviewService.createReview(userId!, {
            eventId,
            rating,
            comment,
        });

        return res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: { review },
        });
    });

    // Update a review
    updateReview = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const { id } = req.params;
        const { rating, comment } = req.body;

        // Validate rating if provided
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5',
            });
        }

        const review = await reviewService.updateReview(id, userId!, {
            rating,
            comment,
        });

        return res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: { review },
        });
    });

    // Delete a review
    deleteReview = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const userRole = req.user?.role;
        const { id } = req.params;

        await reviewService.deleteReview(id, userId!, userRole!);

        return res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });
    });

    // Get all reviews for a host
    getHostReviews = catchAsync(async (req: Request, res: Response) => {
        const { hostId } = req.params;

        const reviews = await reviewService.getHostReviews(hostId);

        return res.status(200).json({
            success: true,
            message: 'Host reviews retrieved successfully',
            data: { reviews, count: reviews.length },
        });
    });

    // Get host's average rating
    getHostRating = catchAsync(async (req: Request, res: Response) => {
        const { hostId } = req.params;

        const ratingData = await reviewService.getHostAverageRating(hostId);

        return res.status(200).json({
            success: true,
            message: 'Host rating retrieved successfully',
            data: ratingData,
        });
    });

    // Get all reviews for an event
    getEventReviews = catchAsync(async (req: Request, res: Response) => {
        const { eventId } = req.params;

        const reviews = await reviewService.getEventReviews(eventId);

        return res.status(200).json({
            success: true,
            message: 'Event reviews retrieved successfully',
            data: { reviews, count: reviews.length },
        });
    });

    // Get user's own reviews
    getMyReviews = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;

        const reviews = await reviewService.getUserReviews(userId!);

        return res.status(200).json({
            success: true,
            message: 'Your reviews retrieved successfully',
            data: { reviews, count: reviews.length },
        });
    });
}

export const reviewController = new ReviewController();

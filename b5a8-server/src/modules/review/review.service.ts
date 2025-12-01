import { Review, IReview } from '../../models/Review';
import { Booking } from '../../models/Booking';
import { Event } from '../../models/Event';
import { User } from '../../models/User';

/**
 * Review Service
 * Handles all review business logic
 */
class ReviewService {
    // Create a review for a host
    async createReview(
        userId: string,
        reviewData: {
            eventId: string;
            rating: number;
            comment?: string;
        }
    ): Promise<IReview> {
        const { eventId, rating, comment } = reviewData;

        // Verify event exists and is completed
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        if (event.status !== 'Completed') {
            throw new Error('You can only review completed events');
        }

        // Verify user has a confirmed booking for this event
        const booking = await Booking.findOne({
            user: userId,
            event: eventId,
            bookingStatus: true,
            paymentConfirmation: true,
        });

        if (!booking) {
            throw new Error('You can only review events you have attended with confirmed payment');
        }

        // Check if user already reviewed this event
        const existingReview = await Review.findOne({
            user: userId,
            event: eventId,
        });

        if (existingReview) {
            throw new Error('You have already reviewed this event');
        }

        // Create review
        const review = await Review.create({
            user: userId,
            host: event.host,
            event: eventId,
            booking: booking._id,
            rating,
            comment,
        });

        return review;
    }

    // Update a review
    async updateReview(
        reviewId: string,
        userId: string,
        updateData: {
            rating?: number;
            comment?: string;
        }
    ): Promise<IReview> {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }

        // Verify user owns the review
        if (review.user.toString() !== userId) {
            throw new Error('You can only update your own reviews');
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate('user', 'firstName lastName email fullName profileImage');

        if (!updatedReview) {
            throw new Error('Failed to update review');
        }

        return updatedReview;
    }

    // Delete a review
    async deleteReview(reviewId: string, userId: string, userRole: string): Promise<void> {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }

        // User can delete their own review, admin can delete any
        if (userRole !== 'admin' && review.user.toString() !== userId) {
            throw new Error('You can only delete your own reviews');
        }

        await Review.findByIdAndDelete(reviewId);
    }

    // Get all reviews for a host
    async getHostReviews(hostId: string): Promise<IReview[]> {
        return await Review.find({ host: hostId })
            .populate('user', 'firstName lastName email fullName profileImage')
            .populate('event', 'name date')
            .sort({ createdAt: -1 });
    }

    // Get host's average rating
    async getHostAverageRating(hostId: string): Promise<{
        averageRating: number;
        totalReviews: number;
        ratingDistribution: {
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
        };
    }> {
        const reviews = await Review.find({ host: hostId });
        const totalReviews = reviews.length;

        if (totalReviews === 0) {
            return {
                averageRating: 0,
                totalReviews: 0,
                ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            };
        }

        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = parseFloat((totalRating / totalReviews).toFixed(2));

        // Calculate rating distribution
        const ratingDistribution = {
            1: reviews.filter(r => r.rating === 1).length,
            2: reviews.filter(r => r.rating === 2).length,
            3: reviews.filter(r => r.rating === 3).length,
            4: reviews.filter(r => r.rating === 4).length,
            5: reviews.filter(r => r.rating === 5).length,
        };

        return {
            averageRating,
            totalReviews,
            ratingDistribution,
        };
    }

    // Get all reviews for an event
    async getEventReviews(eventId: string): Promise<IReview[]> {
        return await Review.find({ event: eventId })
            .populate('user', 'firstName lastName email fullName profileImage')
            .sort({ createdAt: -1 });
    }

    // Get user's reviews
    async getUserReviews(userId: string): Promise<IReview[]> {
        return await Review.find({ user: userId })
            .populate('host', 'firstName lastName email fullName profileImage')
            .populate('event', 'name date')
            .sort({ createdAt: -1 });
    }
}

export const reviewService = new ReviewService();

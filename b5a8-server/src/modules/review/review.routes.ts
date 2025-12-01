import { Router } from 'express';
import { reviewController } from './review.controller';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';

const router = Router();

// User routes (authenticated users)
router.post('/', authenticate, reviewController.createReview);
router.get('/my-reviews', authenticate, reviewController.getMyReviews);
router.put('/:id', authenticate, reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);

// Public/Host routes
router.get('/host/:hostId', reviewController.getHostReviews);
router.get('/host/:hostId/rating', reviewController.getHostRating);
router.get('/event/:eventId', reviewController.getEventReviews);

export const reviewRoutes = router;

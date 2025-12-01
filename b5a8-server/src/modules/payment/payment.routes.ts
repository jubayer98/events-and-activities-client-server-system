import { Router } from 'express';
import { paymentController } from './payment.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * Payment Routes
 * All routes require authentication except webhook
 */

// Create payment intent for a booking
router.post('/create-intent', authenticate, paymentController.createPaymentIntent.bind(paymentController));

// Confirm payment after successful charge
router.post('/confirm', authenticate, paymentController.confirmPayment.bind(paymentController));

// Get payment status for a booking
router.get('/status/:bookingId', authenticate, paymentController.getPaymentStatus.bind(paymentController));

// Stripe webhook endpoint (raw body required, handled in main app)
router.post('/webhook', paymentController.handleWebhook.bind(paymentController));

export { router as paymentRoutes };

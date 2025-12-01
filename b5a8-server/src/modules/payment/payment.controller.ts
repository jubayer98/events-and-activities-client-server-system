import { Request, Response, NextFunction } from 'express';
import { paymentService } from './payment.service';
import { stripe } from '../../config/stripe';

/**
 * Payment Controller
 * Handles all payment-related HTTP requests
 */
class PaymentController {
    /**
     * Create a payment intent
     * POST /api/payments/create-intent
     */
    async createPaymentIntent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            const { bookingId } = req.body;

            if (!bookingId) {
                res.status(400).json({
                    success: false,
                    message: 'Booking ID is required',
                });
                return;
            }

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
                return;
            }

            const result = await paymentService.createPaymentIntent(userId, bookingId);

            res.status(200).json({
                success: true,
                message: 'Payment intent created successfully',
                data: result,
            });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Confirm payment
     * POST /api/payments/confirm
     */
    async confirmPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            const { bookingId, paymentIntentId } = req.body;

            if (!bookingId || !paymentIntentId) {
                res.status(400).json({
                    success: false,
                    message: 'Booking ID and Payment Intent ID are required',
                });
                return;
            }

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
                return;
            }

            const booking = await paymentService.confirmPayment(userId, bookingId, paymentIntentId);

            res.status(200).json({
                success: true,
                message: 'Payment confirmed successfully',
                data: booking,
            });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Get payment status
     * GET /api/payments/status/:bookingId
     */
    async getPaymentStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            const { bookingId } = req.params;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
                return;
            }

            const paymentStatus = await paymentService.getPaymentStatus(userId, bookingId);

            res.status(200).json({
                success: true,
                data: paymentStatus,
            });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Stripe webhook handler
     * POST /api/payments/webhook
     */
    async handleWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
        const sig = req.headers['stripe-signature'];

        if (!sig) {
            res.status(400).json({
                success: false,
                message: 'Missing stripe signature',
            });
            return;
        }

        let event;

        try {
            const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
            if (!webhookSecret) {
                throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
            }

            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                webhookSecret
            );
        } catch (err: any) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            res.status(400).json({
                success: false,
                message: `Webhook Error: ${err.message}`,
            });
            return;
        }

        try {
            await paymentService.handleWebhook(event);
            res.status(200).json({ received: true });
        } catch (error: any) {
            console.error(`Webhook handler error: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Webhook processing failed',
            });
        }
    }
}

export const paymentController = new PaymentController();

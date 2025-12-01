import { stripe } from '../../config/stripe';
import { Booking } from '../../models/Booking';
import { Event } from '../../models/Event';
import { User } from '../../models/User';

/**
 * Payment Service
 * Handles all payment-related business logic with Stripe
 */
class PaymentService {
    /**
     * Create a payment intent for a booking
     */
    async createPaymentIntent(
        userId: string,
        bookingId: string
    ): Promise<{
        clientSecret: string;
        paymentIntentId: string;
        amount: number;
    }> {
        // Find the booking
        const booking = await Booking.findById(bookingId).populate('event');
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Verify user owns the booking
        if (booking.user.toString() !== userId) {
            throw new Error('You can only pay for your own bookings');
        }

        // Check if payment is already confirmed
        if (booking.paymentConfirmation) {
            throw new Error('Payment has already been confirmed for this booking');
        }

        // Check if booking is still valid
        if (!booking.bookingStatus) {
            throw new Error('This booking has been cancelled');
        }

        // Check if booking has expired
        if (new Date() > booking.bookingExpiry) {
            throw new Error('This booking has expired');
        }

        // Get event details
        const event = booking.event as any;
        if (!event) {
            throw new Error('Event not found');
        }

        // Check if event is free
        if (event.feeStatus === 'free') {
            throw new Error('This is a free event, no payment required');
        }

        // Get user details for metadata
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Calculate amount (Stripe uses cents)
        const amount = Math.round(event.joiningFee * 100);

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                bookingId: bookingId,
                userId: userId,
                eventId: event._id.toString(),
                eventName: event.name,
                userEmail: user.email,
                userName: user.fullName,
            },
            description: `Payment for event: ${event.name}`,
        });

        // Update booking with payment intent ID
        await Booking.findByIdAndUpdate(bookingId, {
            paymentIntentId: paymentIntent.id,
            paymentAmount: event.joiningFee,
        });

        return {
            clientSecret: paymentIntent.client_secret!,
            paymentIntentId: paymentIntent.id,
            amount: event.joiningFee,
        };
    }

    /**
     * Confirm payment and update booking
     */
    async confirmPayment(
        userId: string,
        bookingId: string,
        paymentIntentId: string
    ): Promise<any> {
        // Retrieve payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
            expand: ['charges'],
        });

        // Verify payment was successful
        if (paymentIntent.status !== 'succeeded') {
            throw new Error(`Payment has not been completed. Current status: ${paymentIntent.status}. Please complete the payment first.`);
        }

        // Find the booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Verify user owns the booking
        if (booking.user.toString() !== userId) {
            throw new Error('Unauthorized access to this booking');
        }

        // Verify payment intent matches
        if (booking.paymentIntentId !== paymentIntentId) {
            throw new Error('Payment intent does not match this booking');
        }

        // Check if already confirmed
        if (booking.paymentConfirmation) {
            throw new Error('Payment has already been confirmed');
        }

        // Get transaction ID (charge ID)
        const charges = (paymentIntent as any).charges?.data || [];
        const transactionId = charges.length > 0 ? charges[0].id : paymentIntentId;

        // Update booking with payment confirmation
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                paymentConfirmation: true,
                paymentStatus: 'completed',
                transactionId,
                paidAt: new Date(),
            },
            { new: true }
        ).populate('event');

        return updatedBooking;
    }

    /**
     * Get payment status for a booking
     */
    async getPaymentStatus(userId: string, bookingId: string): Promise<any> {
        const booking = await Booking.findById(bookingId).populate('event');
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Verify user owns the booking
        if (booking.user.toString() !== userId) {
            throw new Error('Unauthorized access to this booking');
        }

        const event = booking.event as any;

        return {
            bookingId: booking._id,
            paymentConfirmation: booking.paymentConfirmation,
            paymentStatus: booking.paymentStatus,
            paymentAmount: booking.paymentAmount || event?.joiningFee,
            transactionId: booking.transactionId,
            paymentIntentId: booking.paymentIntentId,
            paidAt: booking.paidAt,
            event: {
                name: event?.name,
                feeStatus: event?.feeStatus,
                joiningFee: event?.joiningFee,
            },
        };
    }

    /**
     * Handle Stripe webhook events
     */
    async handleWebhook(event: any): Promise<void> {
        switch (event.type) {
            case 'payment_intent.succeeded':
                await this.handlePaymentSuccess(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await this.handlePaymentFailure(event.data.object);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    }

    /**
     * Handle successful payment
     */
    private async handlePaymentSuccess(paymentIntent: any): Promise<void> {
        const bookingId = paymentIntent.metadata.bookingId;
        
        if (!bookingId) {
            console.error('No booking ID found in payment intent metadata');
            return;
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            console.error(`Booking not found: ${bookingId}`);
            return;
        }

        // Update booking if not already confirmed
        if (!booking.paymentConfirmation) {
            // Get transaction ID from charges if available
            const charges = paymentIntent.charges?.data || [];
            const transactionId = charges.length > 0 ? charges[0].id : paymentIntent.id;

            await Booking.findByIdAndUpdate(bookingId, {
                paymentConfirmation: true,
                paymentStatus: 'completed',
                transactionId,
                paidAt: new Date(),
            });

            console.log(`Payment confirmed for booking: ${bookingId}`);
        }
    }

    /**
     * Handle failed payment
     */
    private async handlePaymentFailure(paymentIntent: any): Promise<void> {
        const bookingId = paymentIntent.metadata.bookingId;
        
        if (!bookingId) {
            console.error('No booking ID found in payment intent metadata');
            return;
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            console.error(`Booking not found: ${bookingId}`);
            return;
        }

        // Update payment status to failed
        await Booking.findByIdAndUpdate(bookingId, {
            paymentStatus: 'failed',
        });

        console.log(`Payment failed for booking: ${bookingId}`);
    }
}

export const paymentService = new PaymentService();

import { bookingService } from '../modules/booking/booking.service';

/**
 * Booking Expiry Scheduler
 * Processes expired bookings at regular intervals
 */

let intervalId: NodeJS.Timeout | null = null;

// Start the scheduler
export const startBookingExpiryScheduler = (intervalMinutes: number = 5) => {
    console.log(`🕐 Starting booking expiry scheduler (runs every ${intervalMinutes} minutes)`);
    
    // Run immediately on start
    processExpiredBookings();
    
    // Then run at regular intervals
    intervalId = setInterval(() => {
        processExpiredBookings();
    }, intervalMinutes * 60 * 1000);
};

// Stop the scheduler
export const stopBookingExpiryScheduler = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        console.log('⏹️  Booking expiry scheduler stopped');
    }
};

// Process expired bookings
const processExpiredBookings = async () => {
    try {
        const cancelledCount = await bookingService.processExpiredBookings();
        if (cancelledCount > 0) {
            console.log(`✅ Processed ${cancelledCount} expired bookings`);
        }
    } catch (error) {
        console.error('❌ Error processing expired bookings:', error);
    }
};

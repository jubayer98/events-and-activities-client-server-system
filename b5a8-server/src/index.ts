import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/database';
import { seedDefaultAdmin } from './utils/seedAdmin';
import { startBookingExpiryScheduler } from './utils/bookingScheduler';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/user/user.routes';
import { eventRoutes } from './modules/event/event.routes';
import { bookingRoutes } from './modules/booking/booking.routes';
import { reviewRoutes } from './modules/review/review.routes';
import { paymentRoutes } from './modules/payment/payment.routes';
import { adminRoutes } from './modules/admin/admin.routes';
import { notFound, enhancedErrorHandler } from './utils/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4001;

// CORS Configuration
const allowedOrigins = process.env.CLIENT_URL?.split(',').map(url => url.trim()) || ['http://localhost:3000'];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Stripe webhook needs raw body - must be before express.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Handle 404 - Not Found
app.use(notFound);

// Global Error Handler
app.use(enhancedErrorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Seed default admin
    await seedDefaultAdmin();
    
    // Start booking expiry scheduler
    startBookingExpiryScheduler(5); // Run every 5 minutes
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

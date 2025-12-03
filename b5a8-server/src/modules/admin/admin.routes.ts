import { Router } from 'express';
import { adminController } from './admin.controller';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * Admin Dashboard Routes
 * All routes require admin authentication
 */

// Get comprehensive dashboard statistics
router.get('/dashboard/stats', authenticate, isAdmin, adminController.getDashboardStats);

export { router as adminRoutes };

import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/role-change-requests', authenticate, isAdmin, userController.getRoleChangeRequests);
router.post('/request-role-change', authenticate, userController.requestRoleChange);
router.get('/', authenticate, isAdmin, userController.getAllUsers);
router.get('/:id', authenticate, isAdmin, userController.getUserById);
router.patch('/:id/role', authenticate, isAdmin, userController.updateUserRole);
router.patch('/:id/status', authenticate, isAdmin, userController.updateUserStatus);
router.delete('/:id', authenticate, isAdmin, userController.deleteUser);

export const userRoutes = router;

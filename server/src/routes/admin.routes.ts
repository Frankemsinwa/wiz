import { Router } from 'express';
import { 
  getStats, 
  getAllUsers, 
  updateUserBalance,
  createUser,
  updateUserBalanceWithId,
  getPendingTransactions,
  updateTransactionStatus
} from '../controllers/admin.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = Router();

// All routes are protected and restricted to ADMIN
router.use(protect);
router.use(restrictTo('ADMIN'));

router.get('/pending-deposits', getPendingTransactions);
router.patch('/transactions/:id/status', updateTransactionStatus);
router.get('/users', getAllUsers);
router.get('/stats', getStats);

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, WORKER, ADMIN]
 *               initialBalance:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/users', createUser);

/**
 * @swagger
 * /admin/users/{id}/balance:
 *   post:
 *     summary: Adjust user balance by ID (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Balance updated successfully
 */
router.post('/users/:id/balance', updateUserBalanceWithId);

/**
 * @swagger
 * /admin/balance:
 *   patch:
 *     summary: Manually update a user account balance (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [accountId, amount]
 *             properties:
 *               accountId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Balance updated successfully
 */
router.patch('/balance', updateUserBalance);

export default router;

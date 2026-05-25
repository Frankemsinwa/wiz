import { Router } from 'express';
import { getAccounts, createAccount, transferMoney, getTransactionHistory } from '../controllers/account.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = Router();
// All routes are protected
router.use(protect);
/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts for the current user
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user accounts
 *   post:
 *     summary: Create a new multi-currency account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currency]
 *             properties:
 *               currency:
 *                 type: string
 *                 example: USD
 *     responses:
 *       201:
 *         description: Account created successfully
 */
router.route('/')
    .get(getAccounts)
    .post(createAccount);
/**
 * @swagger
 * /accounts/transfer:
 *   post:
 *     summary: Initiate a transfer (domestic or international)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sourceAccountId, amount, targetCurrency]
 *             properties:
 *               sourceAccountId:
 *                 type: string
 *               amount:
 *                 type: number
 *               targetCurrency:
 *                 type: string
 *                 example: GBP
 *               recipientId:
 *                 type: string
 *               reference:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transfer executed successfully
 *       400:
 *         description: Insufficient funds or invalid data
 */
router.post('/transfer', transferMoney);
/**
 * @swagger
 * /accounts/transactions:
 *   get:
 *     summary: Get transaction history for all accounts
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/transactions', getTransactionHistory);
export default router;
//# sourceMappingURL=account.routes.js.map
import { Router } from 'express';
import { getMyChat, getChatMessages, sendMessage, getAllChats } from '../controllers/chat.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
const router = Router();
router.use(protect);
router.get('/my-chat', getMyChat);
router.get('/:chatId/messages', getChatMessages);
router.post('/:chatId/messages', sendMessage);
// Admin routes
router.get('/admin/all', restrictTo('ADMIN'), getAllChats);
export default router;
//# sourceMappingURL=chat.routes.js.map
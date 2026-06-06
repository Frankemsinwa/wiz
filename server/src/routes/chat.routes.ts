import { Router } from 'express';
import { 
  // Legacy
  getMyChat,
  getChatMessages,
  sendMessage,
  getAllChats,
  // New
  getUserChat, 
  sendMessageUser, 
  getAdminChatByUserId, 
  sendMessageAdmin 
} from '../controllers/chat.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

// -----------------------------------------------------
// LEGACY ENDPOINTS (For ChatWindow.tsx)
// -----------------------------------------------------
router.get('/my-chat', getMyChat);
router.get('/:chatId/messages', getChatMessages);
router.post('/:chatId/messages', sendMessage);

// -----------------------------------------------------
// NEW ENDPOINTS (For MessagesPage.tsx & AdminChatPanel.tsx)
// -----------------------------------------------------
router.get('/', getUserChat);
router.post('/', sendMessageUser);

router.get('/admin/:userId', restrictTo('ADMIN'), getAdminChatByUserId);
router.post('/admin/:userId', restrictTo('ADMIN'), sendMessageAdmin);

// Add getAllChats route just in case the original used it
router.get('/admin/all', restrictTo('ADMIN'), getAllChats);

export default router;

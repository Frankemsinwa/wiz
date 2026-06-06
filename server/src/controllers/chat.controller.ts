import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/error.middleware.js';

// -----------------------------------------------------
// LEGACY / ORIGINAL ENDPOINTS (For ChatWindow.tsx)
// -----------------------------------------------------

export const getMyChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    let chat = await prisma.chat.findFirst({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          include: { sender: { select: { id: true, name: true, role: true } } }
        }
      }
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: { userId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            include: { sender: { select: { id: true, name: true, role: true } } }
          }
        }
      });
    }

    res.status(200).json({ status: 'success', data: { chat } });
  } catch (error) {
    next(error);
  }
};

export const getChatMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = Array.isArray(req.params.chatId) ? req.params.chatId[0] : req.params.chatId;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (!chatId) return next(new AppError('Chat ID is required', 400));

    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) return next(new AppError('Chat not found', 404));

    if (chat.userId !== userId && userRole !== 'ADMIN') {
      return next(new AppError('You do not have permission to view this chat', 403));
    }

    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { id: true, name: true, role: true } } }
    });

    res.status(200).json({ status: 'success', data: { messages } });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = Array.isArray(req.params.chatId) ? req.params.chatId[0] : req.params.chatId;
    const { content } = req.body;
    const userId = req.user.id;

    if (!chatId) return next(new AppError('Chat ID is required', 400));
    if (!content) return next(new AppError('Message content is required', 400));

    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) return next(new AppError('Chat not found', 404));

    const message = await prisma.message.create({
      data: { chatId, senderId: userId, content },
      include: { sender: { select: { id: true, name: true, role: true } } }
    });

    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() }
    });

    res.status(201).json({ status: 'success', data: { message } });
  } catch (error) {
    next(error);
  }
};

export const getAllChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chats = await prisma.chat.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 }
      },
      orderBy: { updatedAt: 'desc' }
    });
    res.status(200).json({ status: 'success', data: { chats } });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
// NEW ENDPOINTS (For MessagesPage.tsx & AdminChatPanel.tsx)
// -----------------------------------------------------

export const getUserChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    let chat = await prisma.chat.findFirst({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          include: { sender: { select: { id: true, name: true, role: true } } }
        }
      }
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: { userId },
        include: {
          messages: {
            include: { sender: { select: { id: true, name: true, role: true } } }
          }
        }
      });
    }

    res.status(200).json({ status: 'success', data: { chat } });
  } catch (error) {
    next(error);
  }
};

export const sendMessageUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    if (!content || content.trim() === '') return next(new AppError('Message content cannot be empty', 400));

    let chat = await prisma.chat.findFirst({ where: { userId } });
    if (!chat) chat = await prisma.chat.create({ data: { userId } });

    const message = await prisma.message.create({
      data: { content, chatId: chat.id, senderId: userId },
      include: { sender: { select: { id: true, name: true, role: true } } }
    });

    await prisma.chat.update({ where: { id: chat.id }, data: { updatedAt: new Date() } });

    res.status(201).json({ status: 'success', data: { message } });
  } catch (error) {
    next(error);
  }
};

export const getAdminChatByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
    let chat = await prisma.chat.findFirst({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          include: { sender: { select: { id: true, name: true, role: true } } }
        },
        user: { select: { id: true, name: true, email: true } }
      }
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: { userId },
        include: {
          messages: { include: { sender: { select: { id: true, name: true, role: true } } } },
          user: { select: { id: true, name: true, email: true } }
        }
      });
    }
    res.status(200).json({ status: 'success', data: { chat } });
  } catch (error) {
    next(error);
  }
};

export const sendMessageAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = req.user.id;
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
    const { content } = req.body;

    if (!content || content.trim() === '') return next(new AppError('Message content cannot be empty', 400));

    let chat = await prisma.chat.findFirst({ where: { userId } });
    if (!chat) chat = await prisma.chat.create({ data: { userId } });

    const message = await prisma.message.create({
      data: { content, chatId: chat.id, senderId: adminId },
      include: { sender: { select: { id: true, name: true, role: true } } }
    });

    await prisma.chat.update({ where: { id: chat.id }, data: { updatedAt: new Date() } });

    res.status(201).json({ status: 'success', data: { message } });
  } catch (error) {
    next(error);
  }
};

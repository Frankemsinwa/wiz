import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/error.middleware.js';
export const getMyChat = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log('Prisma keys:', Object.keys(prisma).filter(k => !k.startsWith('$')));
        let chat = await prisma.chat.findFirst({
            where: { userId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: { sender: { select: { name: true, role: true } } }
                }
            }
        });
        if (!chat) {
            chat = await prisma.chat.create({
                data: { userId },
                include: {
                    messages: {
                        orderBy: { createdAt: 'asc' },
                        include: { sender: { select: { name: true, role: true } } }
                    }
                }
            });
        }
        res.status(200).json({
            status: 'success',
            data: { chat }
        });
    }
    catch (error) {
        next(error);
    }
};
export const getChatMessages = async (req, res, next) => {
    try {
        const chatId = Array.isArray(req.params.chatId) ? req.params.chatId[0] : req.params.chatId;
        const userId = req.user.id;
        const userRole = req.user.role;
        if (!chatId) {
            return next(new AppError('Chat ID is required', 400));
        }
        const chat = await prisma.chat.findUnique({
            where: { id: chatId }
        });
        if (!chat) {
            return next(new AppError('Chat not found', 404));
        }
        // Only owner or admin can see messages (Workers are also customers/requesters here)
        if (chat.userId !== userId && userRole !== 'ADMIN') {
            return next(new AppError('You do not have permission to view this chat', 403));
        }
        const messages = await prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: 'asc' },
            include: { sender: { select: { name: true, role: true } } }
        });
        res.status(200).json({
            status: 'success',
            data: { messages }
        });
    }
    catch (error) {
        next(error);
    }
};
export const sendMessage = async (req, res, next) => {
    try {
        const chatId = Array.isArray(req.params.chatId) ? req.params.chatId[0] : req.params.chatId;
        const { content } = req.body;
        const userId = req.user.id;
        if (!chatId) {
            return next(new AppError('Chat ID is required', 400));
        }
        if (!content) {
            return next(new AppError('Message content is required', 400));
        }
        const chat = await prisma.chat.findUnique({
            where: { id: chatId }
        });
        if (!chat) {
            return next(new AppError('Chat not found', 404));
        }
        const message = await prisma.message.create({
            data: {
                chatId,
                senderId: userId,
                content
            },
            include: { sender: { select: { name: true, role: true } } }
        });
        // Update chat timestamp
        await prisma.chat.update({
            where: { id: chatId },
            data: { updatedAt: new Date() }
        });
        res.status(201).json({
            status: 'success',
            data: { message }
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAllChats = async (req, res, next) => {
    try {
        const chats = await prisma.chat.findMany({
            include: {
                user: { select: { name: true, email: true, role: true } },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { updatedAt: 'desc' }
        });
        res.status(200).json({
            status: 'success',
            data: { chats }
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=chat.controller.js.map
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/error.middleware.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role, initialBalance, currency } = req.body;

    if (!email || !password || !name) {
      return next(new AppError('Please provide email, password and name!', 400));
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(new AppError('User already exists with this email!', 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with account in a transaction
    const { user: createdUser, account } = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: (role === 'WORKER' ? 'WORKER' : role) || 'USER',
        },
      });

      // Create an initial account for the worker/user
      const newAccount = await tx.account.create({
        data: {
          userId: user.id,
          currency: currency || 'USD',
          balance: initialBalance || 0,
        }
      });

      return { user, account: newAccount };
    });

    // Remove hashed password from output
    const { password: _, ...userWithoutPassword } = createdUser;

    res.status(201).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
        account: account,
        credentials: {
          email: email,
          password: password // Returning plain text password so admin can copy it
        }
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserBalanceWithId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const userId = Array.isArray(id) ? id[0] : id;

    if (!userId || amount === undefined) {
      return next(new AppError('Please provide user id and amount!', 400));
    }

    // Find the primary account for this user
    const account = await prisma.account.findFirst({
      where: { userId: userId }
    });

    if (!account) {
      return next(new AppError('No account found for this user!', 404));
    }

    const updatedAccount = await prisma.account.update({
      where: { id: account.id },
      data: { 
        balance: {
          increment: amount // The frontend sends the adjustment amount
        }
      }
    });

    res.status(200).json({
      status: 'success',
      data: { account: updatedAccount }
    });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalTransactions = await prisma.transaction.count();
    
    // Aggregating volume (simplified)
    const transactions = await prisma.transaction.findMany({
      select: { amount: true }
    });
    
    const totalVolume = transactions.reduce((acc: number, tx: { amount: { toNumber: () => number } }) => acc + tx.amount.toNumber(), 0);

    res.status(200).json({
      status: 'success',
      data: {
        totalUsers,
        totalTransactions,
        totalVolume
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
        _count: {
          select: { transactions: true }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accountId, amount } = req.body;

    if (!accountId || amount === undefined) {
      return next(new AppError('Please provide accountId and amount!', 400));
    }

    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: { balance: amount }
    });

    res.status(200).json({
      status: 'success',
      data: { account: updatedAccount }
    });
  } catch (error) {
    next(error);
  }
};

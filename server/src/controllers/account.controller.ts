import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';
import { executeTransfer } from '../services/transfer.service.js';
import { AppError } from '../middleware/error.middleware.js';

export const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId: req.user.id },
      include: {
        _count: {
          select: { transactions: true }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      results: accounts.length,
      data: { accounts }
    });
  } catch (error) {
    next(error);
  }
};

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currency } = req.body;

    if (!currency || currency.length !== 3) {
      return next(new AppError('Please provide a valid 3-letter currency code!', 400));
    }

    const newAccount = await prisma.account.create({
      data: {
        currency: currency.toUpperCase(),
        userId: req.user.id,
        balance: 0.00
      }
    });

    res.status(201).json({
      status: 'success',
      data: { account: newAccount }
    });
  } catch (error) {
    next(error);
  }
};

export const transferMoney = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      transferType, 
      sourceAccountId, 
      amount, 
      pin, 
      // Local transfer specific
      beneficiaryName, 
      beneficiaryAccountNumber, 
      bankName, 
      transferMethod, 
      // Crypto transfer specific
      cryptoCurrency, 
      network, 
      walletAddress,
      // Common
      reference 
    } = req.body;

    if (!sourceAccountId || !amount || amount <= 0) {
      return next(new AppError('Please provide a valid source account and amount!', 400));
    }

    // 1. Validate Transaction PIN
    if (!pin) {
      return next(new AppError('Transaction PIN is required!', 400));
    }
    if (pin !== req.user.transactionPin) {
      return next(new AppError('Incorrect transaction PIN!', 401));
    }

    // 2. Fetch Source Account to determine currency
    const sourceAccount = await prisma.account.findUnique({
      where: { id: sourceAccountId, userId: req.user.id }
    });

    if (!sourceAccount) {
      return next(new AppError('Source account not found or access denied.', 404));
    }

    let result;

    if (transferType === 'local') {
      if (!beneficiaryName || !beneficiaryAccountNumber || !bankName) {
        return next(new AppError('Please provide all beneficiary details (name, account number, bank name)!', 400));
      }

      // Find or create recipient
      let recipient = await prisma.recipient.findFirst({
        where: {
          userId: req.user.id,
          accountNumber: beneficiaryAccountNumber,
          bankName,
        }
      });

      if (!recipient) {
        recipient = await prisma.recipient.create({
          data: {
            name: beneficiaryName,
            accountNumber: beneficiaryAccountNumber,
            bankName,
            currency: sourceAccount.currency,
            userId: req.user.id,
          }
        });
      }

      // Format description with transfer method
      const formattedReference = `${transferMethod || 'Standard'} Transfer | ${reference || 'Local Bank Transfer'}`;

      result = await executeTransfer(
        req.user.id,
        sourceAccountId,
        amount,
        sourceAccount.currency,
        recipient.id,
        formattedReference
      );
    } else if (transferType === 'crypto') {
      if (!cryptoCurrency || !network || !walletAddress) {
        return next(new AppError('Please provide all cryptocurrency details (crypto, network, wallet address)!', 400));
      }

      // Format reference with crypto details
      const formattedReference = `Crypto Transfer - ${cryptoCurrency} (${network}) | Wallet: ${walletAddress}${reference ? ` | Memo: ${reference}` : ''}`;

      result = await executeTransfer(
        req.user.id,
        sourceAccountId,
        amount,
        sourceAccount.currency,
        undefined,
        formattedReference
      );
    } else {
      // Fallback for legacy prototype transfers
      const { targetCurrency, recipientId } = req.body;
      result = await executeTransfer(
        req.user.id,
        sourceAccountId,
        amount,
        targetCurrency || sourceAccount.currency,
        recipientId,
        reference
      );
    }

    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        account: true,
        recipient: true
      }
    });

    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: { transactions }
    });
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      status: 'success',
      data: { notifications }
    });
  } catch (error) {
    next(error);
  }
};

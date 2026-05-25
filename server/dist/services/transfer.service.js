import { prisma } from '../lib/prisma.js';
import { getExchangeRate } from './exchange.service.js';
import { AppError } from '../middleware/error.middleware.js';
import { TransactionType } from '@prisma/client';
export const executeTransfer = async (userId, sourceAccountId, amount, targetCurrency, recipientId, reference) => {
    return await prisma.$transaction(async (tx) => {
        // 1. Get source account and validate balance
        const sourceAccount = await tx.account.findUnique({
            where: { id: sourceAccountId, userId },
        });
        if (!sourceAccount) {
            throw new AppError('Source account not found or access denied.', 404);
        }
        if (sourceAccount.balance.toNumber() < amount) {
            throw new AppError('Insufficient funds.', 400);
        }
        // 2. Fetch exchange rate if currencies differ
        let exchangeRate = 1;
        let targetAmount = amount;
        if (sourceAccount.currency !== targetCurrency) {
            exchangeRate = await getExchangeRate(sourceAccount.currency, targetCurrency);
            targetAmount = amount * exchangeRate;
        }
        // 3. Deduct from source account
        await tx.account.update({
            where: { id: sourceAccountId },
            data: { balance: { decrement: amount } },
        });
        // 4. Create transaction record
        const transaction = await tx.transaction.create({
            data: {
                amount,
                currency: sourceAccount.currency,
                type: TransactionType.TRANSFER_OUT,
                status: 'COMPLETED',
                reference,
                accountId: sourceAccountId,
                userId,
                recipientId,
                targetCurrency,
                exchangeRate,
            },
        });
        return {
            transaction,
            exchangedAmount: targetAmount,
            rate: exchangeRate,
        };
    });
};
//# sourceMappingURL=transfer.service.js.map
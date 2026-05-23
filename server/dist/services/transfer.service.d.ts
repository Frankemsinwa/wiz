export declare const executeTransfer: (userId: string, sourceAccountId: string, amount: number, targetCurrency: string, recipientId?: string, reference?: string) => Promise<{
    transaction: {
        type: import("@prisma/client").$Enums.TransactionType;
        id: string;
        createdAt: Date;
        currency: string;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.TransactionStatus;
        reference: string | null;
        accountId: string;
        recipientId: string | null;
        targetCurrency: string | null;
        exchangeRate: import("@prisma/client-runtime-utils").Decimal | null;
    };
    exchangedAmount: number;
    rate: number;
}>;
//# sourceMappingURL=transfer.service.d.ts.map
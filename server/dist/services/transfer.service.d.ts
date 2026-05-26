export declare const executeTransfer: (userId: string, sourceAccountId: string, amount: number, targetCurrency: string, recipientId?: string, reference?: string) => Promise<{
    transaction: any;
    exchangedAmount: number;
    rate: number;
}>;
//# sourceMappingURL=transfer.service.d.ts.map
export interface TransactionModel {
  transactionValue: number;
  transactionType: "EXPENSE" | "INCOME";
  categoryId: string;
  userId: string;
  transactionDescription: string;
  date: string;
}

export interface TransactionData extends TransactionModel {
  transactionId: string;
}

export interface DeleteTransactionDataModel {
  transactionId: string;
  userId: string;
}

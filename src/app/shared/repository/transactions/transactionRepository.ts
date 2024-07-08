import {
  TransactionModel,
  TransactionData,
  DeleteTransactionDataModel,
} from "../../../types/transactions/transaction";
import { executeQuery } from "../../config/dbConfig";

export const transactionRepository = {
  async listTransactions({
    userId,
    month,
    year,
    type,
  }: {
    userId: string;
    type?: string;
    month: string;
    year: string;
  }) {
    let query = `
      SELECT * FROM Transactions
      WHERE userId = '${userId}' 
        AND MONTH(date) = '${month}' 
        AND YEAR(date) = '${year}'
    `;

    if (type) {
      query += ` AND transactionType = '${type}'`;
    }

    const transactions = await executeQuery(query);

    return transactions as any;
  },

  async transactionExistsById({
    transactionId,
    userId,
  }: {
    transactionId: string;
    userId: string;
  }) {
    const query = `
      SELECT * FROM Transactions
      WHERE id = '${transactionId}' AND userId = '${userId}'
    `;
    const transactions = await executeQuery(query);
    return transactions.length > 0;
  },

  async createTransaction({
    categoryId,
    transactionDescription,
    transactionType,
    transactionValue,
    userId,
    date,
  }: TransactionModel) {
    const query = `
      INSERT INTO Transactions (id, categoryId, transactionDescription, transactionType, transactionValue, userId, date)
      OUTPUT INSERTED.*
      VALUES (NEWID(), '${categoryId}', '${transactionDescription}', '${transactionType}', ${transactionValue}, '${userId}', '${date}')
    `;
    const transactions = await executeQuery(query);
    return transactions[0] as any;
  },

  async updateTransaction({
    transactionId,
    categoryId,
    transactionDescription,
    transactionType,
    transactionValue,
    userId,
    date,
  }: TransactionData) {
    const query = `
      UPDATE Transactions
      SET categoryId = '${categoryId}', 
          transactionDescription = '${transactionDescription}', 
          transactionType = '${transactionType}', 
          transactionValue = ${transactionValue},
          date = '${date}'
      OUTPUT INSERTED.*
      WHERE id = '${transactionId}' AND userId = '${userId}'
    `;
    const transactions = await executeQuery(query);
    return transactions[0] as any;
  },

  async deleteTransaction({
    transactionId,
    userId,
  }: DeleteTransactionDataModel) {
    const query = `
      DELETE FROM Transactions
      OUTPUT DELETED.*
      WHERE id = '${transactionId}' AND userId = '${userId}'
    `;
    const transactions = await executeQuery(query);
    return transactions[0] as any;
  },
};

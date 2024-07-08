import { transactionRepository } from "../../../shared/repository/transactions/transactionRepository";
import { CustomError } from "../../../shared/utils/customErrorClass";
import {
  TransactionModel,
  TransactionData,
  DeleteTransactionDataModel,
} from "../../../types/transactions/transaction";

export const transactionsService = {
  async listTransactions({
    userId,
    type = "",
    month,
    year,
  }: {
    userId: string;
    type?: string;
    month?: string;
    year?: string;
  }) {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const currentYear = currentDate.getFullYear().toString();

    const transaction = await transactionRepository.listTransactions({
      userId,
      type,
      month: month || currentMonth,
      year: year || currentYear,
    });

    if (!transaction) {
      throw new CustomError("Erro ao buscar transações", 500);
    }

    return transaction;
  },
  async createTransaction({
    categoryId,
    transactionDescription,
    transactionType,
    transactionValue,
    userId,
    date,
  }: TransactionModel) {
    const transaction = await transactionRepository.createTransaction({
      categoryId,
      transactionDescription,
      transactionType,
      transactionValue,
      userId,
      date,
    });

    if (!transaction) {
      throw new CustomError("Erro ao criar transação", 500);
    }

    return transaction;
  },
  async updateTransaction({
    categoryId,
    transactionDescription,
    transactionType,
    transactionValue,
    userId,
    transactionId,
    date,
  }: TransactionData) {
    const categoryExists = await transactionRepository.transactionExistsById({
      transactionId,
      userId,
    });

    if (!categoryExists) {
      throw new CustomError("Nenhuma transação encontrada para esse id", 404);
    }

    const transaction = await transactionRepository.updateTransaction({
      categoryId,
      transactionDescription,
      transactionType,
      transactionValue,
      userId,
      transactionId,
      date,
    });

    if (!transaction) {
      throw new CustomError("Erro ao atualizar transação", 500);
    }

    return transaction;
  },
  async deleteTransaction({
    transactionId,
    userId,
  }: DeleteTransactionDataModel) {
    const categoryExists = await transactionRepository.transactionExistsById({
      transactionId,
      userId,
    });

    if (!categoryExists) {
      throw new CustomError("Nenhuma transação encontrada para esse id", 404);
    }

    const transaction = await transactionRepository.deleteTransaction({
      userId,
      transactionId,
    });

    if (!transaction) {
      throw new CustomError("Erro ao deletar transação", 500);
    }

    return transaction;
  },
};

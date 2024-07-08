import { Request, Response } from "express";
import { TransactionModel } from "../../../types/transactions/transaction";
import { handleError } from "../../../shared/utils/errorHandler";
import { createTransactionModel } from "../../../shared/model/transaction/createTransaction";
import { transactionsService } from "../../services/transactions/transactionsService";
import { updateTransactionModel } from "../../../shared/model/transaction/updateTransaction";
import { activeUserId } from "../../../shared/helpers/activeUserId";
import { deleteTransactionDataModel } from "../../../shared/model/transaction/deleteTransaction";

export const transactionsController = {
  async listTransactions(req: Request, res: Response) {
    const { type, month, year } = req.query;
    const { userId } = await activeUserId(req);
    try {
      const transactions = await transactionsService.listTransactions({
        userId,
        type: type as string,
        month: month as string,
        year: year as string,
      });

      return res.status(200).send(transactions);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async createTransaction(req: Request, res: Response) {
    const data: TransactionModel = req.body;
    const { userId } = await activeUserId(req);
    try {
      const {
        categoryId,
        transactionDescription,
        transactionType,
        transactionValue,
        date,
      } = createTransactionModel({ data });

      const transaction = await transactionsService.createTransaction({
        date,
        categoryId,
        transactionDescription,
        transactionType,
        transactionValue,
        userId,
      });

      return res.status(200).send(transaction);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async updateTransaction(req: Request, res: Response) {
    const { transactionId } = req.params as { transactionId: string };
    const updateData: TransactionModel = req.body;
    const { userId } = await activeUserId(req);
    const data = { ...updateData, transactionId };

    try {
      const {
        categoryId,
        transactionDescription,
        transactionType,
        transactionValue,
        transactionId,
        date,
      } = updateTransactionModel({ data });

      const transaction = await transactionsService.updateTransaction({
        categoryId,
        transactionDescription,
        transactionType,
        transactionValue,
        userId,
        transactionId,
        date,
      });

      return res.status(200).send(transaction);
    } catch (error) {
      return handleError(error, res);
    }
  },
  async deleteTransaction(req: Request, res: Response) {
    const { transactionId } = req.params as { transactionId: string };
    const { userId } = await activeUserId(req);
    try {
      const { transactionId: transactionIdDto } = deleteTransactionDataModel({
        transactionId,
      });

      const transaction = await transactionsService.deleteTransaction({
        transactionId: transactionIdDto,
        userId,
      });

      return res.status(200).send({ deleted: true });
    } catch (error) {
      return handleError(error, res);
    }
  },
};

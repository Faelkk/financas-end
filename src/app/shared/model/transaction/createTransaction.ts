import { TransactionModel } from "../../../types/transactions/transaction";
import { CustomError } from "../../utils/customErrorClass";

export interface createTransactionModelDto {
  data: TransactionModel;
}

export function createTransactionModel({ data }: createTransactionModelDto) {
  const {
    categoryId,
    transactionDescription,
    transactionType,
    transactionValue,

    date,
  } = data;

  if (
    !categoryId ||
    !transactionDescription ||
    !transactionType ||
    !transactionValue ||
    !date
  ) {
    throw new CustomError("All fields are required", 400);
  }

  if (transactionType !== "EXPENSE" && transactionType !== "INCOME") {
    throw new CustomError("Category type must be expense or income", 400);
  }

  return {
    date,
    categoryId,
    transactionDescription,
    transactionType,
    transactionValue,
  };
}

import { TransactionData } from "../../../types/transactions/transaction";
import { CustomError } from "../../utils/customErrorClass";

export interface updateTransactionModelDto {
  data: TransactionData;
}

export function updateTransactionModel({ data }: updateTransactionModelDto) {
  const {
    categoryId,
    transactionDescription,
    transactionType,
    transactionValue,
    transactionId,
    date,
  } = data;

  if (
    !categoryId ||
    !transactionDescription ||
    !transactionType ||
    !transactionValue ||
    !transactionId ||
    !date
  ) {
    throw new CustomError("All fields are required", 400);
  }

  if (transactionType !== "EXPENSE" && transactionType !== "INCOME") {
    throw new CustomError("Category type must be expense or income", 400);
  }

  return {
    categoryId,
    date,
    transactionDescription,
    transactionType,
    transactionValue,

    transactionId,
  };
}

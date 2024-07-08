import { CustomError } from "../../utils/customErrorClass";

export interface deleteTransactionModelDto {
  transactionId: string;
}

export function deleteTransactionDataModel({
  transactionId,
}: deleteTransactionModelDto) {
  if (!transactionId) {
    throw new CustomError("TransactionId is required", 400);
  }

  return { transactionId };
}

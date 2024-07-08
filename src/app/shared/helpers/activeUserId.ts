import { Request } from "express";
import { CustomError } from "../utils/customErrorClass";
import { executeQuery } from "../config/dbConfig";

interface CustomRequest extends Request {
  userId?: string;
}

export async function activeUserId(req: CustomRequest) {
  const userId = req.userId;

  if (!userId) {
    throw new CustomError("Acesso não autorizado", 403);
  }

  const query = `
      SELECT * FROM Users
      WHERE id = '${userId}'
    `;
  const userExists = await executeQuery(query);

  if (!userExists) {
    throw new CustomError("Usario não encontrado", 404);
  }

  return { userId };
}

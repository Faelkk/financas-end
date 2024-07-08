import { Response } from "express";

export function handleError(error: unknown, res: Response) {
  if (error instanceof Error) {
    res.status((error as any).status || 500).send(error.message);
  } else {
    res.status(500).send("An unknown error occurred.");
  }
}

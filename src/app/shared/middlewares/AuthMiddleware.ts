import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const publicRoutes = ["/signin", "/signup"];

  if (publicRoutes.includes(req.url!)) {
    return next();
  }

  try {
    await verifyJWTTokenFromRequest(req);

    next();
  } catch (err: any) {
    handleAuthError(res, err);
  }
}

async function verifyJWTTokenFromRequest(req: Request) {
  const token = getTokenFromRequest(req);

  if (token) {
    await verifyJWTToken(req, token);
  }
}

function getTokenFromRequest(req: Request) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  return token || null;
}

async function verifyJWTToken(req: Request, token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    (req as any).userId = decoded.userId;
  } catch (err) {
    throw new Error("Token verification failed");
  }
}

function handleAuthError(res: Response, err: Error) {
  res.writeHead(401, { "Content-type": "application/json" });
  res.end(JSON.stringify({ error: err.message }));
}

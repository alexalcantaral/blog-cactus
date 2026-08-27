import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({ error: "Sem token" });
  }

  const token = authHeader.split(" ")[1];

  try{
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string; email: string };
    req.user = { id: payload.sub, email: payload.email };
    next();
  }
  catch{
    return res.status(401).json({ error: "Token inválido" });
  }
};

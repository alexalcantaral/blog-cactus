import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
import { pool } from "../config/database";

interface UserRow extends RowDataPacket {
  id: string;
  email: string;
  password_hash: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const [rows] = await pool.query<UserRow[]>(
    "SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  const user = rows[0];

  if(!user){
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if(!passwordMatches){
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
  );

  return res.json({ token });
};

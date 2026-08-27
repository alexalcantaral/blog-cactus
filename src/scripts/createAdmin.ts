import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { pool } from "../config/database";

dotenv.config();

const run = async () => {
  const email = process.argv[2] || process.env.ADMIN_EMAIL;
  const password = process.argv[3] || process.env.ADMIN_PASSWORD;

  if(!email || !password){
    console.error("Uso: npm run create-admin -- <email> <senha>");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (id, email, password_hash)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [randomUUID(), email, passwordHash]
  );

  console.log(`Usuário admin "${email}" criado/atualizado com sucesso.`);
  await pool.end();
};

run().catch((error) => {
  console.error("Falha ao criar usuário admin:", error);
  process.exit(1);
});

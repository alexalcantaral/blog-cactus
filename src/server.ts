import express from "express";
import cors from "cors";
import { pool } from "./config/database";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.get("/test", async (req, res) => {
  try{
    const [rows] = await pool.query("SELECT * FROM posts");
    return res.json(rows);
  }
  catch(error: any){
    return res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

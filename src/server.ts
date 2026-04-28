import express from "express";
import cors from "cors";
import { supabase } from "./config/supabase";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.get("/test", async (req, res) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*");

  if(error){
    return res.status(400).json(error);
  }

  return res.json(data);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

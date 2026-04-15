import { supabase } from "../config/supabase";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if(error){
    return res.status(401).json({ error: error.message });
  }

  return res.json({
    token: data.session.access_token
  });
};

import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if(!title || !content){
    return res.status(400).json({ 
      error: "Título e conteúdo são obrigatórios" 
    });
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content }])
    .select();

  if(error){
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
};

export const getPosts = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if(error){
    return res.status(400).json({ error: error.message });
  }

  return res.json(data);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if(error){
    return res.status(400).json({ error: error.message });
  }

  return res.json({ message: "Post deletado com sucesso" });
};

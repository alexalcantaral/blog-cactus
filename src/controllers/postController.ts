import { Request, Response } from "express";
import * as postService from "../services/postService";

export const createPost = async (req: Request, res: Response) => {
  try{
    const { title, content } = req.body;
    const data = await postService.createPostService(title, content);
    return res.status(201).json(data);
  } 
  catch(error: any){
    return res.status(400).json({ error: error.message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const data = await postService.getPostsService();
    return res.json(data);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getPostById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const data = await postService.getPostByIdService(id);
    return res.json(data);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const editPost = async (req: Request<{ id: string }>, res: Response) => {
  try{
    const { id } = req.params;
    const { title, content } = req.body;
    const data = await postService.editPostService(id, { title, content });
    return res.status(200).json(data);
  } 
  catch(error: any){
    return res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req: Request<{ id: string }>, res: Response) => {
  try{
    const { id } = req.params;
    await postService.deletePostService(id);
    return res.json({ message: "Post deletado com sucesso" });
  } 
  catch(error: any){
    return res.status(400).json({ error: error.message });
  }
};
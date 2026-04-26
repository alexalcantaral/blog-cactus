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

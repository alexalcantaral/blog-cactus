import { Request, Response, NextFunction } from "express";
import { upload } from "../config/storage";

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single("image")(req, res, (err: any) => {
    if(err){
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};
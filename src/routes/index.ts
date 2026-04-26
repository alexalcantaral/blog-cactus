import { Router } from "express";
import { login } from "../controllers/authController";
import { createPost } from "../controllers/postController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/login", login);

router.post("/posts", authMiddleware, createPost);

export default router;

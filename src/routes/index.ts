import { Router } from "express";
import { login } from "../controllers/authController";
import { createPost, deletePost } from "../controllers/postController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/login", login);

router.post("/posts", authMiddleware, createPost);
router.delete("/posts/:id", authMiddleware, deletePost);

export default router;

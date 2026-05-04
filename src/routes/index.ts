import { Router } from "express";
import { login } from "../controllers/authController";
import { createPost, getPosts, getPostById, editPost, deletePost } from "../controllers/postController";
import { authMiddleware } from "../middlewares/auth";
import { uploadMiddleware } from "../middlewares/upload";

const router = Router();

router.post("/login", login);

router.post("/posts", authMiddleware, uploadMiddleware, createPost);
router.patch("/posts/:id", authMiddleware, editPost);
router.delete("/posts/:id", authMiddleware, deletePost);

router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);

export default router;

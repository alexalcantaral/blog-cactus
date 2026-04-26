import { Router } from "express";
import { login } from "../controllers/authController";
import { createPost, getPosts, getPostById, editPost, deletePost } from "../controllers/postController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/login", login);

router.post("/posts", authMiddleware, createPost);
router.patch("/posts/:id", authMiddleware, editPost);
router.delete("/posts/:id", authMiddleware, deletePost);

router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);

export default router;

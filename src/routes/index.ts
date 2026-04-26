import { Router } from "express";
import { login } from "../controllers/authController";
import { createPost, editPost, deletePost } from "../controllers/postController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/login", login);

router.post("/posts", authMiddleware, createPost);
router.patch("/posts/:id", authMiddleware, editPost);
router.delete("/posts/:id", authMiddleware, deletePost);

// router.get("posts");

export default router;

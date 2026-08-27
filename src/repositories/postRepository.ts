import { randomUUID } from "crypto";
import { RowDataPacket } from "mysql2";
import { pool } from "../config/database";
import { removeImage } from "./storageRepository";

export interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: Date;
}

export type PostSummary = Omit<Post, "content">;

export const insertPost = async (
  title: string,
  content: string,
  imageUrl: string | null
): Promise<Post[]> => {
  const id = randomUUID();

  await pool.query(
    "INSERT INTO posts (id, title, content, image_url) VALUES (?, ?, ?, ?)",
    [id, title, content, imageUrl]
  );

  const post = await findPostById(id);
  return post ? [post] : [];
};

export const findAllPosts = async (): Promise<PostSummary[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, title, image_url, created_at FROM posts ORDER BY created_at DESC"
  );

  return rows as PostSummary[];
};

export const findPostById = async (id: string): Promise<Post | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM posts WHERE id = ? LIMIT 1",
    [id]
  );

  return (rows[0] as Post) ?? null;
};

export const updatePost = async (
  id: string,
  fields: { title?: string; content?: string }
): Promise<Post[]> => {
  const updates: string[] = [];
  const values: string[] = [];

  if (fields.title !== undefined) {
    updates.push("title = ?");
    values.push(fields.title);
  }

  if (fields.content !== undefined) {
    updates.push("content = ?");
    values.push(fields.content);
  }

  if (updates.length > 0) {
    await pool.query(`UPDATE posts SET ${updates.join(", ")} WHERE id = ?`, [...values, id]);
  }

  const post = await findPostById(id);
  return post ? [post] : [];
};

export const removePost = async (id: string): Promise<void> => {
  const post = await findPostById(id);

  if (post?.image_url) {
    const fileName = post.image_url.split("/").pop()!;

    try {
      await removeImage(fileName);
    } catch (error) {
      console.error("Falha ao remover imagem do FTP:", error);
    }
  }

  await pool.query("DELETE FROM posts WHERE id = ?", [id]);
};

import { supabase } from "../config/supabase";

export const insertPost = async (title: string, content: string, imageUrl: string | null) => {
  return await supabase
    .from("posts")
    .insert([{ title, content, image_url: imageUrl }])
    .select();
};

export const findAllPosts = async () => {
  return await supabase
    .from("posts")
    .select("id, title, image_url, created_at")
    .order("created_at", { ascending: false });
};

export const findPostById = async (id: string) => {
  return await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
};

export const updatePost = async (id: string, fields: { title?: string; content?: string }) => {
  return await supabase
    .from("posts")
    .update(fields)
    .eq("id", id)
    .select();
};

export const removePost = async (id: string) => {
  return await supabase
    .from("posts")
    .delete()
    .eq("id", id);
};
import { supabase } from "../config/supabase";

export const insertPost = async (title: string, content: string) => {
  return await supabase
    .from("posts")
    .insert([{ title, content }])
    .select();
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
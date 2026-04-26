import { supabase } from "../config/supabase";

export const insertPost = async (title: string, content: string) => {
  return await supabase
    .from("posts")
    .insert([{ title, content }])
    .select();
};
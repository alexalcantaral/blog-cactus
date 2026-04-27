import { supabase } from "../config/supabase";

export const uploadImage = async (file: Express.Multer.File) => {
  const fileName = `${Date.now()}-${file.originalname}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file.buffer, { contentType: file.mimetype });

  if(error) throw new Error(error.message);

  const { data: urlData } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};
import * as postRepository from "../repositories/postRepository";
import { uploadImage } from "../repositories/storageRepository";

export const createPostService = async (title: string, content: string, file: Express.Multer.File) => {
  if (!title || !content) {
    throw new Error("Título e conteúdo são obrigatórios");
  }

  if(!file){
    throw new Error("Imagem é obrigatória");
  }

  const imageUrl = await uploadImage(file);

  const { data, error } = await postRepository.insertPost(title, content, imageUrl);
  if(error) throw new Error(error.message);

  return data;
};

export const getPostsService = async () => {
  
  const { data, error } = await postRepository.findAllPosts();
  
  if (error) throw new Error(error.message);

  return data;
};

export const getPostByIdService = async (id: string) => {

  const { data, error } = await postRepository.findPostById(id);
  
  if (error) throw new Error(error.message);
  
  return data;
};

export const editPostService = async (id: string, fields: { title?: string; content?: string }) => {
  
  if(!fields.title && !fields.content){
    throw new Error("Informe ao menos title ou content para atualizar");
  }
  
  const { data, error } = await postRepository.updatePost(id, fields);
  
  if(error)throw new Error(error.message);

  return data;
};

export const deletePostService = async (id: string) => {

  const { error } = await postRepository.removePost(id);

  if(error)throw new Error(error.message);
};
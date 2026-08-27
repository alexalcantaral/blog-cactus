import * as postRepository from "../repositories/postRepository";
import { uploadImage } from "../repositories/storageRepository";

export const createPostService = async (title: string, content: string, file?: Express.Multer.File) => {
  if(!title || !content){
    throw new Error("Título e conteúdo são obrigatórios");
  }

  let imageUrl: string | null = null;

  if(file){
    imageUrl = await uploadImage(file);
  }

  return await postRepository.insertPost(title, content, imageUrl);
};

export const getPostsService = async () => {
  return await postRepository.findAllPosts();
};

export const getPostByIdService = async (id: string) => {
  const post = await postRepository.findPostById(id);

  if(!post){
    throw new Error("Post não encontrado");
  }

  return post;
};

export const editPostService = async (id: string, fields: { title?: string; content?: string }) => {

  if(!fields.title && !fields.content){
    throw new Error("Informe ao menos title ou content para atualizar");
  }

  const data = await postRepository.updatePost(id, fields);

  if(data.length === 0){
    throw new Error("Post não encontrado");
  }

  return data;
};

export const deletePostService = async (id: string) => {
  await postRepository.removePost(id);
};

import * as postRepository from "../repositories/postRepository";

export const createPostService = async (title: string, content: string) => {
  
  if(!title || !content){
    throw new Error("Título e conteúdo são obrigatórios");
  }

  const { data, error } = await postRepository.insertPost(title, content);

  if(error)throw new Error(error.message);

  return data;
};

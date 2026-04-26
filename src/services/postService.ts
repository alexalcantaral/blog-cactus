import * as postRepository from "../repositories/postRepository";

export const createPostService = async (title: string, content: string) => {
  
  if(!title || !content){
    throw new Error("Título e conteúdo são obrigatórios");
  }

  const { data, error } = await postRepository.insertPost(title, content);

  if(error)throw new Error(error.message);

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
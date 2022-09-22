import { client, ENDPOINTS } from './fetchClient';
import { Product } from './types/Product';
import { Comment } from './types/Comment';
import { Id } from './types/Id';

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>(ENDPOINTS.products);
};

export const createProduct = (data: Omit<Product, 'id'>): Promise<Product> => {
  return client.post<Product>(ENDPOINTS.products, data);
};

export const updateProduct = (data: Product): Promise<Product> => {
  return client.put<Product>(ENDPOINTS.productById(data.id), data);
};

export const deleteProductById = (id: Id) => {
  return client.delete(ENDPOINTS.productById(id));
};

export const getCommentsByProductId = (id: Id): Promise<Comment[]> => {
  return client.get<Comment[]>(ENDPOINTS.commentsByProductId(id));
};

export const deleteComment = (comment: Comment) => {
  return client.delete(ENDPOINTS.commentById(comment.id));
};

export const addNewComment = (comment: Omit<Comment, 'id'>): Promise<Comment> => {
  return client.post<Comment>(ENDPOINTS.comments, comment);
};

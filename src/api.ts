import { client, ENDPOINTS } from './fetchClient';
import { Product } from './types/Product';
import { Comment } from './types/Comment';
import { Id } from './types/Id';

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>(ENDPOINTS.products);
};

export const getCommentsByProductId = (id: Id): Promise<Comment[]> => {
  return client.get<Comment[]>(ENDPOINTS.commentsByProductId(id));
};

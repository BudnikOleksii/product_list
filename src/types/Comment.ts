import { Id } from './Id';

export interface Comment {
  id: Id,
  productId: Id,
  description: string,
  date: string,
}

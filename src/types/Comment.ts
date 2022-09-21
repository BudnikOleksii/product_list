import { Id } from './Id';

export interface Comment {
  id: Id,
  productId: number,
  description: string,
  date: string,
}

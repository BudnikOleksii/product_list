import { Id } from './Id';

export interface Product {
  id: Id,
  imageUrl: string,
  name: string,
  count: number,
  size: {
    width: number,
    height: number
  },
  weight: string,
  comments: Comment[] | null,
}

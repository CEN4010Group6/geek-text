import { Book } from './book';
import { User } from './user';

export interface ShoppingCart {
  id: number;
  user?: User;
  books?: Book[];
  createdAt: Date;
  updatedAt: Date;
}

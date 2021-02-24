import { User } from './user';

export interface Review {
  id: string;
  value: number;
  description: string;
  postedAs: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  bookId?: string;
  user?: User,
}

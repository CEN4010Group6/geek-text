import { Author } from './author';

export interface Book {
  id: string;
  title: string;
  author: Author[];
  isbn: number;
  description: string;
  price: number;
  coverUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  publisherId: string;
}

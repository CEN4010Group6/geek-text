import { Author } from './author';
import { Rating } from './rating';

export interface Book {
  id: string;
  title: string;
  author: Author[];
  isbn: number;
  description: string;
  price: number;
  coverUrl?: string;
  publisher?: string;
  rating?: Rating[];
  createdAt: Date;
  updatedAt: Date;
}

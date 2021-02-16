import { Author } from './author';
import { Rating } from './rating';
import { Genre } from './genre';

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
  genre?: Genre[];
  createdAt: Date;
  updatedAt: Date;
}

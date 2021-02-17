import { Author } from './author';
import { Rating } from './rating';
import { Genre } from './genre';

export interface Book {
  id: string;
  title: string;
  authors: Author[];
  isbn: number;
  description: string;
  price: number;
  coverUrl?: string;
  publisher?: string;
  ratings?: Rating[];
  genres?: Genre[];
  createdAt: Date;
  updatedAt: Date;
}

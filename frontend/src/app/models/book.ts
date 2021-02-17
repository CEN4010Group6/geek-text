import { Author } from './author';
import { Rating } from './rating';
import { Genre } from './genre';
import { Publisher } from './publisher';

export interface Book {
  id: string;
  title: string;
  authors: Author[];
  isbn: number;
  description: string;
  price: number;
  coverUrl?: string;
  coverDataUri?: string;
  publisher?: Publisher;
  publishYear: number;
  ratings?: Rating[];
  genres?: Genre[];
  createdAt: Date;
  updatedAt: Date;
}

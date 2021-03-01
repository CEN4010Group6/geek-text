import { Author } from './author';
import { Review } from './review';
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
  reviews?: Review[];
  genres?: Genre[];
  averageRating?: number;
  createdAt: Date;
  updatedAt: Date;
}

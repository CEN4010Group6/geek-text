import { BaseDTO } from '../../dto/base';
import { Book as BookModel } from '@prisma/client';

export class Book extends BaseDTO implements BookModel {
  id: string;
  title: string;
  isbn: number;
  description: string;
  price: number;
  publishYear: number;
  coverUrl: string | null;
  coverDataUri: string | null;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
  averageRating?: number;
  transactionId: string | null;
  shoppingCartId: string | null;
  publisherId: string;

  constructor(merge: BookModel | null) {
    super(merge);
  }
}

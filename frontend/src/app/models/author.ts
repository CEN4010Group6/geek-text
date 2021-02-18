import { Book } from './book';

export interface Author {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  description: string;
  books?: Book[];
  createdAt: Date;
  updatedAt: Date;
}

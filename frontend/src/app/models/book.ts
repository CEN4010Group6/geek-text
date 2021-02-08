export interface Book {
  id: string;
  title: string;
  isbn: number;
  description: string;
  price: number;
  coverUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  publisherId: string;
}

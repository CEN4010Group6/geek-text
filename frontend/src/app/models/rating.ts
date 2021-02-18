export interface Rating {
  id: string;
  value: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  bookId?: string;
}

export interface Author {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

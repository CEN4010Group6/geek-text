import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private $prisma: PrismaService) {}

  async findOne(bookWhereUniqueInput: Prisma.BookWhereUniqueInput): Promise<Book | null> {
    return this.$prisma.book.findUnique({
      where: bookWhereUniqueInput
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByInput;
  }): Promise<Book[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.$prisma.book.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.$prisma.book.create({
      data
    });
  }

  async updateBook(params: {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }): Promise<Book> {
    const { where, data } = params;
    return this.$prisma.book.update({
      data,
      where
    });
  }

  async deleteBook(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    return this.$prisma.book.delete({
      where
    });
  }
}

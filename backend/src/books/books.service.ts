import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private $prisma: PrismaService) {}

<<<<<<< HEAD
  /**
   * Find a single Book in the `books` table
   *
   * @param bookWhereUniqueInput Input which specifies the book to be found
   */
=======
>>>>>>> d04a58a89f7345ed48b785b7564759d0532cebba
  async findOne(bookWhereUniqueInput: Prisma.BookWhereUniqueInput): Promise<Book | null> {
    return this.$prisma.book.findUnique({
      where: bookWhereUniqueInput
    });
  }

<<<<<<< HEAD
  /**
   * Finds all Book records which match the given parameters
   *
   * @param params Parameters to match against the `books` table entries
   */
=======
>>>>>>> d04a58a89f7345ed48b785b7564759d0532cebba
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

<<<<<<< HEAD
  /**
   * Create a new Book in the `books` table
   *
   * @param data The Book data to be created
   */
=======
>>>>>>> d04a58a89f7345ed48b785b7564759d0532cebba
  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.$prisma.book.create({
      data
    });
  }

<<<<<<< HEAD
  /**
   * Updates a Book in the `books` table
   *
   * @param params Updated Book data
   */
=======
>>>>>>> d04a58a89f7345ed48b785b7564759d0532cebba
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

<<<<<<< HEAD
  /**
   * Removes a Book entry from the `books` table
   *
   * @param where The unique identifier(s) of the Book to be removed
   */
=======
>>>>>>> d04a58a89f7345ed48b785b7564759d0532cebba
  async deleteBook(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    return this.$prisma.book.delete({
      where
    });
  }
}

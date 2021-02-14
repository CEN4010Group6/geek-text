import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  /**
   * Books service constructor
   *
   * @param $prisma The Prisma database service
   */
  constructor(
    private $prisma: PrismaService
  ) {}

  /**
   * Find a single Book in the `books` table
   *
   * @param bookWhereUniqueInput Input which specifies the book to be found
   */
  public async findOne(bookWhereUniqueInput: Prisma.BookWhereUniqueInput): Promise<Book | null> {
    return this.$prisma.book.findUnique({
      where: bookWhereUniqueInput,
      include: {
        author: true
      }
    });
  }

  /**
   * Finds all Book records which match the given parameters
   *
   * @param params Parameters to match against the `books` table entries
   */
  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByInput;
    select?: Prisma.BookSelect;
  }): Promise<Book[]> {
    const { skip, take, cursor, where, orderBy, select } = params;
    return this.$prisma.book.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select
    }) as unknown as Book[];
  }

  /**
   * Create a new Book in the `books` table
   *
   * @param data The Book data to be created
   */
  public async create(data: Prisma.BookCreateInput): Promise<Book> {
    return this.$prisma.book.create({
      data
    });
  }

  /**
   * Updates a Book in the `books` table
   *
   * @param params Updated Book data
   */
  public async update(params: {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }): Promise<Book> {
    const { where, data } = params;
    return this.$prisma.book.update({
      data,
      where
    });
  }

  /**
   * Removes a Book entry from the `books` table
   *
   * @param where The unique identifier(s) of the Book to be removed
   */
  public async delete(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    return this.$prisma.book.delete({
      where
    });
  }
}

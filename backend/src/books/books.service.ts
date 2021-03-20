import { Injectable, NotFoundException } from '@nestjs/common';
import { Book as BookModel, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { Book } from './dto/book';

@Injectable()
export class BooksService {
  /**
   * Books service constructor
   *
   * @param $prisma The Prisma database service
   */
  constructor(
    private readonly $prisma: PrismaService
  ) {}

  /**
   * Find a single Book in the `books` table
   *
   * @param bookWhereUniqueInput Input which specifies the book to be found
   */
  public async findOne(params: {
    where: Prisma.BookWhereUniqueInput;
    select?: Prisma.BookSelect;
  }): Promise<Book | null> {
    const { where, select } = params;

    let averageRating = false;

    // @ts-ignore
    if(select?.averageRating) {
      averageRating  = true;
      // @ts-ignore
      delete select.averageRating;
    }

    const dbBook = await this.$prisma.book.findUnique({
      where,
      select
    }) as BookModel | null;

    if(!dbBook) {
      throw new NotFoundException('The requested book could not be found');
    }

    let book = new Book(dbBook);

    if(averageRating) {
      const aggregate = await this.$prisma.review.aggregate({
        where: {
          bookId: book.id
        },
        avg: {
          value: true
        }
      });

      book = Object.assign({ averageRating: aggregate.avg.value }, book);
    }

    return book;
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

    let averageRating = false;

    // @ts-ignore
    if(select?.averageRating) {
      averageRating  = true;
      // @ts-ignore
      delete select.averageRating;
    }

    let books = await this.$prisma.book.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select
    }) as BookModel[] | null || [];

    for(let idx in books) {
      let book = new Book(books[idx]);

      if(averageRating) {
        const aggregate = await this.$prisma.review.aggregate({
          where: {
            bookId: book.id
          },
          avg: {
            value: true
          }
        });

        book.averageRating = aggregate.avg.value;
      }

      books[idx] = book;
    }

    return books;
  }

  /**
   * Create a new Book in the `books` table
   *
   * @param data The Book data to be created
   */
  public async create(data: Prisma.BookCreateInput): Promise<Book> {
    return this.$prisma.book.create({ data });
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
    return this.$prisma.book.update({ data, where });
  }

  /**
   * Removes a Book entry from the `books` table
   *
   * @param where The unique identifier(s) of the Book to be removed
   */
  public async delete(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    return this.$prisma.book.delete({ where });
  }

  /**
   * Counts the books in the database
   *
   * @param params
   * @returns
   */
  public async count(params: {
    where?: Prisma.BookWhereInput;
    cursor?: Prisma.BookWhereUniqueInput;
    skip?: number;
    orderBy?: Prisma.BookOrderByInput;
  }): Promise<number> {
    const { where, cursor, skip, orderBy } = params;

    let count = await this.$prisma.book.count({
      where,
      cursor,
      skip,
      orderBy
    });

    if(!count) {
      count = 0;
    }

    return count;
  }
}

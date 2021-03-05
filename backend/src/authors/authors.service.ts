import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Author as AuthorModel, Prisma } from '@prisma/client';
import { Book } from '../books/dto/book';
import { PrismaService } from '../prisma/prisma.service';
import { Author } from './dto/author';

@Injectable()
export class AuthorsService {
  /**
   * Authors service constructor
   * @param $prisma The Prisma database service
   */
  constructor(
    private readonly $prisma: PrismaService
  ) {}

  /**
   * Find a single Author in the `authors` table
   *
   * @param params Parametes to match against the requested `authors` table entry
   */
  public async findOne(params: {
    where: Prisma.AuthorWhereUniqueInput;
    select?: Prisma.AuthorSelect
  }): Promise<Author | null> {
    const { where, select } = params;

    const dbAuthor = await this.$prisma.author.findUnique({
      where,
      select
    }) as AuthorModel | null;

    if(!dbAuthor) {
      throw new NotFoundException('The requested author could not be found');
    }

    let author = new Author(dbAuthor);

    if(select?.books) {
      for(const idx in author.books) {
        author.books[idx] = new Book(author.books[idx]);

        const bookId = author.books[idx].id;

        const aggregate = await this.$prisma.review.aggregate({
          where: {
            bookId: bookId
          },
          avg: {
            value: true
          }
        });

        author.books[idx].averageRating = aggregate.avg.value;
      }
    }

    return author;
  }

  /**
   * Find all Author records which match the given parameters
   *
   * @param params Parameters to match against the `authors` table entries
   */
  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AuthorWhereUniqueInput;
    where?: Prisma.AuthorWhereInput;
    orderBy?: Prisma.AuthorOrderByInput;
    select?: Prisma.AuthorSelect;
  }): Promise<Author[]> {
    let authors = await this.$prisma.author.findMany(params) as AuthorModel[] | Author[];

    for(const idx in authors) {
      let author = new Author(authors[idx]);

      if(params.select?.books) {
        for(const idx in author?.books) {
          let book = new Book(author.books[idx]);

          const aggregate  = await this.$prisma.review.aggregate({
            where: {
              bookId: book.id
            },
            avg: {
              value: true
            }
          });

          book.averageRating = aggregate.avg.value;

          author.books[idx] = book;
        }
      }

      authors[idx] = author;
    }

    return authors;
  }

  /**
   * Create a new Author in the `authors` table
   *
   * @param data The Author data to be created
   */
  public async create(data: Prisma.AuthorCreateInput): Promise<Author> {
    return await this.$prisma.author.create({ data });
  }

  /**
   * Updates an Author in the `author` table
   *
   * @param params Updated Author data
   */
  public async update(params: {
    where: Prisma.AuthorWhereUniqueInput;
    data: Prisma.AuthorUpdateInput;
  }): Promise<Author> {
    return this.$prisma.author.update(params);
  }

  /**
   * Removes an Author from the `authors` table
   *
   * @param where The unique identifier(s) of teh Author to be removed
   */
  public async delete(where: Prisma.AuthorWhereUniqueInput): Promise<Author> {
    return this.$prisma.author.delete({ where });
  }
}

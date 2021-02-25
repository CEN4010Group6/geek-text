import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';
import { exception } from 'console';
import { PrismaService } from '../prisma/prisma.service';

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
    include?: Prisma.AuthorInclude,
    select?: Prisma.AuthorSelect
  }): Promise<Author | null> {
    const { where, include, select } = params;
    if(include && !select) {
      return this.$prisma.author.findUnique({ where, include }) as unknown as Author;
    } else if(!include && select) {
      return this.$prisma.author.findUnique({ where, select }) as unknown as Author;
    } else {
      throw new NotAcceptableException("Cannot specifiy both `select` and `include` in the same statement.");
    }
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
    include?: Prisma.AuthorInclude;
  }): Promise<Author[]> {
    const { skip, take, cursor, where, orderBy, select, include } = params;

    if(!include) {
      return this.$prisma.author.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select
      }) as unknown as Author[];
    } else if(!select && include) {
      return this.$prisma.author.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include
      }) as unknown as Author[];
    } else {
      throw new NotAcceptableException("Cannot specifiy both `select` and `include` in the same statement.");
    }
  }

  /**
   * Create a new Author in the `authors` table
   *
   * @param data The Author data to be created
   */
  public async create(data: Prisma.AuthorCreateInput): Promise<Author> {
    return this.$prisma.author.create({ data });
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
    const { where, data } = params;
    return this.$prisma.author.update({ data, where });
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

import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Genre, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenresService {
  /**
   * Genres service constructor
   * @param $prisma The Prisma database service
   */
  constructor(
    private readonly $prisma: PrismaService
  ) {}

  /**
   * Find a single Genre in the `genres` table
   *
   * @param params Parametes to match against the requested `genres` table entry
   */
  public async findOne(params: {
    where: Prisma.GenreWhereUniqueInput;
    select?: Prisma.GenreSelect;
  }): Promise<Genre | null> {
    const { where, select } = params;
    return this.$prisma.genre.findUnique({ where, select }) as unknown as Genre;
  }

  /**
   * Find all Genre records which match the given parameters
   *
   * @param params Parameters to match against the `genres` table entries
   */
  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GenreWhereUniqueInput;
    where?: Prisma.GenreWhereInput;
    orderBy?: Prisma.GenreOrderByInput;
    select?: Prisma.GenreSelect;
  }): Promise<Genre[]> {
    const { skip, take, cursor, where, orderBy, select } = params;

    return this.$prisma.genre.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select
    }) as unknown as Genre[];
  }

  /**
   * Create a new Genre in the `genres` table
   *
   * @param data The Genre data to be created
   */
  public async create(data: Prisma.GenreCreateInput): Promise<Genre> {
    return this.$prisma.genre.create({ data });
  }

  /**
   * Updates an Genre in the `genre` table
   *
   * @param params Updated Genre data
   */
  public async update(params: {
    where: Prisma.GenreWhereUniqueInput;
    data: Prisma.GenreUpdateInput;
  }): Promise<Genre> {
    const { where, data } = params;
    return this.$prisma.genre.update({ data, where });
  }

  /**
   * Removes an Genre from the `genres` table
   *
   * @param where The unique identifier(s) of teh Genre to be removed
   */
  public async delete(where: Prisma.GenreWhereUniqueInput): Promise<Genre> {
    return this.$prisma.genre.delete({ where });
  }
}

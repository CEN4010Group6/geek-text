import { Injectable } from '@nestjs/common';
import { Genre as GenreModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenre, Genre, UpdateGenre } from './dto/genre';

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

    const genre = await this.$prisma.genre.findUnique({ where, select }) as Genre | null;

    return genre;
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

    const genres = await this.$prisma.genre.findMany(params) as Genre[];

    return genres;
  }

  /**
   * Create a new Genre in the `genres` table
   *
   * @param data The Genre data to be created
   */
  public async create(data: CreateGenre): Promise<Genre> {
    const genre = await this.$prisma.genre.create({ data }) as Genre;
    return genre;
  }

  /**
   * Updates an Genre in the `genre` table
   *
   * @param params Updated Genre data
   */
  public async update(params: {
    where: Prisma.GenreWhereUniqueInput;
    data: UpdateGenre;
  }): Promise<Genre> {
    const { where, data } = params;
    const genre = await this.$prisma.genre.update({ data, where }) as Genre;
    return genre;
  }

  /**
   * Removes an Genre from the `genres` table
   *
   * @param where The unique identifier(s) of teh Genre to be removed
   */
  public async delete(where: Prisma.GenreWhereUniqueInput): Promise<Genre> {
    const genre = await this.$prisma.genre.delete({ where }) as Genre;
    return genre;
  }
}

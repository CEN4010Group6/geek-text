import { Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingsService {
  /**
   * Ratings service constructor
   *
   * @param $prisma The Prisma database service
   */
  constructor(
    private $prisma: PrismaService
  ) {}

  /**
   * Find a single Rating in the `ratings` table
   *
   * @param ratingWhereUniqueInput
   */
  public async findOne(
    ratingWhereUniqueInput: Prisma.RatingWhereUniqueInput
  ): Promise<Rating | null> {
    return this.$prisma.rating.findUnique({
      where: ratingWhereUniqueInput
    });
  }

  /**
   * Find all Rating records which match the given parameters
   *
   * @param params Parameters to match against the `ratings` table entries
   */
  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RatingWhereUniqueInput;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByInput;
    select?: Prisma.RatingSelect;
  }): Promise<Rating[]> {
    const { skip, take, cursor, where, orderBy, select } = params;
    return this.$prisma.rating.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select
    }) as unknown as Rating[]
  }

  /**
   * Create a new Rating in the `ratings` table
   *
   * @param data The Rating to be created
   */
  public async create(data: Prisma.RatingCreateInput): Promise<Rating> {
    return this.$prisma.rating.create({
      data
    });
  }

  /**
   * Updates a Rating in the `ratings` table
   *
   * @param params Updated Rating data
   */
  public async update(params: {
    where: Prisma.RatingWhereUniqueInput;
    data: Prisma.RatingUpdateInput;
  }): Promise<Rating> {
    const { where, data } = params;
    return this.$prisma.rating.update({
      data,
      where
    });
  }

  /**
   * Removes a Rating entry from the `ratings` table
   *
   * @param where The unique identifier(s) of the Rating to be removed
   */
  public async delete(where: Prisma.RatingWhereUniqueInput): Promise<Rating> {
    return this.$prisma.rating.delete({
      where
    });
  }
}

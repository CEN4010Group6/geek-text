import { Injectable } from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  /**
   * Reviews service constructor
   *
   * @param $prisma The Prisma database service
   */
  constructor(
    private $prisma: PrismaService
  ) {}

  /**
   * Find a single Review in the `reviews` table
   *
   * @param reviewWhereUniqueInput
   */
  public async findOne(params: {
    where: Prisma.ReviewWhereUniqueInput;
    select?: Prisma.ReviewSelect;
  }): Promise<Review | null> {
    const { where, select } = params;
    return this.$prisma.review.findUnique({where, select}) as unknown as Review;
  }

  /**
   * Find all Review records which match the given parameters
   *
   * @param params Parameters to match against the `reviews` table entries
   */
  public async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReviewWhereUniqueInput;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByInput;
    select?: Prisma.ReviewSelect;
  }): Promise<Review[]> {
    const { skip, take, cursor, where, orderBy, select } = params;
    return this.$prisma.review.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select
    }) as unknown as Review[]
  }

  /**
   * Create a new Review in the `reviews` table
   *
   * @param data The Review to be created
   */
  public async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.$prisma.review.create({
      data
    });
  }

  /**
   * Updates a Review in the `reviews` table
   *
   * @param params Updated Review data
   */
  public async update(params: {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.ReviewUpdateInput;
  }): Promise<Review> {
    const { where, data } = params;
    return this.$prisma.review.update({
      data,
      where
    });
  }

  /**
   * Removes a Review entry from the `reviews` table
   *
   * @param where The unique identifier(s) of the Review to be removed
   */
  public async delete(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.$prisma.review.delete({
      where
    });
  }
}

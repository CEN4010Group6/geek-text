import { Injectable } from '@nestjs/common';
import { Prisma, Review as ReviewModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { Review } from './dto/review';

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

    const dbReview = await this.$prisma.review.findUnique({where, select}) as ReviewModel | null;

    let review;

    if(dbReview) {
      review = new Review(dbReview);
    }

    return review;
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

    let reviews = await this.$prisma.review.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select
    }) as ReviewModel[] | Review[];

    for(const review in reviews) {
      reviews[review] = new Review(reviews[review]);
    }

    return reviews;
  }

  /**
   * Create a new Review in the `reviews` table
   *
   * @param data The Review to be created
   */
  public async create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.$prisma.review.create({ data });
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
    return this.$prisma.review.update({ data, where });
  }

  /**
   * Removes a Review entry from the `reviews` table
   *
   * @param where The unique identifier(s) of the Review to be removed
   */
  public async delete(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.$prisma.review.delete({ where });
  }
}

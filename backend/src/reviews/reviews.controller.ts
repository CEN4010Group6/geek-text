import { UtilityService } from './../utility/utility.service';
import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Review, Prisma } from '@prisma/client';

import { Public } from '../public.decorator';
import { Roles, Role } from '../roles.decorator';

import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  /**
   * Reviews controller constructor
   *
   * @param $reviewsService The database connection to the `reviews` table
   */
  constructor(
    private readonly $utilityService: UtilityService,
    private readonly $reviewsService: ReviewsService
  ) {}

  /**
   * GET request to find all records in the `reviews` table
   *
   * @param query Query parametesto alter the `WHERE` SQL clause
   */
  @Get()
  @Header('Cache-Control', 'max-age=0; s-max-age=3600, proxy-revalidate')
  @Public()
  public async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.ReviewWhereUniqueInput,
    @Query('where') where?: Prisma.ReviewWhereInput,
    @Query('orderBy') orderBy?: Prisma.ReviewOrderByInput,
    @Query('select') select?: Prisma.ReviewSelect
  ): Promise<Review[]> {
    if(cursor) cursor = await this.$utilityService.convertBtoO(cursor as string);
    if(where) where = await this.$utilityService.convertBtoO(where as string);
    if(orderBy) orderBy = await this.$utilityService.convertBtoO(orderBy as string);
    if(select) select = await this.$utilityService.convertBtoO(select as string);

    const query = { skip, take, cursor, where, orderBy, select };

    return this.$reviewsService.findAll(query);
  }

  /**
   * GET request to find a book by a string UUID
   *
   * @param id The UUID of the requested Review
   */
  @Get(':id')
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  @Public()
  public async findOne(
    @Param('id') id: string,
    @Query('select') select?: Prisma.ReviewSelect
  ): Promise<Review | null> {
    if(select) select = await this.$utilityService.convertBtoO(select as string);
    const query = { where: { id: id }, select };
    return this.$reviewsService.findOne(query);
  }

  /**
   * POST request to create a new Review in the `reviews` table
   *
   * @param postData The Review data to be created
   */
  @Post('')
  @Roles(Role.User)
  public async create(
    @Body() postData: Prisma.ReviewCreateInput
  ): Promise<Review> {
    return this.$reviewsService.create(postData);
  }

  /**
   * PUT request to update a Review in the `reviews` table
   *
   * @param id The UUID of the Review to be updated
   * @param postData The updated information of the Review
   */
  @Put(':id')
  @Roles(Role.User)
  public async update(
    @Param('id') id: string,
    @Body() postData: Prisma.ReviewCreateInput
  ): Promise<Review> {
    return this.$reviewsService.update({
      where: { id: id } as Prisma.BookWhereUniqueInput,
      data: postData
    });
  }

  /**
   * DELETE request to remove a Review from the `reviews` table
   *
   * @param id The UUID of the Review to be removed
   */
  @Delete(':id')
  @Roles(Role.User)
  public async delete(@Param('id') id: string): Promise<Review> {
    return this.$reviewsService.delete({id: id} as Prisma.ReviewWhereUniqueInput);
  }
}

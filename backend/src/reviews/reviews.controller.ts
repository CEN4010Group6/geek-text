import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Resource } from '../interface/resource.interface';
import { UtilityService } from '../utility/utility.service';
import { Public } from '../public.decorator';
import { ParseIntPipe } from '../parse-int.pipe';
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';
import { PoliciesGuard } from '../auth/policies.guard';
import { CheckPolicies } from '../auth/check-policies.decorator';
import { AppAbility, Action } from '../auth/casl-ability.factory';

import { ReviewsService } from './reviews.service';
import { Review } from './dto/review';

@Controller('reviews')
export class ReviewsController implements Resource {
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
  @Public()
  public async findAll(
    @Query('skip',ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('cursor', ParseFrontendBtoaPipe) cursor?: Prisma.ReviewWhereUniqueInput,
    @Query('where', ParseFrontendBtoaPipe) where?: Prisma.ReviewWhereInput,
    @Query('orderBy', ParseFrontendBtoaPipe) orderBy?: Prisma.ReviewOrderByInput,
    @Query('select',ParseFrontendBtoaPipe) select?: Prisma.ReviewSelect
  ): Promise<Review[]> {
    const query = { skip, take, cursor, where, orderBy, select };
    return this.$reviewsService.findAll(query);
  }

  /**
   * GET request to find a book by a string UUID
   *
   * @param id The UUID of the requested Review
   */
  @Get(':id')
  @Public()
  public async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('select', new ParseFrontendBtoaPipe()) select?: Prisma.ReviewSelect
  ): Promise<Review | null> {
    const query = { where: { id: id }, select };
    return this.$reviewsService.findOne(query);
  }

  /**
   * POST request to create a new Review in the `reviews` table
   *
   * @param postData The Review data to be created
   */
  @Post('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Review))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Review))
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Review))
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Review> {
    return this.$reviewsService.delete({id: id} as Prisma.ReviewWhereUniqueInput);
  }
}

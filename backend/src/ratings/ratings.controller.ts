import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Rating, Prisma } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles, Role } from '../roles.decorator';

import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  /**
   * Ratings controller constructor
   *
   * @param $ratingsService The database connection to the `ratings` table
   */
  constructor(
    private readonly $ratingsService: RatingsService
  ) {}

  /**
   * GET request to find all records in the `ratings` table
   *
   * @param query Query parametesto alter the `WHERE` SQL clause
   */
  @Get()
  @Header('Cache-Control', 'max-age=0; s-max-age=3600, proxy-revalidate')
  public async findAll(@Query() query: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RatingWhereUniqueInput;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByInput;
  }): Promise<Rating[]> {
    return this.$ratingsService.findAll(query);
  }

  /**
   * GET request to find a book by a string UUID
   *
   * @param id The UUID of the requested Rating
   */
  @Get(':id')
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  public async findOne(@Param('id') id: string): Promise<Rating | null> {
    return this.$ratingsService.findOne({id: id} as Prisma.BookWhereUniqueInput);
  }

  /**
   * POST request to create a new Rating in the `ratings` table
   *
   * @param postData The Rating data to be created
   */
  @Post('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  public async create(
    @Body() postData: Prisma.RatingCreateInput
  ): Promise<Rating> {
    return this.$ratingsService.create(postData);
  }

  /**
   * PUT request to update a Rating in the `ratings` table
   *
   * @param id The UUID of the Rating to be updated
   * @param postData The updated information of the Rating
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  public async update(
    @Param('id') id: string,
    @Body() postData: Prisma.RatingCreateInput
  ): Promise<Rating> {
    return this.$ratingsService.update({
      where: { id: id } as Prisma.BookWhereUniqueInput,
      data: postData
    });
  }

  /**
   * DELETE request to remove a Rating from the `ratings` table
   *
   * @param id The UUID of the Rating to be removed
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  public async delete(@Param('id') id: string): Promise<Rating> {
    return this.$ratingsService.delete({id: id} as Prisma.RatingWhereUniqueInput);
  }
}

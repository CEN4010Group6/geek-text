import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Genre, Prisma } from '@prisma/client';

import { UtilityService } from '../utility/utility.service';
import { Roles, Role } from '../roles.decorator';

import { GenresService } from './genres.service';
import { Public } from '../public.decorator';

@Controller('genres')
export class GenresController {
    /**
   * Genres controller constructor
   *
   * @param $genresService
   * @param $utilityService
   */
  constructor(
    private readonly $genresService: GenresService,
    private readonly $utilityService: UtilityService
  ) {}

  /**
   * GET request to all records in the `genres` table.
   *
   * @param skip
   * @param take
   * @param cursor
   * @param where
   * @param orderBy
   * @param select
   * @param include
   */
  @Get()
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  @Public()
  public async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.GenreWhereUniqueInput,
    @Query('where') where?: Prisma.GenreWhereInput,
    @Query('orderBy') orderBy?: Prisma.GenreOrderByInput,
    @Query('select') select?: Prisma.GenreSelect,
    @Query('include') include?: Prisma.GenreInclude
  ): Promise<Genre[]> {
    if(select) {
      select = await this.$utilityService.convertBtoO(select as string);
    }
    if(include) {
      include = await this.$utilityService.convertBtoO(include as string);
    }
    if(cursor) cursor = await this.$utilityService.convertBtoO(cursor as string);
    if(where) where = await this.$utilityService.convertBtoO(where as string);
    if(orderBy) orderBy = await this.$utilityService.convertBtoO(orderBy as string);
    const query = { skip, take, cursor, where, orderBy, select, include };
    return this.$genresService.findAll(query);
  }

  /**
   * GET request to find a Genre by an id
   *
   * @param id Id of the Genre to be found
   * @param include
   */
  @Get(':id')
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  @Public()
  public async findOne(
    @Param('id') id: number,
    @Query('select') select: Prisma.GenreSelect,
    @Query('include') include: Prisma.GenreInclude
  ): Promise<Genre | null> {
    if(include) {
      include = await this.$utilityService.convertBtoO(include as string);
    }
    if(select) select = await this.$utilityService.convertBtoO(select as string);
    const query = { where: { id: id }, include };
    return this.$genresService.findOne(query);
  }

  /**
   * POST request to create a new Genre in the `genres` table
   *
   * @param postData The Genre to be created
   */
  @Post('')
  @Roles(Role.Admin)
  public async create(
    @Body() postData: Prisma.GenreCreateInput
  ): Promise<Genre> {
    return this.$genresService.create(postData);
  }

  /**
   * PUT request to update a Genre in the `genres` table
   *
   * @param id The Id of the Genre to be updated
   * @param postData The updated information of the Genre
   */
  @Put(':id')
  @Roles(Role.Admin)
  public async update(
    @Param('id') id: number,
    @Body() postData: Genre
  ): Promise<Genre> {
    return this.$genresService.update({
      where: { id: id } as Prisma.GenreWhereUniqueInput,
      data: postData
    });
  }

  /**
   * DELETE request to remove a Genre from the `genres` table
   *
   * @param id The UUID of the Genre to be removed
   */
  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id') id: number): Promise<Genre> {
    return this.$genresService.delete({ id: id } as Prisma.GenreWhereUniqueInput)
  }
}

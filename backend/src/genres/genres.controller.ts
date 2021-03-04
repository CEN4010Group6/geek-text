import { Body, Controller, Delete, Get, Header, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UtilityService } from '../utility/utility.service';
import { Roles, Role } from '../roles.decorator';

import { GenresService } from './genres.service';
import { Public } from '../public.decorator';
import { Genre, CreateGenre, UpdateGenre } from './dto/genre'
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';

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
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('cursor', ParseFrontendBtoaPipe) cursor?: Prisma.GenreWhereUniqueInput,
    @Query('where', ParseFrontendBtoaPipe) where?: Prisma.GenreWhereInput,
    @Query('orderBy', ParseFrontendBtoaPipe) orderBy?: Prisma.GenreOrderByInput,
    @Query('select', ParseFrontendBtoaPipe) select?: Prisma.GenreSelect
  ): Promise<Genre[]> {
    const query = { skip, take, cursor, where, orderBy, select };
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
    @Query('select', ParseFrontendBtoaPipe) select?: Prisma.GenreSelect
  ): Promise<Genre | null> {
    const query = { where: { id: id }, select };
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
    @Body() postData: CreateGenre
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
    @Param('id', ParseIntPipe) id: number,
    @Body() postData: UpdateGenre
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
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<Genre> {
    return this.$genresService.delete({ id: id } as Prisma.GenreWhereUniqueInput)
  }
}

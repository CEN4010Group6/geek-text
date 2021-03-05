import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Resource } from '../interface/resource.interface';
import { UtilityService } from '../utility/utility.service';
import { Public } from '../public.decorator';
import { ParseIntPipe } from '../parse-int.pipe';
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';
import { PoliciesGuard } from '../auth/policies.guard';
import { CheckPolicies } from '../auth/check-policies.decorator';
import { AppAbility, Action } from '../auth/casl-ability.factory';

import { GenresService } from './genres.service';
import { Genre, CreateGenre, UpdateGenre } from './dto/genre'

@Controller('genres')
export class GenresController implements Resource {
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Genre))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Genre))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Genre))
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<Genre> {
    return this.$genresService.delete({ id: id } as Prisma.GenreWhereUniqueInput)
  }
}

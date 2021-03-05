import { Body, Controller, Delete, Get, Header, Optional, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Resource } from '../interface/resource.interface'
import { UtilityService } from '../utility/utility.service';
import { Public } from '../public.decorator';
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';
import { ParseIntPipe } from '../parse-int.pipe';
import { PoliciesGuard } from '../auth/policies.guard';
import { CheckPolicies } from '../auth/check-policies.decorator';
import { AppAbility, Action } from '../auth/casl-ability.factory';

import { AuthorsService } from './authors.service';
import { Author, CreateAuthor, UpdateAuthor } from './dto/author';

@Controller('authors')
export class AuthorsController implements Resource {
  /**
   * Authors controller constructor
   *
   * @param $authorsService
   * @param $utilityService
   */
  constructor(
    private readonly $authorsService: AuthorsService,
    private readonly $utilityService: UtilityService
  ) {}

  /**
   * GET request to find all records in the `authors` table.
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
    @Query('cursor', ParseFrontendBtoaPipe) cursor?: Prisma.AuthorWhereUniqueInput,
    @Query('where', ParseFrontendBtoaPipe)where?: Prisma.AuthorWhereInput,
    @Query('orderBy', ParseFrontendBtoaPipe) orderBy?: Prisma.AuthorOrderByInput,
    @Query('select', ParseFrontendBtoaPipe) select?: Prisma.AuthorSelect,
  ): Promise<Author[]> {
    const query = { skip, take, cursor, where, orderBy, select };
    return this.$authorsService.findAll(query);
  }

  /**
   * Get request to find a User by a string UUID
   *
   * @param id The UUID of the requested User
   * @param select
   * @param include
   */
  @Get(':id')
  @Public()
  public async findOne(
    @Param('id') id: string,
    @Query('select', ParseFrontendBtoaPipe) select?: Prisma.AuthorSelect,
  ): Promise<Author | null> {
    const query = { where: { id: id }, select };
    return this.$authorsService.findOne(query);
  }

  /**
   * POST request to update an Author in the `authors` table
   *
   * @param postData The Author data to be created
   */
  @Post('')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Author))
  public async create(
    @Body() postData: CreateAuthor
  ): Promise<Author> {
    return this.$authorsService.create(postData);
  }

  /**
   * PUT request to update an Author in the `authors` table
   *
   * @param id The UUID of the Author to be updated
   * @param postData The updated information of the Author
   */
  @Put(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Author))
  public async update(
    @Param('id') id: string,
    @Body() postData: UpdateAuthor
  ): Promise<Author> {
    return this.$authorsService.update({
      where: { id: id } as Prisma.AuthorWhereUniqueInput,
      data: postData
    });
  }

  /**
   * DELETE request to remove an Author from the `authors` table
   *
   * @param id The UUID of the Author to be removed
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Author))
  public async delete(@Param('id') id: string): Promise<Author> {
    return this.$authorsService.delete({ id: id } as Prisma.AuthorWhereUniqueInput)
  }
}

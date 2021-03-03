import { Body, Controller, Delete, Get, Header, Optional, Param, Post, Put, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UtilityService } from '../utility/utility.service';
import { Roles, Role } from './../roles.decorator';
import { Public } from '../public.decorator';
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';
import { ParseIntPipe } from '../parse-int.pipe';

import { AuthorsService } from './authors.service';
import { Author, CreateAuthor, UpdateAuthor } from './dto/author';

@Controller('authors')
export class AuthorsController {
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
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  @Roles(Role.Admin)
  public async findAll(
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('cursor', new ParseFrontendBtoaPipe()) cursor?: Prisma.AuthorWhereUniqueInput,
    @Query('where', new ParseFrontendBtoaPipe()) where?: Prisma.AuthorWhereInput,
    @Query('orderBy', new ParseFrontendBtoaPipe()) orderBy?: Prisma.AuthorOrderByInput,
    @Query('select', new ParseFrontendBtoaPipe()) select?: Prisma.AuthorSelect,
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
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  @Public()
  public async findOne(
    @Param('id') id: string,
    @Query('select', ParseFrontendBtoaPipe) select?: Prisma.AuthorSelect,
  ): Promise<Author | null> {
    // if(select) {
    //   select = await this.$utilityService.convertBtoO(select as string);
    // }
    const query = { where: { id: id }, select };
    return this.$authorsService.findOne(query);
  }

  /**
   * POST request to update an Author in the `authors` table
   *
   * @param postData The Author data to be created
   */
  @Post('')
  @Roles(Role.Admin)
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
  @Roles(Role.Admin)
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
  @Roles(Role.Admin)
  public async delete(@Param('id') id: string): Promise<Author> {
    return this.$authorsService.delete({ id: id } as Prisma.AuthorWhereUniqueInput)
  }
}

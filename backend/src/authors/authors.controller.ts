import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Author, Prisma } from '@prisma/client';

import { UtilityService } from '../utility/utility.service';
import { Roles, Role } from './../roles.decorator';

import { AuthorsService } from './authors.service';
import { Public } from '../public.decorator';
import { observable } from 'rxjs';

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
  @Public()
  public async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.AuthorWhereUniqueInput,
    @Query('where') where?: Prisma.AuthorWhereInput,
    @Query('orderBy') orderBy?: Prisma.AuthorOrderByInput,
    @Query('select') select?: Prisma.AuthorSelect,
    @Query('include') include?: Prisma.AuthorInclude
  ): Promise<Author[]> {
    if(select) {
      select = await this.$utilityService.convertBtoO(select as string);
    }
    if(include) {
      include = await this.$utilityService.convertBtoO(include as string);
    }
    if(cursor) {
      cursor = await this.$utilityService.convertBtoO(cursor as string);
    }
    if(where) {
      where = await this.$utilityService.convertBtoO(where as string);
    }
    if(orderBy) {
      orderBy = await this.$utilityService.convertBtoO(orderBy as string);
    }
    const query = { skip, take, cursor, where, orderBy, select, include };
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
    @Query('select') select: Prisma.BookSelect,
    @Query('include') include: Prisma.AuthorInclude
  ): Promise<Author | null> {
    if(include) {
      include = await this.$utilityService.convertBtoO(include as string);
    }
    if(select) {
      select = await this.$utilityService.convertBtoO(select as string);
    }
    const query = { where: { id: id }, include };
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
    @Body() postData: Prisma.AuthorCreateInput
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
    @Body() postData: Author
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

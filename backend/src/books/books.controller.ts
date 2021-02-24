import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';

import { UtilityService } from '../utility/utility.service';
import { Roles, Role } from '../roles.decorator';

import { BooksService } from './books.service';
import { Public } from '../public.decorator';

@Controller('books')
export class BooksController {
  /**
   * Books controller constructor
   *
   * @param $booksService The database connection to the `books` table
   * @param $utilityService The application utility service
   */
  constructor(
    private readonly $booksService: BooksService,
    private readonly $utilityService: UtilityService
  ) {}

  /**
   * GET request to find all records in the `books` table.
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
    @Query('cursor') cursor?: Prisma.BookWhereUniqueInput,
    @Query('where') where?: Prisma.BookWhereInput,
    @Query('orderBy') orderBy?: Prisma.BookOrderByInput,
    @Query('select') select?: Prisma.BookSelect,
    @Query('include') include?: Prisma.BookInclude
  ): Promise<Book[]> {
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
    return this.$booksService.findAll(query);
  }

  /**
   * GET request to find a Book by a string UUID
   *
   * @param id
   * @param select
   * @param include
   */
  @Get(':id')
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  @Public()
  public async findOne(
    @Param('id') id: string,
    @Query('select') select: Prisma.BookSelect,
    @Query('include') include: Prisma.BookInclude
  ): Promise<Book | null> {
    if(select) {
      select = await this.$utilityService.convertBtoO(select as string);
    }
    if(include) {
      include = await this.$utilityService.convertBtoO(include as string);
    }
    const query = { where: { id: id }, select, include };
    return this.$booksService.findOne(query);
  }

  /**
   * POST request to create a new Book in the `books` table
   *
   * @param postData The Book data to be created
   */
  @Post('')
  @Roles(Role.Admin)
  public async create(
    @Body() postData: Prisma.BookCreateInput
  ): Promise<Book> {
    return this.$booksService.create(postData);
  }

  /**
   * PUT request to update a Book in the `books` table
   *
   * @param id The UUID of the Book to be updated
   * @param bookData The updated information of the Book
   */
  @Put(':id')
  @Roles(Role.Admin)
  public async update(
    @Param('id') id: string,
    @Body() postData: Book
  ): Promise<Book> {
    return this.$booksService.update({
      where: { id: id } as Prisma.BookWhereUniqueInput,
      data: postData
    });
  }

  /**
   * DELETE request to remove a Book from the `books` table
   *
   * @param id The UUID of the Book to be removed
   */
  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id') id: string): Promise<Book> {
    return this.$booksService.delete({id: id} as Prisma.BookWhereUniqueInput);
  }
}

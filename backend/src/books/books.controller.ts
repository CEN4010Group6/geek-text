import { Body, Controller, Delete, Get, Header, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';

import { UtilityService } from '../utility/utility.service';
import { Roles, Role } from '../roles.decorator';
import { Public } from '../public.decorator';
import { ParseIntPipe } from '../parse-int.pipe';

import { BooksService } from './books.service';
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';

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
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('cursor', new ParseFrontendBtoaPipe()) cursor?: Prisma.BookWhereUniqueInput,
    @Query('where', new ParseFrontendBtoaPipe()) where?: Prisma.BookWhereInput,
    @Query('orderBy', new ParseFrontendBtoaPipe()) orderBy?: Prisma.BookOrderByInput,
    @Query('select', new ParseFrontendBtoaPipe()) select?: Prisma.BookSelect
  ): Promise<Book[]> {
    const query = { skip, take, cursor, where, orderBy, select };
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
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('select', ParseFrontendBtoaPipe) select?: Prisma.BookSelect,
  ): Promise<Book | null> {
    const query = { where: { id: id }, select };
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
    @Param('id', new ParseUUIDPipe()) id: string,
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
  public async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<Book> {
    return this.$booksService.delete({id: id} as Prisma.BookWhereUniqueInput);
  }
}

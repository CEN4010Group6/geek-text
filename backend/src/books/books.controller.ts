import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UtilityService } from '../utility/utility.service';

import { BooksService } from './books.service';

@ApiTags('books')
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
   * @param query Query parameters to alter the `WHERE` SQL clause
   */
  @Get()
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
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
      select = this.$utilityService.convertBtoO(select as string);
    }
    if(include) {
      include = this.$utilityService.convertBtoO(include as string);
    }
    const query = { skip, take, cursor, where, orderBy, select, include };
    return this.$booksService.findAll(query);
  }

  /**
   * GET request to find a book by a string UUID
   *
   * @param id The UUID of the requested Book
   */
  @Get(':id')
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  public async findOne(
    @Param('id') id: string,
    @Query('select') select: Prisma.BookSelect,
    @Query('include') include: Prisma.BookInclude
  ): Promise<Book | null> {
    if(select) {
      select = this.$utilityService.convertBtoO(select as string);
    }
    if(include) {
      include = this.$utilityService.convertBtoO(include as string);
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
  public async delete(@Param('id') id: string): Promise<Book> {
    return this.$booksService.delete({id: id} as Prisma.BookWhereUniqueInput);
  }
}

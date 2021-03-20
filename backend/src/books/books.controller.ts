import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Resource } from '../interface/resource.interface'
import { UtilityService } from '../utility/utility.service';
import { Public } from '../public.decorator';
import { ParseIntPipe } from '../parse-int.pipe';
import { ParseFrontendBtoaPipe } from '../parse-frontend-btoa.pipe';
import { AppAbility, Action } from '../auth/casl-ability.factory';
import { PoliciesGuard } from '../auth/policies.guard';
import { CheckPolicies } from '../auth/check-policies.decorator';

import { BooksService } from './books.service';
import { Book } from './dto/book';

@Controller('books')
export class BooksController implements Resource {
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
  @Public()
  public async findAll(
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('cursor', new ParseFrontendBtoaPipe()) cursor?: Prisma.BookWhereUniqueInput,
    @Query('where', new ParseFrontendBtoaPipe()) where?: Prisma.BookWhereInput,
    @Query('orderBy', new ParseFrontendBtoaPipe()) orderBy?: Prisma.BookOrderByInput,
    @Query('select', new ParseFrontendBtoaPipe()) select?: Prisma.BookSelect
  ): Promise<{ books: Book[], count: number}> {
    const query = { skip, take, cursor, where, orderBy, select };
    const books = await this.$booksService.findAll(query);
    const count = await this.$booksService.count({ skip, cursor, where, orderBy });
    return {
      books,
      count
    }
  }

  /**
   * GET request to find a Book by a string UUID
   *
   * @param id
   * @param select
   * @param include
   */
  @Get(':id')
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Book))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Book))
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Book))
  public async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<Book> {
    return this.$booksService.delete({id: id} as Prisma.BookWhereUniqueInput);
  }
}

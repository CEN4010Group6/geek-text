import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';

import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  /**
   * Books controller constructor
   *
   * @param $booksService The database connection to the `books` table
   */
  constructor(private readonly $booksService: BooksService) {}

  /**
   * GET request to find all records in the `books` table.
   *
   * @param query Query parameters to alter the `WHERE` SQL clause
   */
  @Get()
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  public async findAll(@Query() query: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByInput;
  }): Promise<Book[]> {
    return this.$booksService.findAll(query);
  }

  /**
   * GET request to find a book by a string UUID
   *
   * @param id The UUID of the requested Book
   */
  @Get(':id')
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  public async findOne(@Param('id') id: string): Promise<Book | null> {
    return this.$booksService.findOne({id: id} as Prisma.BookWhereUniqueInput);
  }

  /**
   * POST request to create a new Book in the `books` table
   *
   * @param postData The book data to be created
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
   * @param id The UUID of the book to be updated
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

  /**
   * Find a book or books by the author's first, middle, and/or last name.
   *
   * @param firstName
   * @param lastName
   * @param middleName
   */
  @Get('by-author')
  public async findByAuthor(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('middleName') middleName: string
  ): Promise<Book[]> {
    return this.$booksService.findAll({
      select: {
        author: {
          where: {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName
          }
        }
      }
    })
  }
}

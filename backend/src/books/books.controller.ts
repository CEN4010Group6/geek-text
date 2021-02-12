import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';

import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  /**
   * BooksController constructor
   * @param $booksService The database connection to the `books` table
   */
  constructor(private readonly $booksService: BooksService) {}

  /**
   * GET request to find all records in the `books` table.
   * Routed to '/books'
   *
   * @param query Query parameters to alter the `WHERE` SQL clause
   */
  @Get()
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  async findAll(@Query() query: {
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
   * Routed to '/books/:id'
   *
   * @param id The UUID of the requested book
   */
  @Get(':id')
  @Header('Cache-Control', 'max-age=0, s-max-age=3600, proxy-revalidate')
  async findOne(@Param('id') id: string): Promise<Book | null> {
    return this.$booksService.findOne({id: id} as Prisma.BookWhereUniqueInput);
  }

  /**
   * POST request to create a new Book in the `books` table
   * Routed to '/books'
   *
   * @param postData The book data to be created
   */
  @Post('')
  async create(
    @Body() postData: Prisma.BookCreateInput
  ): Promise<Book> {
    return this.$booksService.createBook(postData);
  }

  /**
   * PUT request to update a Book in the `books` table
   * Routed to '/books/:id'
   *
   * @param id The UUID of the book to be updated
   * @param bookData The updated information of the Book
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bookData: Book
  ): Promise<Book> {
    return this.$booksService.updateBook({
      where: { id: id } as Prisma.BookWhereUniqueInput,
      data: bookData
    });
  }

  /**
   * DELETE request to remove a Book from the `books` table
   * Routed to '/books/:id'
   *
   * @param id The UUID of the Book to be removed
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Book> {
    return this.$booksService.deleteBook({id: id} as Prisma.BookWhereUniqueInput);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
<<<<<<< HEAD
import { Book, Prisma } from '@prisma/client';
=======
import { Book as BookModel } from '@prisma/client';
>>>>>>> d04a58a89f7345ed48b785b7564759d0532cebba

import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
<<<<<<< HEAD
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
=======
  constructor(private readonly $booksService: BooksService) {}

  @Get()
  async findAll(@Query() query: any): Promise<BookModel[]> {
    return this.$booksService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookModel | null> {
    return this.$booksService.findOne({
      book_id: id
    });
  }

  @Post('')
  async create(
    @Body() postData: {
      title: string;
      description: string;
      price: number;
      cover_url: string;
      publisher: any; // @TODO: Proper data type
    }
  ): Promise<BookModel> {
    const { title, description, price, cover_url, publisher } = postData;
    return this.$booksService.createBook({
      title,
      description,
      price,
      cover_url,
      publisher,
      rating: 0
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bookData: BookModel
  ): Promise<BookModel> {
    return this.$booksService.updateBook({
      where: { book_id: id },
>>>>>>> d04a58a89f7345ed48b785b7564759d0532cebba
      data: bookData
    });
  }

<<<<<<< HEAD
  /**
   * DELETE request to remove a Book from the `books` table
   * Routed to '/books/:id'
   *
   * @param id The UUID of the Book to be removed
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Book> {
    return this.$booksService.deleteBook({id: id} as Prisma.BookWhereUniqueInput);
=======
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BookModel> {
    return this.$booksService.deleteBook({
      book_id: id
    });
>>>>>>> d04a58a89f7345ed48b785b7564759d0532cebba
  }
}

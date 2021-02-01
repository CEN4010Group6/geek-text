import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Book as BookModel } from '@prisma/client';

import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
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
      data: bookData
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BookModel> {
    return this.$booksService.deleteBook({
      book_id: id
    });
  }
}

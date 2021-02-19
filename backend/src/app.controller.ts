import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as pkg from '../package.json';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

class BrowserError implements Error {
  @ApiProperty()
  name: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  createdAt: Date;
}

@Controller('')
export class AppController {
  constructor(
    private readonly $prismaService: PrismaService
  ) {}

  /**
   * Root GET method. Returns basic information about the API
   */
  @Get()
  public async getRoot(): Promise<Object> {
    const authors = [ pkg.author, ...pkg.contributors ];
    return {
      apiVersion: pkg.version,
      authors: authors,
      license: pkg.license,
      homepage: pkg.homepage
    }
  }

  /**
   * POST method for adding logging infomation to the database.
   * @param messageBody
   */
  @Post('logs')
  @ApiBody({ type: BrowserError })
  public async logError(@Body() messageBody: BrowserError) {
    console.log(messageBody);
  }
}

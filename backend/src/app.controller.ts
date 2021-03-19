import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as pkg from '../package.json';
import { Public } from './public.decorator';

export class BrowserError implements Error {
  name: string;
  message: string;
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
  @Public()
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
   * POST method for adding logging information to the database.
   * @param messageBody
   */
  @Post('logs')
  @Public()
  public async logError(@Body() messageBody: BrowserError) {
    this.$prismaService.log.create({
      data: {
        name: messageBody.name,
        message: messageBody.message,
        createdAt: messageBody.createdAt
      }
    });
  }
}

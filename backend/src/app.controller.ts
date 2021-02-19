import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as pkg from '../package.json';

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
  public async logError(@Body() messageBody: Error) {
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import * as pkg from '../package.json';

@Controller('')
export class AppController {
  constructor(
    private readonly $appService: AppService,
    private readonly $prisma: PrismaService
  ) {}

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

  @Post('logs')
  public async logError(@Body() messageBody: any) {

  }
}

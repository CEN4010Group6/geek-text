import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller('')
export class AppController {
  constructor(
    private readonly $appService: AppService,
    private readonly $prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.$appService.getHello();
  }

  @Post('logs')
  public async logError(@Body() messageBody: any) {

  }
}

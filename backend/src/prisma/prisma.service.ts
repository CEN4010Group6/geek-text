import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Prisma service constructor
   */
  constructor() {
    super();
  }

  /**
   * Initiate a database connection upon initialization of the module
   */
  public async onModuleInit() {
    await this.$connect();
  }

  /**
   * Close all active database connections upon destruction of the module
   */
  public async onModuleDestroy() {
    await this.$disconnect();
  }
}

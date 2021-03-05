import { Injectable, OnModuleInit, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {
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

  /**
   * Close all active databse connections upon application shutdown
   * @param signal
   */
  public async onApplicationShutdown(signal?: string): Promise<any> {
    await this.$disconnect();
  }
}

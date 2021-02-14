import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
/**
 *
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Auth service constructor
   *
   * @param $prisma Prisma database service
   */
  constructor(
    private $prisma: PrismaService
  ) {  }
}

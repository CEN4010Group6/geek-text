import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  /**
   * Auth controller constructor
   *
   * @param $authService The Authentication service
   */
  constructor(
    private $authService: AuthService
  ) {  }

  @Get('login')
  public async login(
    @Query('email') email,
    @Query('password') password
  ): Promise<any> {

  }

  @Get('refresh-token')
  public async refreshToken(): Promise<any> {

  }
}

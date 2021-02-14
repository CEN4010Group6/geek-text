import { Body, Controller, Delete, Get, Header, Param, Post, Put, Request, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  /**
   * Auth controller constructor
   *
   * @param $authService The Authentication service
   */
  constructor(
    private $authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<any> {
    // return this.$authService.validateUser(email, password);
    return this.$authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  public async refreshToken(): Promise<any> {

  }
}

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

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(@Request() req): Promise<any> {
    return this.$authService.login(req.user);
  }

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  public async refreshToken(): Promise<any> {

  }
}

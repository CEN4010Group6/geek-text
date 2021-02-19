import { Body, Controller, Delete, Get, Header, Param, Post, Put, Request, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  /**
   * Auth controller constructor
   *
   * @param $authService The Authentication service
   */
  constructor(
    private readonly $authService: AuthService
  ) {}

  /**
   * Logs a user in to the application using BasicAuth
   *
   * @param email The user's email
   * @param password The user's password
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<any> {
    return this.$authService.login(email, password);
  }

  /**
   * @TODO
   * Refreshes an expired but valid JWT if the expiration occurs within a set time period.
   */
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  public async refreshToken(): Promise<any> {

  }
}

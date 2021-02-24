import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

import 'dotenv/config';

describe('AuthController', () => {
  let controller: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        UsersModule,
        JwtModule.registerAsync({
          imports: [ ConfigModule ],
          inject: [ ConfigService ],
          useFactory: async (configService: ConfigService) => {
            return {
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: {
                expiresIn: '7200s'
              }
            }
          }
        })
      ],
      controllers: [ AuthController ],
      providers: [
        PrismaService,
        AuthService
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

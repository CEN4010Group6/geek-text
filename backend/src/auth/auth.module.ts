import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async ($configService: ConfigService) => ({
        secret: $configService.get<string>('JWT_STRING'),
        signOptions: {
          expiresIn: '7200s'
        }
      })
    })
  ],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    LocalStrategy
  ],
  controllers: [ AuthController ],
  exports: [ AuthService ]
})
export class AuthModule {}

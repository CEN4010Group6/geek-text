import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      session: false
    }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async ($configService: ConfigService) => ({
        secret: $configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '7200s'
        }
      })
    }),
    UsersModule
  ],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CaslAbilityFactory
  ],
  controllers: [ AuthController ],
  exports: [ AuthService, JwtModule, CaslAbilityFactory ]
})
export class AuthModule {}

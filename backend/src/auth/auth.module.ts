import { Module } from '@nestjs/common';
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
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7200s' }
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

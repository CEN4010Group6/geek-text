import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';

describe('AuthController', () => {
  let controller: AuthController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
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

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a method `login`', () => {
    expect(controller.login).toBeDefined()
  });

  it('should login a user when the login method is called', async () => {
    const request = {
      user: {
        email: 'john.doe@gmail.com',
        password: 'IAmAPassword'
      }
    };

    const accessToken = await controller.login(request);

    await expect(accessToken).toBeDefined();
    await expect(accessToken).toHaveProperty('accessToken');
    await expect(accessToken.accessToken).toBeDefined()
    await expect(accessToken.accessToken.length).toBeGreaterThan(0)
  });

  it('should have a method `refreshToken`', () => {
    expect(controller.refreshToken).toBeDefined();
  });
});

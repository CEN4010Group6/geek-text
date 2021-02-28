import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;
  let database: PrismaService;

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
      providers: [
        AuthService,
        PrismaService,
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    database = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await database.$disconnect();
    await module.close();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user', async () => {
    expect.assertions(3);
    await expect(service.validateUser).toBeDefined();

    const user = await service.validateUser('john.doe@gmail.com', 'IAmAPassword');

    await expect(user).toBeDefined();
    await expect(user?.email).toBe('john.doe@gmail.com');
  });

  it('should not validate an invalid user', async () => {
    expect.assertions(2);
    await expect(service.validateUser).toBeDefined()

    const user = await service.validateUser('john.doe@gmail.com', 'invalid password');

    await expect(user).toBeNull();
  });
});

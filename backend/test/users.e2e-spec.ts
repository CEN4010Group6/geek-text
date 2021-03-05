import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import * as pkg from '../package.json';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let db: PrismaService;

  let jwt: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ AppModule ],
      providers: [ PrismaService ]
    }).compile();

    app = module.createNestApplication();

    db = app.get<PrismaService>(PrismaService);
    await app.init();

    let res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'john.doe@gmail.com',
        password: 'IAmAPassword'
      })
      .expect('Content-Type', /json/)
      .expect(200);

    jwt = res.body.accessToken;
  });

  afterAll(async () => {
    await db.$disconnect();
    await app.close();
    await module.close();
  });

  it('/ (GET)', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + jwt)
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

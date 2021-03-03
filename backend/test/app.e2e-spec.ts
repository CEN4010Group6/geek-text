import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import * as pkg from '../package.json';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let db: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ AppModule ],
      providers: [ PrismaService ]
    }).compile();

    app = module.createNestApplication();

    db = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await db.$disconnect();
    await app.close();
    await module.close();
  });

  it('/ (GET)', async () => {
    const authors = [ pkg.author, ...pkg.contributors ];
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        apiVersion: pkg.version,
        authors: authors,
        license: pkg.license,
        homepage: pkg.homepage
      });
  });
});

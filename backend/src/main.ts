import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import pkg from '../package.json';
import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
  if(!process.env.DATABASE_URL) {
    throw new Error('Environment variable `DATABASE_URL` is not defined.');
  }

  if(!process.env.JWT_SECRET) {
    throw new Error('Environment variable `JWT_SECRET` is not defined.');
  }

  if(!process.env.SECRET_KEY) {
    throw new Error('Environment variable `SECRET_KEY` is not defined.');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn']
  });

  app.setGlobalPrefix('api')
  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('GeekText Backend')
    .setDescription('The backend RESTful API for the GeekText website')
    .setVersion(pkg.version)
    .addTag('auth')
    .addTag('authors')
    .addTag('books')
    .addTag('genres')
    .addTag('ratings')
    .addTag('users')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/reference', app, document);

  await app.listen(3000);
}

bootstrap()
  .catch(console.error);

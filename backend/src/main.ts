import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  if(!process.env.DATABASE_URL) {
    throw new Error('Environment variable `DATABASE_URL` is not defined.');
  }

  if(!process.env.JWT_SECRET) {
    throw new Error('Environment variable `JWT_SECRET` is not defined.');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn']
  });

  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap()
  .catch(console.error);

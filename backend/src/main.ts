import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: (process.env.NODE_ENV === 'production') ?['error', 'warn'] : ['log', 'error', 'warn']
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let module: AppModule | null;

  beforeAll(async () => {
    module = new AppModule();
  });

  afterAll(async () => {
    module = null;
  });

  it('it should be defined', async () => {
    expect(module).toBeDefined();
  });
})

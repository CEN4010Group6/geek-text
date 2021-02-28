import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let module: AppModule;

  beforeAll(async () => {
    module = new AppModule();
  })

  it('it should be defined', async () => {
    expect(module).toBeDefined();
  });
})

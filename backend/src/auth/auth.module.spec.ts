import { AuthModuleOptions } from '@nestjs/passport';
import { AuthModule } from './auth.module';

describe('AuthController', () => {
  let module: AuthModule;

  beforeAll(async () => {
    module = new AuthModule();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});

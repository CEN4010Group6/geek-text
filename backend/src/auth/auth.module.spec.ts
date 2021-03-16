import { AuthModule } from './auth.module';

describe('AuthController', () => {
  let module: AuthModule | null;

  beforeAll(async () => {
    module = new AuthModule();
  });

  afterAll(() => {
    module = null;
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});

import { BearerTokenGuard } from './bearer-token.guard';

describe('BearerTokenGuard', () => {
  it('should be defined', () => {
    expect(new BearerTokenGuard()).toBeDefined();
  });
});

import { isDefined } from 'class-validator';
import { LocalAuth } from './local-auth';

describe('LocalAuth class', () => {
  let cls: LocalAuth;

  beforeAll(() => {
    cls = new LocalAuth()
    cls.email = "a@b.com",
    cls.password = "IAmAPassword"
  });

  it('should be properly defined', () => {
    expect(cls).toBeDefined();
    expect(cls.email).toBe('a@b.com');
    expect(cls.password).toBe('IAmAPassword');
  });
})

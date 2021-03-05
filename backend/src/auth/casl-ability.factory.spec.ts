import { CaslAbilityFactory } from './casl-ability.factory';

describe('CaslAbilityFactory', () => {
  let factory: CaslAbilityFactory;

  beforeAll(() => {
    factory = new CaslAbilityFactory();
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });
});

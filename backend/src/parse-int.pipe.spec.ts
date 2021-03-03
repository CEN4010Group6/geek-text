import { ParseIntPipe } from './parse-int.pipe';

describe('ParseIntPipe', () => {
  let pipe;

  const val = '10';

  beforeAll(() => {
    pipe = new ParseIntPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should parse an integer string to a numeric type', async () => {
    const num = await pipe.transform(val);
    expect(num).toBe(10);

    const notNum = await pipe.transform('');
    expect(notNum).not.toBeDefined();

    const notNum2 = await pipe.transform(null);
    expect(notNum).not.toBeDefined();
  });
});

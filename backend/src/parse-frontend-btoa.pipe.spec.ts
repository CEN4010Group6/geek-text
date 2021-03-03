import { ArgumentMetadata } from '@nestjs/common';
import { ParseFrontendBtoaPipe } from './parse-frontend-btoa.pipe';

describe('ParseFrontendBtoaPipe', () => {
  let pipe: ParseFrontendBtoaPipe;

  const btoaMe = 'eyJ0aXRsZSI6IlRvIEtpbGwgYSBNb2NraW5nYmlyZCJ9';

  beforeAll(() => {
    pipe = new ParseFrontendBtoaPipe();
  });

  it('should be defined', () => {
    expect(new ParseFrontendBtoaPipe()).toBeDefined();
    expect(pipe.transform).toBeDefined();
  });

  it('should parse a Base64 string to an object', async () => {
    const obj = await pipe.transform(btoaMe, {
      type: 'query',
      metatype: String
    } as ArgumentMetadata);
    expect(obj).toBeDefined();
    expect(obj.title).toBe("To Kill a Mockingbird");
  });
});

import { RateTitlePipe } from './rate-title.pipe';

describe('RateTitlePipe', () => {
   let pipe: RateTitlePipe;

  beforeAll(() => {
    pipe = new RateTitlePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly display titles', () => {
    let val = pipe.transform(1, ['Poor', 'Fair', 'Good']);
    expect(val).toEqual('Fair');

    val = pipe.transform(0);
    expect(val).toEqual(1);
  });
});

import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
  let pipe: JoinPipe;

  beforeAll(() => {
    pipe = new JoinPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should properly join an array', () => {
    const arr  = ['hello', 'goodbye'];
    const output = pipe.transform(arr);
    expect(output).toBe('hello,goodbye');
  });

  it('should properly join an array with a unique separator', () => {
    const arr = ['hello', 'goodbye'];
    const output = pipe.transform(arr, '-');
    expect(output).toBe('hello-goodbye');
  })
});

import { BaseModel } from './base';

describe('Base model class', () => {
  let model: any;

  beforeAll(() => {
    model = new BaseModel({a: 1, b: 'abcd'});
  })

  it('should properly assign base properties to the class', () => {
    expect(model.a).toBe(1);
    expect(model.b).toBe('abcd');
  })
})

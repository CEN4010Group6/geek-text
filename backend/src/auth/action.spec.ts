import { Action } from './action';

describe('Action enum', () => {
  it('should be properly defined', () => {
    expect(Action.Manage).toEqual('manage');
    expect(Action.Create).toEqual('create');
    expect(Action.Read).toEqual('read');
    expect(Action.Update).toEqual('update');
    expect(Action.Delete).toEqual('delete');
  });
});

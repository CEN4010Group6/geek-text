import { User } from './user';

describe('User model', () => {
  let model: User;

  beforeAll(() => {
    model = new User({
      firstName: 'Mock',
      middleName: '',
      lastName: 'McMockface',
      nickName: 'EmCeeMockface',
      profilePicture: 'https://google.com'
    });
  });

  it('should properly assign values to the User object', () => {
    expect(model).toBeDefined();
    expect(model.firstName).toBe('Mock');
    expect(model.middleName).toBe('');
    expect(model.lastName).toBe('McMockface');
    expect(model.nickName).toBe('EmCeeMockface');
    expect(model.profilePicture).toBe('https://google.com');
  });
})

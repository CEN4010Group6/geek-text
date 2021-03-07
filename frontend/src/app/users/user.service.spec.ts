import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUser = {
    firstName: 'Mock',
    middleName: 'M',
    lastName: 'McMockface',
    nickName: 'EmCeeMockface',
    profilePicture: 'https://apicture.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserService ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a user', () => {
    service.load(mockUser);
    expect(service.user).toBeDefined();
    expect(service.user?.firstName).toBe('Mock');
    expect(service.user?.middleName).toBe('M');
    expect(service.user?.lastName).toBe('McMockface');
    expect(service.user?.nickName).toBe('EmCeeMockface');
  });

  it('should tell if a user is logged in', () => {
    service.load(mockUser);
    service.isLoggedIn().subscribe(b => {
      expect(b).toBeTruthy();
    });
    service.unload();
    service.isLoggedIn().subscribe(b => {
      expect(b).toBeFalsy()
    });
  })
});

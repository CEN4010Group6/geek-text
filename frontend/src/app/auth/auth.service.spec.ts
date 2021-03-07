import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StorageMap } from '@ngx-pwa/local-storage';

import { ApiService } from '../api.service';
import { UserService } from '../users/user.service';
import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        UsersModule
      ],
      providers: [
        HttpClient,
        ApiService,
        StorageMap,
        AuthService,
        UserService
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

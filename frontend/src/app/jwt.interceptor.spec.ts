import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageMap } from '@ngx-pwa/local-storage';

import { JwtInterceptor } from './jwt.interceptor';
import { UserService } from './users/user.service';
import { UsersModule } from './users/users.module';

describe('JwtInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StorageMap,
      JwtInterceptor,
      HttpClient,
      UserService
    ],
    imports: [
      HttpClientTestingModule,
      UsersModule
    ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

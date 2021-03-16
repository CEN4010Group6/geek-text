import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../api.service';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  private tokenSubject: BehaviorSubject<string>;

  constructor(
    private readonly $apiService: ApiService,
    private readonly $storage: StorageMap
  ) {
    this.tokenSubject = new BehaviorSubject<string>('');
    this.$storage.get('accessToken').subscribe((t) => {
      if(t) {
        this.tokenSubject.next(t as string);
      }
    });
  }

  public get token(): string {
    return this.tokenSubject.value || '';
  }

  public login(formData: {
    email: string;
    password: string;
  }): Observable<User> {
    return this.$apiService.post('/auth/login', formData)
      .pipe(
        map((auth: { accessToken: string, userId: string }) => {
          this.$storage.set('accessToken', auth.accessToken).subscribe(() => {});
          return auth;
        })
      );
  }

  public logout() {
    this.$storage.delete('accessToken').subscribe(() => {});
    this.tokenSubject.next('');
  }
}

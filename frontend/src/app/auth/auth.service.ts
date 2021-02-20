import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../api.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>

  constructor(
    private readonly $apiService: ApiService,
    private readonly $storage: StorageMap
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.$storage.get('accessToken'));
  }

  public get currentUser(): User {
    return this.currentUserSubject.value;
  }

  public login(formData: {
    email: string;
    password: string;
  }): Observable<User> {
    return this.$apiService.post('/auth/login', formData)
      .pipe(
        map(auth => {
          this.$storage.set('accessToken', auth.accessToken).subscribe(() => this.currentUserSubject.next(auth.accessToken));
          return auth;
        })
      );
  }

  public logout() {
    this.$storage.delete('user')
      .subscribe(() => this.currentUserSubject.next(null as unknown as User));
  }
}

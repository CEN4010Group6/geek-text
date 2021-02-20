import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>

  constructor(
    private readonly $apiService: ApiService,
    private readonly $storage: StorageMap
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.$storage.get('user'));
  }

  public get currentUser(): User {
    return this.currentUserSubject.value;
  }

  public login(formData: any): Observable<User> {
    return this.$apiService.post('', formData)
      .pipe(
        map(user => {
          this.$storage.set('user', user).subscribe(() => this.currentUserSubject.next(user));
          return user;
        })
      );
  }

  public logout() {
    this.$storage.delete('user')
      .subscribe(() => this.currentUserSubject.next(null as unknown as User));
  }
}

import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable()
export class UserService {

  private userSubject: BehaviorSubject<User | undefined>;
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(
    private readonly $storage: StorageMap
  ) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.userSubject = new BehaviorSubject<User | undefined>(undefined);
    this.$storage.get('user').subscribe((data) => {
      if(data) {
        const parsed = JSON.parse(atob(data as string));
        this.userSubject.next(new BehaviorSubject(new User(parsed)));
        this.isLoggedInSubject.next(true);
      }
    });
  }

  public load(data: {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    nickName?: string;
    profilePicture?: string;
  }) {
    this.$storage.set('user', btoa(JSON.stringify(data))).subscribe(() => {});
    this.userSubject.next(new User(data));
    this.isLoggedInSubject.next(true);
  }

  public unload() {
    this.$storage.delete('user').subscribe(() => {});
    this.userSubject.next(null as unknown as User);
    this.isLoggedInSubject.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public get user(): User | undefined {
    return this.userSubject.value;
  }
}

import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import merge from 'lodash.merge';

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
        this.userSubject.next(new User(parsed));
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
    shippingAddresses?: any[];
    creditCards: any[];
  }) {
    this.$storage.set('user', btoa(JSON.stringify(data))).subscribe(() => {});
    this.userSubject.next(new User(data));
    this.isLoggedInSubject.next(true);
  }

  public update(data: {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    nickName?: string;
    profilePicture?: string;
    shippingAddresses?: any[];
    creditCards?: any[];
  }) {
    let user = this.userSubject.value;
    user = merge(user, data);
    this.$storage.set('user', btoa(JSON.stringify(user))).subscribe(() => {});
    this.userSubject.next(new User(user));
  }

  public deleteFromArrayField(field: string, value: any) {
    let user = this.userSubject.value;
    if(user) {
      user[field] = user[field].filter((val: any) => {
        return val != value
      });
      this.$storage.set('user', btoa(JSON.stringify(user))).subscribe(() => {});
      this.userSubject.next(new User(user));
    }
  }

  public unload() {
    this.$storage.delete('user').subscribe(() => {});
    this.userSubject.next(undefined);
    this.isLoggedInSubject.next(false);
  }

  public get user(): User | undefined {
    return this.userSubject.value;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  public asObservable(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }
}

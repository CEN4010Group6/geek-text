import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public isLoggedIn?: Observable<boolean>
  public user?: User;
  private collapsed = true;
  private _profileCollapsed = true;

  constructor(
    private readonly $router: Router,
    private readonly $authService: AuthService,
    private readonly $userService: UserService
  ) {}

  ngOnInit(): void {
    this.$userService.asObservable()
      .subscribe((user: User | undefined) => {
        if(user) {
          this.user = user;
        }
      });
    this.isLoggedIn = this.$userService.isLoggedIn();
  }

  public isCollapsed(): boolean {
    return this.collapsed;
  }

  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  public get profileCollapsed(): boolean {
    return this._profileCollapsed;
  }

  public toggleProfileCollapsed() {
    this._profileCollapsed = !this._profileCollapsed;
  }
}

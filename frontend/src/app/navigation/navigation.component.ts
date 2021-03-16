import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private collapsed = true;
  public isLoggedIn = false;

  constructor(
    private readonly $router: Router,
    private readonly $authService: AuthService,
    private readonly $userService: UserService
  ) {}

  ngOnInit(): void {
    this.$userService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  public isCollapsed(): boolean {
    return this.collapsed;
  }

  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}

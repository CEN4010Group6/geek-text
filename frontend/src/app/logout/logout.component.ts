import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly $router: Router,
    private readonly $authService: AuthService,
    private readonly $userService: UserService
  ) { }

  ngOnInit(): void {
    this.$authService.logout();
    this.$userService.unload();
    this.$router.navigate(['/']);
  }

}

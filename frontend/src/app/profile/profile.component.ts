import { Component, OnInit } from '@angular/core';

import { UserService } from '../users/user.service';
import { User } from '../models/user';

enum ActiveTab {
  Profile,
  Address,
  Security,
  CreditCard
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User | undefined;
  public activeTab = ActiveTab.Profile;

  public eActiveTab = ActiveTab;

  constructor(
    private readonly $userService: UserService,
  ) {}

  ngOnInit(): void {
    this.$userService.asObservable()
      .subscribe((user) => this.user = user);
  }
}

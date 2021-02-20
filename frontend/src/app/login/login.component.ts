import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly $location: Location,
    private readonly $localStorage: StorageMap
  ) { }

  public ngOnInit(): void {
  }

  public back(): void {
    this.$location.back();
  }

  public submit() {

  }
}

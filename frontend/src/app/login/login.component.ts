import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm?: FormGroup;
  public submitted = false;
  public returnUrl?: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly $route: ActivatedRoute,
    private readonly $router: Router,
    private readonly $location: Location,
    private readonly $storage: StorageMap,
    private readonly $authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [ '', Validators.required, Validators.email ],
      password: ['', Validators.required, Validators.minLength(8) ]
    });

    this.returnUrl = this.$route.snapshot.queryParams['returnUrl'] || '/';
  }

  public back(): void {
    this.$location.back();
  }

  public submit() {
    this.submitted = true;

    if(this.loginForm?.invalid) {
      return;
    }

    this.$authService.login({
      email: this.loginForm?.controls.email.value,
      password: this.loginForm?.controls.password.value
    })
      .pipe(first())
      .subscribe(
        data => {
          this.$router.navigate([this.returnUrl]);
        },
        error => {
          // @TODO: Error handling
        });
  }
}

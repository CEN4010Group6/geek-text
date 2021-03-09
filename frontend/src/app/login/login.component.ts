import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.service';
import { FlashMessageService } from '../flash-message/flash-message.service';
import { Level } from '../flash-message/level';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm?: FormGroup;
  public registerForm?: FormGroup;
  public submitted = false;
  public returnUrl?: string;
  public tabActive = 0;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $route: ActivatedRoute,
    private readonly $router: Router,
    private readonly $location: Location,
    private readonly $apiService: ApiService,
    private readonly $authService: AuthService,
    private readonly $userService: UserService,
    private readonly $flashMessageService: FlashMessageService
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.$formBuilder.group({
      email: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });

    this.registerForm = this.$formBuilder.group({
      email: [ '', Validators.required ],
      password: [ '', Validators.required ],
      confirmPassword: [ '', Validators.required ],
      firstName: [ '', Validators.required ],
      middleName: [ '' ],
      lastName: [ '', Validators.required ],
      nickName: [ '', Validators.required ]
    });

    this.returnUrl = this.$route.snapshot.queryParams['returnUrl'] || '/';
  }

  public back(): void {
    this.$location.back();
  }

  public submitLogin() {
    this.submitted = true;

    if(this.loginForm?.invalid) {
      console.log(this.loginForm)
      return;
    }

    this.$authService.login({
      email: this.loginForm?.controls.email.value,
      password: this.loginForm?.controls.password.value
    })
      .pipe(first())
      .subscribe(auth => {
        this.$apiService.get('/users/' + auth.userId).subscribe((data) => {
          this.$userService.load(data);
        });
        this.$router.navigate([this.returnUrl]);
      }, error => {
        if(error === 'Unauthorized') {
          this.$flashMessageService.add({
            value: "Username or password was incorrect",
            level: Level.Danger
          });
        } else {
          this.$flashMessageService.add({
            value: error,
            level: Level.Danger
          });
        }
      });
  }

  public submitRegister() {
    this.submitted = true;

    if(this.registerForm?.invalid) {
      console.log(this.registerForm)
      return;
    }

    this.$apiService.post('/users', this.registerForm?.value)
      .subscribe((user) => {
        this.$userService.load(user);
        this.$router.navigate(['/']);
      }, (error) => {
        this.$flashMessageService.add({
          value: error,
          level: Level.Danger
        });
      });
  }
}

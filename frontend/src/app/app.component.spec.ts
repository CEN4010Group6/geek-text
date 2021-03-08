import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersModule } from './users/users.module';
import { UserService } from './users/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { FlashMessageModule } from './flash-message/flash-message.module';
import { FlashMessageService } from './flash-message/flash-message.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        LoadingBarModule,
        AuthModule,
        UsersModule,
        FlashMessageModule
      ],
      declarations: [
        AppComponent,
        NavigationComponent,
      ],
      providers: [
        AuthService,
        UserService,
        FlashMessageService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersModule } from '../users/users.module';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule { }

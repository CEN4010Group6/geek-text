import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../users/user.service';
import { ApiService } from '../api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { FlashMessageModule } from '../flash-message/flash-message.module';
import { UsersModule } from '../users/users.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessageModule,
    UsersModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    ApiService
  ]
})
export class ProfilesModule {}

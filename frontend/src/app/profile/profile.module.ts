import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { FlashMessageModule } from '../flash-message/flash-message.module';
import { UsersModule } from '../users/users.module';

import { ProfileComponent as ProfileProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { SecurityComponent } from './security/security.component';
import { CreditCardComponent } from './credit-card/credit-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessageModule,
    UsersModule
  ],
  declarations: [
    ProfileComponent,
    ProfileProfileComponent,
    AddressComponent,
    SecurityComponent,
    CreditCardComponent
  ],
  providers: [
    ApiService
  ]
})
export class ProfilesModule {}

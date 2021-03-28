import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessageModule } from '../flash-message/flash-message.module';
import { UserService } from '../users/user.service';
import { AddressComponent } from './address/address.component';
import { CreditCardComponent } from './credit-card/credit-card.component';

import { ProfileComponent } from './profile.component';
import { SecurityComponent } from './security/security.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        FlashMessageModule
      ],
      providers: [
        UserService
      ],
      declarations: [
        ProfileComponent,
        CreditCardComponent,
        AddressComponent,
        SecurityComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { FlashMessageModule } from 'src/app/flash-message/flash-message.module';
import { FlashMessageService } from 'src/app/flash-message/flash-message.service';
import { UserService } from 'src/app/users/user.service';

import { CreditCardComponent } from './credit-card.component';

describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FlashMessageModule
      ],
      declarations: [
        CreditCardComponent
      ],
      providers: [
        FlashMessageService,
        ApiService,
        FlashMessageService,
        UserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

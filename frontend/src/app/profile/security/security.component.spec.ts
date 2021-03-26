import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { FlashMessageModule } from 'src/app/flash-message/flash-message.module';
import { FlashMessageService } from 'src/app/flash-message/flash-message.service';
import { UserService } from 'src/app/users/user.service';

import { SecurityComponent } from './security.component';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FlashMessageModule
      ],
      declarations: [
        SecurityComponent
      ],
      providers: [
        UserService,
        ApiService,
        FlashMessageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

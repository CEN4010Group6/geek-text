import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { ApiService } from 'src/app/api.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RateTitlePipe } from '../star-rating/rate-title.pipe';
import { UserService } from 'src/app/users/user.service';
import { FlashMessageService } from 'src/app/flash-message/flash-message.service';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgbNavModule,
        ReactiveFormsModule
      ],
      providers: [
        ApiService,
        UserService,
        FlashMessageService
      ],
      declarations: [
        ReviewComponent,
        StarRatingComponent,
        RateTitlePipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

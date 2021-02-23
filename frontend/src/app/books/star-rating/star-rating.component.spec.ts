import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RateTitlePipe } from './rate-title.pipe';

import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarRatingComponent, RateTitlePipe ]
    })
    .compileComponents();
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

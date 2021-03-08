import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMessageComponent } from './flash-message.component';
import { FlashMessageService } from './flash-message.service';

describe('FlashMessageComponent', () => {
  let component: FlashMessageComponent;
  let fixture: ComponentFixture<FlashMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FlashMessageComponent
      ],
      providers: [
        FlashMessageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

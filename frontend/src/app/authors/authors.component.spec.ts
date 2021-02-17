import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '../api.service';

import { AuthorsComponent } from './authors.component';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsComponent ],
      imports: [ HttpClientModule, RouterTestingModule ],
      providers: [ ApiService ]
    })
    .compileComponents();
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

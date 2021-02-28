
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '../api.service';
import { BooksModule } from '../books/books.module';

import { AuthorsComponent } from './authors.component';
import { AuthorsService } from './authors.service';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        BooksModule
      ],
      providers: [
        ApiService,
        AuthorsService
      ]
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

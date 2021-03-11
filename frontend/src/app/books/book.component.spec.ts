import { Author } from '../models/author';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../api.service';
import { BookComponent } from './book.component';
import { AuthorsService } from '../authors/authors.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RateTitlePipe } from './star-rating/rate-title.pipe';
import { UserService } from '../users/user.service';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientModule, NgbModule, ReactiveFormsModule ],
      declarations: [ BookComponent, StarRatingComponent, RateTitlePipe ],
      providers: [ ApiService, AuthorsService, UserService ]
    })
    .compileComponents();
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = {
      id: '702ff0b2-e6b4-437f-a3df-a9604ea03e25',
      title: "To Kill a Mockingbird",
      description: "Nominated as one of America’s best-loved novels by PBS’s The Great American Read\nHarper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred\nOne of the best-loved stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.",
      coverUrl: "https://prodimage.images-bn.com/pimages/9780061120084_p0_v4_s600x595.jpg",
      isbn: 9780061120084,
      price: 17.99,
      publishYear: 2005,
      authors: [
        {
          id: '702ff0b2-e6b4-437f-a3df-a9604ea03e25',
          firstName: 'Harper',
          lastName: 'Lee',
          description: "Harper Lee was born in 1926 in Monroeville, Alabama. She is the author of the acclaimed To Kill a Mockingbird and Go Set a Watchman, which became a phenomenal #1 New York Times bestseller when it was published in July 2015. Ms. Lee received the Pulitzer Prize, the Presidential Medal of Freedom, and numerous other literary awards and honors. She died on February 19, 2016.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      genres: [
        { id: 1, name: 'Fiction' }
      ],
      reviews: [
        { id: 'a', value: 5, description: 'abcd', postedAs: 'anyonymous', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 'b', value: 2, description: 'abcd', postedAs: 'realName', createdAt: new Date(), updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly display the genres of the book', () => {
    expect(component.genres).toBe('Fiction');
  })
});

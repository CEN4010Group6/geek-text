import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { AuthorsService } from '../authors/authors.service';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { Genre } from '../models/genre';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public book?: Book;
  public activeTab = 1;

  constructor(
    private readonly $route: ActivatedRoute,
    private readonly $apiService: ApiService,
    private readonly $authorsService: AuthorsService,
    private readonly $userService: UserService
  ) {}

  public ngOnInit(): void {
    this.$route.params.subscribe(async params => {
      let httpParams = new HttpParams();

      const select = await this.$apiService.prepareJsonForApi({
        id: true,
        title: true,
        authors: {
          orderBy: {
            lastName: 'asc'
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
            description: true
          }
        },
        publisher: {
          select: {
            name: true,
            website: true
          }
        },
        publishYear: true,
        description: true,
        genres: true,
        price: true,
        reviews: {
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            value: true,
            description: true,
            postedAs: true,
            user: {
              select: {
                firstName: true,
                middleName: true,
                lastName: true,
                nickName: true
              }
            }
          }
        },
        coverUrl: true,
        coverDataUri: true,
        sold: true,
        averageRating: true
      });

      httpParams = httpParams.set('select', select);

      this.$apiService.get(`/books/${ params.bookId }`, httpParams)
        .subscribe(res => this.book = res);
    });
  }

  public authorName(author: Author): string {
    return this.$authorsService.authorName(author);
  }

  public get genres(): string {
    if(this.book?.genres) {
      return this.book.genres.map((genre: Genre) => genre.name)
        .join(', ');
    }
    return '';
  }

  public get isLoggedIn(): Observable<boolean> {
    return this.$userService.isLoggedIn();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../api.service';
import { AuthorsService } from '../authors/authors.service';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { Genre } from '../models/genre';
import { Review } from '../models/review';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public book?: Book;
  public activeTab = 1;

  constructor(
    private $route: ActivatedRoute,
    private $apiService: ApiService,
    private $authorsService: AuthorsService
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
          }
        },
        coverUrl: true,
        coverDataUri: true,
        sold: true
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

  public get averageReviews(): number {
    if(this.book?.reviews && this.book.reviews.length > 0) {
      return this.book.reviews.map((review: Review) => review.value)
        .reduce((acc, val) => acc + val ) / this.book.reviews.length
    }
    return 0;
  }
}

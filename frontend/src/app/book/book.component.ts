import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../api.service';
import { AuthorsService } from '../authors/authors.service';
import { Author, Book, Genre, Rating } from '../models';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public book?: Book;

  constructor(
    private $route: ActivatedRoute,
    private $apiService: ApiService,
    private $authorsService: AuthorsService
  ) {}

  public ngOnInit(): void {
    this.$route.params.subscribe(params => {
      let httpParams = new HttpParams();

      httpParams = httpParams.set('include', btoa(JSON.stringify({
        authors: true,
        ratings: true,
        genres: true,
        publisher: true
      })));

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
    if(this.book?.ratings && this.book.ratings.length) {
      return this.book.ratings.map((rating: Rating) => rating.value)
        .reduce((acc, val) => acc + val ) / this.book.ratings.length
    }
    return 0;
  }
}

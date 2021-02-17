import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../api.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public book?: Book;

  constructor(
    private $route: ActivatedRoute,
    private $apiService: ApiService
  ) {}

  public ngOnInit(): void {
    this.$route.params.subscribe(params => {
      let httpParams = new HttpParams();

      httpParams = httpParams.set('include', btoa(JSON.stringify({
        authors: true,
        ratings: true,
        genres: true
      })));

      this.$apiService.getBookById(params.bookId, httpParams)
        .subscribe(res => this.book = res);
    });
  }
}

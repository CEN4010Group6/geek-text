import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public book: Book = {} as Book;

  constructor(
    private $route: ActivatedRoute,
    private $api: ApiService
  ) {}

  public ngOnInit(): void {
    this.$route.params.subscribe(params => {
      this.$api.getBookById(params.bookId)
        .subscribe(res => this.book = res)
    });
  }
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '../../api.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() bookId: string = '';

  public book: Book = {} as Book;

  constructor(private $api: ApiService) { }

  ngOnInit(): void {
    this.$api.getBookById(this.bookId)
      .subscribe(res => this.book = res);
  }
}

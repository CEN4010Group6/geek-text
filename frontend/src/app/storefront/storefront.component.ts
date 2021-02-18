import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { Book } from '../models/book';

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit {

  public books: Book[] = [];

  constructor(
    private $apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.$apiService.get('/books')
      .subscribe(res => this.books = res);
  }

}

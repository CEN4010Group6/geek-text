import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly $apiService: ApiService,
    private readonly $router: Router
  ) { }

  public ngOnInit(): void {
    this.$apiService.get('/books')
      .subscribe(res => this.books = res);
  }

  public async navigate(id: string) {
    await this.$router.navigate(['/books', id]);
  }
}

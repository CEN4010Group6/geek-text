import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../api.service';

import { Book } from '../models/book';

enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit {

  public books?: Observable<Book[]>;
  private count: number = 0;
  private skip: number = 0;
  private limit: number = 20;
  private orderByField = 'title';
  private orderByMethod = OrderBy.Asc;

  constructor(
    private readonly $apiService: ApiService,
    private readonly $router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.fetchBooks();
  }

  public async navigate(id: string) {
    await this.$router.navigate(['/books', id]);
  }

  public hasNextPage(): boolean {
    return this.count > this.skip + this.limit;
  }

  public get orderBy() {
    let obj = {}
    Object.defineProperty(obj, this.orderByField, {
      value: this.orderByMethod,
      enumerable: true
    });
    return obj;
  }

  private fetchBooks(): void {
    let httpParams = new HttpParams();

    const select = this.$apiService.prepareJsonForApi({
      id: true,
      title: true,
      genres: true,
      price: true,
      coverUrl: true,
      coverDataUri: true,
      averageRating: true
    });

    const orderBy = this.$apiService.prepareJsonForApi(this.orderBy);

    httpParams = httpParams.set('select', select);
    httpParams = httpParams.set('orderBy', orderBy);
    httpParams = httpParams.set('take', this.limit.toString());
    httpParams = httpParams.set('skip', this.skip.toString());

    this.books = this.$apiService.get('/books', httpParams)
      .pipe(
        map((res: { books: Book[], count: number }) => {
          this.count = res.count;
          res.books.map(book => {
            // @ts-ignore
            book.genres = book.genres.map((g) => { return g.name });
          });
          return res.books;
        })
      );
  }
}

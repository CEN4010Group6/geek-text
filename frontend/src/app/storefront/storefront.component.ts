import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ApiService } from '../api.service';

import { Book } from '../models/book';

enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

enum WhereBy {
  None,
  ThreeStars = 3,
  FourStars = 4,
  FiveStars = 5
}

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit {

  public books?: Observable<Book[]>;
  public topSellers?: Observable<Book[]>;
  private count: number = 0;
  private skip: number = 0;
  public limit: number = 20;
  private orderByField = 'title';
  private orderByMethod = OrderBy.Asc;
  public whereBy: WhereBy = WhereBy.None;
  public eOrderBy = OrderBy;
  public eWhereBy = WhereBy;
  public activeTab = 0;

  constructor(
    private readonly $apiService: ApiService,
    private readonly $router: Router
  ) {}

  public ngOnInit(): void {
    this.fetchTopSellers();
    this.fetchBooks();
  }

  public async navigate(id: string) {
    await this.$router.navigate(['/books', id]);
  }

  public isRadioSelect(value: number): boolean {
    return (value === this.limit)
  }

  public nextPage() {
    this.skip = this.skip + this.limit;
    this.fetchBooks();
  }

  public prevPage() {
    this.skip = this.skip - this.limit;
    this.fetchBooks();
  }

  public hasPreviousPage(): boolean {
    return this.skip - this.limit >= 0;
  }

  public hasNextPage(): boolean {
    return this.count > this.skip + this.limit;
  }

  public onOrderByField(target: any | null) {
    if(target?.value) {
      this.orderByField = target.value;
    }

    this.fetchBooks();
  }

  public onOrderByMethod(target: any | null) {
    if(target?.value) {
      this.orderByMethod = target.value;
    }

    this.fetchBooks();
  }

  public changeLimit(target: any | null) {
    if(target.value) {
      this.limit = target.value;
    }
    this.fetchBooks();
  }

  public changeWhereBy(val: WhereBy) {
    this.whereBy = val;
    this.fetchBooks();
  }

  public get orderBy() {
    let obj = {}
    Object.defineProperty(obj, this.orderByField, {
      value: this.orderByMethod,
      enumerable: true
    });
    return obj;
  }

  public authorList(authors: any[]): string {
    return authors.map((a) => {
      return a.firstName + " " + a.lastName
    })
      .join(', ');
  }

  private fetchBooks(): void {
    let httpParams = new HttpParams();

    const select = this.$apiService.prepareJsonForApi({
      id: true,
      title: true,
      authors: true,
      genres: true,
      price: true,
      coverUrl: true,
      coverDataUri: true,
      averageRating: true
    });

    const orderBy = this.$apiService.prepareJsonForApi(this.orderBy);

    httpParams = httpParams.set('select', select);
    if(!(this.orderByField = 'averageRating' || this.orderByField === 'genre' || this.orderByField === 'author')) {
      httpParams = httpParams.set('orderBy', orderBy);
    }
    httpParams = httpParams.set('take', this.limit.toString());
    httpParams = httpParams.set('skip', this.skip.toString());

    this.books = this.$apiService.get('/books', httpParams)
      .pipe(
        map((res: { books: Book[], count: number }) => {
          this.count = res.count;
          let books = res.books;
          books.map(book => {
            // @ts-ignore
            book.genres = book.genres.map((g) => { return g.name });
          });

          if(this.orderByField === 'averageRating') {
            books.sort((a, b) => {
              if(this.orderByMethod === 'asc') {
                // @ts-ignore
                if(a.averageRating > b.averageRating) {
                  return 1;
                // @ts-ignore
                } else if (a.averageRating < b.averageRating) {
                  return -1;
                } else {
                  return 0;
                }
              } else {
                // @ts-ignore
                if(a.averageRating > b.averageRating) {
                  return -1;
                // @ts-ignore
                } else if (a.averageRating < b.averageRating) {
                  return 1;
                } else {
                  return 0;
                }
              }
              // @ts-ignore
              if(a.averageRating > b.averageRating) {
                return 1;
              // @ts-ignore
              } else if (a.averageRating < b.averageRating) {
                return -1;
              } else {
                return 0;
              }
            })
          }

          if(this.orderByField === 'genre') {
            books.sort((a, b) => {
              if(a.genres && b.genres) {
                if(this.orderByMethod === OrderBy.Asc) {
                  return (a.genres >= b.genres) ? 1 : -1;
                } else {
                  return (a.genres >= b.genres) ? -1 : 1;
                }
              }
              return 0;
            });
          }

          if(this.orderByField === 'authors') {
            books.sort((a, b) => {
              if(this.orderByMethod === OrderBy.Asc) {
                return (a.authors[0] >= b.authors[0]) ? 1 : -1;
              } else {
                return (a.authors[0] >= b.authors[0]) ? -1 : 1;
              }
            });
          }

          if(this.whereBy != WhereBy.None) {
            // @ts-ignore
            books = books.filter(book => book.averageRating >= this.whereBy);
          }

          return books;
        })
      );
  }

  private fetchTopSellers() {
    let httpParams = new HttpParams();

    const select = this.$apiService.prepareJsonForApi({
      id: true,
      title: true,
      authors: true,
      price: true,
      coverUrl: true,
      coverDataUri: true
    });

    const orderBy = this.$apiService.prepareJsonForApi({
      sold: 'desc'
    });

    httpParams = httpParams.set('select', select);
    httpParams = httpParams.set('take', "5");
    httpParams = httpParams.set('orderBy', orderBy);

    this.topSellers = this.$apiService.get('/books', httpParams)
      .pipe(
        map(res => (res.books))
      )
  }
}

import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Map } from 'immutable';

import { ApiService } from '../api.service';
import { Book } from '../models/book';
import { Author } from '../models/author';

interface ShoppingCart {
  id?: string;
  user?: any;
  userId?: string;
  books: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ShoppingCartBook {
  id: string;
  title: string;
  authors: Author[];
  isbn: number;
  price: number;
  quantity?: number;
}

@Injectable()
export class ShoppingCartService {
  private shoppingCartSubject: BehaviorSubject<Map<string, ShoppingCartBook>>;

  constructor(
    private readonly $apiService: ApiService,
    private readonly $storageMap: StorageMap
  ) {
    this.shoppingCartSubject = new BehaviorSubject(Map());

    this.$storageMap.get('shoppingCart').subscribe((val) => {
      if (val) {
        this.shoppingCartSubject = new BehaviorSubject(
          JSON.parse(val as string)
        );
      }
    });
  }

  public addToCart(book: ShoppingCartBook) {
    let map = this.shoppingCartSubject.value;
    this.shoppingCartSubject.next(
      map.set(book.id, {
        id: book.id,
        title: book.title,
        authors: book.authors,
        isbn: book.isbn,
        price: book.price,
        quantity: 1,
      })
    );

    this.$storageMap.delete('shoppingCart').subscribe(() => {});
  }

  public getCartItems(): Map<string, ShoppingCartBook> {
    return this.shoppingCartSubject.value;
  }

  public increaseQty(bookId: string) {
    let map = this.shoppingCartSubject.value; // TODO look into BehaviorSubject
    let book = map.get(bookId) as ShoppingCartBook;

    if (book.quantity) {
      book.quantity = book.quantity + 1;
    } else {
      book.quantity = 1;
    }

    this.shoppingCartSubject.next(map.set(bookId, book)); // set the updated book to the bookId

    this.$storageMap
      .set('shoppingCart', JSON.stringify(this.shoppingCartSubject.value))
      .subscribe(() => {});
  }

  public emptyCart() {
    this.shoppingCartSubject.next(Map());
    this.$storageMap
      .set('shoppingCart', JSON.stringify(this.shoppingCartSubject.value))
      .subscribe(() => {});
  }

  public saveCart() {}
}

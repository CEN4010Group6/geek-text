import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Map } from 'immutable';
import { ApiService } from '../api.service';
import { Author } from '../models/author';

export interface ShoppingCartBook {
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

    this.$storageMap.get('shoppingCart').subscribe((val: any) => {
      if (val) {
        this.shoppingCartSubject = new BehaviorSubject(Map(val));
      }
    });
  }

  public addToCart(newBook: ShoppingCartBook) {
    let map = this.shoppingCartSubject.value;
    let book = map.get(newBook.id) as ShoppingCartBook;

    if (!book) {
      this.shoppingCartSubject.next(
        map.set(newBook.id, {
          id: newBook.id,
          title: newBook.title,
          authors: newBook.authors,
          isbn: newBook.isbn,
          price: newBook.price,
          quantity: 1,
        })
      );
    } else {
      if (book && book.quantity) {
        book.quantity = book.quantity + 1;
      }
      this.shoppingCartSubject.next(map.set(book.id, book));
    }

    this.$storageMap.set('shoppingCart', map.toObject()).subscribe(() => { });
  }

  public getCartItems(): Observable<Map<string, ShoppingCartBook>> {
    return this.shoppingCartSubject.asObservable();
  }

  public increaseQty(bookId: string) {
    let map = this.shoppingCartSubject.value;
    let book = map.get(bookId) as ShoppingCartBook;

    if (book.quantity) {
      book.quantity = book.quantity + 1;
    } else {
      book.quantity = 1;
    }

    this.shoppingCartSubject.next(map.set(bookId, book)); // set the updated book to the bookId

    this.$storageMap
      .set('shoppingCart', this.shoppingCartSubject.value.toObject())
      .subscribe(() => { });
  }

  public decrementQty(bookId: string) {
    let map = this.shoppingCartSubject.value;
    let book = map.get(bookId) as ShoppingCartBook;

    if (book.quantity) {
      if (book.quantity > 1) {
        book.quantity = book.quantity - 1;
      }
    } else {
      book.quantity = 1;
    }

    this.shoppingCartSubject.next(map.set(bookId, book)); // set the updated book to the bookId

    this.$storageMap
      .set('shoppingCart', this.shoppingCartSubject.value.toObject())
      .subscribe(() => { });
  }

  public deleteItem(bookId: string) {
    let map = this.shoppingCartSubject.value;
    this.shoppingCartSubject.next(map.delete(bookId));
    this.$storageMap
      .set('shoppingCart', this.shoppingCartSubject.value.toObject())
      .subscribe(() => { });
  }

  public emptyCart() {
    this.shoppingCartSubject.next(Map());
    this.$storageMap
      .set('shoppingCart', this.shoppingCartSubject.value.toObject())
      .subscribe(() => { });
  }

  public cartSubtotal() {
    let cartItems = this.shoppingCartSubject.value;
    let total = 0;
    cartItems.forEach(book => {
      if (book.quantity) {
        total += book.quantity * book.price;
      }
    });
    return total.toFixed(2);
  }

  // TODO needs to be implemented
  public saveForLater() { }
}

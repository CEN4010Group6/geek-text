import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from 'src/app/models/user';
import { Author } from '../models/author';
import { AuthorsService } from '../authors/authors.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService, ShoppingCartBook } from './shopping-cart.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public user?: User;
  public books?: Map<string, ShoppingCartBook>;

  constructor(
    private readonly $router: Router,
    private readonly $activatedRoute: ActivatedRoute,
    private readonly $api: ApiService,
    private readonly $authorsService: AuthorsService,
    private readonly $userService: UserService,
    private readonly $shoppingCartService: ShoppingCartService
  ) { }

  public ngOnInit(): void {
    this.user = this.$userService.user;
    this.$shoppingCartService
      .getCartItems()
      .subscribe((books: any) => (this.books = books));
  }

  public clearCart() {
    this.$shoppingCartService.emptyCart();
  }

  public incrementQuantity(book: ShoppingCartBook) {
    this.$shoppingCartService.increaseQty(book.id);
  }

  public decrementQuantity(book: ShoppingCartBook) {
    this.$shoppingCartService.decrementQty(book.id);
  }

  public deleteItem(book: ShoppingCartBook) {
    this.$shoppingCartService.deleteItem(book.id);
  }

  public authorName(author: Author): string {
    return this.$authorsService.authorName(author);
  }

  public cartSubtotal() {
    return this.$shoppingCartService.cartSubtotal();
  }
}

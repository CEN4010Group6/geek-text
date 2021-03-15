import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from 'src/app/models/user';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Book } from 'src/app/models/book';
import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public user?: User;

  constructor(
    private readonly $router: ActivatedRoute,
    private readonly $api: ApiService,
    private readonly $userService: UserService,
    private readonly $shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.user = this.$userService.user;
  }

  public clearCart() {
    this.$shoppingCartService.emptyCart();
  }

  public addToCart(book: Book) {
    this.$shoppingCartService.addToCart(book);
  }
}

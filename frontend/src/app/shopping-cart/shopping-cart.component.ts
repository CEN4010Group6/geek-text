import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public user?: User;
  constructor(
    private readonly $router: ActivatedRoute,
    private readonly $api: ApiService
  ) {}

  ngOnInit(): void {
    this.$router.params.subscribe((params) => {
      this.$api
        .get(`/users/${params.userId}`)
        .subscribe((res) => (this.user = res));
    });
  }
}

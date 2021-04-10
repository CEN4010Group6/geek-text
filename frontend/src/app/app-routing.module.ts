// Core Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { List } from 'immutable';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookComponent } from './books/book.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { ReviewComponent } from './books/review/review.component';
import { AuthorsComponent } from './authors/authors.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './profile/address/address.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

// List of routes used in the top-level
const routes: List<Route> = List([
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard] // Seems silly to allow logging
    // out when someone isn't even
    // logged in
  },
  { path: 'books/:bookId', component: BookComponent },
  {
    path: 'books/:bookId/review',
    component: ReviewComponent,
    canActivate: [AuthGuard],
  },
  { path: 'authors/:authorId', component: AuthorsComponent },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  { path: '', component: StorefrontComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
]);

@NgModule({
  imports: [RouterModule.forRoot(routes.toArray())],
  exports: [RouterModule],
})
export class AppRoutingModule { }

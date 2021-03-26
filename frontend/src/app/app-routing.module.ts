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
import { ProfileComponent as ProfileProfileComponent } from './profile/profile/profile.component';
import { SecurityComponent } from './profile/security/security.component';
import { AddressComponent } from './profile/address/address.component';
import { CreditCardComponent } from './profile/credit-card/credit-card.component';

// List of routes used in the top-level
const routes: List<Route> = List([
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [ AuthGuard ] // Seems silly to allow logging
                               // out when someone isn't even
                               // logged in
  },
  { path: 'books/:bookId', component: BookComponent },
  {
    path: 'books/:bookId/review',
    component: ReviewComponent,
    canActivate: [ AuthGuard ]
  },
  { path: 'authors/:authorId', component: AuthorsComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfileProfileComponent,
        outlet: 'sub'
      },
      {
        path: 'security',
        component: SecurityComponent,
        outlet: 'sub'
      },
      {
        path: 'address',
        component: AddressComponent,
        outlet: 'sub'
      },
      {
        path: 'credit-card',
        component: CreditCardComponent,
        outlet: 'sub'
      }
    ]
  },
  { path: '', component: StorefrontComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]);

@NgModule({
  imports: [ RouterModule.forRoot(routes.toArray()) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

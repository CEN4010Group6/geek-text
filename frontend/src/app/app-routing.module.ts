// Core Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { List } from 'immutable';

import { NotFoundComponent } from './not-found/not-found.component';
import { BookComponent } from './books/book.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { ReviewComponent } from './books/review/review.component';
import { AuthorsComponent } from './authors/authors.component';
import { LoginComponent } from './login/login.component';

// List of routes used in the top-level
const routes: List<Route> = List([
  { path: 'login', component: LoginComponent },
  { path: 'books/:bookId', component: BookComponent },
  { path: 'books/:bookId/review', component: ReviewComponent},
  { path: 'authors/:authorId', component: AuthorsComponent },
  { path: '', component: StorefrontComponent },
  { path: '**', component: NotFoundComponent }
]);

@NgModule({
  imports: [ RouterModule.forRoot(routes.toArray()) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

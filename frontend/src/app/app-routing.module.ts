// Core Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { List } from 'immutable';

import { NotFoundComponent } from './not-found/not-found.component';
import { BookComponent } from './book/book.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { AuthorComponent } from './author/author.component';

// List of routes used in the top-level
const routes: List<Route> = List([
  { path: 'book/:bookId', component: BookComponent },
  { path: 'author/:authorId', component: AuthorComponent },
  { path: '', component: StorefrontComponent },
  { path: '**', component: NotFoundComponent }
]);

@NgModule({
  imports: [ RouterModule.forRoot(routes.toArray()) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

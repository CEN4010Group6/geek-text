// Core Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { BookComponent } from './book/book.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { ReviewComponent } from './book/review/review.component';

// Array of routes used in the top-level
const routes: Routes = [
  { path: 'book/:bookId', component: BookComponent },
  { path: 'review/:bookId', component: ReviewComponent},
  { path: '', component: StorefrontComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

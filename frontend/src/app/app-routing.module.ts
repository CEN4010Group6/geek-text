// Core Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { BookComponent } from './book/book.component';

// Array of routes used in the top-level
const routes: Routes = [
  { path: 'book/:bookId', component: BookComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

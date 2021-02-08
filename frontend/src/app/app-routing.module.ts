// Core Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from './book/book.component';

// Array of routes used in the top-level
const routes: Routes = [
  { path: 'book/:bookId', component: BookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

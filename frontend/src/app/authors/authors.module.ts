import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from '../api.service';

import { AuthorsComponent } from './authors.component';
import { AuthorsService } from './authors.service';
import { BooksModule } from '../books/books.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BooksModule
  ],
  declarations: [
    AuthorsComponent
  ],
  providers: [ ApiService, AuthorsService ]
})
export class AuthorsModule { }

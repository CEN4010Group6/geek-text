import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

import { ApiService } from '../api.service';

import { BookComponent } from './book.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    BookComponent,
    CommentComponent
  ],
  providers: [ ApiService ],
  imports: [
    CommonModule,
    RouterModule,
    CrystalLightboxModule
  ]
})
export class BookModule { }

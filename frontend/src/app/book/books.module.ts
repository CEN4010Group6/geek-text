import { JoinPipe } from './../join.pipe';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

import { ApiService } from '../api.service';

import { BookComponent } from './book.component';
import { DetailsComponent } from './details/details.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    BookComponent,
    DetailsComponent,
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

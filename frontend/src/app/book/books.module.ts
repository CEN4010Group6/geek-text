import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

import { ApiService } from '../api.service';

import { BookComponent } from './book.component';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'ng-starrating';
// import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [ BookComponent, DetailsComponent, ReviewComponent ],
  providers: [ ApiService ],
  imports: [ RouterModule, CommonModule, CrystalLightboxModule, RatingModule ]
})
export class BookModule { }

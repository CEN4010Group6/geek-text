import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

import { ApiService } from '../api.service';

import { BookComponent } from './book.component';
import { ReviewComponent } from './review/review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RateTitlePipe } from './star-rating/rate-title.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CrystalLightboxModule,
    NgbModule
  ],
  declarations: [
    BookComponent,
    ReviewComponent,
    StarRatingComponent,
    RateTitlePipe
  ],
  providers: [ ApiService ],
  exports: [ StarRatingComponent ]
})
export class BooksModule { }

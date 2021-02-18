import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { RatingModule } from 'ng-starrating';

import { ApiService } from '../api.service';

import { BookComponent } from './book.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    BookComponent,
    ReviewComponent
  ],
  providers: [ ApiService ],
  imports: [
    CommonModule,
    RouterModule,
    CrystalLightboxModule,
    RatingModule
  ]
})
export class BookModule { }

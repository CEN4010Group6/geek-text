import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

import { ApiService } from '../api.service';

import { BookComponent } from './book.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ BookComponent, DetailsComponent ],
  providers: [ ApiService ],
  imports: [ CommonModule, CrystalLightboxModule ]
})
export class BookModule { }

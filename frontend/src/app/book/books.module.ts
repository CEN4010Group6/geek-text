import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../api.service';

import { BookComponent } from './book.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ BookComponent, DetailsComponent ],
  providers: [ ApiService ],
  imports: [ CommonModule ]
})
export class BookModule { }

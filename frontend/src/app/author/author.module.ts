import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from '../api.service';

import { AuthorComponent } from './author.component';

@NgModule({
  declarations: [ AuthorComponent ],
  providers: [ ApiService ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AuthorModule { }

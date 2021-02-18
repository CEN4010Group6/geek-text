import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from '../api.service';

import { AuthorsComponent } from './authors.component';
import { AuthorsService } from './authors.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ AuthorsComponent ],
  providers: [ ApiService, AuthorsService ]
})
export class AuthorsModule { }

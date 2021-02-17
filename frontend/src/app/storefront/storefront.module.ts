import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from '../api.service';

import { StorefrontComponent } from './storefront.component';

@NgModule({
  declarations: [ StorefrontComponent ],
  providers: [ ApiService ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class StorefrontModule { }

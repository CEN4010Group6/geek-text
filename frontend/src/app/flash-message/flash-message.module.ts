import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashMessageService } from './flash-message.service';
import { FlashMessageComponent } from './flash-message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FlashMessageComponent
  ],
  providers: [
    FlashMessageService
  ],
  exports: [
    FlashMessageComponent
  ]
})
export class FlashMessageModule { }

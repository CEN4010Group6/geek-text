declare var process: any;

import { Injectable } from '@angular/core';

import { CustomErrorHandlerService } from './custom-error-handler.service';
import { BrowserError } from './models/browser-error';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private $errorHandler: CustomErrorHandlerService) { }

  public info(message: any, ...optionalParams: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, optionalParams);
    }
  }

  public warn(message: any, ...optionalParams: any[]): void {
    console.warn(message, optionalParams);
  }

  public error(message: any, ...optionalParams: any[]): void {
    this.$errorHandler.handleError(message);
  }
}

import { ErrorHandler, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BrowserError } from './models/browser-error';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService extends ErrorHandler {

  constructor(private $apiService: ApiService) {
    super();
  }

  /**
   *
   * @param error
   */
  public handleError(error: string | Error): void {
    try {
      super.handleError(error);
    } catch(e) {
      this.reportError(e);
    }
    this.reportError(error);
  }

  /**
   *
   * @param error
   */
  private reportError(oldError: string | Error) {
    let error: BrowserError;
    if(typeof oldError == 'string') {
      error = new BrowserError(new Error(oldError));
    } else {
      error = new BrowserError(oldError);
    }
    this.$apiService.post('/logs', error)
      .subscribe(() => {});
  }
}

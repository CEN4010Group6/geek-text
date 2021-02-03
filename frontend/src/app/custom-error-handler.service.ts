import { ErrorHandler, Injectable } from '@angular/core';
import { ApiService } from './api.service';

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
  private reportError(error: string | Error): void {
    this.$apiService.post('/logs', error)
      .subscribe((res: any) => {

      });
  }
}

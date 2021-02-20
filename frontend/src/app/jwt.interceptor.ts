declare var process: any;

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private readonly $storage: StorageMap
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.$storage.get('accessToken')
      .subscribe(token => {
        const isApiUrl = request.url.startsWith(process.env.REST_API_ENTRYPOINT);

        if(token && isApiUrl) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      });

    return next.handle(request);
  }
}

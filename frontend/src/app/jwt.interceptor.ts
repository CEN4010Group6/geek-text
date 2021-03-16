import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private readonly $storage: StorageMap
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.$storage.get('accessToken').pipe(
      switchMap((token) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(request);
      })
    );
  }
}

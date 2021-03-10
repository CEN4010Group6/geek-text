import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly $router: Router,
    private readonly $storage: StorageMap
  ) {}

  public canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>
  {
    return this.$storage.has('user')
      .pipe(tap(val => {
        if(!val) {
          this.$router.navigate(['/login', { queryParams: { returnUrl: state.url } }]);
        }
      }));
  }

}

import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { ConfigService } from './config.service';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { InfoResponse } from './interfaces/auth.resp';
import { HttpErrorResponse } from '@angular/common/http';

export function authGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);

    oauthService.isLoggedIn().subscribe((res:InfoResponse)=>{
      console.log(`authGuard(): ${res.email}`);
      return true;
    }),
    (error: HttpErrorResponse) => {
      if (error.status === 401) {
        return false;
      }
      return false;
    }
    return false;
  };
}

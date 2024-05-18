import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    if(inject(AuthService).isAuthenticated()) {
      return true;
    } else {
      return router.createUrlTree(['/']);
    }
  };
};
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    return inject(AuthService).isAuthenticated();
  };
}

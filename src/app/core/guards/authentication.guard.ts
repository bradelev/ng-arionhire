import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);
  
  //disable google login for demo purpose
  return true

  return _authService.isLoggedIn$.pipe(
    map((response: boolean) => {
      if (response) {
        return true;
      }
      _router.navigate(['/login']);

      return false;
    }),
    catchError((error) => {
      _router.navigate(['/login']);

      return of(false);
    })
  );
};

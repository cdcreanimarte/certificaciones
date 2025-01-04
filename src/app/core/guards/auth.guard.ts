import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthStateService } from '../../shared/services/auth-state.service';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authStateSrv = inject(AuthStateService);

  // * Verificar si el usuario está autenticado
  return authStateSrv.authState$.pipe(
    map(state => {
      if (!state) {
        router.navigate(['/auth/sign-in']);
        return false;
      }
      return true;
    })
  );
}

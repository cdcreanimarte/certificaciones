import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const authGuard: CanMatchFn = async (route, segments) => {
  const router = inject(Router);
  const authSrv = inject(AuthService);

  const { data } = await authSrv.session();
  console.log(data);

  if (!data.session) {
    router.navigate(['/']);
  }

  return !!data.session;
}

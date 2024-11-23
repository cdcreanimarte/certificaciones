import { Routes } from '@angular/router';

export const routes: Routes = [
/*   {
    path: '',
    loadComponent: () => import('./routes/certificates/views/certificate-validate/certificate-validate.component').then(m => m.CertificateValidateComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./routes/auth/auth.routes').then(m => m.authRoutes),
  }, */
  {
    path: 'generate',
    loadChildren: () => import('./modules/certificates/certificate.routes').then(m => m.certificateRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  }
];

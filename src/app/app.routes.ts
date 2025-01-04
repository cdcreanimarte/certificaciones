import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/certificates/views/certificate-validate/certificate-validate.component').then(m => m.CertificateValidateComponent),
  },
  {
    canActivateChild: [authGuard],
    path: 'administration',
    loadChildren: () => import('./modules/certificates/certificate.routes').then(m => m.certificateRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  }
];

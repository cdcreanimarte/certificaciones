import { Routes } from '@angular/router';

export const certificateRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/certificate-form/certificate-form.component').then(m => m.CertificateFormComponent),
  },
/*   {
    path: 'validate',
    loadComponent: () => import('./views/certificate-validate/certificate-validate.component').then(m => m.CertificateValidateComponent),
  } */
];

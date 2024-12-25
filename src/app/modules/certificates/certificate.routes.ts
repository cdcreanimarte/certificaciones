import { Routes } from '@angular/router';

export const certificateRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/certificate-form/certificate-form.component').then(m => m.CertificateFormComponent),
  },
];

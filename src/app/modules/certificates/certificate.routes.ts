import { Routes } from '@angular/router';

export const certificateRoutes: Routes = [
  {
    path: 'generate',
    loadComponent: () => import('./views/certificate-form/certificate-form.component').then(m => m.CertificateFormComponent),
  },
  {
    path: 'list',
    loadComponent: () => import('./views/certificate-list/certificate-list.component').then(m => m.CertificateListComponent),
  },
];

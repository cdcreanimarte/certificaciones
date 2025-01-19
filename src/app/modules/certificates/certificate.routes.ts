import { Routes } from '@angular/router';

export const certificateRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./views/certificate-dashboard/certificate-dashboard.component')
      .then(m => m.CertificateDashboardComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./views/certificate-container/certificate-container.component')
      .then(m => m.CertificateContainerComponent),
  },
  {
    path: 'list',
    loadComponent: () => import('./views/certificate-list/certificate-list.component')
      .then(m => m.CertificateListComponent),
  }
];

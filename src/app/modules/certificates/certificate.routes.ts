import { CertificateContainerComponent } from './views/certificate-container/certificate-container.component';
import { Routes } from '@angular/router';

export const certificateRoutes: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./views/certificate-container/certificate-container.component').then(m => m.CertificateContainerComponent),
  },
  {
    path: 'list',
    loadComponent: () => import('./views/certificate-list/certificate-list.component').then(m => m.CertificateListComponent),
  },
];

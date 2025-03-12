import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { MaterialModule } from '../../../../shared/material.module';
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../../../core/models/certificate';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-certificate-list',
  imports: [MaterialModule, TableComponent, RouterLink, CommonModule],
  templateUrl: './certificate-list.component.html',
  styleUrl: './certificate-list.component.scss'
})
export class CertificateListComponent {
  private _router = inject(Router);
  private _certificateSrv = inject(CertificateService);

  certificates = this._certificateSrv.certificates;
  loading = this._certificateSrv.loading;
  error = this._certificateSrv.error;

  ngOnInit() {
    this._certificateSrv.list();
  }

  reloadCertificates() {
    this._certificateSrv.list();
  }

  async onEditCertificate(certificate: Certificate) {
    this._router.navigate(['/administration/edit', certificate.id]);
  }

  async onDeleteCertificate(certificate: Certificate) {
    try {
      await this._certificateSrv.delete(certificate.id);
      toast.success('Certificado eliminado exitosamente');
    } catch (error: any) {
      console.error('Error al eliminar:', error);
      toast.error(error.message || 'Error al eliminar el certificado');
    }
  }

  onViewCertificate(certificate: any) {
    // Implementar lógica de visualización según sea necesario
  }
}

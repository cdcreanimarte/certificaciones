import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../../../auth/views/sign-in/sign-in.component';
import { MaterialModule } from '../../../../shared/material.module';
import { SignUpComponent } from '../../../auth/views/sign-up/sign-up.component';
import { CertificateService } from '../../services/certificate.service';
import { toast } from 'ngx-sonner';
import * as packageJson from './../../../../../../package.json';
import { Certificate } from '../../../../core/models/certificate';
import { format, isAfter, parseISO } from 'date-fns';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-certificate-validate',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule, ReactiveFormsModule],
  templateUrl: './certificate-validate.component.html',
  styleUrl: './certificate-validate.component.scss'
})
export class CertificateValidateComponent {
  version = packageJson.version;
  validateForm: FormGroup;
  loading = false;
  showCertificate = false;
  certificateData: Certificate | null = null;
  isSidenavOpen = false;

  private _fb = inject(FormBuilder);
  private _certificateSrv = inject(CertificateService);
  readonly dialog = inject(MatDialog);

  constructor() {
    this.validateForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  isCertificateActive(validityYear: string): boolean {
    const currentDate = new Date();
    const validityDate = new Date(parseInt(validityYear), 11, 31); // Último día del año de validez
    return isAfter(validityDate, currentDate);
  }

  getStatusText(): string {
    return this.certificateData && this.isCertificateActive(this.certificateData.validityYear)
      ? 'Activo'
      : 'Revocado';
  }

  getFormattedDate(date: string): string {
    return format(parseISO(date), 'dd/MM/yyyy');
  }

  async validateCertificate(): Promise<void> {
    if (this.validateForm.invalid) {
      return;
    }

    try {
      this.loading = true;
      this.showCertificate = false;
      const code = this.validateForm.get('code')?.value;

      const certificate = await this._certificateSrv.validateCertificate(code);

      if (certificate) {
        this.certificateData = certificate;
        this.showCertificate = true;
        const status = this.isCertificateActive(certificate.validityYear) ? 'activo' : 'revocado';
        toast.success(`Certificado encontrado - Estado: ${status}`);
      } else {
        toast.error('Certificado no encontrado');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al validar el certificado');
      this.showCertificate = false;
    } finally {
      this.loading = false;
    }
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  openDialogSignIn(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SignInComponent, {
      width: '460px',
      maxWidth: '460px',
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'login-dialog',
      autoFocus: true
    });
  }

  openDialogSignUp(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SignUpComponent, {
      width: '460px',
      maxWidth: '460px',
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'login-dialog',
      autoFocus: true
    });
  }
}

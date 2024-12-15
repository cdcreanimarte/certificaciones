import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import * as packageJson from './../../../../../../package.json';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../../../auth/views/sign-in/sign-in.component';
import { MaterialModule } from '../../../../shared/material.module';

@Component({
  selector: 'app-certificate-validate',
  imports: [CommonModule, MaterialModule],
  templateUrl: './certificate-validate.component.html',
  styleUrl: './certificate-validate.component.scss'
})
export class CertificateValidateComponent {
  version = packageJson.version;
  showCertificate = false;
  isLoginModalOpen = false;
  isSidenavOpen = false; // Nueva propiedad
  certificateCode = '';
  certificateData = {
    course: 'Angular 14 PRO desde cero',
    student: 'Néstor Ivan Martinez Cobo',
    dates: 'Del 30 de octubre de 2022 al 29 de enero de 2023',
    duration: '58 horas',
    isValid: true // Añadimos esta propiedad para controlar el estado del certificado
  };

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {}

  validateCertificate(): void {
    if (this.certificateCode.trim()) {
      const currentDate = new Date();
      const expirationDate = new Date('2024-01-29');
      this.certificateData.isValid = currentDate <= expirationDate;
      this.showCertificate = true;
    }
  }

/*   toggleLoginModal(): void {
    this.isLoginModalOpen = !this.isLoginModalOpen;
  } */

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SignInComponent, {
      width: '460px',
      maxWidth: '460px',
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'login-dialog',
      autoFocus: true
    });
  }
}

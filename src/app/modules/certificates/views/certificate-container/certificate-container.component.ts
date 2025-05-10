import { CertificateCreate } from './../../../../core/models/certificate';
// certificate-container.component.ts
import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateFormComponent } from "../certificate-form/certificate-form.component";
import { CertificatePreviewComponent } from "../certificate-preview/certificate-preview.component";
import { CertificateService } from '../../services/certificate.service';
import { toast } from 'ngx-sonner';
import { CertificateCodeService } from '../../../../shared/services/certificate-code.service';

@Component({
  selector: 'app-certificate-container',
  standalone: true,
  imports: [CommonModule, CertificateFormComponent, CertificatePreviewComponent],
  templateUrl: './certificate-container.component.html',
  styleUrl: './certificate-container.component.scss'
})
export class CertificateContainerComponent {
  @ViewChild('certificateElement') certificateElement!: CertificatePreviewComponent;
  certificateGenerated = false;
  certificateData: any = null;
  currentDate = new Date();
  yearSelected: Date = new Date();
  certificateCode: string = '';
  isGenerating = false;

  private _certificateSrv = inject(CertificateService);
  private _certificateCodeSrv = inject(CertificateCodeService);

  onFormValueChanged(formValue: any) {
    // Actualizamos los datos sin generar el código
    this.certificateData = formValue;
    
    // Usar la fecha de emisión seleccionada
    if (formValue.issueDate) {
      this.currentDate = new Date(formValue.issueDate);
    }

    if (this.certificateGenerated) {
      // Si ya se generó una vista previa, actualizamos también el código
      const certCode = this._certificateCodeSrv.generateCertificateCode(
        formValue.documentNumber,
        parseInt(formValue.validityYear),
        formValue.courseName,
        formValue.issueDate // Pasar la fecha de emisión seleccionada
      );
      this.certificateCode = certCode.code;
    }
  }

  onPreviewGenerated(data: any) {
    const { formData, certCode } = data;
    this.certificateData = formData;
    this.certificateCode = certCode.code;
    this.yearSelected = new Date(parseInt(formData.validityYear), 0, 1);
    
    // Usar la fecha de emisión seleccionada para la vista previa
    if (formData.issueDate) {
      this.currentDate = new Date(formData.issueDate);
    }
    
    this.certificateGenerated = true;
  }

  async onDownloadRequested() {
    if (!this.certificateGenerated || this.isGenerating) return;

    try {
        this.isGenerating = true;
        const pdfBlob = await this._certificateSrv.generatePDF(
            this.certificateData,
            this.currentDate,
            this.yearSelected,
            this.certificateCode
        );

        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Certificado_${this.certificateData.studentName}.pdf`;
        link.click();

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error en el proceso del certificado:', error);
        toast.error('Error al procesar el certificado');
    } finally {
        this.isGenerating = false;
    }
  }

  async onSaveRequested(certificateData: CertificateCreate) {
    if (!certificateData) {
      toast.error('No hay datos del certificado para guardar');
      return;
    }

    try {
      await this._certificateSrv.add(certificateData);
      toast.success('Certificado guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el certificado:', error);
      toast.error('El certificado no pudo ser guardado');
    }
  }
}

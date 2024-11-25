import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CertificateService } from '../../services/certificate.service';
import { NgxMaskPipe } from 'ngx-mask';
import { CertificateCodeService } from '../../../../shared/services/certificate-code.service';
import { DocumentType, ValidationRules } from '../../../../core/models/document-type';
import { MaterialModule } from '../../../../shared/material.module';

@Component({
  selector: 'app-certificate-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxMaskPipe, MaterialModule],
  templateUrl: './certificate-form.component.html',
  styleUrl: './certificate-form.component.scss'
})
export class CertificateFormComponent {

  @ViewChild('certificateElement') certificateElement!: ElementRef;

  certificateForm!: FormGroup;
  certificateGenerated = false;
  currentDate = new Date();
  isGenerating = false;
  documentTypes: DocumentType[] = [];
  selectedDocumentType: DocumentType | null = null;
  validityYears: number[] = [];
  yearSelected = new Date();
  certificateCode: string = '';
  certificateMetadata: any = null;
  readonly YEARS_TO_SHOW = 10; // Cantidad de años futuros a mostrar

  constructor(
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private certificateCodeSrv: CertificateCodeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.generateValidityYears();
    this.loadDocumentTypes();
  }

  private initForm(): void {
    this.certificateForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      expeditionPlace: ['', [Validators.required, Validators.minLength(3)]],
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      hours: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      validityYear: ['', [Validators.required]]
    });

/*     this.certificateForm = this.fb.group({
      studentName: ['NESTOR IVÁN MARTINEZ COBO', [Validators.required, Validators.minLength(3)]],
      documentType: ['CC', [Validators.required]],
      documentNumber: ['1061779667', [Validators.required]],
      expeditionPlace: ['POPAYÁN', [Validators.required, Validators.minLength(3)]],
      courseName: ['Humanización de los Servicios de Salud', [Validators.required, Validators.minLength(3)]],
      hours: ['40', [Validators.required, Validators.min(1)]],
      email: ['sksmartinez@gmail.com', [Validators.required, Validators.email]],
      validityYear: ['2026', [Validators.required]]
    }); */

    this.setupFormValidations();
  }

  private setupFormValidations(): void {
    this.certificateForm.get('documentType')?.valueChanges.subscribe(value => {
      this.selectedDocumentType = this.documentTypes.find(type => type.tipo === value) ?? null;
      this.updateDocumentValidations();
    });

    this.certificateForm.get('validityYear')?.valueChanges.subscribe(value => {
      console.log(value);
      this.yearSelected = value;
    });

  }

  private updateDocumentValidations(): void {
    if (this.selectedDocumentType) {
      try {
        // Convertir el string de reglas a un objeto válido
        const rulesString = this.selectedDocumentType.reglasValidacion
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Añade comillas a las keys
          .replace(/'/g, '"') // Reemplaza comillas simples por dobles
          .replace(/\s/g, ''); // Elimina espacios en blanco

        const rules: ValidationRules = JSON.parse(rulesString);
        const validators = [Validators.required];

        if (rules.min) validators.push(Validators.minLength(rules.min));
        if (rules.max) validators.push(Validators.maxLength(rules.max));
        if (rules.pattern) validators.push(Validators.pattern(rules.pattern));

        this.certificateForm.get('documentNumber')?.setValidators(validators);
        this.certificateForm.get('documentNumber')?.updateValueAndValidity();
      } catch (error) {
        console.error('Error parsing validation rules:', error);
        // En caso de error, aplicar validaciones por defecto
        this.certificateForm.get('documentNumber')?.setValidators([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]);
      }
    }
  }

  private generateValidityYears(): void {
    const currentYear = new Date().getFullYear();
    this.validityYears = Array.from(
      { length: this.YEARS_TO_SHOW },
      (_, i) => currentYear + i + 1
    );
  }

  loadDocumentTypes(): void {
    this.certificateService.getDocumentTypes().subscribe({
      next: (data: DocumentType[]) => {
        this.documentTypes = data;
        console.log(this.documentTypes);

      },
      error: (error) => {
        console.error('Error loading document types:', error);
      }
    });
  }

  getDocumentErrorMessage(): string {
    const control = this.certificateForm.get('documentNumber');
    if (!control?.errors) return '';

    try {
      const rules = this.parseValidationRules(this.selectedDocumentType?.reglasValidacion || '');

      if (control.errors['required']) return 'El número de documento es requerido';
      if (control.errors['minlength']) {
        return `El documento debe tener mínimo ${rules.min} caracteres`;
      }
      if (control.errors['maxlength']) {
        return `El documento debe tener máximo ${rules.max} caracteres`;
      }
      if (control.errors['pattern']) {
        const patternMessages: { [key: string]: string } = {
          '[0-9]+': 'Solo se permiten números',
          '[A-Za-z0-9]+': 'Solo se permiten letras y números',
          '[0-9]{8}': 'Debe contener exactamente 8 números',
          '[0-9]{10}': 'Debe contener exactamente 10 números'
        };
        return patternMessages[rules.pattern || ''] || 'Formato de documento inválido';
      }
    } catch {
      return 'Formato de documento inválido';
    }

    return '';
  }

  getMaxLength(): number | null {
    if (!this.selectedDocumentType) return null;
    try {
      const rulesString = this.selectedDocumentType.reglasValidacion
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
        .replace(/'/g, '"')
        .replace(/\s/g, '');
      const rules: ValidationRules = JSON.parse(rulesString);
      return rules.max || null;
    } catch {
      return null;
    }
  }

  /**
   * Convierte el string de reglas de validación a un objeto
   */
  private parseValidationRules(rulesString: string): ValidationRules {
    try {
      const normalizedString = rulesString
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Añade comillas a las keys
        .replace(/'/g, '"') // Reemplaza comillas simples por dobles
        .replace(/\s/g, ''); // Elimina espacios en blanco

      return JSON.parse(normalizedString);
    } catch (error) {
      console.error('Error parsing validation rules:', error);
      // Retornar reglas por defecto en caso de error
      return {
        min: 3,
        max: 20,
        pattern: '[0-9]+'
      };
    }
  }

  generateCertificate(): void {
    if (this.certificateForm.valid) {
      const formValues = this.certificateForm.value;

      // Generar código único del certificado
      const certCode = this.certificateCodeSrv.generateCertificateCode(
        formValues.documentNumber,
        parseInt(formValues.validityYear),
        formValues.courseName
      );

      // Guardar el código y metadata para uso posterior
      this.certificateCode = certCode.code;
      this.certificateMetadata = certCode.metadata;

      // Activar la vista previa del certificado
      this.certificateGenerated = true;

      this.decode();
    }
  }

  decode(): void {
    console.log('Decodificando:', this.certificateCode);
    const documentNumber = this.certificateForm.get('documentNumber')?.value;
    console.log('Número de documento:', documentNumber);

    const decodedInfo = this.certificateService.decodeCertificateCode(
      this.certificateCode,
      documentNumber
    );

    if (decodedInfo) {
      console.log('Información decodificada:', decodedInfo);
      if (decodedInfo.verification.studentIdMatch) {
        console.log('¡El certificado pertenece al estudiante!');
      } else {
        console.log('El certificado NO corresponde al estudiante proporcionado');
      }
    } else {
      console.log('No se pudo decodificar el certificado');
    }
  }

  async downloadCertificate(): Promise<void> {
    if (!this.certificateGenerated || this.isGenerating) return;

    try {
      this.isGenerating = true;
      const element = this.certificateElement.nativeElement;
      const pdfBlob = await this.certificateService.generatePDF(element);

      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificado_${this.certificateForm.get('studentName')?.value}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.isGenerating = false;
    }
  }

  sendEmail(): void {
    // Implementación pendiente del envío de email
  }
}

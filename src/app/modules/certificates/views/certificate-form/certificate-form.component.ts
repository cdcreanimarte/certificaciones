import { Component,  ElementRef,  EventEmitter,  inject,  Input,  Output,  ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CertificateService } from '../../services/certificate.service';
import { CertificateCodeService } from '../../../../shared/services/certificate-code.service';
import { DocumentType, ValidationRules } from '../../../../core/models/document-type';
import { MaterialModule } from '../../../../shared/material.module';
import { COURSE_LIST } from '../../../../shared/constant/course-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CertificateCode, CertificateCreate } from '../../../../core/models/certificate';
import { toast } from 'ngx-sonner';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import localeEs from '@angular/common/locales/es';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Registrar la configuración regional española
registerLocaleData(localeEs);

// Formato de fecha personalizado (día/mes/año)
export const DD_MM_YYYY_FORMAT = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-certificate-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './certificate-form.component.html',
  styleUrl: './certificate-form.component.scss',
  providers: [
    // Configurar locale para español
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    // Configurar formato de fecha personalizado
    { provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_FORMAT },
  ],
})
export class CertificateFormComponent {
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('docInput') docInput!: ElementRef<HTMLInputElement>;
  @ViewChild('placeInput') placeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('hoursInput') hoursInput!: ElementRef<HTMLInputElement>;

  @Input() isPreviewGenerated = false;
  @Input() certificateCode: string = '';

  @Output() previewGenerated = new EventEmitter<any>();
  @Output() downloadRequested = new EventEmitter<void>();
  @Output() saveRequested = new EventEmitter<CertificateCreate>();
  @Output() formValueChanged = new EventEmitter<any>();

  // Propiedades del formulario
  certificateForm!: FormGroup;
  filteredCourses: string[] = COURSE_LIST;
  readonly YEARS_TO_SHOW = 5;

  // Estado del componente
  certificateGenerated = false;
  isGenerating = false;
  currentDate = new Date();
  yearSelected: Date = new Date();
  maxIssueDate = new Date();
  minIssueDate = new Date();

  // Datos del certificado
  documentTypes: DocumentType[] = [];
  selectedDocumentType: DocumentType | null = null;
  validityYears: number[] = [];
  certificateMetadata: any = null;
  certificate!: CertificateCreate;

  private _fb = inject(FormBuilder);
  private _certificateSrv = inject(CertificateService);
  private _certificateCodeSrv = inject(CertificateCodeService);
  private _dateAdapter: DateAdapter<Date> = inject(DateAdapter);

  constructor(@Inject(MAT_DATE_LOCALE) private _locale: string) {
    // Configurar el adaptador de fecha para usar español
    this._dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.initForm();
    this.generateValidityYears();
    this.loadDocumentTypes();
    this.setupDateLimits();
  }

  private setupDateLimits(): void {
    // Set max date to 5 months from current date
    this.maxIssueDate = new Date();
    this.maxIssueDate.setMonth(this.maxIssueDate.getMonth() + 5);
    
    // Set min date to 5 months ago
    this.minIssueDate = new Date();
    this.minIssueDate.setMonth(this.minIssueDate.getMonth() - 5);
  }

  private initForm(): void {
    this.certificateForm = this._fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      expeditionPlace: ['', [Validators.required, Validators.minLength(3)]],
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      hours: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      validityYear: ['', [Validators.required]],
      issueDate: [new Date(), [Validators.required]]
    });

    this.setupFormValidations();
  }

  private setupFormValidations(): void {
    this.certificateForm.get('documentType')?.valueChanges.subscribe(value => {
      this.selectedDocumentType = this.documentTypes.find(type => type.tipo === value) ?? null;
      this.updateDocumentValidations();
    });

    this.certificateForm.get('validityYear')?.valueChanges.subscribe(value => {
      if (value) {
        this.yearSelected = new Date(parseInt(value), 0, 1);
      }
    });

    this.certificateForm.get('courseName')?.valueChanges.subscribe(value => {
      if (typeof value === 'string' && !COURSE_LIST.includes(value)) {
        this.filterCourses({ target: { value } });
      }
    });

    this.certificateForm.get('issueDate')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedDate = new Date(value);
        if (selectedDate > this.maxIssueDate) {
          this.certificateForm.get('issueDate')?.setErrors({ futureDate: true });
        } else if (selectedDate < this.minIssueDate) {
          this.certificateForm.get('issueDate')?.setErrors({ pastDate: true });
        }
        
        // Emitir el valor del formulario para actualizar la previsualización
        this.formValueChanged.emit(this.certificateForm.value);
      }
    });

    // Suscribirse a cambios del formulario
    this.certificateForm.valueChanges.subscribe(value => {
      this.formValueChanged.emit(value);
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

  onInputTransform(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    switch(controlName) {
      case 'studentName':
      case 'expeditionPlace':
        value = value.toUpperCase(); // Convertir a mayúsculas
        break;
      case 'email':
        value = value.toLowerCase(); // Convertir a minúsculas
        break;
    }

    this.certificateForm.get(controlName)?.setValue(value, { emitEvent: false });
  }

  private loadDocumentTypes(): void {
    this._certificateSrv.getDocumentTypes().subscribe({
      next: (data: DocumentType[]) => {
        this.documentTypes = data;
        console.log(this.documentTypes);

      },
      error: (error) => {
        console.error('Error loading document types:', error);
      }
    });
  }

  filterCourses(event: any): void {
    const value = event.target.value;
    const selectedValue = this.certificateForm.get('courseName')?.value;

    if (typeof selectedValue === 'string' && COURSE_LIST.includes(selectedValue) && value !== selectedValue) {
      this.certificateForm.patchValue({ courseName: '' });
    }

    const filterValue = value.toLowerCase();
    this.filteredCourses = COURSE_LIST.filter(course =>
      course.toLowerCase().includes(filterValue)
    );
  }

  displayFn(course: string): string {
    return course || '';
  }

  onCourseSelected(event: MatAutocompleteSelectedEvent): void {
    const input = document.querySelector('input[formControlName="courseName"]') as HTMLInputElement;
    if (input) {
      input.blur();
    }
  }

  clearField(fieldName: string, input: ElementRef<HTMLInputElement> | HTMLInputElement): void {
    this.certificateForm.get(fieldName)?.reset();
    if (input instanceof ElementRef) {
      input.nativeElement.focus();
    } else {
      input.focus();
    }
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
    if (this.certificateForm.invalid) return;

    const formValues = this.certificateForm.value;
    const certCode: CertificateCode = this._certificateCodeSrv.generateCertificateCode(
      formValues.documentNumber,
      parseInt(formValues.validityYear),
      formValues.courseName,
      formValues.issueDate
    );

    // En lugar de manejar internamente la vista previa, emitimos los datos
    this.previewGenerated.emit({
      formData: formValues,
      certCode: certCode
    });
  }

  downloadCertificate(): void {
    this.downloadRequested.emit();
  }

  onSubmit(): void {
    if (!this.certificateForm.value || !this.certificateCode) {
      toast.error('No hay datos del certificado para guardar');
      return;
    }

    // Preparamos los datos con el formato correcto
    const issueDate = this.certificateForm.value.issueDate instanceof Date 
      ? this.certificateForm.value.issueDate.toISOString() 
      : new Date(this.certificateForm.value.issueDate).toISOString();

    const certificateData: CertificateCreate = {
      studentName: this.certificateForm.value.studentName,
      documentType: this.certificateForm.value.documentType,
      documentNumber: this.certificateForm.value.documentNumber,
      expeditionPlace: this.certificateForm.value.expeditionPlace,
      courseName: this.certificateForm.value.courseName,
      hours: this.certificateForm.value.hours,
      email: this.certificateForm.value.email,
      validityYear: this.certificateForm.value.validityYear,
      code: this.certificateCode,
      issueDate: issueDate
    };

    this.saveRequested.emit(certificateData);
  }

  sendEmail(): void {
    // Implementación pendiente del envío de email
  }

  decode(): void {
    console.log('Decodificando:', this.certificateCode);
    const documentNumber = this.certificateForm.get('documentNumber')?.value;
    console.log('Número de documento:', documentNumber);

    const decodedInfo = this._certificateSrv.decodeCertificateCode(
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

  getIssueDateErrorMessage(): string {
    const control = this.certificateForm.get('issueDate');
    if (!control?.errors) return '';

    if (control.errors['required']) return 'La fecha de emisión es requerida';
    if (control.errors['futureDate']) return 'La fecha no puede exceder los 5 meses desde hoy';
    if (control.errors['pastDate']) return 'La fecha no puede ser anterior a 5 meses desde hoy';
    
    return '';
  }

  // Método para formatear la fecha en formato DD/MM/YYYY
  formatDate(date: Date): string {
    return format(date, 'dd/MM/yyyy', { locale: es });
  }

  // Método para obtener la fecha actual en formato DD/MM/YYYY para mostrar
  get currentFormattedDate(): string {
    return this.formatDate(new Date());
  }

  // Sobrescribir el método para actualizar y formatear la fecha cuando cambia
  onDateChange(event: any): void {
    if (event && event.value) {
      const formattedDate = this.formatDate(event.value);
      console.log('Fecha formateada:', formattedDate);
      // Si se necesita actualizar algo específico con la fecha formateada
    }
  }
}

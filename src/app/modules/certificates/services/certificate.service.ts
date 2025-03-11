import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { DocumentType } from '../../../core/models/document-type';
import { format, endOfYear, startOfYear } from 'date-fns';
import { Certificate, CertificateCode, CertificateCreate, CertificateState, DecodedCertificateInfo } from '../../../core/models/certificate';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { AuthService } from '../../auth/services/auth.service';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private readonly CERTIFICATE_PREFIX = 'CDC';
  private readonly HASH_LENGTH = 4;
  private readonly RANDOM_LENGTH = 4;
  private readonly TABLE = 'certificates'; // Nombre de la tabla en Supabase

  private _http = inject(HttpClient);
  private _authSrv = inject(AuthService);
  private _supabaseClient = inject(SupabaseService).supabaseClient;
  private _state = signal<CertificateState>({ certificates: [], loading: false, error: '', selectedCertificate: null  });

  // * Selectors
  certificates = computed(() => this._state().certificates);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);
  selectedCertificate = computed(() => this._state().selectedCertificate);

  async list() {
    this._state.update((state) => ({ ...state, loading: true }));
    const userId = await this._authSrv.getUserId();
    
    const { data, error } = await this._supabaseClient
      .from(this.TABLE)
      .select()
      .eq('user_id', userId)
      .returns<Certificate[]>();

    if (error) {
      this._state.update((state) => ({ ...state, error: error.message }));
    } else {
      this._state.update((state) => ({ ...state, certificates: data }));
    }
    this._state.update((state) => ({ ...state, loading: false }));
  }

  async add(certificate: CertificateCreate) {
    try {
      const userId = await this._authSrv.getUserId();

      const certificateToSave = {
        ...certificate,
        created_at: new Date().toISOString(),
        user_id: userId
      };

      const { data, error } = await this._supabaseClient
        .from(this.TABLE)
        .insert(certificateToSave)
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        this._state.update((state) => ({
          ...state,
          certificates: [...state.certificates, data]
        }));
      }

      return data;
    } catch (error) {
      console.error('Error adding certificate:', error);
      throw error;
    }
  }

  async getOne(id: string) {
    try {
      this._state.update((state) => ({ ...state, loading: true }));
      const userId = await this._authSrv.getUserId();

      const { data, error } = await this._supabaseClient
        .from(this.TABLE)
        .select()
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (data) {
        this._state.update((state) => ({
          ...state,
          selectedCertificate: data
        }));
      }

      return data;
    } catch (error) {
      this._state.update((state) => ({
        ...state,
        error: 'Error fetching certificate'
      }));
      throw error;
    } finally {
      this._state.update((state) => ({ ...state, loading: false }));
    }
  }

  async update(id: string, certificate: Partial<CertificateCreate>) {
    try {
      const userId = await this._authSrv.getUserId();

      const { data, error } = await this._supabaseClient
        .from(this.TABLE)
        .update(certificate)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        this._state.update((state) => ({
          ...state,
          certificates: state.certificates.map(cert =>
            cert.id === id ? { ...cert, ...data } : cert
          )
        }));
      }

      return data;
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const userId = await this._authSrv.getUserId();

      const { error } = await this._supabaseClient
        .from(this.TABLE)
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      this._state.update((state) => ({
        ...state,
        certificates: state.certificates.filter(cert => cert.id !== id)
      }));

      return true;
    } catch (error) {
      console.error('Error deleting certificate:', error);
      throw error;
    }
  }

  async validateCertificate(code: string): Promise<Certificate | null> {
    try {
      const { data, error } = await this._supabaseClient
        .from(this.TABLE)
        .select()
        .eq('code', code)
        .maybeSingle(); // Usamos maybeSingle en lugar de single

      // Si hay error que no sea de "no resultados", lo lanzamos
      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // Si no hay datos o hay error de "no resultados", retornamos null
      if (!data || error?.code === 'PGRST116') {
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error validating certificate:', error);
      throw error;
    }
  }

  getDocumentTypes(): Observable<DocumentType[]> {
    return this._http.get<DocumentType[]>(`${environment.apiDocumentTypes}`);
  }

  async loadImage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = () => reject(new Error('Error loading image'));

      img.src = url;
    });
  }

  async generatePDF(formData: any, currentDate: Date, yearSelected: Date, certificateCode: string): Promise<Blob> {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    try {
      const pageWidth = 297;
      const pageHeight = 210;
      const leftMargin = -20; // Reducimos el margen izquierdo
      const textWidth = 220; // Ancho máximo para el texto centrado

      // Cargar imagen de fondo
      try {
        const backgroundImage = await this.loadImage('images/template-certificado.png');
        doc.addImage(backgroundImage, 'PNG', 0, 0, pageWidth, pageHeight);
      } catch (error) {
        console.error('Error loading background image:', error);
      }

      // Configurar color del texto
      doc.setTextColor(44, 62, 80);

      // Título en Y=72 como referencia base
      doc.setFontSize(14);
      doc.text('DE ASISTENCIA SEGÚN RESOLUCIÓN 3100 DE 2019', leftMargin + (textWidth/2), 72, { align: 'center' });

      // Info empresa (8px después del título)
      doc.text('NIT 9012123811 CDCREANIMARTE', leftMargin + (textWidth/2), 80, { align: 'center' });

      // Nombre estudiante
      doc.setFontSize(20);
      doc.text(formData.studentName.toUpperCase(), leftMargin + (textWidth/2), 100, { align: 'center' });

      // Información del documento
      doc.setFontSize(16);
      doc.setFont('normal');
      const idText = `IDENTIFICADO CON ${formData.documentType}: ${formData.documentNumber} DE ${formData.expeditionPlace.toUpperCase()}`;
      doc.text(idText, leftMargin + (textWidth/2), 109, { align: 'center' });
      // Volver a normal

      // Información del curso
      doc.text('Asistió y aprobó el curso', leftMargin + (textWidth/2), 124, { align: 'center' });
      doc.setFontSize(20);
      doc.text(formData.courseName, leftMargin + (textWidth/2), 131, { align: 'center' });
      doc.setFontSize(16);
      doc.text(`con una intensidad de ${formData.hours} horas.`, leftMargin + (textWidth/2), 138, { align: 'center' });

      // Firmas
      try {
        const firmaRep = await this.loadImage('images/fir_rep_legal.jpg');
        const firmaDir = await this.loadImage('images/fir_dir_general.jpg');

        const firmaY = 142;
        // Ajustamos las firmas más a la izquierda
        doc.addImage(firmaRep, 'JPEG', leftMargin + 65, firmaY, 30, 30);
        doc.addImage(firmaDir, 'JPEG', leftMargin + 125, firmaY, 30, 30);

        doc.setFontSize(12);
        doc.text('Representante Legal', leftMargin + 80, firmaY + 32, { align: 'center' });
        doc.text('Director General', leftMargin + 140, firmaY + 32, { align: 'center' });
      } catch (error) {
        console.error('Error loading signature images:', error);
      }

      // Información de verificación
      const verificationX = pageWidth - 272;
      const verificationY = 190;
      const lineHeight = 6;

      doc.setFontSize(12);
      doc.text(`Emitido: ${format(currentDate, 'dd/MM/yyyy')}`, verificationX, verificationY);
      doc.text(`Vigencia: ${format(currentDate, 'yyyy')} - ${format(yearSelected, 'yyyy')}`, verificationX, verificationY + lineHeight);
      doc.text(`Código: ${certificateCode}`, verificationX, verificationY + (lineHeight * 2));

      // Link de verificación
      doc.setTextColor(44, 62, 80); // Color negro
      doc.text('Verificar:', verificationX, verificationY + (lineHeight * 3));

      // URL en azul, en la misma línea
      doc.setTextColor(74, 144, 226); // Color azul
      const verifyTextWidth = doc.getTextWidth('Verificar: ');
      doc.text('https://cdcreanimarte.github.io/certificaciones', verificationX + verifyTextWidth, verificationY + (lineHeight * 3));

      return doc.output('blob');
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Error generating PDF');
    }
  }

  sendEmail(email: string, pdfBlob: Blob) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('pdf', pdfBlob, 'certificate.pdf');
    //return this.http.post(`${environment.apiUrl}/send-email`, formData);
  }

  // Métodos para manejo de códigos de certificado
  generateCertificateCode(
    studentId: string,
    validityYear: number,
    courseId?: string
  ): CertificateCode {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Generar componentes del código
    const yearCode = this.generateYearCode(currentYear, validityYear);
    const studentHash = this.hashString(studentId).slice(0, this.HASH_LENGTH);
    const randomComponent = this.generateRandomString(this.RANDOM_LENGTH);

    // Construir código completo
    const code = `${this.CERTIFICATE_PREFIX}-${yearCode}${studentHash}${randomComponent}`;

    return {
      code,
      metadata: {
        generatedAt: now.getTime(),
        formattedDate: format(now, 'dd/MM/yyyy'),
        validFrom: format(startOfYear(now), 'yyyy-MM-dd'),
        validUntil: format(endOfYear(new Date(validityYear, 0)), 'yyyy-MM-dd'),
        formattedValidFrom: format(startOfYear(now), 'dd/MM/yyyy'),
        formattedValidUntil: format(endOfYear(new Date(validityYear, 0)), 'dd/MM/yyyy'),
        studentId,
        courseId,
        yearCode,
        validity: {
          startYear: currentYear,
          endYear: validityYear,
          durationYears: validityYear - currentYear
        }
      }
    };
  }

  decodeCertificateCode(code: string, studentId?: string): DecodedCertificateInfo | null {
    if (!this.validateCertificateCode(code)) {
      console.log('Código inválido:', code);
      return null;
    }

    try {
      // Separar componentes del código
      const [prefix, components] = code.split('-');
      if (!components) {
        console.log('No se encontraron componentes después del guion');
        return null;
      }

      // Extraer cada parte del código
      const issuedYear = parseInt('20' + components.slice(0, 2));
      const duration = parseInt(components.slice(2, 4));
      const storedHash = components.slice(4, 4 + this.HASH_LENGTH);
      const randomPart = components.slice(4 + this.HASH_LENGTH);

      // Calcular fechas
      const startDate = new Date(issuedYear, 0, 1);
      const endDate = new Date(issuedYear + duration, 11, 31);

      // Verificar autenticidad si se proporciona el número de documento
      let isAuthentic = false;
      let studentIdMatch = false;

      if (studentId) {
        const calculatedHash = this.hashString(studentId).slice(0, this.HASH_LENGTH);
        studentIdMatch = calculatedHash === storedHash;
        isAuthentic = studentIdMatch;
      }

      return {
        isValid: true,
        isAuthentic,
        details: {
          prefix,
          issuedYear,
          validityYears: duration,
          endYear: issuedYear + duration,
          studentHash: storedHash,
          randomIdentifier: randomPart,
          dates: {
            issuedDate: format(startDate, 'dd/MM/yyyy'),
            expirationDate: format(endDate, 'dd/MM/yyyy')
          }
        },
        verification: {
          studentIdProvided: !!studentId,
          studentIdMatch,
          originalStudentId: studentIdMatch ? studentId : undefined
        },
        reconstructedCode: code
      };
    } catch (error) {
      console.error('Error decoding certificate:', error);
      return null;
    }
  }

  private generateYearCode(currentYear: number, validityYear: number): string {
    const yearDiff = validityYear - currentYear;
    return `${format(new Date(currentYear, 0), 'yy')}${yearDiff.toString().padStart(2, '0')}`;
  }

  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from(
      { length },
      () => chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).toUpperCase();
  }

  private validateCertificateCode(code: string): boolean {
    const pattern = new RegExp(
      `^${this.CERTIFICATE_PREFIX}-\\d{4}[A-Z0-9]{${this.HASH_LENGTH + this.RANDOM_LENGTH}}$`
    );
    return pattern.test(code);
  }
}

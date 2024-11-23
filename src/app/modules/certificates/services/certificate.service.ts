import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { DocumentType } from '../../../core/models/document-type';
import { format, endOfYear, startOfYear } from 'date-fns';
import { CertificateCode, DecodedCertificateInfo } from '../../../core/models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private readonly CERTIFICATE_PREFIX = 'CDC';
  private readonly HASH_LENGTH = 4;
  private readonly RANDOM_LENGTH = 4;

  constructor(private http: HttpClient) {}

  getDocumentTypes(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${environment.apiDocumentTypes}`);
  }

  async generatePDF(element: HTMLElement): Promise<Blob> {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'letter',
      compress: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(imgData, 'JPEG', 0, 0, 279.4, 215.9);

    return pdf.output('blob');
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

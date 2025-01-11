import { Injectable } from '@angular/core';
import { format, endOfYear, startOfYear } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class CertificateCodeService {
  private readonly CERTIFICATE_PREFIX = 'CDC';  // Mantenemos CDC
  private readonly HASH_LENGTH = 3;            // 3 caracteres para el hash
  private readonly RANDOM_LENGTH = 2;          // 2 caracteres aleatorios

  generateCertificateCode(
    studentId: string,
    validityYear: number,
    courseId?: string
  ): CertificateCode {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Generar componentes del código
    const yearCode = this.generateYearCode(currentYear);          // 2 caracteres
    const studentHash = this.hashString(studentId).slice(0, this.HASH_LENGTH); // 3 caracteres
    const randomComponent = this.generateRandomString(this.RANDOM_LENGTH);  // 2 caracteres

    // Construir código completo: CDC-24B5FXY (CDC- + 7 caracteres)
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

  private generateYearCode(currentYear: number): string {
    // Solo usamos los últimos dos dígitos del año actual
    return format(new Date(currentYear, 0), 'yy');
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
    // Convertimos el hash a una combinación de letras y números
    const hashStr = Math.abs(hash).toString(36).toUpperCase();
    return hashStr.replace(/[^A-Z0-9]/g, '');
  }

  validateCertificateCode(code: string): boolean {
    const pattern = new RegExp(
      `^${this.CERTIFICATE_PREFIX}-[A-Z0-9]{7}$`  // Validamos CDC- seguido de exactamente 7 caracteres alfanuméricos
    );
    return pattern.test(code);
  }

  decodeCertificateCode(code: string, studentId?: string): DecodedCertificateInfo | null {
    if (!this.validateCertificateCode(code)) {
      return null;
    }

    try {
      // Separar componentes del código
      const [prefix, components] = code.split('-');

      // Extraer cada parte del código
      const yearCode = components.slice(0, 2);         // Primeros 2 caracteres son el año
      const storedHash = components.slice(2, 5);       // Siguientes 3 caracteres son el hash
      const randomPart = components.slice(5, 7);       // Últimos 2 caracteres son aleatorios

      const issuedYear = parseInt('20' + yearCode);

      // Calcular fechas
      const startDate = new Date(issuedYear, 0, 1);
      const endDate = new Date(issuedYear, 11, 31);

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
          validityYears: 1,  // Ajustado a 1 año por defecto
          endYear: issuedYear,
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
}

// Interfaces
interface CertificateCode {
  code: string;
  metadata: {
    generatedAt: number;
    formattedDate: string;
    validFrom: string;
    validUntil: string;
    formattedValidFrom: string;
    formattedValidUntil: string;
    studentId: string;
    courseId?: string;
    yearCode: string;
    validity: {
      startYear: number;
      endYear: number;
      durationYears: number;
    };
  };
}

interface DecodedCertificateInfo {
  isValid: boolean;
  isAuthentic: boolean;
  details: {
    prefix: string;
    issuedYear: number;
    validityYears: number;
    endYear: number;
    studentHash: string;
    randomIdentifier: string;
    dates: {
      issuedDate: string;
      expirationDate: string;
    };
  };
  verification: {
    studentIdProvided: boolean;
    studentIdMatch: boolean;
    originalStudentId?: string;
  };
  reconstructedCode: string;
}

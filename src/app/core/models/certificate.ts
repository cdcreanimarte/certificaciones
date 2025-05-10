export interface Certificate {
  id: string;
  studentName: string;
  documentType: string;
  documentNumber: string;
  expeditionPlace: string;
  courseName: string;
  hours: string;
  email: string;
  validityYear: string;
  code: string;
  issueDate?: string;
  created_at?: string;
  status?: 'active' | 'revoked';
}

export type CertificateCreate = Omit<Certificate, 'id'>

export interface CertificateState {
  certificates: Certificate[];
  loading: boolean;
  error: string;
  selectedCertificate: Certificate | null;
}

export interface CertificateCode {
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

export interface DecodedCertificateInfo {
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

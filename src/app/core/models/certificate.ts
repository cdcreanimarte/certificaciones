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

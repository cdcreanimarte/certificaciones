export interface DocumentType {
  id: number;
  tipo: string;
  codigoTipo: number;
  reglasValidacion: string;
  nombre: string;
}

export interface ValidationRules {
  min?: number;
  max?: number;
  pattern?: string;
}

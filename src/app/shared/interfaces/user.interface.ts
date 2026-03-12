export interface User {
  id:           string;
  name:         string;
  email:        string;
  role:         UserRole;
  specialty?:   string;
  initials:     string;
  verified:     boolean;
}

export type UserRole = 'medico' | 'paciente';

export interface LoginCredentials {
  email:    string;
  password: string;
  role:     UserRole;
}

export interface RegisterStep1 {
  name:     string;
  email:    string;
  password: string;
  confirm:  string;
  terms:    boolean;
}

export interface RegisterStep2 {
  matricula:    string;
  especialidad: string;
  experiencia:  number;
  universidad:  string;
  graduacion:   number;
  telefono:     string;
  direccion?:   string;
  biografia?:   string;
}

export interface DashboardStats {
  totalPatients:  number;
  todayAppts:     number;
  activePatients: number;
  avgAdherence:   number;
}

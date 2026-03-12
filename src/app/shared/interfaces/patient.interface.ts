import { VitalSign, Medication, Alarm, ConsultHistory, DayAdherence } from './medical.interface';

export interface Patient {
  id:           string;
  name:         string;
  initials:     string;
  avatarColor:  string;
  age:          number;
  bloodType:    string;
  phone:        string;
  allergies:    string[];
  conditions:   string[];
  lastVisit:    string;
  nextAppt:     string;
  adherence:    number;
  status:       PatientStatus;
  statusClass:  ChipClass;
  vitals:       VitalSign[];
  medications:  Medication[];
  alarms:       Alarm[];
  history:      ConsultHistory[];
  weekData:     DayAdherence[];
}

export type PatientStatus = 'Activo' | 'Hoy' | 'Seguimiento' | 'Inactivo';
export type ChipClass     = 'green' | 'blue' | 'orange' | 'gray' | 'red';

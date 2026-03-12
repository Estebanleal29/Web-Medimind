import { Injectable }              from '@angular/core';
import { HttpClient }              from '@angular/common/http';
import { Observable, of }          from 'rxjs';
import { map, catchError, delay }  from 'rxjs/operators';
import { Patient }                 from '../interfaces/patient.interface';
import {
  Medication, Alarm, ConsultHistory,
  VitalSign, DayAdherence
} from '../interfaces/medical.interface';
import { DashboardStats }          from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class PatientService {

  private readonly API_URL = 'https://api.medimind.com/v1';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return of(MOCK_PATIENTS).pipe(delay(300));
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    return of(MOCK_PATIENTS.find(p => p.id === id)).pipe(delay(200));
  }

  getDashboardStats(): Observable<DashboardStats> {
    return of({
      totalPatients:  247,
      todayAppts:     5,
      activePatients: 12,
      avgAdherence:   78
    }).pipe(delay(200));
  }

  getWeeklyAdherence(patientId: string): Observable<DayAdherence[]> {
    const patient = MOCK_PATIENTS.find(p => p.id === patientId);
    return of(patient?.weekData ?? []).pipe(delay(150));
  }

  getMedications(patientId: string): Observable<Medication[]> {
    const patient = MOCK_PATIENTS.find(p => p.id === patientId);
    return of(patient?.medications ?? []).pipe(delay(150));
  }

  addAlarm(patientId: string, alarm: Partial<Alarm>): Observable<Alarm> {
    return of({ id: 'ALM-NEW', ...alarm } as Alarm);
  }
}

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'PAC-2451', name: 'Ana Martínez López', initials: 'AM',
    avatarColor: '#3B82F6', age: 34, bloodType: 'O+',
    phone: '+57 300 123 4567', allergies: ['Penicilina', 'Polen'],
    conditions: ['Hipertensión'], lastVisit: '05 Feb 2026',
    nextAppt: '12 Feb 2026 · 10:00 AM', adherence: 87,
    status: 'Activo', statusClass: 'green',
    vitals: [
      { icon: '❤️', value: '120/80', label: 'Presión Arterial' },
      { icon: '🌡️', value: '36.5°C', label: 'Temperatura' },
      { icon: '📈', value: '72 lpm', label: 'Frec. Cardíaca' },
      { icon: '⚖️', value: '65 kg',  label: 'Peso' }
    ],
    medications: [
      { id: 'MED-01', name: 'Metformina 500mg',   dose: '1 tableta', frequency: 'Todos los días', time: '08:30 AM', colorClass: 'yellow' },
      { id: 'MED-02', name: 'Atorvastatina 20mg', dose: '1 tableta', frequency: 'Todos los días', time: '10:00 PM', colorClass: 'blue'   },
      { id: 'MED-03', name: 'Losartán 50mg',      dose: '1 tableta', frequency: 'Todos los días', time: '12:00 PM', colorClass: 'green-b'}
    ],
    alarms: [
      { id: 'ALM-01', medication: 'Metformina 500mg',   schedule: 'Todos los días · 08:30 AM', detail: 'Con alimentos', tag: 'Activa',        chipClass: 'green'  },
      { id: 'ALM-02', medication: 'Atorvastatina 20mg', schedule: 'Todos los días · 10:00 PM', detail: 'Con agua',      tag: 'Activa',        chipClass: 'green'  },
      { id: 'ALM-03', medication: 'Losartán 50mg',      schedule: 'Todos los días · 12:00 PM', detail: 'Antes de comer',tag: 'Adherencia OK', chipClass: 'orange' }
    ],
    history: [
      { date: '05 Feb 2026 · 09:30 AM', title: 'Control de Rutina',    desc: 'Presión arterial dentro de rangos normales. Se renueva prescripción de Losartán 50mg.' },
      { date: '15 Ene 2026 · 10:15 AM', title: 'Consulta por Cefalea', desc: 'Cefalea tensional. Se prescribe Ibuprofeno 400mg y se recomiendan ejercicios de relajación.' },
      { date: '11 Dic 2025 · 11:00 AM', title: 'Chequeo Anual',        desc: 'Exámenes completos. Valores dentro de rangos normales. Se solicita mamografía de control.' }
    ],
    weekData: [
      { day: 'Lun', pct: 80,  cls: 'green'  },
      { day: 'Mar', pct: 70,  cls: 'green'  },
      { day: 'Mié', pct: 40,  cls: 'orange' },
      { day: 'Jue', pct: 90,  cls: 'green'  },
      { day: 'Vie', pct: 0,   cls: 'empty'  },
      { day: 'Sáb', pct: 50,  cls: 'orange' },
      { day: 'Dom', pct: 100, cls: 'green'  }
    ]
  },
  {
    id: 'PAC-2450', name: 'Carlos Gómez', initials: 'CG',
    avatarColor: '#22C55E', age: 52, bloodType: 'A+',
    phone: '+57 310 456 7890', allergies: ['Aspirina'],
    conditions: ['Diabetes Tipo 2'], lastVisit: '08 Feb 2026',
    nextAppt: 'Hoy · 2:00 PM', adherence: 92,
    status: 'Hoy', statusClass: 'blue',
    vitals: [
      { icon: '❤️', value: '130/85', label: 'Presión Arterial' },
      { icon: '🌡️', value: '36.8°C', label: 'Temperatura'      },
      { icon: '📈', value: '78 lpm', label: 'Frec. Cardíaca'   },
      { icon: '⚖️', value: '82 kg',  label: 'Peso'             }
    ],
    medications: [
      { id: 'MED-04', name: 'Metformina 850mg',  dose: '1 tableta', frequency: 'Todos los días', time: '07:00 AM', colorClass: 'yellow' },
      { id: 'MED-05', name: 'Glibenclamida 5mg', dose: '1 tableta', frequency: 'Todos los días', time: '12:00 PM', colorClass: 'blue'   }
    ],
    alarms: [
      { id: 'ALM-04', medication: 'Metformina 850mg',  schedule: 'Todos los días · 07:00 AM', detail: 'Con desayuno', tag: 'Activa', chipClass: 'green' },
      { id: 'ALM-05', medication: 'Glibenclamida 5mg', schedule: 'Todos los días · 12:00 PM', detail: 'Con almuerzo', tag: 'Activa', chipClass: 'green' }
    ],
    history: [
      { date: '08 Feb 2026 · 08:00 AM', title: 'Control Glicemia', desc: 'Glucosa en ayunas: 98 mg/dL. Excelente control. Se mantiene medicación.' }
    ],
    weekData: [
      { day: 'Lun', pct: 100, cls: 'green'  },
      { day: 'Mar', pct: 90,  cls: 'green'  },
      { day: 'Mié', pct: 100, cls: 'green'  },
      { day: 'Jue', pct: 80,  cls: 'green'  },
      { day: 'Vie', pct: 90,  cls: 'green'  },
      { day: 'Sáb', pct: 100, cls: 'green'  },
      { day: 'Dom', pct: 80,  cls: 'green'  }
    ]
  },
  {
    id: 'PAC-2453', name: 'Laura Rodríguez', initials: 'LR',
    avatarColor: '#F59E0B', age: 61, bloodType: 'B-',
    phone: '+57 320 789 1234', allergies: ['Ibuprofeno'],
    conditions: ['Hipertensión', 'Artritis'], lastVisit: '01 Feb 2026',
    nextAppt: '15 Feb 2026 · 11:30 AM', adherence: 45,
    status: 'Seguimiento', statusClass: 'orange',
    vitals: [
      { icon: '❤️', value: '145/95', label: 'Presión Arterial' },
      { icon: '🌡️', value: '37.1°C', label: 'Temperatura'      },
      { icon: '📈', value: '88 lpm', label: 'Frec. Cardíaca'   },
      { icon: '⚖️', value: '74 kg',  label: 'Peso'             }
    ],
    medications: [
      { id: 'MED-06', name: 'Enalapril 10mg',  dose: '1 tableta', frequency: 'Dos veces al día', time: '08:00 AM',       colorClass: 'yellow' },
      { id: 'MED-07', name: 'Celecoxib 200mg', dose: '1 cápsula', frequency: 'Con dolor',        time: 'Según necesidad', colorClass: 'blue'   }
    ],
    alarms: [
      { id: 'ALM-06', medication: 'Enalapril 10mg', schedule: 'Dos veces al día · 08:00 AM / 08:00 PM', detail: 'Sin alimentos', tag: 'Baja adherencia', chipClass: 'orange' }
    ],
    history: [
      { date: '01 Feb 2026 · 10:00 AM', title: 'Seguimiento Hipertensión', desc: 'Presión arterial elevada. Paciente refiere olvido frecuente de medicamentos. Se refuerza importancia de adherencia.' }
    ],
    weekData: [
      { day: 'Lun', pct: 50,  cls: 'orange' },
      { day: 'Mar', pct: 30,  cls: 'orange' },
      { day: 'Mié', pct: 0,   cls: 'empty'  },
      { day: 'Jue', pct: 70,  cls: 'green'  },
      { day: 'Vie', pct: 50,  cls: 'orange' },
      { day: 'Sáb', pct: 40,  cls: 'orange' },
      { day: 'Dom', pct: 60,  cls: 'orange' }
    ]
  }
];

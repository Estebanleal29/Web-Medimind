import { Component, OnInit }    from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule }           from '@angular/common';
import { MatToolbarModule }       from '@angular/material/toolbar';
import { MatCardModule }          from '@angular/material/card';
import { MatButtonModule }        from '@angular/material/button';
import { MatIconModule }          from '@angular/material/icon';
import { MatTableModule }         from '@angular/material/table';
import { MatBadgeModule }         from '@angular/material/badge';
import { MatMenuModule }          from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent }        from '../shared/navbar/navbar.component';
import { PatientService }         from '../shared/services/patient.service';
import { Patient }                from '../shared/interfaces/patient.interface';
import { DashboardStats }         from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, MatCardModule,
    MatButtonModule, MatIconModule, MatTableModule,
    MatBadgeModule, MatMenuModule, MatProgressSpinnerModule,
    NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls:   ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['patient','lastVisit','nextAppt','adherence','status','actions'];

  patients:  Patient[]             = [];
  stats:     DashboardStats | null = null;
  loading    = true;
  showAlert  = false;

  quickActions = [
    { icon:'🩺', label:'Nueva Consulta' },
    { icon:'📊', label:'Ver Reportes'   },
    { icon:'📅', label:'Agenda'         },
    { icon:'💊', label:'Prescripciones' },
  ];

  constructor(
    private patientService: PatientService,
    private router:         Router,
    private route:          ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showAlert = params['alert'] === 'true';
    });

    this.patientService.getPatients().subscribe({
      next:  (data) => { this.patients = data; },
      error: (err)  => console.error('Error cargando pacientes:', err)
    });

    this.patientService.getDashboardStats().subscribe({
      next:  (data) => { this.stats = data; this.loading = false; },
      error: (err)  => { console.error(err); this.loading = false; }
    });
  }

  viewPatient(p: Patient, tab: number = 0): void {
    this.router.navigate(['/patient', p.id], {
      queryParams: { tab }
    });
  }

  adhClass(n: number): string {
    if (n >= 80) return 'adh-up';
    if (n >= 60) return 'adh-mid';
    return 'adh-down';
  }

  adhArrow(n: number): string { return n >= 60 ? '↗' : '↘'; }
}

import { Component, OnInit }       from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { CommonModule }             from '@angular/common';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatCardModule }            from '@angular/material/card';
import { MatTabsModule }            from '@angular/material/tabs';
import { MatButtonModule }          from '@angular/material/button';
import { MatIconModule }            from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent }          from '../shared/navbar/navbar.component';
import { PatientService }           from '../shared/services/patient.service';
import { Patient }                  from '../shared/interfaces/patient.interface';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, MatCardModule,
    MatTabsModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, NavbarComponent
  ],
  templateUrl: './patient.component.html',
  styleUrls:   ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patient:      Patient | null = null;
  loading       = true;
  selectedTab   = 0;

  constructor(
    private patientService: PatientService,
    private route:          ActivatedRoute,
    private router:         Router
  ) {}

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id') ?? '';

    this.route.queryParams.subscribe(params => {
      this.selectedTab = params['tab'] ? +params['tab'] : 0;
    });

    this.patientService.getPatientById(patientId).subscribe({
      next: (patient) => {
        this.patient = patient ?? null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando paciente:', err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  onTabChange(tabIndex: number): void {
    this.router.navigate([], {
      relativeTo:   this.route,
      queryParams:  { tab: tabIndex },
      queryParamsHandling: 'merge'
    });
  }
}

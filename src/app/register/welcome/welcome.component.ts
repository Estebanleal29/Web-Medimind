import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule }   from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './welcome.component.html',
  styleUrls:   ['./welcome.component.scss']
})
export class WelcomeComponent {
  features = [
    { icon:'💊', cls:'blue',   title:'Monitoreo de Adherencia',
      desc:'Ve en tiempo real si tus pacientes están tomando sus medicamentos según lo prescrito.' },
    { icon:'🔔', cls:'green',  title:'Gestión de Alarmas',
      desc:'Crea, edita y supervisa las alarmas de medicamentos de cada paciente directamente desde su ficha.' },
    { icon:'📊', cls:'orange', title:'Reportes y Alertas',
      desc:'Recibe notificaciones cuando un paciente presenta baja adherencia o dosis omitidas repetidas.' },
  ];

  constructor(private router: Router) {}

  continue() { this.router.navigate(['/dashboard']); }
}

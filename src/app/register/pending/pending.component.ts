import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }           from '@angular/router';
import { CommonModule }     from '@angular/common';
import { MatCardModule }    from '@angular/material/card';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription, interval } from 'rxjs';
import { switchMap }        from 'rxjs/operators';
import { AuthService }      from '../../shared/services/auth.service';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './pending.component.html',
  styleUrls:   ['./pending.component.scss']
})
export class PendingComponent implements OnInit, OnDestroy {

  private pollSub?: Subscription;
  verificationStatus = 'pending';

  processItems = [
    { icon:'✅', cls:'green',  title:'Registro Completado',       detail:'08 Feb 2026 · 10:30 AM',          textCls:'gray-t',   date:'' },
    { icon:'✅', cls:'green',  title:'Correo Verificado',          detail:'08 Feb 2026 · 10:35 AM',          textCls:'gray-t',   date:'' },
    { icon:'📋', cls:'orange', title:'Verificación de Documentos', detail:'En proceso · Estimado: 24-48 h',  textCls:'orange-t', date:'' },
    { icon:'🔔', cls:'gray',   title:'Activación de Cuenta',       detail:'Pendiente · Recibirás una notificación', textCls:'gray-t', date:'' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.pollSub = interval(30_000).pipe(
      switchMap(() => this.authService.getVerificationStatus('USR-001'))
    ).subscribe(res => {
      this.verificationStatus = res.status;
      if (res.status === 'approved') {
        this.router.navigate(['/welcome']);
      }
    });
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }

  goWelcome()  { this.router.navigate(['/welcome']);   }
  goSupport()  { window.alert('Contactando soporte...'); }
}

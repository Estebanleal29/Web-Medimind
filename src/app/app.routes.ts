import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
    title: 'MediMind — Iniciar sesión'
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then(m => m.RegisterComponent),
    title: 'MediMind — Registro Profesional'
  },
  {
    path: 'pending',
    loadComponent: () =>
      import('./register/pending/pending.component').then(m => m.PendingComponent),
    title: 'MediMind — Verificación Pendiente'
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./register/welcome/welcome.component').then(m => m.WelcomeComponent),
    title: 'MediMind — Bienvenido'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'MediMind — Dashboard'
  },
  {
    path: 'patient/:id',
    loadComponent: () =>
      import('./patient/patient.component').then(m => m.PatientComponent),
    title: 'MediMind — Ficha de Paciente'
  },

  { path: '**', redirectTo: 'login' }
];

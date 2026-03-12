# MediMind — Angular 17 + Angular Material

Proyecto de maquetación web para la plataforma de adherencia medicamentosa **MediMind**.

## ▶ Instalación y ejecución

```bash
npm install
ng serve
# Abrir: http://localhost:4200
```

---

## 📚 Conceptos del curso aplicados

### 1. Interfaces
Ubicación: `src/app/shared/interfaces/`

| Archivo | Interfaces |
|---|---|
| `patient.interface.ts` | `Patient`, `PatientStatus`, `ChipClass` |
| `medical.interface.ts` | `Medication`, `Alarm`, `VitalSign`, `ConsultHistory`, `DayAdherence` |
| `user.interface.ts` | `User`, `LoginCredentials`, `RegisterStep1`, `RegisterStep2`, `DashboardStats` |

### 2. Services (Servicios)
Ubicación: `src/app/shared/services/`

| Servicio | Responsabilidad |
|---|---|
| `AuthService` | Login, Registro, manejo de sesión con `BehaviorSubject` |
| `PatientService` | GET pacientes, stats, adherencia, medicamentos |

### 3. Peticiones HTTP
- `provideHttpClient()` registrado en `app.config.ts`
- `HttpClient` inyectado en los servicios
- `AuthService.login()`, `PatientService.getPatients()`, etc. usan `this.http.get/post()`
- Los métodos retornan `Observable<T>` que los componentes suscriben

### 4. Suscribe Observables
- `authService.currentUser$.subscribe(...)` en `NavbarComponent`
- `patientService.getPatients().subscribe({next, error})` en `DashboardComponent`
- `patientService.getPatientById(id).subscribe({next, error})` en `PatientComponent`
- `interval(30_000).pipe(switchMap(...)).subscribe(...)` en `PendingComponent`
- **Desuscripción** en `ngOnDestroy()` para evitar memory leaks

### 5. Estilos y SCSS
- Tema Angular Material personalizado en `styles.scss`
- Variables CSS globales (`--blue`, `--green`, etc.)
- SCSS por componente con encapsulación
- `::ng-deep` para sobrescribir estilos de Material

### 6. Instalación y configuración
- Angular 17 con Standalone Components
- Angular Material 17 instalado como librería
- `angular.json`, `tsconfig.json`, `tsconfig.app.json`

### 7. Librerías (Angular Material)
Componentes utilizados:

| Componente | Usado en |
|---|---|
| `MatStepper` | Registro (3 pasos) |
| `MatTabGroup` | Ficha del paciente (5 tabs) |
| `MatTable` | Tabla de pacientes en dashboard |
| `MatFormField` + `MatInput` | Todos los formularios |
| `MatSelect` | Especialidades en registro |
| `MatCheckbox` | Términos en registro |
| `MatToolbar` | Barra de navegación |
| `MatCard` | Todas las tarjetas |
| `MatButton` / `MatIconButton` | Todos los botones |
| `MatIcon` | Iconografía |
| `MatBadge` | Notificaciones |
| `MatMenu` | Menú de usuario |
| `MatProgressSpinner` | Estado de carga |
| `MatDivider` | Separadores |

### 8. Crear componentes (Standalone)
- `LoginComponent`
- `RegisterComponent`
- `PendingComponent`
- `WelcomeComponent`
- `DashboardComponent`
- `PatientComponent`
- `NavbarComponent` (**componente compartido** con `@Input`/`@Output`)

### 9. Maquetar UI
- Fiel al mockup PDF: colores, tipografías, tarjetas, tablas
- Responsive con CSS Grid y Flexbox
- Variables CSS coherentes con el diseño

### 10. Binding de datos
| Tipo | Ejemplo en el código |
|---|---|
| Interpolación `{{ }}` | `{{ patient.name }}`, `{{ stats.totalPatients }}` |
| Property binding `[prop]` | `[style.background]="p.avatarColor"`, `[disabled]="form.invalid"` |
| Event binding `(event)` | `(click)="viewPatient(p)"`, `(ngSubmit)="onLogin()"` |
| Two-way `[(ngModel)]` | Formularios template-driven |
| `[class]` dinámico | `[class]="adhClass(p.adherence)"` |
| `[ngClass]` | `[ngClass]="adherence >= 80 ? 'good' : 'low'"` |
| `*ngIf` | `*ngIf="loading"`, `*ngIf="patient && !loading"` |
| `*ngFor` | Listas de pacientes, vitales, alarmas, medicamentos |

### 11. Módulos / Crear módulos
- Arquitectura con **Standalone Components** (Angular 17)
- Cada componente importa solo lo que necesita
- `app.config.ts` reemplaza `AppModule` como proveedor principal

### 12. Routing
- Configurado en `app.routes.ts` con `provideRouter(routes)`
- **Lazy Loading** por ruta con `loadComponent`
- `router.navigate(['/dashboard'])`, `router.navigate(['/patient', id])`
- Guards listos para agregar: `canActivate`

### 13. Paso de parámetros por Query String
```typescript
// Navegación con query string
this.router.navigate(['/patient', p.id], {
  queryParams: { tab: 0 }   // → /patient/PAC-2451?tab=0
});

// Lectura del query string
this.route.queryParams.subscribe(params => {
  this.selectedTab = params['tab'] ? +params['tab'] : 0;
});

// Actualizar query string sin navegar
this.router.navigate([], {
  relativeTo: this.route,
  queryParams: { tab: tabIndex },
  queryParamsHandling: 'merge'
});
```

---

## 🗂 Estructura del proyecto

```
src/
├── app/
│   ├── shared/
│   │   ├── interfaces/
│   │   │   ├── patient.interface.ts   ← Interface: Patient
│   │   │   ├── medical.interface.ts   ← Medication, Alarm, Vital...
│   │   │   └── user.interface.ts      ← User, LoginCredentials...
│   │   ├── services/
│   │   │   ├── auth.service.ts        ← HTTP + BehaviorSubject
│   │   │   └── patient.service.ts     ← HTTP + Observables + datos mock
│   │   └── navbar/
│   │       └── navbar.component.*     ← Componente compartido
│   ├── login/
│   ├── register/
│   │   ├── pending/
│   │   └── welcome/
│   ├── dashboard/
│   ├── patient/
│   ├── app.component.ts
│   ├── app.config.ts                  ← provideHttpClient, provideRouter
│   └── app.routes.ts                  ← Rutas + lazy loading
├── styles.scss                        ← Tema Material + variables
└── index.html
```

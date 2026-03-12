import { Component }    from '@angular/core';
import { Router }        from '@angular/router';
import { CommonModule }  from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder,
  FormGroup, Validators, AbstractControl
} from '@angular/forms';
import { MatStepperModule }   from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatCardModule }      from '@angular/material/card';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatSelectModule }    from '@angular/material/select';
import { AuthService }        from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatStepperModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatCheckboxModule, MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls:   ['./register.component.scss']
})
export class RegisterComponent {

  hidePass    = true;
  hideConfirm = true;
  loading     = false;

  especialidades = [
    'Cardiología', 'Medicina General', 'Pediatría',
    'Neurología', 'Oncología', 'Traumatología',
    'Dermatología', 'Psiquiatría', 'Otra'
  ];

  step1: FormGroup = this.fb.group({
    nombre:   ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm:  ['', Validators.required],
    terms:    [false, Validators.requiredTrue]
  }, { validators: this.passwordMatch });

  step2: FormGroup = this.fb.group({
    matricula:    ['', Validators.required],
    especialidad: ['', Validators.required],
    experiencia:  ['', [Validators.required, Validators.min(0), Validators.max(60)]],
    universidad:  ['', Validators.required],
    graduacion:   ['', [Validators.required, Validators.min(1960), Validators.max(2026)]],
    telefono:     ['', Validators.required],
    direccion:    [''],
    biografia:    ['']
  });

  constructor(
    private fb:          FormBuilder,
    private authService: AuthService,
    private router:      Router
  ) {}

  private passwordMatch(group: AbstractControl) {
    const pass    = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onStep1Next(): void {
    if (this.step1.invalid) return;
    this.loading = true;
    this.authService.registerStep1(this.step1.value).subscribe({
      next:  () => { this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  onStep2Next(): void {
    if (this.step2.invalid) return;
    this.loading = true;
    this.authService.registerStep2(this.step2.value).subscribe({
      next:  () => { this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  finish(): void {
    this.router.navigate(['/pending']);
  }

  goLogin(): void { this.router.navigate(['/login']); }

  get n()  { return this.step1.get('nombre')!;   }
  get e()  { return this.step1.get('email')!;    }
  get p()  { return this.step1.get('password')!; }
  get c()  { return this.step1.get('confirm')!;  }
  get t()  { return this.step1.get('terms')!;    }
}

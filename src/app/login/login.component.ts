import { Component }         from '@angular/core';
import { Router }             from '@angular/router';
import { CommonModule }       from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule }      from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService }        from '../shared/services/auth.service';
import { UserRole }           from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.scss']
})
export class LoginComponent {

  selectedRole: UserRole = 'medico';
  hidePassword = true;
  loading      = false;
  errorMsg     = '';

  loginForm: FormGroup;

  constructor(
    private fb:          FormBuilder,
    private authService: AuthService,
    private router:      Router
  ) {
    this.loginForm = this.fb.group({
      email:    ['medico@correo.com', [Validators.required, Validators.email]],
      password: ['',                  [Validators.required, Validators.minLength(6)]]
    });
  }

  selectRole(role: UserRole): void {
    this.selectedRole = role;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading  = true;
    this.errorMsg = '';

    const credentials = {
      ...this.loginForm.value,
      role: this.selectedRole
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading  = false;
        this.errorMsg = 'Credenciales incorrectas. Intenta de nuevo.';
        console.error(err);
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  get emailCtrl()    { return this.loginForm.get('email')!;    }
  get passwordCtrl() { return this.loginForm.get('password')!; }
}

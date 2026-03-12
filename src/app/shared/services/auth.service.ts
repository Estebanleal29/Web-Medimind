import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError }          from 'rxjs/operators';
import { User, LoginCredentials, RegisterStep1, RegisterStep2 } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API_URL = 'https://api.medimind.com/v1';

  private currentUserSubject = new BehaviorSubject<User | null>(this.loadStoredUser());

  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  login(credentials: LoginCredentials): Observable<{ token: string; user: User }> {
    const mockUser: User = {
      id: 'USR-001',
      name: 'Dr. Juan Pérez',
      email: credentials.email,
      role: credentials.role,
      specialty: 'Cardiología',
      initials: 'JP',
      verified: true
    };
    return of({ token: 'mock-jwt-token', user: mockUser }).pipe(
      tap(res => {
        localStorage.setItem('mm_token', res.token);
        localStorage.setItem('mm_user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      })
    );
  }

  registerStep1(data: RegisterStep1): Observable<{ success: boolean }> {
    return of({ success: true });
  }

  registerStep2(data: RegisterStep2): Observable<{ success: boolean }> {
    return of({ success: true });
  }

  getVerificationStatus(userId: string): Observable<{ status: string; step: number }> {
    return of({ status: 'pending', step: 2 });
  }

  logout(): void {
    localStorage.removeItem('mm_token');
    localStorage.removeItem('mm_user');
    this.currentUserSubject.next(null);
  }

  private loadStoredUser(): User | null {
    try {
      const raw = localStorage.getItem('mm_user');
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('mm_token') ?? '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}

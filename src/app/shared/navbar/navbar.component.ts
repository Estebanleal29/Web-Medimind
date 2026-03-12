import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Router }            from '@angular/router';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';
import { MatMenuModule }     from '@angular/material/menu';
import { MatBadgeModule }    from '@angular/material/badge';
import { MatDividerModule }  from '@angular/material/divider';
import { AuthService }       from '../services/auth.service';
import { User }              from '../interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, MatButtonModule,
    MatIconModule, MatMenuModule, MatBadgeModule, MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls:  ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() backLabel: string | null = null;
  @Output() backClicked = new EventEmitter<void>();

  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onBack(): void {
    this.backClicked.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

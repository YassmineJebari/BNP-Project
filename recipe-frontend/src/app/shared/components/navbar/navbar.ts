import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  currentUrl = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Écouter les changements de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.url;
      });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isOnAuthPage(): boolean {
    return this.currentUrl.includes('/auth/sign-in') || 
           this.currentUrl.includes('/auth/sign-up');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
  }
}
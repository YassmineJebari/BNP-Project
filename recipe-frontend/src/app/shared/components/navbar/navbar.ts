import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false; 

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkLoginStatus() {
    this.isLoggedIn = true; 
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/auth/sign-in']);
  }
}
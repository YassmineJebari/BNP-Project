import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'  // Le service est disponible partout dans l'app
})
export class AuthService {
  // 🔗 URL de ton backend (change si nécessaire)
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,  // Pour faire des appels HTTP
    private router: Router     // Pour rediriger l'utilisateur
  ) {}

  // ==========================================
  // 📤 CONNEXION (Sign In)
  // ==========================================
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Sauvegarder le token après connexion réussie
          this.saveToken(response.token);
          console.log('✅ Connexion réussie, token sauvegardé');
        })
      );
  }

  // ==========================================
  // 📝 INSCRIPTION (Sign Up)
  // ==========================================
  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, data);
  }

  // ==========================================
  // 👤 RÉCUPÉRER LE PROFIL
  // ==========================================
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  // ==========================================
  // 💾 GESTION DU TOKEN (LocalStorage)
  // ==========================================
  
  // Sauvegarder le token dans le navigateur
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Récupérer le token sauvegardé
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();  // !! convertit en true/false
  }

  // ==========================================
  // 🚪 DÉCONNEXION
  // ==========================================
  logout(): void {
    localStorage.removeItem('authToken');
    console.log('🚪 Déconnexion : token supprimé');
    this.router.navigate(['/sign-in']);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Commenté pour éviter les erreurs au démarrage
    // this.checkCurrentUser();
  }

  private checkCurrentUser(): void {
    const token = this.getToken();
    if (token) {
      this.getProfile().subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => {
          this.logout();
        }
      });
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.currentUserSubject.next(response.user);
          console.log('✅ Connexion réussie, token sauvegardé');
        })
      );
  }

  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, data);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    // Vérifier le token OU le currentUser (pour les tests)
    return !!this.getToken() 
  }

  getCurrentUser(): User | null {
    // 🧪 MODE TEST : Lire depuis localStorage
    
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('🚪 Déconnexion : token supprimé');
    this.router.navigate(['/auth/sign-in']);
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }
}
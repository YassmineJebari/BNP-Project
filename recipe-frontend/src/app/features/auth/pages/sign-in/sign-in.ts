import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})
export class SignIn {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,           
    private authService: AuthService,  
    private router: Router             
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        this.loading = false;
        if (response?.token) {
          localStorage.setItem('token', response.token);
        }
        setTimeout(() => {
          this.router.navigate(['/recipes']);
        }, 500);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Email ou mot de passe incorrect';
        console.error('Erreur de connexion', error);
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

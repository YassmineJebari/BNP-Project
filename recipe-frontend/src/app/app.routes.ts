import { Routes } from '@angular/router';
import { SignIn } from './auth/sign-in/sign-in';
import { SignUp } from './auth/sign-up/sign-up';

export const routes: Routes = [
  // Route par défaut : rediriger vers sign-in
  { 
    path: '', 
    redirectTo: '/sign-in', 
    pathMatch: 'full' 
  },
  
  { 
    path: 'sign-in', 
    component: SignIn 
  },

  { 
    path: 'sign-up', 
    component: SignUp
  },
  
  { 
    path: '**', 
    redirectTo: '/sign-in' 
  }
];
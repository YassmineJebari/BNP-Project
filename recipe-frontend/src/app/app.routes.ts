import { Routes } from '@angular/router';
import { SignIn } from './features/auth/pages/sign-in/sign-in';
import { SignUp } from './features/auth/pages/sign-up/sign-up';
import { List } from './recipes/list/list';
import { Add } from './recipes/add/add';
import { Edit } from './recipes/edit/edit';
import { Detail } from './recipes/detail/detail';

export const routes: Routes = [
  // Feature Auth (lazy loading)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
      .then(m => m.AUTH_ROUTES)
  },
  
  // Feature Recipes (lazy loading)
  {
    path: 'recipes',
    loadChildren: () => import('./features/recipes/recipes.routes')
      .then(m => m.RECIPES_ROUTES)
  },
    {
    path: 'profile',
    loadChildren: () => import('./features/auth/auth.routes')
      .then(m => m.AUTH_ROUTES)
  },
  
  // Feature Chatbot (lazy loading)
  //{
   // path: 'chatbot',
   // loadChildren: () => import('./features/chatbot/chatbot.routes')
   //   .then(m => m.CHATBOT_ROUTES)
  //},
  
  // Route par défaut : rediriger vers auth
  { 
    path: '', 
    redirectTo: 'auth/sign-in',  // ← Sans le "/" au début
    pathMatch: 'full' 
  },
  
  // 404 - Toutes les routes invalides
  { 
    path: '**', 
    redirectTo: 'auth/sign-in'  // ← Sans le "/" au début
  }
];

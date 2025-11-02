import { Routes } from '@angular/router';

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
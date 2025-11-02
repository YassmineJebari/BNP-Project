import { Routes } from '@angular/router';

export const RECIPES_ROUTES: Routes = [
  // Liste des recettes (page par défaut)
  {
    path: '',
    loadComponent: () => import('./pages/list/list')
      .then(m => m.List)
  },
  // Ajouter une nouvelle recette
  {
    path: 'add',
    loadComponent: () => import('./pages/add/add')
      .then(m => m.Add)
  },
  // Détail d'une recette (doit être APRÈS 'add')
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail/detail')
      .then(m => m.Detail)
  },
  // Éditer une recette
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/edit/edit')
      .then(m => m.Edit)
  }
];
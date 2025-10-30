import { Routes } from '@angular/router';
import { List } from './recipes/list/list';
import { Add } from './recipes/add/add';
import { Edit } from './recipes/edit/edit';
import { Detail } from './recipes/detail/detail';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: List },
  { path: 'recipes/add', component: Add },
  { path: 'recipes/edit/:id', component: Edit },
  { path: 'recipes/detail/:id', component: Detail },
  { path: '**', redirectTo: 'recipes' }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recipes',
    loadComponent: () => import('./list/list').then(m => m.List)
  },
  {
    path: 'recipes/add',
    loadComponent: () => import('./add/add').then(m => m.Add)
  },
  {
    path: 'recipes/edit/:id',
    loadComponent: () => import('./edit/edit').then(m => m.Edit)
  },
  {
    path: 'recipes/detail/:id',
    loadComponent: () => import('./detail/detail').then(m => m.Detail)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}

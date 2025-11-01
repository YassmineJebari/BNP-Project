import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Recette {
  id?: number;
  titre: string;
  description: string;
  ingredients: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recettes: Recette[] = [
    { id: 1, titre: 'Pâtes Carbonara', description: 'Classique italienne', ingredients: ['Pâtes', 'Lardons', 'Œufs'] },
    { id: 2, titre: 'Salade César', description: 'Salade avec poulet', ingredients: ['Laitue', 'Poulet', 'Parmesan'] }
  ];

  getAll(): Observable<Recette[]> {
    return of(this.recettes);
  }

  getById(id: number): Observable<Recette> {
    const recette = this.recettes.find(r => r.id === id);
    return of(recette!);
  }

  create(recette: Recette): Observable<Recette> {
    recette.id = this.recettes.length + 1;
    this.recettes.push(recette);
    return of(recette);
  }

  update(id: number, recette: Recette): Observable<Recette> {
    const index = this.recettes.findIndex(r => r.id === id);
    if (index !== -1) this.recettes[index] = recette;
    return of(recette);
  }

  delete(id: number): Observable<void> {
    this.recettes = this.recettes.filter(r => r.id !== id);
    return of();
  }
}

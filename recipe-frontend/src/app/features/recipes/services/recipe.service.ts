import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Recette {
  id?: number;
  titre: string;
  description: string;
  ingredients: string[];
  isFavorite?: boolean;
  videoUrl?: string;
  imageUrl?: string;
  category?: string;
  preparationTime?: number;
  portions?: number;
  difficulty?: string;
  rating?: number; // Note sur 5
  comments?: Comment[]; // Commentaires
  createdAt?: Date; // Date de création
}

export interface Comment {
  id?: number;
  author: string;
  text: string;
  date: Date;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recettes: Recette[] = [
    { 
      id: 1, 
      titre: 'Pâtes Carbonara', 
      description: 'Un classique italien crémeux et délicieux', 
      ingredients: ['400g de pâtes', '200g de lardons', '4 œufs', '100g de parmesan', 'Poivre noir'],
      isFavorite: false,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
      category: 'Plat',
      preparationTime: 30,
      portions: 4,
      difficulty: 'Facile',
      rating: 4.5,
      comments: [
        { id: 1, author: 'Marie', text: 'Délicieuse recette, facile à réaliser !', date: new Date('2024-01-15'), rating: 5 },
        { id: 2, author: 'Thomas', text: 'Un classique qui fonctionne toujours', date: new Date('2024-01-20'), rating: 4 }
      ],
      createdAt: new Date('2024-01-10')
    },
    { 
      id: 2, 
      titre: 'Salade César', 
      description: 'Salade fraîche avec poulet grillé et parmesan', 
      ingredients: ['Laitue romaine', '300g de poulet', '80g de parmesan', 'Croûtons', 'Sauce César'],
      isFavorite: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
      category: 'Entrée',
      preparationTime: 20,
      portions: 2,
      difficulty: 'Facile',
      rating: 4.8,
      comments: [],
      createdAt: new Date('2024-01-12')
    },
    { 
      id: 3, 
      titre: 'Tiramisu Maison', 
      description: 'Dessert italien onctueux au café et mascarpone', 
      ingredients: ['6 œufs', '500g mascarpone', '200g biscuits', 'Café fort', 'Cacao'],
      isFavorite: false,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
      category: 'Dessert',
      preparationTime: 45,
      portions: 6,
      difficulty: 'Moyen',
      rating: 5,
      comments: [
        { id: 1, author: 'Sophie', text: 'Le meilleur tiramisu que j\'ai jamais fait !', date: new Date('2024-01-18'), rating: 5 }
      ],
      createdAt: new Date('2024-01-14')
    }
  ];

  getAll(): Observable<Recette[]> {
    return of(this.recettes);
  }

  getById(id: number): Observable<Recette> {
    const recette = this.recettes.find(r => r.id === id);
    return of(recette!);
  }

  create(recette: Recette): Observable<Recette> {
    recette.id = this.recettes.length > 0 
      ? Math.max(...this.recettes.map(r => r.id || 0)) + 1 
      : 1;
    recette.isFavorite = false;
    recette.rating = 0;
    recette.comments = [];
    recette.createdAt = new Date();
    this.recettes.push(recette);
    return of(recette);
  }

  update(id: number, recette: Recette): Observable<Recette> {
    const index = this.recettes.findIndex(r => r.id === id);
    if (index !== -1) {
      // Conserver les commentaires et la note existants
      const existing = this.recettes[index];
      this.recettes[index] = { 
        ...recette, 
        id,
        rating: existing.rating,
        comments: existing.comments,
        createdAt: existing.createdAt
      };
    }
    return of(recette);
  }

  delete(id: number): Observable<void> {
    this.recettes = this.recettes.filter(r => r.id !== id);
    return of();
  }

  // Ajouter un commentaire
  addComment(recipeId: number, comment: Comment): Observable<void> {
    const recette = this.recettes.find(r => r.id === recipeId);
    if (recette) {
      if (!recette.comments) recette.comments = [];
      comment.id = recette.comments.length + 1;
      comment.date = new Date();
      recette.comments.push(comment);
      // Recalculer la note moyenne
      this.updateRating(recipeId);
    }
    return of();
  }

  // Mettre à jour la note moyenne
  private updateRating(recipeId: number) {
    const recette = this.recettes.find(r => r.id === recipeId);
    if (recette && recette.comments && recette.comments.length > 0) {
      const totalRating = recette.comments.reduce((sum, c) => sum + c.rating, 0);
      recette.rating = totalRating / recette.comments.length;
    }
  }
}
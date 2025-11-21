import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { CreateRecipeRequest, RecipeIngredientDTO } from '../../models/recipe.models';

interface Recette {
  titre: string;
  description: string;
  ingredients: string[];
  imageUrl: string;
  videoUrl?: string;
  category: string;
  preparationTime: number;
  portions: number;
  difficulty: 'FACILE' | 'MOYEN' | 'DIFFICILE';
  steps?: string;
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})
export class Add {
  recette: Recette = {
    titre: '',
    description: '',
    ingredients: [],
    imageUrl: '',
    videoUrl: '',
    category: '',
    preparationTime: 30,
    portions: 4,
    difficulty: 'FACILE',
    steps: ''
  };

  ingredientInput: string = '';

  constructor(private recipeService: RecipeService, private router: Router) {}

  addIngredient() {
    const trimmed = this.ingredientInput.trim();
    if (trimmed) {
      this.recette.ingredients.push(trimmed);
      this.ingredientInput = '';
    }
  }

  removeIngredient(index: number) {
    this.recette.ingredients.splice(index, 1);
  }

  save() {
    const request = this.mapRecetteToRequest();
    this.recipeService.create(request).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }

  private mapRecetteToRequest(): CreateRecipeRequest {
    return {
      title: this.recette.titre,
      description: this.recette.description,
      preparationTime: this.recette.preparationTime,
      cookingTime: 30, // Valeur par défaut si non spécifiée
      difficulty: this.recette.difficulty.toUpperCase(),
      imageUrl: this.recette.imageUrl,
      steps: this.recette.steps || '',
      servings: this.recette.portions,
      categoryId: this.mapCategoryToId(this.recette.category),
      ingredients: this.recette.ingredients.map(this.mapIngredient)
    };
  }

  private mapIngredient(name: string, index: number): RecipeIngredientDTO {
    return {
      ingredientId: index + 1, // ID fictif si pas disponible
      ingredientName: name,
      quantity: 1, // Valeur par défaut
      unit: 'unit' // Valeur par défaut
    };
  }

  private mapCategoryToId(category: string): number | undefined {
    const categories: { [key: string]: number } = {
      'Entrée': 1,
      'Plat': 2,
      'Dessert': 3
    };
    return categories[category];
  }
}

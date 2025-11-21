// edit.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { RecipeDTO, RecipeIngredientDTO, UpdateRecipeRequest } from '../../models/recipe.models';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css']
})
export class Edit implements OnInit {
  recette: RecipeDTO = {
    title: '',
    description: '',
    preparationTime: 30,
    cookingTime: 30,
    difficulty: 'FACILE',
    servings: 4,
    steps: '',
    ingredients: []
  };

  ingredientInput: string = '';
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipeById(this.id).subscribe(r => {
      if (r) {
        this.recette = { ...r };
      }
    });
  }

  addIngredient() {
    const trimmed = this.ingredientInput.trim();
    if (trimmed) {
      // Ajouter un ingredient minimal (sans id et quantity par défaut)
      const newIngredient: RecipeIngredientDTO = {
        ingredientId: 0,
        ingredientName: trimmed,
        quantity: 1,
        unit: ''
      };
      this.recette.ingredients.push(newIngredient);
      this.ingredientInput = '';
    }
  }

  removeIngredient(index: number) {
    this.recette.ingredients.splice(index, 1);
  }

  save() {
    const updateRequest: UpdateRecipeRequest = {
      title: this.recette.title,
      description: this.recette.description,
      preparationTime: this.recette.preparationTime,
      cookingTime: this.recette.cookingTime,
      difficulty: this.recette.difficulty,
      servings: this.recette.servings,
      steps: this.recette.steps,
      imageUrl: this.recette.imageUrl,
      categoryId: this.recette.categoryId,
      ingredients: this.recette.ingredients
    };

    this.recipeService.updateRecipe(this.id, updateRequest).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}

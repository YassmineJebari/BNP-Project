import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService, Recette } from '../../services/recipe.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})
export class Add {
  recette: Recette = { titre: '', description: '', ingredients: [] };
  ingredientInput: string = '';

  constructor(private recipeService: RecipeService, private router: Router) {}

  addIngredient() {
    const trimmed = this.ingredientInput.trim();
    if (trimmed) {
      this.recette.ingredients.push(trimmed);
      this.ingredientInput = '';
    }
  }

  save() {
    this.recipeService.create(this.recette).subscribe(() => {
      this.router.navigate(['/recipes']); // redirige vers la liste après l'ajout
    });
  }
}

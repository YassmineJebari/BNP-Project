import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService, Recette } from '../../services/recipe.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css']
})
export class Edit implements OnInit {
  recette: Recette = { titre: '', description: '', ingredients: [] };
  ingredientInput: string = '';
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getById(this.id).subscribe(r => {
      if (r) this.recette = { ...r }; // copie pour ne pas modifier l'original avant sauvegarde
    });
  }

  addIngredient() {
    const trimmed = this.ingredientInput.trim();
    if (trimmed) {
      this.recette.ingredients.push(trimmed);
      this.ingredientInput = '';
    }
  }

  save() {
    this.recipeService.update(this.id, this.recette).subscribe(() => {
      this.router.navigate(['/recipes']); // retour à la liste après modification
    });
  }
}

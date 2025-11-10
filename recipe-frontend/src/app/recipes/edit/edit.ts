import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService, Recette } from '../recipe.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css']
})
export class Edit implements OnInit {
  recette: Recette = { 
    titre: '', 
    description: '', 
    ingredients: [],
    imageUrl: '',
    videoUrl: '',
    category: '',
    preparationTime: 30,
    portions: 4,
    difficulty: 'Facile'
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
    this.recipeService.getById(this.id).subscribe(r => {
      if (r) this.recette = { ...r };
    });
  }

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
    this.recipeService.update(this.id, this.recette).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
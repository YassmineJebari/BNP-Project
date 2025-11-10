import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService, Recette } from '../../services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class List implements OnInit {
  recettes: Recette[] = [];
  filteredRecettes: Recette[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  sortBy: string = '';
  showFavoritesOnly: boolean = false;
  recetteToDelete: Recette | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getAll().subscribe(data => {
      this.recettes = data;
      this.filteredRecettes = data;
    });
  }

  filterRecipes() {}
  sortRecipes() {}
  clearSearch() {}
  toggleFavorites() {}
  toggleFavorite(recette: Recette) {}
  confirmDelete(recette: Recette) {}
  cancelDelete() {}
  deleteRecipe() {}
  clearFilters() {}
}

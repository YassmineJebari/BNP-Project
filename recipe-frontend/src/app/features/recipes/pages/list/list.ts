import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService, Recette } from '../recipe.service';

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
  recetteToDelete?: Recette;
  
  // Filtres
  searchTerm: string = '';
  selectedCategory: string = '';
  showFavoritesOnly: boolean = false;
  sortBy: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getAll().subscribe(data => {
      this.recettes = data;
      this.filterRecipes();
    });
  }

  // Filtrer les recettes
  filterRecipes() {
    this.filteredRecettes = this.recettes.filter(recette => {
      const matchesSearch = !this.searchTerm || 
        recette.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        recette.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        recette.category === this.selectedCategory;
      
      const matchesFavorite = !this.showFavoritesOnly || recette.isFavorite;
      
      return matchesSearch && matchesCategory && matchesFavorite;
    });
    this.sortRecipes();
  }

  // Trier les recettes
  sortRecipes() {
    if (!this.sortBy) return;

    this.filteredRecettes.sort((a, b) => {
      switch (this.sortBy) {
        case 'recent':
          return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.titre.localeCompare(b.titre);
        case 'time':
          return (a.preparationTime || 0) - (b.preparationTime || 0);
        default:
          return 0;
      }
    });
  }

  // Toggle favoris
  toggleFavorites() {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    this.filterRecipes();
  }

  // Clear search
  clearSearch() {
    this.searchTerm = '';
    this.filterRecipes();
  }

  // Clear all filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.showFavoritesOnly = false;
    this.sortBy = '';
    this.filterRecipes();
  }

  // Toggle favorite
  toggleFavorite(recette: Recette) {
    recette.isFavorite = !recette.isFavorite;
  }

  // Ouvrir la modal de confirmation
  confirmDelete(recette: Recette) {
    this.recetteToDelete = recette;
  }

  // Annuler la suppression
  cancelDelete() {
    this.recetteToDelete = undefined;
  }

  // Supprimer la recette
  deleteRecipe() {
    if (this.recetteToDelete && this.recetteToDelete.id) {
      this.recipeService.delete(this.recetteToDelete.id).subscribe(() => {
        this.loadRecipes();
        this.recetteToDelete = undefined;
      });
    }
  }
}
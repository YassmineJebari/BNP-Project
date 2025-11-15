import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { RecipeService } from '../..//recipes/services/recipe.service';
import { User } from '../../auth/models/user.model';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent implements OnInit {
  user: User | null = null;
  totalRecipes = 0;
  totalUsers = 0;

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    
    // Charger les stats
    this.recipeService.getAll().subscribe(recipes => {
      this.totalRecipes = recipes.length;
    });
    
    // TODO: Ajouter UserService pour compter les users
    this.totalUsers = 0;
  }

  logout() {
    this.authService.logout();
  }
}
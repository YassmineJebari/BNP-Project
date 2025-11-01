import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recette } from '../recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class List implements OnInit {
  recettes: Recette[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getAll().subscribe(data => {
      this.recettes = data;
    });
  }
}

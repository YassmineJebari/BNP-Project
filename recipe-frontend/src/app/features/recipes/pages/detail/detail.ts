import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recette } from '../../services/recipe.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>{{ recette?.titre }}</h2>
    <p>{{ recette?.description }}</p>
    <ul>
      <li *ngFor="let ing of recette?.ingredients">{{ ing }}</li>
    </ul>
  `
})
export class Detail implements OnInit {
  recette?: Recette;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getById(id).subscribe(r => this.recette = r);
  }
}

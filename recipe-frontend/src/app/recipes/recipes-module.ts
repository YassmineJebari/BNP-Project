import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}

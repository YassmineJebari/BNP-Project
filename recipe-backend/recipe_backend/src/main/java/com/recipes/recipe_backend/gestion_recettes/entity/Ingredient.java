package com.recipes.recipe_backend.gestion_recettes.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ingredients")
@Data
public class Ingredient {
    private int id;
    private String name;
    private String ingredientType;

    public Ingredient() {}

    public Ingredient(int id, String name, String ingredientType) {
        this.id = id;
        this.name = name;
        this.ingredientType = ingredientType;
    }

    public void create() {
        // Logique pour créer un ingrédient
    }

    public void update() {
        // Logique pour mettre à jour un ingrédient
    }

    // Getters et Setters sur une seule ligne
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIngredientType() { return ingredientType; }
    public void setIngredientType(String ingredientType) { this.ingredientType = ingredientType; }
}


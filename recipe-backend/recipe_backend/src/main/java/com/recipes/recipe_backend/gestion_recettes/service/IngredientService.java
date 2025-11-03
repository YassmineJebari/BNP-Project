package com.recipes.recipe_backend.service;

import com.recipes.recipe_backend.entity.Ingredient;
import com.recipes.recipe_backend.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Ingredient create(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    public Ingredient findById(int id) {
        return ingredientRepository.findById(id).orElse(null);
    }

    public Ingredient update(int id, Ingredient ingredient) {
        Ingredient existingIngredient = ingredientRepository.findById(id).orElse(null);
        if (existingIngredient != null) {
            existingIngredient.setName(ingredient.getName());
            existingIngredient.setIngredientType(ingredient.getIngredientType());
            return ingredientRepository.save(existingIngredient);
        }
        return null;
    }

    public void delete(int id) {
        ingredientRepository.deleteById(id);
    }
}

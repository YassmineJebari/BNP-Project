package com.recipes.recipe_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recipes.recipe_backend.entity.Ingredient;
import com.recipes.recipe_backend.service.IngredientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(IngredientController.class)
public class IngredientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IngredientService ingredientService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateIngredient() throws Exception {
        Ingredient ingredient = new Ingredient(1, "Sucre", "Vegetable");
        when(ingredientService.create(ingredient)).thenReturn(ingredient);

        mockMvc.perform(post("/api/ingredients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ingredient)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Sucre"));
    }

    @Test
    public void testGetAllIngredients() throws Exception {
        Ingredient ingredient1 = new Ingredient(1, "Sucre", "Vegetable");
        Ingredient ingredient2 = new Ingredient(2, "Sel", "Spice");
        when(ingredientService.findAll()).thenReturn(Arrays.asList(ingredient1, ingredient2));

        mockMvc.perform(get("/api/ingredients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].name").value("Sucre"));
    }
}


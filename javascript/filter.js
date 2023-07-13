import { recipes } from '../data/recipes.js';
import { createRecipeCards } from './showData.js';

export function filteredRecipes() {
  const activeFilters = [];
  document.querySelectorAll('.all-selected-filter ul li').forEach((node) => activeFilters.push(node.textContent));

  if (activeFilters.length === 0) {
    createRecipeCards(recipes);
    return;
  }

  let filteredRecipes = recipes;

  for (const filter of activeFilters) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      let ingredientMatch = false;
      let applianceMatch = false;
      let utensilMatch = false;

      if (!ingredientMatch && recipe.ingredients.find((ig) => ig.ingredient === filter)) {
        ingredientMatch = true;
      }
      if (!applianceMatch && recipe.appliance === filter) {
        applianceMatch = true;
      }

      for (const ustensil of recipe.ustensils) {
        if (!utensilMatch && ustensil.toLowerCase() === filter.toLowerCase()) {
          utensilMatch = true;
          break;
        }
      }

      return ingredientMatch || applianceMatch || utensilMatch;
    });
  }

  createRecipeCards(filteredRecipes);
}

import { recipes } from '../data/recipes.js'
import { createRecipeCards } from './showData.js'

export function filteredRecipes() {
  console.log("passage")
  const activeFilters = [];
  document.querySelectorAll('.all-selected-filter ul li').forEach((node) => activeFilters.push(node.textContent));


  if (activeFilters.length === 0) {
    createRecipeCards(recipes);
    return;
  }

  const callback = (recipe) => {
    let ingredientMatch = false;
    let applianceMatch = false;
    let utensilMatch = false;

    for (const filter of activeFilters) {
      if (recipe.ingredients.find((ig) => ig.ingredient === filter)) {
        ingredientMatch = true;
      }
      if (recipe.appliance === filter) {
        applianceMatch = true;
      }

      for (const ustensil of recipe.ustensils) {
        if (ustensil.toLowerCase() === filter.toLowerCase()) {
          utensilMatch = true;
          break;
        }
      }
    }
    

    return ingredientMatch || applianceMatch || utensilMatch;
  };

  const filteredRecipes = recipes.filter(callback);
  createRecipeCards(filteredRecipes);
}
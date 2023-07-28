import { createRecipeCards } from "./showData.js";
import { recipes } from '../data/recipes.js'

function searchFilter(event) {
  const searchInput = event.target;
  const filterValue = searchInput.value.toLowerCase();
  const filterList = searchInput.parentElement.nextElementSibling;
  const filterItems = filterList.querySelectorAll('li');
  let visibleItemsCount = 0;

  filterItems.forEach(item => {
    const itemText = item.textContent.toLowerCase();

    if (itemText.includes(filterValue)) {
      item.style.display = 'flex';
      visibleItemsCount++;
    } else {
      item.style.display = 'none';
    }
  });

  const noResultMessage = filterList.querySelector('.no-result-message');
  if (visibleItemsCount === 0 && filterValue !== '') {
    if (noResultMessage) {
      noResultMessage.style.display = 'block';
      noResultMessage.textContent = `Aucun résultat trouvé pour "${filterValue}"`;
    } else {
      const messageElement = document.createElement('li');
      messageElement.classList.add('no-result-message');
      messageElement.textContent = `Aucun résultat trouvé pour "${filterValue}"`;
      filterList.appendChild(messageElement);
    }
  } else {
    if (noResultMessage) {
      noResultMessage.style.display = 'block';
      noResultMessage.textContent = `Aucun résultat trouvé pour "${filterValue}"`;
    }
  }
}

const searchInputs = document.querySelectorAll('.filter-search');
searchInputs.forEach(searchInput => {
  searchInput.addEventListener('input', searchFilter);
});

export function filteredRecipes() {
  const activeFilters = [];
  const filterItems = document.querySelectorAll(".ingredientsList li.selected, .appareilsList li.selected, .ustensilesList li.selected");

  filterItems.forEach((filter) => {
    activeFilters.push(filter.textContent.toLowerCase());
  });

  const searchInput = document.querySelector('.search');
  const filterValue = searchInput.value.toLowerCase();

  let filteredRecipes = recipes.filter(recipe => {
    let ingredientMatch = false;
    let applianceMatch = false; 
    let utensilMatch = false;   

    recipe.ingredients.forEach(ingredient => {
      if (!ingredientMatch && ingredient.ingredient.toLowerCase().includes(filterValue)) {
        ingredientMatch = true;
      }
    });

    if (!applianceMatch && recipe.appliance.toLowerCase().includes(filterValue)) {
      applianceMatch = true;
    }

    recipe.ustensils.forEach(ustensil => {
      if (!utensilMatch && ustensil.toLowerCase().includes(filterValue)) {
        utensilMatch = true;
      }
    });

    return ingredientMatch || applianceMatch || utensilMatch;
  });

  if (activeFilters.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      for (const filter of activeFilters) {
        if (
          !recipe.ingredients.find(ingredient => ingredient.ingredient.toLowerCase() === filter) &&
          !recipe.appliance.toLowerCase().includes(filter) &&
          !recipe.ustensils.find(ustensil => ustensil.toLowerCase().includes(filter))
        ) {
          return false;
        }
      }
      return true;
    });
  }

  createRecipeCards(filteredRecipes);

  if (filterValue.length >= 3 || activeFilters.length > 0) {
    console.log("Affichage recettes filtrées");
  } else {
    console.log("Affichage de toutes les recettes");
  }
}

const searchInputMain = document.querySelector('.search');
searchInputMain.addEventListener('input', filteredRecipes);












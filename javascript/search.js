import { createRecipeCards } from "./showData.js";
import { recipes } from '../data/recipes.js';

function searchFilter(event) {
  const searchInput = event.target;
  const filterValue = searchInput.value.toLowerCase();
  const filterList = searchInput.parentElement.nextElementSibling;
  const filterItems = filterList.querySelectorAll('li');
  let visibleItemsCount = 0;

  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems[i];
    const itemText = item.textContent.toLowerCase();

    if (itemText.includes(filterValue)) {
      item.style.display = 'flex';
      visibleItemsCount++;
    } else {
      item.style.display = 'none';
    }
  }

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
for (let i = 0; i < searchInputs.length; i++) {
  const searchInput = searchInputs[i];
  searchInput.addEventListener('input', searchFilter);
}

export function filteredRecipes() {
  const activeFilters = [];
  const filterItems = document.querySelectorAll(".ingredientsList li.selected, .appareilsList li.selected, .ustensilesList li.selected");

  for (let i = 0; i < filterItems.length; i++) {
    const filter = filterItems[i];
    activeFilters.push(filter.textContent.toLowerCase());
  }

  const searchInput = document.querySelector('.search');
  const filterValue = searchInput.value.toLowerCase();

  let filteredRecipes = recipes.filter(recipe => {
    let matchesFilterValue = false;

    if (
      recipe.name.toLowerCase().includes(filterValue) ||
      recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filterValue)) ||
      recipe.description.toLowerCase().includes(filterValue)
    ) {
      matchesFilterValue = true;
    }

    return matchesFilterValue;
  });

  if (activeFilters.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      return activeFilters.every(filter => {
        return (
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === filter) ||
          recipe.appliance.toLowerCase().includes(filter) ||
          recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter))
        );
      });
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



















import { createRecipeCards } from "./showData.js";
import { showDataFilter } from "./showData.js";
import { itemClicked } from './selectedFilterAnim.js';
import { crossIconClick } from './selectedFilterAnim.js';
import { recipes } from "../data/recipes.js";

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
      noResultMessage.style.display = 'none';
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

  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let matchesFilterValue = false;

    if (
      (filterValue.length < 3 || recipe.name.toLowerCase().includes(filterValue) ||
      recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filterValue)) ||
      recipe.description.toLowerCase().includes(filterValue))
    ) {
      matchesFilterValue = true;
    }

    if (!matchesFilterValue) {
      continue;
    }

    if (activeFilters.length > 0) {
      const filterMatches = activeFilters.every(filter => {
        return (
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === filter) ||
          recipe.appliance.toLowerCase().includes(filter) ||
          recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter))
        );
      });

      if (!filterMatches) {
        continue;
      }
    }

    filteredRecipes.push(recipe);
  }

  const recipeContainer = document.getElementById('recipeContainer');
  const recipeCountElement = document.getElementById('totalRecettes');
  const ingredientsList = document.querySelector('.ingredientsList');
  const appareilsList = document.querySelector('.appareilsList');
  const ustensilesList = document.querySelector('.ustensilesList');

  if (filteredRecipes.length === 0) {
    ingredientsList.style.display = 'none';
    appareilsList.style.display = 'none';
    ustensilesList.style.display = 'none';

    recipeCountElement.textContent = '0 recette';
    recipeContainer.innerHTML = `<p class="no-result-card">Aucun résultat trouvé</p>`;
  } else {
    ingredientsList.style.display = 'block';
    appareilsList.style.display = 'block';
    ustensilesList.style.display = 'block';

    showDataFilter(filteredRecipes);
    createRecipeCards(filteredRecipes);
    resetFilterItems(activeFilters);
    recipeCountElement.textContent = `${filteredRecipes.length} recettes`;
  }
}

function resetFilterItems(activeFilters) {
  const filterLists = document.querySelectorAll(".ingredientsList, .appareilsList, .ustensilesList");

  for (let i = 0; i < filterLists.length; i++) {
    const filterList = filterLists[i];
    const filterItems = filterList.querySelectorAll("li");
    for (let j = 0; j < filterItems.length; j++) {
      const filter = filterItems[j];
      const filterText = filter.textContent.toLowerCase();
      const isSelected = activeFilters.includes(filterText);

      filter.style.cssText = isSelected ? "background-color: #FFD15B; font-weight: bold; cursor: auto" : "";
      filter.classList.toggle("selected", isSelected);

      if (isSelected) {
        filter.removeEventListener("click", itemClicked);
        const crossIcon = document.createElement("i");
        crossIcon.style.cursor = "pointer";
        crossIcon.classList.add("fa-solid", "fa-circle-xmark");
        crossIcon.addEventListener("click", crossIconClick);
        filter.appendChild(crossIcon);
      } else {
        filter.addEventListener("click", itemClicked);
        const crossIcon = filter.querySelector("i.fa-circle-xmark");
        if (crossIcon) {
          crossIcon.removeEventListener("click", crossIconClick);
          crossIcon.remove();
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const filterItems = document.querySelectorAll(".ingredientsList li, .appareilsList li, .ustensilesList li");
  for (let i = 0; i < filterItems.length; i++) {
    const filter = filterItems[i];
    filter.addEventListener("click", itemClicked);
    filter.style.cursor = "pointer";
  }
});

const searchInputMain = document.querySelector('.search');
searchInputMain.addEventListener('input', filteredRecipes);

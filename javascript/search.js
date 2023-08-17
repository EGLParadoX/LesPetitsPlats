import { recipes } from '../data/recipes.js';
import { createRecipeCards } from "./showData.js";
import { showDataFilter } from "./showData.js";
import { itemClicked } from './selectedFilterAnim.js';
import { crossIconClick } from './selectedFilterAnim.js';

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
      noResultMessage.style.display = 'none';
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

  filterItems.forEach(filter => {
    activeFilters.push(filter.textContent.toLowerCase());
  });

  const searchInput = document.querySelector('.search');
  const filterValue = searchInput.value.toLowerCase();

  const filteredRecipes = recipes.filter(recipe => {
    const matchesFilterValue = (
      filterValue.length < 3 || recipe.name.toLowerCase().includes(filterValue) ||
      recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filterValue)) ||
      recipe.description.toLowerCase().includes(filterValue)
    );

    if (!matchesFilterValue) {
      return false;
    }

    if (activeFilters.length > 0) {
      const filterMatches = activeFilters.every(filter => (
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === filter) ||
        recipe.appliance.toLowerCase().includes(filter) ||
        recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter))
      ));

      if (!filterMatches) {
        return false;
      }
    }

    return true;
  });

  const recipeContainer = document.getElementById('recipeContainer');
  const recipeCountElement = document.getElementById('totalRecettes');
  const ingredientsList = document.querySelector('.ingredientsList');
  const appareilsList = document.querySelector('.appareilsList');
  const ustensilesList = document.querySelector('.ustensilesList');

  if (filteredRecipes.length === 0) {
    hideFilterLists([ingredientsList, appareilsList, ustensilesList]);
    updateNoResultsUI(recipeCountElement, recipeContainer);
  } else {
    showFilterLists([ingredientsList, appareilsList, ustensilesList]);
    updateResultsUI(filteredRecipes, recipeCountElement);
  }
}

function hideFilterLists(filterLists) {
  filterLists.forEach(filterList => {
    filterList.style.display = 'none';
  });
}

function showFilterLists(filterLists) {
  filterLists.forEach(filterList => {
    filterList.style.display = 'block';
  });
}

function updateNoResultsUI(recipeCountElement, recipeContainer) {
  recipeCountElement.textContent = '0 recette';
  recipeContainer.innerHTML = `<p class="no-result-card">Aucun résultat trouvé</p>`;
}

function updateResultsUI(filteredRecipes, recipeCountElement) {
  const ingredientsList = document.querySelector('.ingredientsList');
  const appareilsList = document.querySelector('.appareilsList');
  const ustensilesList = document.querySelector('.ustensilesList');

  showDataFilter(filteredRecipes);
  createRecipeCards(filteredRecipes);
  resetFilterItems(filteredRecipes, [ingredientsList, appareilsList, ustensilesList]);
  recipeCountElement.textContent = `${filteredRecipes.length} recettes`;
}

function resetFilterItems(filteredRecipes, filterLists) {
  filterLists.forEach(filterList => {
    filterList.style.display = 'none';

    const filterItems = filterList.querySelectorAll("li");
    filterItems.forEach(filter => {
      const filterText = filter.textContent.toLowerCase();
      const isSelected = filteredRecipes.some(recipe =>
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === filterText) ||
        recipe.appliance.toLowerCase() === filterText ||
        recipe.ustensils.some(ustensil => ustensil.toLowerCase() === filterText)
      );

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
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const filterItems = document.querySelectorAll(".ingredientsList li, .appareilsList li, .ustensilesList li");
  filterItems.forEach(filter => {
    filter.addEventListener("click", itemClicked);
    filter.style.cursor = "pointer";
  });
});

const searchInputMain = document.querySelector('.search');
searchInputMain.addEventListener('input', filteredRecipes);








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


function searchFilterMain(event) {
  const searchInput = event.target;
  const filterValue = searchInput.value.toLowerCase();

  const activeFilters = [];
  document.querySelectorAll('.all-selected-filter ul li').forEach(node => activeFilters.push(node.textContent));

  if (filterValue.length >= 3 || activeFilters.length > 0) {
    const filteredRecipes = recipes.filter(recipe => {
      const titleMatch = recipe.name.toLowerCase().includes(filterValue);
      const descriptionMatch = recipe.description.toLowerCase().includes(filterValue);

      let ingredientsMatch = false;
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.ingredient.toLowerCase().includes(filterValue)) {
          ingredientsMatch = true;
        }
      });
      
      if (activeFilters.length > 0) {
        for (const filter of activeFilters) {
          if (!recipe.ingredients.find(ingredient => ingredient.ingredient === filter)) {
            return false;
          }
        }
      }

      return titleMatch || descriptionMatch || ingredientsMatch;
    });

    createRecipeCards(filteredRecipes);
  } else {
    createRecipeCards(recipes);
  }
}

const searchInputMain = document.querySelector('.search');
searchInputMain.addEventListener('input', searchFilterMain);


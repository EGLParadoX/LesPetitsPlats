import { recipes } from '../data/recipes.js'

export function createRecipeCards(recipes) {
  const recipeContainer = document.getElementById('recipeContainer');

  recipeContainer.innerHTML = '';

  if (recipes.length === 0) {
    const recipeCountElement = document.getElementById('totalRecettes');
    recipeCountElement.textContent = '0 recette';
    recipeContainer.innerHTML = `<p class="no-result-card">Aucun résultat trouvé</p>`;
    return;
  }

  const recipeCountElement = document.getElementById('totalRecettes');
  const recipeCount = recipes.length;
  recipeCountElement.textContent = `${recipeCount} recettes`;

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('card');

    let ingredientsList = '';
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      const quantity = ingredient.quantity ? `<span class="quantity">${ingredient.quantity} ${ingredient.unit || ''}</span>` : '';
      ingredientsList += `<li>${ingredient.ingredient} <br> ${quantity}</li>`;
    }

    const recipeContent = `
      <img src="images/Photo/${recipe.image}" alt="${recipe.name}" />
      <div class="card-container">
        <div class="time">${recipe.time}min</div>
        <h3>${recipe.name}</h3>
        <h4>RECETTE</h4>
        <p>${recipe.description}.</p>
        <h4>INGREDIENTS</h4>
        <ul>${ingredientsList}</ul>
      </div>
    `;

    recipeCard.innerHTML = recipeContent;
    recipeContainer.appendChild(recipeCard);
  }
}

function showDataFilter() {
  const ingredientsContainer = document.querySelector('.ingredientsList');
  const uniqueIngredients = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      const lowerCaseIngredient = ingredient.ingredient.toLowerCase();

      if (!uniqueIngredients.includes(lowerCaseIngredient)) {
        uniqueIngredients.push(lowerCaseIngredient);
        const li = document.createElement('li');
        li.textContent = ingredient.ingredient;
        ingredientsContainer.appendChild(li);
      }
    }
  }

  const appareilsContainer = document.querySelector('.appareilsList');
  const uniqueAppareils = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const lowerCaseAppliance = recipe.appliance.toLowerCase(); 

    if (!uniqueAppareils.includes(lowerCaseAppliance)) {
      uniqueAppareils.push(lowerCaseAppliance);
      const li = document.createElement('li');
      li.textContent = recipe.appliance;
      appareilsContainer.appendChild(li);
    }
  }

  const ustensilesContainer = document.querySelector('.ustensilesList');
  const uniqueUstensiles = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j];
      const formattedUstensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);

      if (!uniqueUstensiles.includes(formattedUstensil)) {
        uniqueUstensiles.push(formattedUstensil);
        const li = document.createElement('li');
        li.textContent = formattedUstensil;
        ustensilesContainer.appendChild(li);
      }
    }
  }
}

showDataFilter();
createRecipeCards(recipes);



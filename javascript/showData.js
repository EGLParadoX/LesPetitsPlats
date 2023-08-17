import { recipes } from '../data/recipes.js'

export function createRecipeCards(recipes) {
  const recipeContainer = document.getElementById('recipeContainer');
  recipeContainer.innerHTML = '';

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

    const recipeCountElement = document.getElementById('totalRecettes');
    const recipeCount = recipes.length;
    recipeCountElement.textContent = `${recipeCount} recettes`;

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

export function showDataFilter(filteredRecipesList) {
  const ingredientsContainer = document.querySelector('.ingredientsList');
  const appareilsContainer = document.querySelector('.appareilsList');
  const ustensilesContainer = document.querySelector('.ustensilesList');

  ingredientsContainer.innerHTML = '';
  appareilsContainer.innerHTML = '';
  ustensilesContainer.innerHTML = '';

  const uniqueIngredients = [];
  const uniqueAppareils = [];
  const uniqueUstensiles = [];

  for (let i = 0; i < filteredRecipesList.length; i++) {
    const recipe = filteredRecipesList[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      const lowercaseIngredient = ingredient.ingredient.toLowerCase();
      if (!uniqueIngredients.includes(lowercaseIngredient)) {
        uniqueIngredients.push(lowercaseIngredient);
        const li = document.createElement('li');
        li.textContent = ingredient.ingredient;
        ingredientsContainer.appendChild(li);
      }
    }

    const lowercaseAppliance = recipe.appliance.toLowerCase();
    if (!uniqueAppareils.includes(lowercaseAppliance)) {
      uniqueAppareils.push(lowercaseAppliance);
      const li = document.createElement('li');
      li.textContent = recipe.appliance;
      appareilsContainer.appendChild(li);
    }

    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j];
      const lowercaseUstensil = ustensil.toLowerCase();
      if (!uniqueUstensiles.includes(lowercaseUstensil)) {
        uniqueUstensiles.push(lowercaseUstensil);
        const formattedUstensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
        const li = document.createElement('li');
        li.textContent = formattedUstensil;
        ustensilesContainer.appendChild(li);
      }
    }
  }
}

showDataFilter(recipes);
createRecipeCards(recipes);

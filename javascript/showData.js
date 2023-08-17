import { recipes } from '../data/recipes.js'

export function createRecipeCards(recipes) {
  const recipeContainer = document.getElementById('recipeContainer');

  recipeContainer.innerHTML = '';
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('card');

    const ingredientsList = recipe.ingredients.map(ingredient => {
      const quantity = ingredient.quantity ? `<span class="quantity">${ingredient.quantity} ${ingredient.unit || ''}</span>` : '';
      return `<li>${ingredient.ingredient} <br> ${quantity}</li>`;
    }).join('');

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
  });
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

  filteredRecipesList.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const lowercaseIngredient = ingredient.ingredient.toLowerCase();
      if (!uniqueIngredients.includes(lowercaseIngredient)) {
        uniqueIngredients.push(lowercaseIngredient);
        const li = document.createElement('li');
        li.textContent = ingredient.ingredient;
        ingredientsContainer.appendChild(li);
      }
    });

    const lowercaseAppliance = recipe.appliance.toLowerCase();
    if (!uniqueAppareils.includes(lowercaseAppliance)) {
      uniqueAppareils.push(lowercaseAppliance);
      const li = document.createElement('li');
      li.textContent = recipe.appliance;
      appareilsContainer.appendChild(li);
    }

    recipe.ustensils.forEach(ustensil => {
      const lowercaseUstensil = ustensil.toLowerCase();
      if (!uniqueUstensiles.includes(lowercaseUstensil)) {
        uniqueUstensiles.push(lowercaseUstensil);
        const formattedUstensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
        const li = document.createElement('li');
        li.textContent = formattedUstensil;
        ustensilesContainer.appendChild(li);
      }
    });
  });
}

showDataFilter(recipes);
createRecipeCards(recipes);
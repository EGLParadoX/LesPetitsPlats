import { recipes } from '../data/recipes.js'



function createRecipeCards(recipes) {
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



function showDataFilter() {

  const ingredientsContainer = document.querySelector('.ingredientsList');
  const uniqueIngredients = [];

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const lowerCaseIngredient = ingredient.ingredient.toLowerCase();

      if (!uniqueIngredients.includes(lowerCaseIngredient)) {
        uniqueIngredients.push(lowerCaseIngredient);
        const li = document.createElement('li');
        li.textContent = ingredient.ingredient;
        ingredientsContainer.appendChild(li);
      }
    });
  });

  const appareilsContainer = document.querySelector('.appareilsList');
  const uniqueAppareils = [];

  recipes.forEach(recipe => {
      const lowerCaseAppliance = recipe.appliance.toLowerCase(); 
      if (!uniqueAppareils.includes(lowerCaseAppliance)) {
        uniqueAppareils.push(lowerCaseAppliance);
        const li = document.createElement('li');
        li.textContent = recipe.appliance;
        appareilsContainer.appendChild(li);
      }
    });
  }


  const ustensilesContainer = document.querySelector('.ustensilesList');
  const uniqueUstensiles = [];

  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      const formattedUstensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);

      if (!uniqueUstensiles.includes(formattedUstensil)) {
        uniqueUstensiles.push(formattedUstensil);
        const li = document.createElement('li');
        li.textContent = formattedUstensil;
        ustensilesContainer.appendChild(li);
      }
    });
  });



showDataFilter();
createRecipeCards(recipes);


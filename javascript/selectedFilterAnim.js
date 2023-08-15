import { filteredRecipes } from "./search.js";

function removeSelectedFilter(li) {
  const elements = document.querySelectorAll(".all-selected-filter ul li");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.textContent === li.textContent) {
      element.remove();
    }
  }

  const filterItems = document.querySelectorAll(".ingredientsList li, .appareilsList li, .ustensilesList li");
  for (let i = 0; i < filterItems.length; i++) {
    const filter = filterItems[i];
    if (filter.textContent === li.textContent) {
      resetFilterItem(filter);
    }
  }

  filteredRecipes();
}

function resetFilterItem(filter) {
  filter.style.cssText = "";
  filter.classList.remove("selected");
  filter.addEventListener("click", itemClicked);

  const crossIcon = filter.querySelector("i.fa-circle-xmark");
  if (crossIcon) {
    crossIcon.removeEventListener("click", crossIconClick);
    crossIcon.remove();
  }
}

function crossIconClick(event) {
  event.stopPropagation();

  const crossIcon = event.target;
  const li = crossIcon.closest("li");
  li.style.cssText = "cursor: pointer";
  li.removeChild(crossIcon);

  removeSelectedFilter(li);
}

function addSelectedFilter(liText) {
  const selectedTextElement = document.createElement("li");
  selectedTextElement.textContent = liText;
  selectedTextElement.classList.add("animation");

  const crossIcon = document.createElement("i");
  crossIcon.style.cursor = "pointer";
  crossIcon.classList.add("fa-solid", "fa-times");
  crossIcon.addEventListener("click", () => removeSelectedFilter(selectedTextElement));

  selectedTextElement.appendChild(crossIcon);
  document.querySelector(".all-selected-filter ul").appendChild(selectedTextElement);

  document.querySelector(".all-selected-filter").classList.add("animation");

  filteredRecipes();
}

function itemClicked(event) {
  const li = event.target;
  const liText = li.textContent;

  if (!li.classList.contains("selected")) {
    li.style.cssText = "background-color: #FFD15B; font-weight: bold; cursor: auto";
    li.classList.add("selected");
    li.removeEventListener("click", itemClicked);

    const crossIcon = document.createElement("i");
    crossIcon.style.cursor = "pointer";
    crossIcon.classList.add("fa-solid", "fa-circle-xmark");
    crossIcon.addEventListener("click", crossIconClick);

    li.appendChild(crossIcon);
  }

  addSelectedFilter(liText);
}

document.addEventListener("DOMContentLoaded", () => {
  const filterItems = document.querySelectorAll(".ingredientsList li, .appareilsList li, .ustensilesList li");
  for (let i = 0; i < filterItems.length; i++) {
    const filter = filterItems[i];
    filter.addEventListener("click", itemClicked);
    filter.style.cursor = "pointer";
  }
});












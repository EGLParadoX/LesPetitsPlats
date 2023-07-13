import { filteredRecipes } from "./filter.js";

function removeSelectedFilter(li) {
  document.querySelectorAll(".all-selected-filter ul li").forEach((element) => {
    if (element.textContent === li.textContent) element.remove();
  });

  document.querySelectorAll(".ingredientsList li, .appareilsList li, .ustensilesList li").forEach(resetFilterItem);

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

  const li = event.target.closest("li");
  li.style.cssText = "cursor: pointer";
  li.removeChild(event.target);

  document.querySelectorAll(".ingredientsList li, .appareilsList li, .ustensilesList li").forEach((item) => (item.style.cursor = "pointer"));

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
  document.querySelectorAll(".ingredientsList li, .appareilsList li, .ustensilesList li").forEach((li) => {
    li.addEventListener("click", itemClicked);
    li.style.cursor = "pointer";
  });
});









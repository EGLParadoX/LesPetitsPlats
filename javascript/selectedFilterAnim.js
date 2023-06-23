import { filteredRecipes } from "./filter.js"

function removeSelectedFilter(li) {
  const selectedFilterList = document.querySelector(".all-selected-filter ul");
  const selectedTextElements = selectedFilterList.getElementsByTagName("li");

  for (let i = 0; i < selectedTextElements.length; i++) {
    if (selectedTextElements[i].textContent === li.textContent) {
      selectedTextElements[i].remove();
      break;
    }
  }
}

function crossIconClick(event) {
  event.stopPropagation();

  const crossIcon = event.target;
  const li = crossIcon.parentNode;
  li.style.backgroundColor = "";
  li.style.fontWeight = "";
  li.removeChild(crossIcon);
  li.style.cursor = "pointer";
  li.addEventListener("click", itemClicked);

  removeSelectedFilter(li);
  filteredRecipes();
}

function addSelectedFilter(liText) {
  const selectedFilterList = document.querySelector(".all-selected-filter ul");
  const selectedTextElement = document.createElement("li");
  selectedTextElement.textContent = liText;
  selectedTextElement.classList.add("animation");

  const crossIcon = document.createElement("i");
  crossIcon.style.cursor = "pointer";
  crossIcon.classList.add("fa-solid", "fa-times");

  selectedTextElement.appendChild(crossIcon);
  selectedFilterList.appendChild(selectedTextElement);

  const selectedFilterContainer = document.querySelector(".all-selected-filter");
  selectedFilterContainer.classList.add("animation");

  crossIcon.addEventListener("click", crossIconClick);

  filteredRecipes();
}

function itemClicked(event) {
  const li = event.target;
  const liText = li.textContent;

  li.style.backgroundColor = "#FFD15B";
  li.style.fontWeight = "bold";

  const crossIcon = document.createElement("i");
  crossIcon.style.cursor = "pointer";
  crossIcon.classList.add("fa-solid", "fa-circle-xmark");
  li.appendChild(crossIcon);

  crossIcon.addEventListener("click", crossIconClick);

  li.removeEventListener("click", itemClicked);
  li.style.cursor = "auto";

  addSelectedFilter(liText);
}

document.addEventListener("DOMContentLoaded", () => {
  const allLi = document.querySelectorAll(
    ".ingredientsList li, .appareilsList li, .ustensilesList li"
  );

  allLi.forEach((li) => {
    li.addEventListener("click", itemClicked);
  });
});

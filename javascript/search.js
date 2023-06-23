function searchFilter(event) {
  const searchInput = event.target;
  const filterValue = searchInput.value.toLowerCase();
  const filterList = searchInput.parentElement.nextElementSibling;
  const filterItems = filterList.querySelectorAll('li');
  
  filterItems.forEach(item => {
    const itemText = item.textContent.toLowerCase();

    if (itemText.includes(filterValue)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

const searchInputs = document.querySelectorAll('.filter-search');
searchInputs.forEach(searchInput => {
  searchInput.addEventListener('input', searchFilter);
});
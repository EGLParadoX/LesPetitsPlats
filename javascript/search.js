function searchFilter() {
    const searchInput = document.querySelector('.filter-search');
    const filterValue = searchInput.value.toLowerCase();
    const filterItems = document.querySelectorAll('.ingredientsList li');
    
    filterItems.forEach(item => {
      const itemText = item.textContent.toLowerCase();
      
      if (filterValue.length >= 3) {
        if (itemText.includes(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      } else {
        item.style.display = 'block'; 
      }
    });
  }
  
  const searchInput = document.querySelector('.filter-search');
  searchInput.addEventListener('input', searchFilter);
document.addEventListener('DOMContentLoaded', () => {
    function itemClicked(event) {
      const li = event.target;
      li.style.backgroundColor = '#FFD15B';
      li.style.fontWeight = 'bold';
      li.style.cursor = "auto"
  
      const crossIcon = li.querySelector('.fa.fa-times');
      if (!crossIcon) {
        const crossIcon = document.createElement('i');
        crossIcon.style.cursor = "pointer"
        crossIcon.classList.add('fa', 'fa-times');
        li.appendChild(crossIcon);
  
        crossIcon.addEventListener('click', () => {
          li.style.backgroundColor = '';
          li.style.fontWeight = '';
          li.removeChild(crossIcon);
        });
      }
    }
  
    const allLi = document.querySelectorAll('.ingredientsList li, .appareilsList li, .ustensilesList li');
  
    allLi.forEach(li => {
      li.addEventListener('click', itemClicked);
    });
  });
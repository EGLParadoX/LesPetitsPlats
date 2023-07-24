function removeTotalRecettes() {
    const totalRecettes = document.getElementById("totalRecettes");
    const totalFilter = document.querySelector(".total-filter");

    if (window.innerWidth <= 1300 && totalRecettes && totalRecettes.parentNode === totalFilter) {
      totalFilter.removeChild(totalRecettes);
      document.body.appendChild(totalRecettes);
    } else if (window.innerWidth > 1300 && totalRecettes && totalRecettes.parentNode === document.body) {
      document.body.removeChild(totalRecettes);
      totalFilter.appendChild(totalRecettes); 
    }
  }

  window.addEventListener("resize", removeTotalRecettes); 

  document.addEventListener("DOMContentLoaded", () => {
    removeTotalRecettes(); 
  });
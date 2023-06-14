function toggleFilter (e) {

    const filterBars = document.getElementsByClassName("filter-bar");

  for (let i = 0; i < filterBars.length; i++) {
    const filterBar = filterBars[i];
    if (
      filterBar !== e.parentElement &&
      filterBar.classList.contains("clicked")
    ) {
      filterBar.classList.remove("clicked");
    }
  }

  e.parentElement.classList.toggle("clicked");
}

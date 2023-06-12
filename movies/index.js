const searchBtnEl = document.querySelector(".search__btn");

function onSearchChange(event) {
  const searchValue = event.target.value;
  // console.log(searchValue)
  localStorage.setItem("searchValue", searchValue);

  searchBtnEl.innerHTML = `<i class="fa-solid fa-spinner"></i>`;
  searchBtnEl.classList.add("loading");
  setTimeout(() => {
    window.location.href = `${window.location.origin}/movieTube.html`;
  }, 1500);
}

function openMenu() {
  document.body.classList += " menu__open";
}

function closeMenu() {
  document.body.classList.remove("menu__open");
}
